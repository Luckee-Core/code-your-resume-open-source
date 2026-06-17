import type { ApiResult } from "@/api/types";
import type { ProjectNote } from "@/model/project";
import { requestApi } from "@/api/_shared/request-api";
import { mapProjectNote } from "./map-project-note";

type ApiRow = Parameters<typeof mapProjectNote>[0];

/**
 * GET /api/data/project-notes/list?projectId=
 */
export const listProjectNotesApi = async (
  projectId: string,
): Promise<ApiResult<ProjectNote[]>> => {
  const result = await requestApi<ApiRow[]>(
    `/api/data/project-notes/list?projectId=${encodeURIComponent(projectId)}`,
  );
  if (!result.success || !result.data) {
    return { ...result, data: undefined };
  }
  return { ...result, data: result.data.map(mapProjectNote) };
};
