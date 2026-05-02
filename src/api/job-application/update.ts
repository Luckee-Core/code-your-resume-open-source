import type { ApiResponse } from "@/api/types";
import type { JobApplication } from "@/model/job-application";
import { parseApiJson } from "@/api/parse-api-json";

export type UpdateJobApplicationBody = { id: string } & Partial<
  Pick<JobApplication, "jobId" | "submittedAt" | "imageGraphicId" | "notes">
>;

/**
 * PATCH /api/data/job-application/update
 */
export const updateJobApplicationApi = async (
  body: UpdateJobApplicationBody,
): Promise<ApiResponse<JobApplication>> => {
  const res = await fetch("/api/data/job-application/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return parseApiJson<JobApplication>(res);
};
