// app/api/quiz/submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type SubmitQuizBody = {
  email?: string;
  score?: number;
  result?: string;
  nextStep?: string;
  answers?: Record<string, number> | Record<number, number>;
  consent?: boolean;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function getResultKey(result: string): string {
  switch (result) {
    case "Strong & Steady":
      return "strong_steady";
    case "Progress in Motion":
      return "progress_in_motion";
    case "Time for Reset":
    case "Time for a Reset":
      return "time_for_reset";
    default:
      return "time_for_reset";
  }
}

function getTagIdForResult(result: string): string | undefined {
  switch (result) {
    case "Strong & Steady":
      return process.env.ACTIVECAMPAIGN_TAG_STRONG_STEADY;
    case "Progress in Motion":
      return process.env.ACTIVECAMPAIGN_TAG_PROGRESS_IN_MOTION;
    case "Time for Reset":
    case "Time for a Reset":
      return process.env.ACTIVECAMPAIGN_TAG_TIME_FOR_RESET;
    default:
      return undefined;
  }
}

function normalizeAnswers(
  answers: SubmitQuizBody["answers"],
): Record<string, 0 | 1> {
  if (!answers || typeof answers !== "object") {
    return {};
  }

  const normalized: Record<string, 0 | 1> = {};

  for (const [key, value] of Object.entries(answers)) {
    normalized[String(key)] = value === 1 ? 1 : 0;
  }

  return normalized;
}

