import { listCompaniesApi } from "@/api/company";
import { listJobsApi } from "@/api/job";
import type { AppThunk } from "@/store";
import { CrmBuilderActions } from "@/store/builders/crmBuilder";
import { CompaniesActions } from "@/store/dumps/companies";
import { JobsActions } from "@/store/dumps/jobs";

type Status = Promise<200 | 400 | 500>;

/**
 * Loads CRM companies and jobs from Express into Redux dumps.
 * Job bullet rows (responsibilities, requirements, niceToHaves) are loaded
 * per-job on demand via loadJobBulletsThunk — not here.
 */
export const loadCrmVaultThunk = (): AppThunk<Status> => {
  return async (dispatch): Status => {
    dispatch(CrmBuilderActions.setListLoadStatus("loading"));
    dispatch(CrmBuilderActions.setListError(null));

    const [c, j] = await Promise.all([listCompaniesApi(), listJobsApi()]);

    if (!c.success || !c.data) {
      dispatch(CrmBuilderActions.setListLoadStatus("error"));
      dispatch(CrmBuilderActions.setListError(c.error ?? "Failed to load companies"));
      return 500;
    }
    if (!j.success || !j.data) {
      dispatch(CrmBuilderActions.setListLoadStatus("error"));
      dispatch(CrmBuilderActions.setListError(j.error ?? "Failed to load jobs"));
      return 500;
    }

    dispatch(CompaniesActions.upsertCompanies(c.data));
    dispatch(JobsActions.upsertJobs(j.data));
    dispatch(CrmBuilderActions.setListLoadStatus("idle"));
    return 200;
  };
};
