import type { ApiResult } from "@/api/types";
import type { JobNewsletterSource } from "@/model/job-newsletter-source";
import { requestApi } from "@/api/_shared/request-api";
import { mapJobNewsletterSource } from "./map-job-newsletter-source";

type ApiRow = Parameters<typeof mapJobNewsletterSource>[0];

export type CreateJobNewsletterSourceBody = {
  name: string;
  senderEmail: string;
  enabled?: boolean;
  parseInstructions: string;
};

/**
 * POST /api/data/job-newsletter-sources/create
 */
export const createJobNewsletterSourceApi = async (
  body: CreateJobNewsletterSourceBody,
): Promise<ApiResult<JobNewsletterSource>> => {
  const result = await requestApi<ApiRow>("/api/data/job-newsletter-sources/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: body.name,
      sender_email: body.senderEmail,
      enabled: body.enabled ?? true,
      parse_instructions: body.parseInstructions,
    }),
  });
  if (!result.success || !result.data) {
    return { ...result, data: undefined };
  }
  return { ...result, data: mapJobNewsletterSource(result.data) };
};
