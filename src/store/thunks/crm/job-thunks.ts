import { createJobFromListingUrlApi } from "@/api/job/create-from-listing-url";
import { importJobDescriptionApi } from "@/api/job/import-description";
import { createJobApi } from "@/api/job/create";
import { deleteJobApi } from "@/api/job/delete";
import { getJobApi } from "@/api/job/get";
import { importJobListingApi } from "@/api/job/import-listing";
import { listJobsApi } from "@/api/job/list";
import { updateJobApi } from "@/api/job/update";
import type { JobStatus, JobType } from "@/model/job";
import type { AppThunk } from "@/store";
import { CurrentJobActions } from "@/store/current/currentJob";
import { JobsActions } from "@/store/dumps/jobs";
import { loadJobBulletsThunk } from "./load-job-bullets-thunk";
import {
  normalizeJobListingUrlInput,
  validateNormalizedJobListingUrlForSubmit,
} from "@/utils/job-listing";

type Status = Promise<200 | 400 | 500>;

export type CreateJobFromListingUrlResult =
  | { outcome: "created_and_imported"; jobId: string }
  | { outcome: "import_failed"; jobId: string; error?: string }
  | { outcome: "create_failed" }
  | { outcome: "invalid_input" };

export type AddCompanyJobResult =
  | { outcome: "created"; jobId: string }
  | { outcome: "created_and_imported"; jobId: string }
  | { outcome: "import_failed"; jobId: string; error?: string }
  | { outcome: "create_failed" }
  | { outcome: "invalid_input"; reason: "empty" | "invalid_url" };

/**
 * Creates a draft job from a posting URL via **one** Express call that runs the full
 * `services/job` pipeline: vault write + `runJobListingImport` (scrape + Anthropic).
 */
export const createJobFromListingUrlThunk = (input: {
  companyId: string;
  urlRaw: string;
}): AppThunk<Promise<CreateJobFromListingUrlResult>> => {
  return async (dispatch): Promise<CreateJobFromListingUrlResult> => {
    const url = normalizeJobListingUrlInput(input.urlRaw);
    if (!url || !validateNormalizedJobListingUrlForSubmit(url)) {
      return { outcome: "invalid_input" };
    }
    console.log("[CRM] createJobFromListingUrl: POST job/create-from-listing-url (vault + scrape-job-listing)", {
      companyId: input.companyId,
      url: url.slice(0, 120),
    });
    const result = await createJobFromListingUrlApi({
      companyId: input.companyId,
      url,
    });
    if (result.success && result.data) {
      dispatch(JobsActions.upsertJob(result.data));
      dispatch(CurrentJobActions.setCurrentJob(result.data));
      console.log("[CRM] createJobFromListingUrl: done", { jobId: result.data.id });
      return { outcome: "created_and_imported", jobId: result.data.id };
    }
    if (result.data && !result.success) {
      dispatch(JobsActions.upsertJob(result.data));
      dispatch(CurrentJobActions.setCurrentJob(result.data));
      console.warn("[CRM] createJobFromListingUrl: import failed after job row created", {
        jobId: result.data.id,
        httpStatus: result.httpStatus,
        error: result.error,
      });
      return {
        outcome: "import_failed",
        jobId: result.data.id,
        error: result.error,
      };
    }
    console.warn("[CRM] createJobFromListingUrl: failed", result);
    return { outcome: "create_failed" };
  };
};

/**
 * Adds a job on the company detail page: title and/or posting URL (at least one required).
 * URL-only uses {@link createJobFromListingUrlThunk}; title (+ optional URL) uses `POST /api/data/job/create`.
 */
export const addCompanyJobThunk = (input: {
  companyId: string;
  titleRaw: string;
  urlRaw: string;
}): AppThunk<Promise<AddCompanyJobResult>> => {
  return async (dispatch): Promise<AddCompanyJobResult> => {
    const title = input.titleRaw.trim();
    const url = normalizeJobListingUrlInput(input.urlRaw);
    const hasTitle = title.length > 0;
    const hasUrl = url.length > 0;

    if (!hasTitle && !hasUrl) {
      return { outcome: "invalid_input", reason: "empty" };
    }
    if (hasUrl && !validateNormalizedJobListingUrlForSubmit(url)) {
      return { outcome: "invalid_input", reason: "invalid_url" };
    }

    if (!hasTitle && hasUrl) {
      const listingResult = await dispatch(
        createJobFromListingUrlThunk({ companyId: input.companyId, urlRaw: url }),
      );
      if (listingResult.outcome === "created_and_imported") {
        return { outcome: "created_and_imported", jobId: listingResult.jobId };
      }
      if (listingResult.outcome === "import_failed") {
        return {
          outcome: "import_failed",
          jobId: listingResult.jobId,
          error: listingResult.error,
        };
      }
      if (listingResult.outcome === "invalid_input") {
        return { outcome: "invalid_input", reason: "invalid_url" };
      }
      return { outcome: "create_failed" };
    }

    const result = await createJobApi({
      companyId: input.companyId,
      type: "job",
      title,
      url: hasUrl ? url : "",
      status: "draft",
    });

    if (result.success && result.data) {
      dispatch(JobsActions.upsertJob(result.data));
      dispatch(CurrentJobActions.setCurrentJob(result.data));
      if (hasUrl) {
        return { outcome: "created_and_imported", jobId: result.data.id };
      }
      return { outcome: "created", jobId: result.data.id };
    }

    if (result.data && !result.success) {
      dispatch(JobsActions.upsertJob(result.data));
      dispatch(CurrentJobActions.setCurrentJob(result.data));
      return {
        outcome: "import_failed",
        jobId: result.data.id,
        error: result.error,
      };
    }

    return { outcome: "create_failed" };
  };
};

