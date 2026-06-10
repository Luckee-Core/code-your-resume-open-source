import { JOB_STATUSES, type Job, type JobStatus } from "@/model/job";

/** Selected job statuses shown in the jobs list. */
export type JobsListStatusFilters = JobStatus[];

/** Default jobs list filter: every status except archived. */
export const DEFAULT_JOBS_LIST_STATUS_FILTERS: JobsListStatusFilters = JOB_STATUSES.filter(
  (status) => status !== "archived",
);

export const JOBS_LIST_STATUS_FILTER_OPTIONS: Array<{
  value: JobStatus;
  label: string;
}> = JOB_STATUSES.map((status) => ({
  value: status,
  label: status.charAt(0).toUpperCase() + status.slice(1),
}));

/**
 * Keep filter values in canonical job status order.
 */
export const normalizeJobsListStatusFilters = (
  filters: JobsListStatusFilters,
): JobsListStatusFilters =>
  JOB_STATUSES.filter((status) => filters.includes(status));

/**
 * Whether a job row matches the jobs list status filter.
 */
export const jobMatchesJobsListStatusFilter = (
  job: Job,
  filters: JobsListStatusFilters,
): boolean => filters.includes(job.status);
