import type { ApiResult } from "@/api/types";
import type { JobApplication } from "@/model/job-application";
import { requestApi } from "@/api/_shared/request-api";

export type UpdateJobApplicationBody = { id: string } & Partial<
  Pick<JobApplication, "jobId" | "submittedAt" | "imageGraphicId" | "notes">
>;

/**
 * PATCH /api/data/job-application/update
 */
export const updateJobApplicationApi = async (
  body: UpdateJobApplicationBody,
): Promise<ApiResult<JobApplication>> => {
  return requestApi<JobApplication>("/api/data/job-application/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
