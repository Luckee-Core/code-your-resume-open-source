import type { JobNewsletterIngestRun } from "@/model/job-newsletter-ingest-run";

type ApiRow = {
  id: string;
  source_id: string;
  status: JobNewsletterIngestRun["status"];
  emails_processed: number;
  listings_found: number;
  jobs_created: number;
  jobs_skipped: number;
  companies_created: number;
  error_message: string | null;
  started_at: string;
  completed_at: string | null;
  created_at: string;
};

/**
 * Map Express/Supabase row to frontend camelCase model.
 */
export const mapJobNewsletterIngestRun = (row: ApiRow): JobNewsletterIngestRun => ({
  id: row.id,
  sourceId: row.source_id,
  status: row.status,
  emailsProcessed: row.emails_processed,
  listingsFound: row.listings_found,
  jobsCreated: row.jobs_created,
  jobsSkipped: row.jobs_skipped,
  companiesCreated: row.companies_created,
  errorMessage: row.error_message,
  startedAt: row.started_at,
  completedAt: row.completed_at,
  createdAt: row.created_at,
});
