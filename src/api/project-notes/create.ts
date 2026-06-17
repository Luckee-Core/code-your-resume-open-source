import type { ApiResult } from "@/api/types";
import type { ProjectNote } from "@/model/project";
import { requestApi } from "@/api/_shared/request-api";
import { mapProjectNote } from "./map-project-note";

type ApiRow = Parameters<typeof mapProjectNote>[0];

export type CreateProjectNoteBody = {
  projectId: string;
  body: string;
};

/**
 * POST /api/data/project-notes/create
 */
export const createProjectNoteApi = async (
  body: CreateProjectNoteBody,
): Promise<ApiResult<ProjectNote>> => {
  const result = await requestApi<ApiRow>("/api/data/project-notes/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!result.success || !result.data) {
    return { ...result, data: undefined };
  }
  return { ...result, data: mapProjectNote(result.data) };
};
