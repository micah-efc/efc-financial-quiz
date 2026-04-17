import { FinancialQuickAssessmentResults } from "@/components/financial-quick-assessment-results";
import { getResultFromScore } from "@/lib/financial-quick-assessment";

type ResultsPageProps = {
  searchParams?: Promise<{
    score?: string;
  }>;
};

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = (await searchParams) ?? {};
  const rawScore = Number(params.score ?? "0");
  const result = getResultFromScore(Number.isFinite(rawScore) ? rawScore : 0);

  return <FinancialQuickAssessmentResults result={result} />;
}
