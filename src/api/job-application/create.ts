import type { ApiResponse } from "@/api/types";
import type { JobApplication } from "@/model/job-application";
import { parseApiJson } from "@/api/parse-api-json";

export type CreateJobApplicationBody = Pick<
  JobApplication,
  "jobId" | "submittedAt" | "imageGraphicId" | "notes"
>;

/**
 * POST /api/data/job-application/create
 */
export const createJobApplicationApi = async (
  body: CreateJobApplicationBody,
): Promise<ApiResponse<JobApplication>> => {
  const res = await fetch("/api/data/job-application/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseApiJson<JobApplication>(res);
};
