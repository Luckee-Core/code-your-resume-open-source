export type JobNewsletterIngestRunStatus = "running" | "completed" | "failed";

export type JobNewsletterIngestRun = {
  id: string;
  sourceId: string;
  status: JobNewsletterIngestRunStatus;
  emailsProcessed: number;
  listingsFound: number;
  jobsCreated: number;
  jobsSkipped: number;
  companiesCreated: number;
  errorMessage: string | null;
  startedAt: string;
  completedAt: string | null;
  createdAt: string;
};
