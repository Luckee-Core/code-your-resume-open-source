import type { ApiResult } from "@/api/types";
import type { Project } from "@/model/project";
import { requestApi } from "@/api/_shared/request-api";

/**
 * POST /api/data/project/website-research — crawl project URL and store websiteResearchSummary.
 */
export const postProjectWebsiteResearch = async (
  projectId: string,
): Promise<ApiResult<Project>> => {
  return requestApi<Project>("/api/data/project/website-research", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: projectId }),
  });
};
