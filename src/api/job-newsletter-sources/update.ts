import type { ApiResult } from "@/api/types";
import type { JobNewsletterSource } from "@/model/job-newsletter-source";
import { requestApi } from "@/api/_shared/request-api";
import { mapJobNewsletterSource } from "./map-job-newsletter-source";

type ApiRow = Parameters<typeof mapJobNewsletterSource>[0];

export type UpdateJobNewsletterSourceBody = {
  id: string;
  name?: string;
  senderEmail?: string;
  enabled?: boolean;
  parseInstructions?: string;
};

/**
 * PATCH /api/data/job-newsletter-sources/update
 */
export const updateJobNewsletterSourceApi = async (
  body: UpdateJobNewsletterSourceBody,
): Promise<ApiResult<JobNewsletterSource>> => {
  const payload: Record<string, unknown> = { id: body.id };
  if (body.name !== undefined) payload.name = body.name;
  if (body.senderEmail !== undefined) payload.sender_email = body.senderEmail;
  if (body.enabled !== undefined) payload.enabled = body.enabled;
  if (body.parseInstructions !== undefined) payload.parse_instructions = body.parseInstructions;

  const result = await requestApi<ApiRow>("/api/data/job-newsletter-sources/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!result.success || !result.data) {
    return { ...result, data: undefined };
  }
  return { ...result, data: mapJobNewsletterSource(result.data) };
};
