import Link from "next/link";
import { efcBrand } from "@/lib/brand";
import {
  type QuizResult,
  financialQuickAssessmentConfirmationMessage,
  financialQuickAssessmentTitle,
} from "@/lib/financial-quick-assessment";

type FinancialQuickAssessmentResultsProps = {
  result: QuizResult;
};

function splitParagraphs(text: string) {
  return text.split("\n\n").filter(Boolean);
}

function getRangeTheme(key: QuizResult["range"]["key"]) {
  switch (key) {
    case "strong_steady":
      return {
        accent: efcBrand.colors.moneyGreen,
        accentSoft: "#edf7f2",
        accentBorder: "#cfe7dc",
        pillBg: "#e8f5ef",
        pillText: "#145f46",
        helper: "Peace over panic. Partnership over pressure.",
      };
    case "progress_in_motion":
      return {
        accent: efcBrand.colors.teal,
        accentSoft: "#ebf8fb",
        accentBorder: "#c9eaf0",
        pillBg: "#e7f6f9",
        pillText: "#1f7281",
        helper: "Progress over perfection.",
      };
    case "time_for_reset":
      return {
        accent: efcBrand.colors.orange,
        accentSoft: "#fff1ed",
        accentBorder: "#ffd8cc",
        pillBg: "#fff0eb",
        pillText: "#c85d3d",
        helper: "No shame. Just support and strategy.",
      };
  }
}

function getScoreRing(score: number, total: number, color: string) {
  const percentage = Math.max(0, Math.min(100, (score / total) * 100));
  return {
    background: `conic-gradient(${color} ${percentage}%, #eadfd7 ${percentage}% 100%)`,
  };
}

