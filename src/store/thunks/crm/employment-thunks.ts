import {
  createEmploymentApi,
  deleteEmploymentApi,
  listEmploymentsApi,
  updateEmploymentApi,
} from "@/api/employment";
import type { AppThunk } from "@/store";
import { ExperienceBuilderActions } from "@/store/builders/experienceBuilder";
import { EmploymentsActions } from "@/store/dumps/employments";

type Status = Promise<200 | 400 | 500>;

/**
 * Reloads employment rows from the CRM vault.
 */
export const refreshEmploymentsThunk = (): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await listEmploymentsApi();
    if (!result.success || !result.data) {
      return 400;
    }
    dispatch(EmploymentsActions.upsertEmployments(result.data));
    return 200;
  };
};

/**
 * Creates an employment row (company + job must exist; job.companyId must match).
 */
export const createEmploymentThunk = (input: {
  companyId: string;
  jobId: string;
  startDate: string;
  endDate: string;
}): AppThunk<Status> => {
  return async (dispatch): Status => {
    dispatch(ExperienceBuilderActions.setSavingEmployment(true));
    try {
      const result = await createEmploymentApi({
        companyId: input.companyId,
        jobId: input.jobId,
        startDate: input.startDate,
        endDate: input.endDate,
      });
      if (!result.success || !result.data) {
        return 400;
      }
      dispatch(EmploymentsActions.upsertEmployment(result.data));
      return 200;
    } finally {
      dispatch(ExperienceBuilderActions.setSavingEmployment(false));
    }
  };
};

/**
 * Updates an employment row.
 */
export const updateEmploymentThunk = (input: {
  id: string;
  companyId?: string;
  jobId?: string;
  startDate?: string;
  endDate?: string;
}): AppThunk<Status> => {
  return async (dispatch): Status => {
    dispatch(ExperienceBuilderActions.setSavingEmployment(true));
    try {
      const result = await updateEmploymentApi(input);
      if (!result.success || !result.data) {
        return 400;
      }
      dispatch(EmploymentsActions.upsertEmployment(result.data));
      return 200;
    } finally {
      dispatch(ExperienceBuilderActions.setSavingEmployment(false));
    }
  };
};

/**
 * Deletes an employment row by id.
 */
export const deleteEmploymentThunk = (id: string): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await deleteEmploymentApi(id);
    if (!result.success) {
      return 400;
    }
    dispatch(EmploymentsActions.removeEmployment(id));
    return 200;
  };
};