/**
 * Fetches a job by id and sets `currentJob`.
 */
export const openJobThunk = (id: string): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await getJobApi(id);
    if (!result.success || !result.data) {
      return 400;
    }
    dispatch(JobsActions.upsertJob(result.data));
    dispatch(CurrentJobActions.setCurrentJob(result.data));
    return 200;
  };
};

/**
 * Creates a job row.
 */
export const createJobThunk = (input: {
  companyId: string;
  type?: JobType;
  title: string;
  url: string;
  status: JobStatus;
}): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await createJobApi({ ...input, type: input.type ?? "job" });
    if (!result.success || !result.data) {
      return 400;
    }
    dispatch(JobsActions.upsertJob(result.data));
    dispatch(CurrentJobActions.setCurrentJob(result.data));
    return 200;
  };
};

/**
 * Updates a job row.
 */
export const updateJobThunk = (input: {
  id: string;
  companyId?: string;
  type?: JobType;
  title?: string;
  url?: string;
  status?: JobStatus;
  description?: string;
  listingImportedAt?: string;
  latestScrapeRunId?: string;
  latestAiExchangeId?: string;
}): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const result = await updateJobApi(input);
    if (!result.success || !result.data) {
      return 400;
    }
    dispatch(JobsActions.upsertJob(result.data));
    const cur = getState().currentJob;
    if (cur.id === result.data.id) {
      dispatch(CurrentJobActions.setCurrentJob(result.data));
    }
    return 200;
  };
};

/**
 * Extracts responsibilities, requirements, and nice-to-haves from pasted description text.
 * Refreshes job snapshot and bullet rows when successful.
 */
export const importJobDescriptionThunk = (input: {
  jobId: string;
  descriptionText: string;
}): AppThunk<Status> => {
  return async (dispatch): Status => {
    const jobId = input.jobId.trim();
    if (!jobId) {
      return 400;
    }
    const result = await importJobDescriptionApi({
      id: jobId,
      description: input.descriptionText,
    });
    if (!result.success || !result.data) {
      return result.httpStatus >= 500 ? 500 : 400;
    }
    dispatch(JobsActions.upsertJob(result.data));
    dispatch(CurrentJobActions.setCurrentJob(result.data));
    await dispatch(loadJobBulletsThunk(jobId));
    return 200;
  };
};

/**
 * Imports the current job's posting URL (server fetch + optional LLM). Refreshes `jobs` and `currentJob` when ids match.
 */
export const importJobListingThunk = (id?: string): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const jobId = (id?.trim() || getState().currentJob.id).trim();
    if (!jobId) {
      return 400;
    }
    const result = await importJobListingApi(jobId);
    if (!result.success || !result.data) {
      return result.httpStatus >= 500 ? 500 : 400;
    }
    dispatch(JobsActions.upsertJob(result.data));
    const cur = getState().currentJob;
    if (cur.id === result.data.id) {
      dispatch(CurrentJobActions.setCurrentJob(result.data));
    }
    return 200;
  };
};

/**
 * Deletes a job by id.
 */
export const deleteJobThunk = (id: string): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const result = await deleteJobApi(id);
    if (!result.success) {
      return 400;
    }
    dispatch(JobsActions.removeJob(id));
    if (getState().currentJob.id === id) {
      dispatch(CurrentJobActions.resetCurrentJob());
    }
    return 200;
  };
};

/**
 * Reloads jobs from the server.
 */
export const refreshJobsThunk = (): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await listJobsApi();
    if (!result.success || !result.data) {
      return 400;
    }
    dispatch(JobsActions.upsertJobs(result.data));
    return 200;
  };
};