export function FinancialQuickAssessmentResults({
  result,
}: FinancialQuickAssessmentResultsProps) {
  const theme = getRangeTheme(result.range.key);
  const scoreRingStyle = getScoreRing(
    result.score,
    result.totalQuestions,
    theme.accent,
  );

  return (
    <div
      className="min-h-screen px-4 py-8 sm:px-6 lg:px-8"
      style={{
        backgroundColor: efcBrand.colors.background,
        color: efcBrand.colors.ink,
        fontFamily: efcBrand.fontStacks.body,
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div
          className="overflow-hidden rounded-[2rem] border shadow-[0_20px_60px_rgba(31,26,23,0.08)]"
          style={{
            backgroundColor: efcBrand.colors.surface,
            borderColor: efcBrand.colors.border,
          }}
        >
          <section className="relative px-6 pb-10 pt-10 sm:px-10 sm:pb-12 sm:pt-12">
            <div
              className="absolute inset-x-0 top-0 h-40"
              style={{
                background:
                  "linear-gradient(180deg, rgba(186,224,159,0.20) 0%, rgba(245,241,237,0) 100%)",
              }}
            />
            <div className="relative">
              <p
                className="text-xs uppercase tracking-[0.35em]"
                style={{ color: efcBrand.colors.mutedInk }}
              >
                Empowering Financial Coaching
              </p>

              <div className="mt-5 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
                <div>
                  <h1
                    className="max-w-3xl text-4xl leading-none sm:text-5xl"
                    style={{
                      fontFamily: efcBrand.fontStacks.display,
                      fontWeight: 400,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {financialQuickAssessmentTitle}
                  </h1>

                  <p
                    className="mt-5 max-w-2xl text-lg leading-8"
                    style={{ color: efcBrand.colors.mutedInk }}
                  >
                    {financialQuickAssessmentConfirmationMessage}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span
                      className="inline-flex rounded-full px-4 py-2 text-sm font-semibold"
                      style={{
                        backgroundColor: theme.pillBg,
                        color: theme.pillText,
                      }}
                    >
                      {result.range.label}
                    </span>
                    <span
                      className="inline-flex rounded-full border px-4 py-2 text-sm"
                      style={{
                        borderColor: efcBrand.colors.border,
                        color: efcBrand.colors.mutedInk,
                        backgroundColor: "#fffaf7",
                      }}
                    >
                      {theme.helper}
                    </span>
                  </div>
                </div>

                <div className="flex justify-start lg:justify-end">
                  <div className="text-center">
                    <div
                      className="grid h-36 w-36 place-items-center rounded-full p-3"
                      style={scoreRingStyle}
                    >
                      <div
                        className="grid h-full w-full place-items-center rounded-full"
                        style={{ backgroundColor: efcBrand.colors.surface }}
                      >
                        <div>
                          <div
                            className="text-4xl leading-none"
                            style={{
                              fontFamily: efcBrand.fontStacks.display,
                              color: efcBrand.colors.ink,
                            }}
                          >
                            {result.score}
                          </div>
                          <div
                            className="mt-1 text-xs uppercase tracking-[0.25em]"
                            style={{ color: efcBrand.colors.mutedInk }}
                          >
                            of {result.totalQuestions}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p
                      className="mt-4 text-sm"
                      style={{ color: efcBrand.colors.mutedInk }}
                    >
                      Your assessment score
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 pb-6 sm:px-10 sm:pb-10">
            <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr_0.8fr]">
              <article
                className="rounded-[2rem] border p-6 sm:p-8"
                style={{
                  backgroundColor: theme.accentSoft,
                  borderColor: theme.accentBorder,
                }}
              >
                <p
                  className="text-sm uppercase tracking-[0.25em]"
                  style={{ color: theme.accent }}
                >
                  Your result
                </p>

                <h2
                  className="mt-4 text-4xl leading-none sm:text-5xl"
                  style={{
                    fontFamily: efcBrand.fontStacks.display,
                    fontWeight: 400,
                    color: efcBrand.colors.ink,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {result.range.title}
                </h2>

                <p
                  className="mt-5 text-lg leading-8"
                  style={{ color: efcBrand.colors.ink }}
                >
                  {result.range.message}
                </p>

                <div
                  className="mt-8 rounded-[1.5rem] border p-5 sm:p-6"
                  style={{
                    backgroundColor: efcBrand.colors.surface,
                    borderColor: theme.accentBorder,
                  }}
                >
                  <p
                    className="text-sm uppercase tracking-[0.25em]"
                    style={{ color: theme.accent }}
                  >
                    Recommended next step
                  </p>

                  <div
                    className="mt-4 space-y-4 text-base leading-8"
                    style={{ color: efcBrand.colors.ink }}
                  >
                    {splitParagraphs(result.range.recommendation).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <Link
                    href={result.range.primaryCta.href}
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
                    style={{
                      backgroundColor: theme.accent,
                      color: efcBrand.colors.white,
                    }}
                  >
                    {result.range.primaryCta.label}
                  </Link>

                  <Link
                    href={result.range.secondaryCta.href}
                    className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition"
                    style={{
                      borderColor: theme.accent,
                      color: theme.accent,
                      backgroundColor: "transparent",
                    }}
                  >
                    {result.range.secondaryCta.label}
                  </Link>
                </div>
              </article>

              <section
                className="rounded-[2rem] border p-6"
                style={{
                  backgroundColor: "#fffaf7",
                  borderColor: efcBrand.colors.border,
                }}
              >
                <p
                  className="text-sm uppercase tracking-[0.25em]"
                  style={{ color: efcBrand.colors.teal }}
                >
                  Take the next step
                </p>

                <h3
                  className="mt-3 text-2xl"
                  style={{
                    fontFamily: efcBrand.fontStacks.displayLight,
                    fontWeight: 400,
                  }}
                >
                  Choose what feels right for you
                </h3>

                <div className="mt-6 space-y-4">
                  {result.range.nextStepLinks.map((item) => (
                    <Link
                      key={item.href + item.label}
                      href={item.href}
                      className="block rounded-[1.5rem] border p-5 transition hover:-translate-y-0.5"
                      style={{
                        borderColor: efcBrand.colors.border,
                        backgroundColor: efcBrand.colors.surface,
                      }}
                    >
                      <div
                        className="text-base font-semibold"
                        style={{ color: efcBrand.colors.ink }}
                      >
                        {item.label}
                      </div>
                      <p
                        className="mt-2 text-sm leading-7"
                        style={{ color: efcBrand.colors.mutedInk }}
                      >
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>

              <aside className="space-y-6">
                <div
                  className="rounded-[2rem] border p-6"
                  style={{
                    backgroundColor: efcBrand.colors.surface,
                    borderColor: efcBrand.colors.border,
                  }}
                >
                  <h3
                    className="text-2xl"
                    style={{
                      fontFamily: efcBrand.fontStacks.displayLight,
                      fontWeight: 400,
                    }}
                  >
                    Score snapshot
                  </h3>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div
                      className="rounded-[1.5rem] border p-5"
                      style={{
                        borderColor: efcBrand.colors.border,
                        backgroundColor: "#fffaf7",
                      }}
                    >
                      <p
                        className="text-xs uppercase tracking-[0.2em]"
                        style={{ color: efcBrand.colors.mutedInk }}
                      >
                        Yes answers
                      </p>
                      <p
                        className="mt-3 text-4xl leading-none"
                        style={{ fontFamily: efcBrand.fontStacks.display }}
                      >
                        {result.yesAnswers}
                      </p>
                    </div>

                    <div
                      className="rounded-[1.5rem] border p-5"
                      style={{
                        borderColor: efcBrand.colors.border,
                        backgroundColor: "#fffaf7",
                      }}
                    >
                      <p
                        className="text-xs uppercase tracking-[0.2em]"
                        style={{ color: efcBrand.colors.mutedInk }}
                      >
                        No answers
                      </p>
                      <p
                        className="mt-3 text-4xl leading-none"
                        style={{ fontFamily: efcBrand.fontStacks.display }}
                      >
                        {result.noAnswers}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="rounded-[2rem] border p-6"
                  style={{
                    backgroundColor: "#fffaf7",
                    borderColor: efcBrand.colors.border,
                  }}
                >
                  <p
                    className="text-sm uppercase tracking-[0.25em]"
                    style={{ color: efcBrand.colors.teal }}
                  >
                    A note from
                  </p>

                  <h3
                    className="mt-3 text-2xl"
                    style={{
                      fontFamily: efcBrand.fontStacks.displayLight,
                      fontWeight: 400,
                    }}
                  >
                    Empowering Financial Coaching
                  </h3>

                  <div
                    className="mt-4 space-y-4 text-base leading-8"
                    style={{ color: efcBrand.colors.mutedInk }}
                  >
                    {splitParagraphs(result.range.closing).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <p
                    className="mt-6 text-3xl"
                    style={{
                      fontFamily: efcBrand.fontStacks.script,
                      color: theme.accent,
                      lineHeight: 1,
                    }}
                  >
                    Peace over panic.
                  </p>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}