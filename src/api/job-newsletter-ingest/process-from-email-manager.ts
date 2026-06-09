import { requestApi } from "@/api/_shared/request-api";
import type { JobNewsletterIngestResult } from "@/model/job-newsletter-ingest-result";

export type ProcessJobNewsletterFromEmailManagerInput = {
  syncTaskId?: string;
  /** Runs matching email-manager Gmail sync task(s) before ingest. */
  senderEmail?: string;
};

/**
 * POST /api/job-newsletter-ingest/process-from-email-manager
 * Sync Gmail via email-manager, pull unprocessed emails, AI-parse, create CRM jobs.
 */
export const processJobNewsletterFromEmailManagerApi = async (
  input: ProcessJobNewsletterFromEmailManagerInput = {},
) =>
  requestApi<JobNewsletterIngestResult>(
    "/api/job-newsletter-ingest/process-from-email-manager",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        syncTaskId: input.syncTaskId,
        senderEmail: input.senderEmail,
      }),
    },
  );
