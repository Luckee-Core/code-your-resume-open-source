import type { ApiResult } from "@/api/types";
import type { Project } from "@/model/project";
import { requestApi } from "@/api/_shared/request-api";
import { mapProject } from "./map-project";

type ApiRow = Parameters<typeof mapProject>[0];

/**
 * GET /api/data/project/get?id=
 */
export const getProjectApi = async (id: string): Promise<ApiResult<Project>> => {
  const result = await requestApi<ApiRow>(`/api/data/project/get?id=${encodeURIComponent(id)}`);
  if (!result.success || !result.data) {
    return { ...result, data: undefined };
  }
  return { ...result, data: mapProject(result.data) };
};
