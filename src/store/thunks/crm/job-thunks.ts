import { createJobFromListingUrlApi } from "@/api/job/create-from-listing-url";
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
