import { JOB_STATUSES, type Job, type JobStatus } from "@/model/job";

/** Default jobs list filter: every status except archived. */
export type JobsListStatusFilter = "all_except_archived" | JobStatus;

export const DEFAULT_JOBS_LIST_STATUS_FILTER: JobsListStatusFilter = "all_except_archived";

export const JOBS_LIST_STATUS_FILTER_OPTIONS: Array<{
  value: JobsListStatusFilter;
  label: string;
}> = [
  { value: "all_except_archived", label: "All (excl. archived)" },
  ...JOB_STATUSES.map((status) => ({
    value: status as JobsListStatusFilter,
    label: status.charAt(0).toUpperCase() + status.slice(1),
  })),
];

/**
 * Whether a job row matches the jobs list status filter.
 */
export const jobMatchesJobsListStatusFilter = (
  job: Job,
  filter: JobsListStatusFilter,
): boolean => {
  if (filter === "all_except_archived") {
    return job.status !== "archived";
  }
  return job.status === filter;
};
