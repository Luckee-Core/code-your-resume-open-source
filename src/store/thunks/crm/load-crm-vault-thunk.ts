import { listEmploymentsApi } from "@/api/employment";
import { listCompaniesApi } from "@/api/company";
import { listEmployeesApi } from "@/api/employee";
import { listJobApplicationsApi } from "@/api/job-application";
import { listJobsApi } from "@/api/job";
import type { AppThunk } from "@/store";
import { CrmBuilderActions } from "@/store/builders/crmBuilder";
import { CompaniesActions } from "@/store/dumps/companies";
import { EmployeesActions } from "@/store/dumps/employees";
import { JobApplicationsActions } from "@/store/dumps/jobApplications";
import { JobsActions } from "@/store/dumps/jobs";
import { EmploymentsActions } from "@/store/dumps/employments";

type Status = Promise<200 | 400 | 500>;

/**
 * Loads all CRM collections from the local JSON vault into Redux dumps.
 * Job bullet rows (responsibilities, requirements, niceToHaves) are loaded
 * per-job on demand via loadJobBulletsThunk — not here.
 */
export const loadCrmVaultThunk = (): AppThunk<Status> => {
  return async (dispatch): Status => {
    dispatch(CrmBuilderActions.setListLoadStatus("loading"));
    dispatch(CrmBuilderActions.setListError(null));

    const [c, e, j, a, emp] = await Promise.all([
      listCompaniesApi(),
      listEmployeesApi(),
      listJobsApi(),
      listJobApplicationsApi(),
      listEmploymentsApi(),
    ]);

    if (!c.success || !c.data) {
      dispatch(CrmBuilderActions.setListLoadStatus("error"));
      dispatch(CrmBuilderActions.setListError(c.error ?? "Failed to load companies"));
      return 500;
    }
    if (!e.success || !e.data) {
      dispatch(CrmBuilderActions.setListLoadStatus("error"));
      dispatch(CrmBuilderActions.setListError(e.error ?? "Failed to load employees"));
      return 500;
    }
    if (!j.success || !j.data) {
      dispatch(CrmBuilderActions.setListLoadStatus("error"));
      dispatch(CrmBuilderActions.setListError(j.error ?? "Failed to load jobs"));
      return 500;
    }
    if (!a.success || !a.data) {
      dispatch(CrmBuilderActions.setListLoadStatus("error"));
      dispatch(CrmBuilderActions.setListError(a.error ?? "Failed to load job applications"));
      return 500;
    }
    if (!emp.success || !emp.data) {
      dispatch(CrmBuilderActions.setListLoadStatus("error"));
      dispatch(CrmBuilderActions.setListError(emp.error ?? "Failed to load employments"));
      return 500;
    }

    dispatch(CompaniesActions.upsertCompanies(c.data));
    dispatch(EmployeesActions.upsertEmployees(e.data));
    dispatch(JobsActions.upsertJobs(j.data));
    dispatch(JobApplicationsActions.upsertJobApplications(a.data));
    dispatch(EmploymentsActions.upsertEmployments(emp.data));
    dispatch(CrmBuilderActions.setListLoadStatus("idle"));
    return 200;
  };
};
