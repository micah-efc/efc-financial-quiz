export type AnswerValue = 0 | 1;

export type QuizQuestion = {
  id: number;
  text: string;
};

export type ResultKey =
  | "strong_steady"
  | "progress_in_motion"
  | "time_for_reset";

export type NextStepLink = {
  label: string;
  href: string;
  description: string;
};

export type ResultRange = {
  min: number;
  max: number;
  key: ResultKey;
  label: string;
  title: string;
  message: string;
  recommendation: string;
  closing: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  nextStepLinks: NextStepLink[];
};

export type QuizResult = {
  score: number;
  totalQuestions: number;
  yesAnswers: number;
  noAnswers: number;
  range: ResultRange;
};

export const financialQuickAssessmentTitle = "Financial Quick Assessment";

export const financialQuickAssessmentIntro =
  "Take this quick assessment to check in with your budget, habits, and next best financial step.";

export const financialQuickAssessmentConfirmationMessage =
  "Thanks for taking the Financial Quick Assessment! Your results are in — and no matter your score, you’ve already taken a powerful first step by checking in with your money.";

export const financialQuickAssessmentClosing =
  "No matter where you’re starting from, Empowering Financial Coaching exists to help you reset, realign, and rise.\n\nMicah & Charles @ Empowering Financial Coaching";

export const financialQuickAssessmentQuestions: QuizQuestion[] = [
  { id: 1, text: "I know how much income I have each month" },
  { id: 2, text: "I know when my bills are due and how much they are" },
  { id: 3, text: "I track where my money goes (even if it’s not perfect)" },
  {
    id: 4,
    text: "I have a plan for seasonal/occasional expenses (like back-to-school, birthdays, holidays)",
  },
  { id: 5, text: "I’m putting at least a little toward savings — even $5 counts!" },
  { id: 6, text: "I feel confident about covering everyday family needs" },
  { id: 7, text: "I know where to cut back if needed" },
  { id: 8, text: "I’m not relying on credit cards just to make it through the month" },
  { id: 9, text: "I talk openly about money with my partner or accountability buddy" },
  { id: 10, text: "I have clear financial goals I’m working toward (short-term or long-term)" },
];

