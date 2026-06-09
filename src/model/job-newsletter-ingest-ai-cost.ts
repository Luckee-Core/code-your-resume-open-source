export type JobNewsletterIngestAiCost = {
  exchangeId: string;
  sourceId: string;
  status: string;
  modelUsed: string | null;
  inputTokens: number | null;
  outputTokens: number | null;
  estimatedCostUsd: number;
  occurredAt: string;
  contextLabel: string;
  gmailMessageId: string;
  errorMessage: string | null;
};

export type JobNewsletterIngestAiCostsSummary = {
  count: number;
  totalEstimatedCostUsd: number;
};
