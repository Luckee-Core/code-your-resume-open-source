import { createJobApplicationApi } from "@/api/job-application/create";
import { deleteJobApplicationApi } from "@/api/job-application/delete";
import { getJobApplicationApi } from "@/api/job-application/get";
import { listJobApplicationsApi } from "@/api/job-application/list";
import { updateJobApplicationApi } from "@/api/job-application/update";
import type { AppThunk } from "@/store";
import { CurrentJobApplicationActions } from "@/store/current/currentJobApplication";
import { JobApplicationsActions } from "@/store/dumps/jobApplications";

type Status = Promise<200 | 400 | 500>;

/**
 * Fetches a job application by id and sets `currentJobApplication`.
 */
export const openJobApplicationThunk = (id: string): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await getJobApplicationApi(id);
    if (!result.success || !result.data) {
      return 400;
    }
    dispatch(JobApplicationsActions.upsertJobApplication(result.data));
    dispatch(CurrentJobApplicationActions.setCurrentJobApplication(result.data));
    return 200;
  };
};

/**
 * Creates a job application row.
 */
export const createJobApplicationThunk = (input: {
  jobId: string;
  submittedAt: string;
  imageGraphicId: string;
  notes: string;
}): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await createJobApplicationApi(input);
    if (!result.success || !result.data) {
      return 400;
    }
    dispatch(JobApplicationsActions.upsertJobApplication(result.data));
    dispatch(CurrentJobApplicationActions.setCurrentJobApplication(result.data));
    return 200;
  };
};

/**
 * Updates a job application row.
 */
export const updateJobApplicationThunk = (input: {
  id: string;
  jobId?: string;
  submittedAt?: string;
  imageGraphicId?: string;
  notes?: string;
}): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const result = await updateJobApplicationApi(input);
    if (!result.success || !result.data) {
      return 400;
    }
    dispatch(JobApplicationsActions.upsertJobApplication(result.data));
    const cur = getState().currentJobApplication;
    if (cur.id === result.data.id) {
      dispatch(CurrentJobApplicationActions.setCurrentJobApplication(result.data));
    }
    return 200;
  };
};

/**
 * Deletes a job application by id.
 */
export const deleteJobApplicationThunk = (id: string): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const result = await deleteJobApplicationApi(id);
    if (!result.success) {
      return 400;
    }
    dispatch(JobApplicationsActions.removeJobApplication(id));
    if (getState().currentJobApplication.id === id) {
      dispatch(CurrentJobApplicationActions.resetCurrentJobApplication());
    }
    return 200;
  };
};

/**
 * Reloads job applications from the server.
 */
export const refreshJobApplicationsThunk = (): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await listJobApplicationsApi();
    if (!result.success || !result.data) {
      return 400;
    }
    dispatch(JobApplicationsActions.upsertJobApplications(result.data));
    return 200;
  };
};