export const financialQuickAssessmentRanges: ResultRange[] = [
  {
    min: 8,
    max: 10,
    key: "strong_steady",
    label: "8–10 YES Answers",
    title: "Strong & Steady",
    message:
      "You’ve built a solid financial foundation! Your habits show awareness, planning, and care.",
    recommendation:
      "If you’re preparing for a life transition or want to fine-tune your plan, we recommend a Budget Planning Review or a quick check-in coaching session to stay ahead.\n\nWant to help someone else grow too? Forward this quiz or invite a friend to take it!",
    closing: financialQuickAssessmentClosing,
    primaryCta: {
      label: "Book a Budget Planning Review",
      href: "https://calendly.com/mr_efc/budget-check-orientation",
    },
    secondaryCta: {
      label: "Schedule a Learn More Session",
      href: "https://calendly.com/mr_efc/learn-more",
    },
    nextStepLinks: [
      {
        label: "Schedule a Planning Review",
        href: "https://calendly.com/mr_efc/budget-check-orientation",
        description: "Fine-tune your current plan and stay ahead of upcoming changes.",
      },
      {
        label: "Register for the Webinar",
        href: "https://empoweringfinancialcoaching.com/workshops/",
        description: "Join the monthly workshop for continued growth and accountability.",
      },
      {
        label: "Explore Coaching Services",
        href: "https://empoweringfinancialcoaching.com/coaching/",
        description: "See which support option fits your current season best.",
      },
    ],
  },
  {
    min: 5,
    max: 7,
    key: "progress_in_motion",
    label: "5–7 YES Answers",
    title: "Progress in Motion",
    message:
      "You’re on your way! You’ve got good habits in place, and with a little extra focus in one or two areas, you can make big strides.",
    recommendation:
      "We suggest scheduling a One-on-One Coaching Session to strengthen your momentum and gain a clear action plan.",
    closing: financialQuickAssessmentClosing,
    primaryCta: {
      label: "Book a Private Coaching Orientation",
      href: "https://calendly.com/mr_efc/coaching_orientation",
    },
    secondaryCta: {
      label: "Schedule a Learn More Session",
      href: "https://calendly.com/mr_efc/learn-more",
    },
    nextStepLinks: [
      {
        label: "Book Coaching",
        href: "https://calendly.com/mr_efc/coaching_orientation",
        description: "Get a focused plan for the habits that need the most attention.",
      },
      {
        label: "Register for the Webinar",
        href: "https://empoweringfinancialcoaching.com/workshops/",
        description: "Build momentum with practical monthly guidance and support.",
      },
      {
        label: "Explore Services",
        href: "https://empoweringfinancialcoaching.com/coaching/",
        description: "See which coaching path fits your current season best.",
      },
    ],
  },
  {
    min: 0,
    max: 4,
    key: "time_for_reset",
    label: "0–4 YES Answers",
    title: "Time for a Reset",
    message:
      "You are not alone — and you are not behind. This score simply means you haven’t had the support or tools you need yet.",
    recommendation:
      "That’s exactly what we’re here for. Our 6-Month Coaching Program was built for this — step-by-step support, no shame, just strategy.",
    closing: financialQuickAssessmentClosing,
    primaryCta: {
      label: "Start the 6-Month Program",
      href: "https://calendly.com/mr_efc/coaching_orientation",
    },
    secondaryCta: {
      label: "Contact Us",
      href: "https://empoweringfinancialcoaching.com/contact/",
    },
    nextStepLinks: [
      {
        label: "Apply for the 6-Month Program",
        href: "https://calendly.com/mr_efc/coaching_orientation",
        description: "Get step-by-step support to reset your financial foundation.",
      },
      {
        label: "Schedule a Meeting",
        href: "https://calendly.com/mr_efc/learn-more",
        description: "Talk through your situation and find the best next step with support.",
      },
      {
        label: "Register for the Webinar",
        href: "https://empoweringfinancialcoaching.com/workshops/",
        description: "Start with a practical, lower-pressure entry point for guidance.",
      },
    ],
  },
];

export function calculateFinancialQuickAssessmentResult(
  answers: Record<number, AnswerValue>,
): QuizResult {
  const totalQuestions = financialQuickAssessmentQuestions.length;

  const yesAnswers = financialQuickAssessmentQuestions.reduce((total, question) => {
    return total + (answers[question.id] === 1 ? 1 : 0);
  }, 0);

  const noAnswers = totalQuestions - yesAnswers;
  const score = yesAnswers;

  const range =
    financialQuickAssessmentRanges.find(
      (item) => score >= item.min && score <= item.max,
    ) ?? financialQuickAssessmentRanges[financialQuickAssessmentRanges.length - 1];

  return {
    score,
    totalQuestions,
    yesAnswers,
    noAnswers,
    range,
  };
}

export function getRangeByScore(score: number): ResultRange {
  const normalizedScore = Math.max(
    0,
    Math.min(financialQuickAssessmentQuestions.length, Math.floor(score)),
  );

  return (
    financialQuickAssessmentRanges.find(
      (item) => normalizedScore >= item.min && normalizedScore <= item.max,
    ) ?? financialQuickAssessmentRanges[financialQuickAssessmentRanges.length - 1]
  );
}

export function getResultFromScore(score: number): QuizResult {
  const totalQuestions = financialQuickAssessmentQuestions.length;
  const normalizedScore = Math.max(0, Math.min(totalQuestions, Math.floor(score)));

  return {
    score: normalizedScore,
    totalQuestions,
    yesAnswers: normalizedScore,
    noAnswers: totalQuestions - normalizedScore,
    range: getRangeByScore(normalizedScore),
  };
}