async function getOrCreateActiveCampaignContact(
  baseUrl: string,
  apiKey: string,
  email: string,
): Promise<string> {
  const existingResponse = await fetch(
    `${baseUrl}/api/3/contacts?email=${encodeURIComponent(email)}`,
    {
      headers: {
        "Api-Token": apiKey,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!existingResponse.ok) {
    const body = await existingResponse.text();
    throw new Error(`Failed to check contact existence: ${existingResponse.status} ${body}`);
  }

  const existingData = (await existingResponse.json()) as {
    contacts?: Array<{ id: string }>;
  };

  if (existingData.contacts && existingData.contacts.length > 0) {
    return existingData.contacts[0].id;
  }

  const createResponse = await fetch(`${baseUrl}/api/3/contacts`, {
    method: "POST",
    headers: {
      "Api-Token": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contact: {
        email,
      },
    }),
    cache: "no-store",
  });

  if (!createResponse.ok) {
    const body = await createResponse.text();
    throw new Error(`Failed to create contact: ${createResponse.status} ${body}`);
  }

  const createData = (await createResponse.json()) as {
    contact?: { id: string };
  };

  if (!createData.contact?.id) {
    throw new Error("ActiveCampaign did not return a contact id");
  }

  return createData.contact.id;
}

async function writeActiveCampaignFieldValue(
  baseUrl: string,
  apiKey: string,
  contactId: string,
  fieldId: string | undefined,
  value: string | undefined,
): Promise<void> {
  if (!fieldId || !value) {
    return;
  }

  const response = await fetch(`${baseUrl}/api/3/fieldValues`, {
    method: "POST",
    headers: {
      "Api-Token": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fieldValue: {
        contact: contactId,
        field: fieldId,
        value,
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("ActiveCampaign field write failed", {
      fieldId,
      value,
      status: response.status,
      body,
    });
  }
}

async function applyActiveCampaignTag(
  baseUrl: string,
  apiKey: string,
  contactId: string,
  tagId: string | undefined,
): Promise<void> {
  if (!tagId) {
    return;
  }

  const response = await fetch(`${baseUrl}/api/3/contactTags`, {
    method: "POST",
    headers: {
      "Api-Token": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contactTag: {
        contact: Number(contactId),
        tag: Number(tagId),
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("ActiveCampaign tag apply failed", {
      tagId,
      status: response.status,
      body,
    });
  }
}

async function subscribeContactToActiveCampaignList(
  baseUrl: string,
  apiKey: string,
  contactId: string,
): Promise<void> {
  const listId = process.env.ACTIVECAMPAIGN_LIST_ID;

  if (!listId) {
    console.error("ActiveCampaign list subscribe skipped: missing ACTIVECAMPAIGN_LIST_ID");
    return;
  }

  const response = await fetch(`${baseUrl}/api/3/contactLists`, {
    method: "POST",
    headers: {
      "Api-Token": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contactList: {
        list: Number(listId),
        contact: Number(contactId),
        status: 1,
      },
    }),
    cache: "no-store",
  });

  const responseText = await response.text();

  console.log("ActiveCampaign list subscribe result", {
    listId,
    contactId,
    status: response.status,
    ok: response.ok,
    body: responseText,
  });

  if (!response.ok) {
    console.error("ActiveCampaign list subscribe failed", {
      listId,
      contactId,
      status: response.status,
      body: responseText,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SubmitQuizBody;

    const email = isNonEmptyString(body.email) ? normalizeEmail(body.email) : "";
    const score = typeof body.score === "number" ? body.score : NaN;
    const result = isNonEmptyString(body.result) ? body.result.trim() : "";
    const nextStep = isNonEmptyString(body.nextStep) ? body.nextStep.trim() : "";
    const consent = Boolean(body.consent);
    const answers = normalizeAnswers(body.answers);

    if (!email || Number.isNaN(score) || !result) {
      return NextResponse.json(
        { error: "Email, score, and result are required" },
        { status: 400 },
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: "Consent is required" },
        { status: 400 },
      );
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const baseUrl = process.env.ACTIVECAMPAIGN_BASE_URL;
    const apiKey = process.env.ACTIVECAMPAIGN_API_KEY;

    if (!baseUrl || !apiKey) {
      return NextResponse.json(
        { error: "ActiveCampaign configuration missing" },
        { status: 500 },
      );
    }

    const resultKey = getResultKey(result);

    let submissionId: string | number | null = null;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });

      console.log("Saving submission to Supabase", {
        email,
        score,
        result,
        nextStep,
        answers,
        consent,
        resultKey,
      });

      const { data: submission, error: supabaseError } = await supabase
        .from("quiz_submissions")
        .insert({
          email,
          answers,
          score,
          result_key: resultKey,
          result_title: result,
          selected_next_step: nextStep || null,
          consent_marketing: consent,
        })
        .select("id")
        .single();

      console.log("Supabase insert result", {
        submission,
        supabaseError,
      });

      if (supabaseError) {
        return NextResponse.json(
          { error: supabaseError.message },
          { status: 500 },
        );
      }

      submissionId = submission.id;
    } else {
      console.warn(
        "Supabase configuration missing; skipping database persistence and continuing with ActiveCampaign",
      );
    }

    const contactId = await getOrCreateActiveCampaignContact(
      baseUrl,
      apiKey,
      email,
    );

    console.log("ActiveCampaign contact ready", { contactId, email });

    await writeActiveCampaignFieldValue(
      baseUrl,
      apiKey,
      contactId,
      process.env.ACTIVECAMPAIGN_FIELD_QUIZ_SCORE,
      String(score),
    );

    await writeActiveCampaignFieldValue(
      baseUrl,
      apiKey,
      contactId,
      process.env.ACTIVECAMPAIGN_FIELD_QUIZ_RESULT,
      result,
    );

    await writeActiveCampaignFieldValue(
      baseUrl,
      apiKey,
      contactId,
      process.env.ACTIVECAMPAIGN_FIELD_QUIZ_SELECTED_NEXT_STEP,
      nextStep || undefined,
    );

    await writeActiveCampaignFieldValue(
      baseUrl,
      apiKey,
      contactId,
      process.env.ACTIVECAMPAIGN_FIELD_QUIZ_DATE,
      new Date().toISOString().split("T")[0],
    );

    await applyActiveCampaignTag(
      baseUrl,
      apiKey,
      contactId,
      getTagIdForResult(result),
    );

    await subscribeContactToActiveCampaignList(
      baseUrl,
      apiKey,
      contactId,
    );

    return NextResponse.json({
      success: true,
      submissionId,
      contactId,
    });
  } catch (error) {
    console.error("Quiz submission error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to submit quiz data",
      },
      { status: 500 },
    );
  }
}