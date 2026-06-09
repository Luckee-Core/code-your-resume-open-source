import type { ApiResult } from "@/api/types";
import type { AiExchangeCostsPayload } from "@/model/ai-exchange-cost";
import { requestApi } from "@/api/_shared/request-api";
import { mapExchangeRegistryPayload } from "./map-exchange-registry-payload";

export type ListExchangeRegistryInput = {
  limit?: number;
  sourceId?: string;
  jobId?: string;
};

/**
 * GET /api/data/exchange-registry/list
 */
export const listExchangeRegistryApi = async (
  input: ListExchangeRegistryInput = {},
): Promise<ApiResult<AiExchangeCostsPayload>> => {
  const params = new URLSearchParams();
  if (input.limit != null) params.set("limit", String(input.limit));
  if (input.sourceId?.trim()) params.set("sourceId", input.sourceId.trim());
  if (input.jobId?.trim()) params.set("jobId", input.jobId.trim());

  const qs = params.toString();
  const path = qs ? `/api/data/exchange-registry/list?${qs}` : "/api/data/exchange-registry/list";

  const result = await requestApi<Parameters<typeof mapExchangeRegistryPayload>[0]>(path);
  if (!result.success || !result.data) {
    return { ...result, data: undefined };
  }
  return { ...result, data: mapExchangeRegistryPayload(result.data) };
};
