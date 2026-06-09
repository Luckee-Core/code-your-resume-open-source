export type AiExchangeCost = {
  exchangeId: string;
  logicalKey: string;
  flowLabel: string;
  status: string;
  modelUsed: string | null;
  inputTokens: number | null;
  outputTokens: number | null;
  estimatedCostUsd: number;
  occurredAt: string;
  contextLabel: string;
  sourceId: string | null;
  jobId: string | null;
};

export type AiExchangeCostsPayload = {
  rows: AiExchangeCost[];
  summary: {
    count: number;
    totalEstimatedCostUsd: number;
  };
};
