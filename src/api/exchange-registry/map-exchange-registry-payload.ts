import type { AiExchangeCost, AiExchangeCostsPayload } from "@/model/ai-exchange-cost";

type ApiRow = {
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

type ApiPayload = {
  rows: ApiRow[];
  summary: {
    count: number;
    totalEstimatedCostUsd: number;
  };
};

const mapRow = (row: ApiRow): AiExchangeCost => ({
  exchangeId: row.exchangeId,
  logicalKey: row.logicalKey,
  flowLabel: row.flowLabel,
  status: row.status,
  modelUsed: row.modelUsed,
  inputTokens: row.inputTokens,
  outputTokens: row.outputTokens,
  estimatedCostUsd: row.estimatedCostUsd,
  occurredAt: row.occurredAt,
  contextLabel: row.contextLabel,
  sourceId: row.sourceId,
  jobId: row.jobId,
});

/**
 * Map Express exchange-registry list payload to frontend model.
 */
export const mapExchangeRegistryPayload = (payload: ApiPayload): AiExchangeCostsPayload => ({
  rows: payload.rows.map(mapRow),
  summary: payload.summary,
});
