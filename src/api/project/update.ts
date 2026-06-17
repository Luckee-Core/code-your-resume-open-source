import type { ApiResult } from "@/api/types";
import type { Project } from "@/model/project";
import { requestApi } from "@/api/_shared/request-api";
import { mapProject } from "./map-project";

type ApiRow = Parameters<typeof mapProject>[0];

export type UpdateProjectBody = {
  id: string;
  businessName?: string;
  description?: string;
  url?: string;
  duration?: string;
  technologies?: string[];
};

/**
 * PATCH /api/data/project/update
 */
export const updateProjectApi = async (body: UpdateProjectBody): Promise<ApiResult<Project>> => {
  const result = await requestApi<ApiRow>("/api/data/project/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!result.success || !result.data) {
    return { ...result, data: undefined };
  }
  return { ...result, data: mapProject(result.data) };
};
