export type JobStatus = "draft" | "applied" | "closed" | "archived";

export type JobType = "job" | "contract";

export type JobBulletRow = {
  id: string;
  jobId: string;
  body: string;
  sortOrder: number;
};

export type Job = {
  id: string;
  companyId: string;
  /** Distinguishes a traditional job posting from a contract engagement. Defaults to "job". */
  type: JobType;
  title: string;
  url: string;
  status: JobStatus;
  description: string;
  listingImportedAt: string;
  latestScrapeRunId: string;
  latestAiExchangeId: string;
  /** AI-extracted bullet list from the job posting. */
  responsibilities: string[];
  /** AI-extracted required qualifications from the job posting. */
  requirements: string[];
  /** AI-extracted preferred / nice-to-have skills from the job posting. */
  niceToHaves: string[];
  createdAt: string;
  updatedAt: string;
};
