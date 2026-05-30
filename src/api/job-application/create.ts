import type { ApiResult } from "@/api/types";
import type { JobApplication } from "@/model/job-application";
import { requestApi } from "@/api/_shared/request-api";

export type CreateJobApplicationBody = Pick<
  JobApplication,
  "jobId" | "submittedAt" | "imageGraphicId" | "notes"
>;

/**
 * POST /api/data/job-application/create
 */
export const createJobApplicationApi = async (
  body: CreateJobApplicationBody,
): Promise<ApiResult<JobApplication>> => {
  return requestApi<JobApplication>("/api/data/job-application/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
