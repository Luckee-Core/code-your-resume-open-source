import type { Job } from "@/model/job";
import { getJobPostingHref } from "./get-job-posting-href";

const getUpdatedAtMs = (job: Job): number =>
  job.updatedAt ? new Date(job.updatedAt).getTime() : 0;

/**
 * Draft jobs that have a posting URL, newest first (matches default jobs table sort).
 */
export const selectDraftJobsWithPostingUrl = (jobs: Job[]): Job[] =>
  jobs
    .filter((job) => job.status === "draft" && getJobPostingHref(job.url).length > 0)
    .sort((a, b) => getUpdatedAtMs(b) - getUpdatedAtMs(a));
