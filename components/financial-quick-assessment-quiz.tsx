"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { efcBrand } from "@/lib/brand";
import {
  type AnswerValue,
  financialQuickAssessmentIntro,
  financialQuickAssessmentQuestions,
  financialQuickAssessmentTitle,
} from "@/lib/financial-quick-assessment";

type AnswersState = Record<number, AnswerValue>;

function getAnsweredCount(answers: Partial<AnswersState>) {
  return financialQuickAssessmentQuestions.reduce((count, question) => {
    return typeof answers[question.id] === "number" ? count + 1 : count;
  }, 0);
}

export function FinancialQuickAssessmentQuiz() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<AnswersState>>({});
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const totalQuestions = financialQuickAssessmentQuestions.length;
  const currentQuestion = financialQuickAssessmentQuestions[currentIndex];
  const currentAnswer = answers[currentQuestion.id];
  const answeredCount = getAnsweredCount(answers);
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const canGoBack = currentIndex > 0;
  const canGoNext = typeof currentAnswer === "number";
  const isLastQuestion = currentIndex === totalQuestions - 1;

  function handleAnswerSelect(value: AnswerValue) {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: value,
    }));
  }

  async function handleSubmit() {
    try {
      setIsSubmitting(true);
      setSubmitError("");

      const score = financialQuickAssessmentQuestions.reduce((total, question) => {
        return total + (answers[question.id] === 1 ? 1 : 0);
      }, 0);

      let result = "Time for a Reset";
      let nextStep = "Register for the Webinar";

      if (score >= 8) {
        result = "Strong & Steady";
        nextStep = "Book a Budget Planning Review";
      } else if (score >= 5) {
        result = "Progress in Motion";
        nextStep = "Book a Private Coaching Orientation";
      }

      const normalizedAnswers: Record<number, AnswerValue> = {};

      for (const question of financialQuickAssessmentQuestions) {
        normalizedAnswers[question.id] = answers[question.id] === 1 ? 1 : 0;
      }

      const response = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          score,
          result,
          nextStep,
          answers: normalizedAnswers,
          consent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit quiz");
      }

      router.push(`/results?score=${score}`);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to submit quiz",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleNext() {
    if (!canGoNext) {
      return;
    }

    if (isLastQuestion) {
      await handleSubmit();
      return;
    }

    setCurrentIndex((previous) => previous + 1);
  }

  function handleBack() {
    if (!canGoBack || isSubmitting) {
      return;
    }

    setCurrentIndex((previous) => previous - 1);
  }

  return (
    <div
      className="min-h-screen px-4 py-8 sm:px-6 lg:px-8"
      style={{
        backgroundColor: efcBrand.colors.background,
        color: efcBrand.colors.ink,
        fontFamily: efcBrand.fontStacks.body,
      }}
    >
      <div className="mx-auto max-w-4xl">
        <div
          className="overflow-hidden rounded-[2rem] border shadow-[0_20px_60px_rgba(31,26,23,0.08)]"
          style={{
            backgroundColor: efcBrand.colors.surface,
            borderColor: efcBrand.colors.border,
          }}
        >
          <section className="relative px-6 pb-8 pt-10 sm:px-10 sm:pt-12">
            <div
              className="absolute inset-x-0 top-0 h-40"
              style={{
                background:
                  "linear-gradient(180deg, rgba(36,155,177,0.16) 0%, rgba(245,241,237,0) 100%)",
              }}
            />
            <div className="relative">
              <p
                className="text-xs uppercase tracking-[0.35em]"
                style={{ color: efcBrand.colors.mutedInk }}
              >
                Empowering Financial Coaching
              </p>

              <h1
                className="mt-4 text-4xl leading-none sm:text-5xl"
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
                {financialQuickAssessmentIntro}
              </p>

              <div className="mt-6 grid gap-4">
                <label className="block">
                  <span
                    className="mb-2 block text-sm font-medium"
                    style={{ color: efcBrand.colors.mutedInk }}
                  >
                    Email address
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-full border px-4 py-3 outline-none transition"
                    style={{
                      borderColor: efcBrand.colors.border,
                      backgroundColor: "#fffaf7",
                    }}
                  />
                </label>

                <label className="flex items-start gap-3 text-sm leading-6">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                    className="mt-1 h-4 w-4"
                  />
                  <span style={{ color: efcBrand.colors.mutedInk }}>
                    I agree to receive marketing emails and follow-up communication
                    from Empowering Financial Coaching. I understand I can
                    unsubscribe at any time.
                  </span>
                </label>

                <p className="text-sm leading-6" style={{ color: efcBrand.colors.mutedInk }}>
                  This quick assessment is for educational and coaching purposes
                  only and does not constitute financial, legal, or tax advice.
                </p>

                <div
                  className="inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold"
                  style={{
                    backgroundColor: "#e7f6f9",
                    color: "#1f7281",
                  }}
                >
                  {answeredCount} of {totalQuestions} answered
                </div>
              </div>

              <div className="mt-6">
                <div
                  className="h-3 overflow-hidden rounded-full"
                  style={{ backgroundColor: "#eadfd7" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${progressPercent}%`,
                      backgroundColor: efcBrand.colors.teal,
                    }}
                  />
                </div>
                <div
                  className="mt-2 text-sm"
                  style={{ color: efcBrand.colors.mutedInk }}
                >
                  Question {currentIndex + 1} of {totalQuestions}
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 pb-6 sm:px-10 sm:pb-10">
            <div>
              <article
                className="rounded-[2rem] border p-6 sm:p-8 w-full"
                style={{
                  backgroundColor: "#fffaf7",
                  borderColor: efcBrand.colors.border,
                }}
              >
                <p
                  className="text-sm uppercase tracking-[0.25em]"
                  style={{ color: efcBrand.colors.teal }}
                >
                  Financial check-in
                </p>

                <h2
                  className="mt-4 text-3xl leading-tight sm:text-4xl"
                  style={{
                    fontFamily: efcBrand.fontStacks.display,
                    fontWeight: 400,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {currentQuestion.text}
                </h2>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => handleAnswerSelect(1)}
                    className="rounded-[1.5rem] border px-6 py-8 text-left transition"
                    style={{
                      borderColor:
                        currentAnswer === 1
                          ? efcBrand.colors.moneyGreen
                          : efcBrand.colors.border,
                      backgroundColor:
                        currentAnswer === 1 ? "#edf7f2" : efcBrand.colors.surface,
                    }}
                  >
                    <div
                      className="text-sm uppercase tracking-[0.2em]"
                      style={{
                        color:
                          currentAnswer === 1
                            ? efcBrand.colors.moneyGreen
                            : efcBrand.colors.mutedInk,
                      }}
                    >
                      Answer
                    </div>
                    <div
                      className="mt-3 text-3xl leading-none"
                      style={{ fontFamily: efcBrand.fontStacks.display }}
                    >
                      Yes
                    </div>
                    <p
                      className="mt-3 text-sm leading-7"
                      style={{ color: efcBrand.colors.mutedInk }}
                    >
                      This is true for me most of the time.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAnswerSelect(0)}
                    className="rounded-[1.5rem] border px-6 py-8 text-left transition"
                    style={{
                      borderColor:
                        currentAnswer === 0
                          ? efcBrand.colors.orange
                          : efcBrand.colors.border,
                      backgroundColor:
                        currentAnswer === 0 ? "#fff1ed" : efcBrand.colors.surface,
                    }}
                  >
                    <div
                      className="text-sm uppercase tracking-[0.2em]"
                      style={{
                        color:
                          currentAnswer === 0
                            ? efcBrand.colors.orange
                            : efcBrand.colors.mutedInk,
                      }}
                    >
                      Answer
                    </div>
                    <div
                      className="mt-3 text-3xl leading-none"
                      style={{ fontFamily: efcBrand.fontStacks.display }}
                    >
                      No
                    </div>
                    <p
                      className="mt-3 text-sm leading-7"
                      style={{ color: efcBrand.colors.mutedInk }}
                    >
                      This is not in place for me right now.
                    </p>
                  </button>
                </div>

                {submitError ? (
                  <p className="mt-6 text-sm" style={{ color: efcBrand.colors.orange }}>
                    {submitError}
                  </p>
                ) : null}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
                              <button
                                type="button"
                                onClick={handleBack}
                                disabled={!canGoBack || isSubmitting}
                                className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed"
                                style={{
                                  borderColor: "#ff7755",
                                  color: "#fff",
                                  backgroundColor: "#ff7755",
                                  opacity: 1,
                                }}
                  >
                    Back
                  </button>

                              <button
                                type="button"
                                onClick={handleNext}
                                disabled={!canGoNext || !email.trim() || !consent || isSubmitting}
                                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white border transition disabled:cursor-not-allowed"
                                style={{
                                  backgroundColor: "#ff7755",
                                  borderColor: "#ff7755",
                                  color: "#fff",
                                  opacity: 1,
                                }}
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : isLastQuestion
                        ? "See My Results"
                        : "Next Question"}
                  </button>
                </div>
              </article>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}