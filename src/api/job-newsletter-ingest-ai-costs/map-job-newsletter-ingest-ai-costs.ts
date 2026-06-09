import type {
  JobNewsletterIngestAiCost,
  JobNewsletterIngestAiCostsSummary,
} from "@/model/job-newsletter-ingest-ai-cost";

type ApiRow = {
  exchangeId: string;
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

type ApiSummary = {
  count: number;
  totalEstimatedCostUsd: number;
};

export type JobNewsletterIngestAiCostRow = Omit<JobNewsletterIngestAiCost, "sourceId">;

export type JobNewsletterIngestAiCostsPayload = {
  rows: JobNewsletterIngestAiCostRow[];
  summary: JobNewsletterIngestAiCostsSummary;
};

/**
 * Map Express AI costs list payload to frontend models.
 */
export const mapJobNewsletterIngestAiCostsPayload = (data: {
  rows: ApiRow[];
  summary: ApiSummary;
}): JobNewsletterIngestAiCostsPayload => ({
  rows: data.rows.map((row) => ({
    exchangeId: row.exchangeId,
    status: row.status,
    modelUsed: row.modelUsed,
    inputTokens: row.inputTokens,
    outputTokens: row.outputTokens,
    estimatedCostUsd: row.estimatedCostUsd,
    occurredAt: row.occurredAt,
    contextLabel: row.contextLabel,
    gmailMessageId: row.gmailMessageId,
    errorMessage: row.errorMessage,
  })),
  summary: {
    count: data.summary.count,
    totalEstimatedCostUsd: data.summary.totalEstimatedCostUsd,
  },
});
