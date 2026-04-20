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
      "If you’re preparing for a life transition or want to fine-tune your plan, we recommend a quick check-in coaching session to stay ahead. Click learn more to schedule a get to know you session.\n\nWant to help someone else grow too? Forward this quiz or invite a friend to take it!",
    closing: financialQuickAssessmentClosing,
    primaryCta: {
      label: "Monthly Webinar",
      href: "https://empoweringfinancialcoaching.com/workshops/",
    },
    secondaryCta: {
      label: "Schedule Session to Learn More",
      href: "https://calendly.com/mr_efc/learn-more",
    },
    nextStepLinks: [
      {
        label: "Coaching",
        href: "https://empoweringfinancialcoaching.com/coaching/",
        description: "Explore one-on-one and group coaching options.",
      },
      {
        label: "Summit",
        href: "https://empoweringfinancialcoaching.com/summit/",
        description: "Join our annual summit for deep-dive learning and community.",
      },
      {
        label: "Webinars",
        href: "https://empoweringfinancialcoaching.com/workshops/",
        description: "Participate in our monthly webinars for hands-on guidance and support.",
      },
      {
        label: "Contact",
        href: "https://empoweringfinancialcoaching.com/contact/",
        description: "Reach out with questions or to get personalized support.",
      },
      {
        label: "Schedule Session to Learn More",
        href: "https://calendly.com/mr_efc/learn-more",
        description: "Book a FREE 30-minute session to discuss your goals and next steps.",
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
      "Join us for a Monthly Webinar\n\nJoin us this month to strengthen your momentum and gain a clear action plan.",
    closing: financialQuickAssessmentClosing,
    primaryCta: {
      label: "Coaching",
      href: "https://empoweringfinancialcoaching.com/coaching/",
    },
    secondaryCta: {
      label: "Schedule Session to Learn More",
      href: "https://calendly.com/mr_efc/learn-more",
    },
    nextStepLinks: [
      {
        label: "Monthly Webinar",
        href: "https://empoweringfinancialcoaching.com/workshops/",
        description: "Participate in our monthly webinars for hands-on guidance and support.",
      },
      {
        label: "Schedule Session to Learn More",
        href: "https://calendly.com/mr_efc/learn-more",
        description: "Book a FREE 30-minute session to discuss your goals and next steps.",
      },
      {
        label: "Coaching",
        href: "https://empoweringfinancialcoaching.com/coaching/",
        description: "Explore one-on-one and group coaching options.",
      },
      {
        label: "Summit",
        href: "https://empoweringfinancialcoaching.com/summit/",
        description: "Join our annual summit for deep-dive learning and community.",
      },
      {
        label: "Contact",
        href: "https://empoweringfinancialcoaching.com/contact/",
        description: "Reach out with questions or to get personalized support.",
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
      label: "Coaching",
      href: "https://empoweringfinancialcoaching.com/coaching/",
    },
    secondaryCta: {
      label: "Contact",
      href: "https://empoweringfinancialcoaching.com/contact/",
    },
    nextStepLinks: [
      {
        label: "Coaching",
        href: "https://empoweringfinancialcoaching.com/coaching/",
        description: "Explore one-on-one and group coaching options.",
      },
      {
        label: "Summit",
        href: "https://empoweringfinancialcoaching.com/summit/",
        description: "Join our annual summit for deep-dive learning and community.",
      },
      {
        label: "Workshops",
        href: "https://empoweringfinancialcoaching.com/workshops/",
        description: "Participate in practical workshops for hands-on guidance.",
      },
      {
        label: "Contact",
        href: "https://empoweringfinancialcoaching.com/contact/",
        description: "Reach out with questions or to get personalized support.",
      },
      {
        label: "Schedule Session to Learn More",
        href: "https://calendly.com/mr_efc/learn-more",
        description: "Book a session to discuss your goals and next steps.",
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