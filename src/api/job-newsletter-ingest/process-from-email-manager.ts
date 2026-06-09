import { requestApi } from "@/api/_shared/request-api";
import type { JobNewsletterIngestResult } from "@/model/job-newsletter-ingest-result";

/**
 * POST /api/job-newsletter-ingest/process-from-email-manager
 * Pull unprocessed emails from email-manager, AI-parse, create CRM jobs.
 */
export const processJobNewsletterFromEmailManagerApi = async () =>
  requestApi<JobNewsletterIngestResult>(
    "/api/job-newsletter-ingest/process-from-email-manager",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    },
  );
