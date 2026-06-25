import { runQuickApplyPipelineApi } from "@/api/quick-apply";
import type { AppThunk } from "@/store";
import { QuickApplyBuilderActions } from "@/store/builders/quickApplyBuilder";
import { CompaniesActions } from "@/store/dumps/companies";
import { JobsActions } from "@/store/dumps/jobs";
import { CurrentCompanyActions } from "@/store/current/currentCompany";
import { CurrentJobActions } from "@/store/current/currentJob";
import { loadJobBulletsThunk } from "@/store/thunks/crm/load-job-bullets-thunk";
import { loadJobListingSectionCountsThunk } from "@/store/thunks/crm/load-job-listing-section-counts-thunk";
import { loadImageGraphicsThunk } from "@/store/thunks/image-creation-studio/load-image-graphics-thunk";

export type RunQuickApplyPipelineThunkInput = {
  companyWebsiteUrl: string;
  jobListingUrl: string;
};

export type RunQuickApplyPipelineThunkResult =
  | { status: 200; data: import("@/api/quick-apply").QuickApplyResult }
  | { status: 400 | 422 | 500; error?: string; data?: import("@/api/quick-apply").QuickApplyResult };

/**
 * Runs the quick-apply pipeline on Express: company resolve/scrape, job scrape, resume queue.
 */
export const runQuickApplyPipelineThunk =
  (input: RunQuickApplyPipelineThunkInput): AppThunk<Promise<RunQuickApplyPipelineThunkResult>> =>
  async (dispatch) => {
    const companyWebsiteUrl = input.companyWebsiteUrl.trim();
    const jobListingUrl = input.jobListingUrl.trim();

    if (!companyWebsiteUrl || !jobListingUrl) {
      return { status: 400, error: "Company website and job listing URLs are required" };
    }

    dispatch(QuickApplyBuilderActions.setPhase("running"));
    dispatch(QuickApplyBuilderActions.setLastError(null));
    dispatch(QuickApplyBuilderActions.setLastResult(null));

    try {
      const result = await runQuickApplyPipelineApi({ companyWebsiteUrl, jobListingUrl });

      if (result.httpStatus === 400) {
        dispatch(QuickApplyBuilderActions.setPhase("error"));
        dispatch(QuickApplyBuilderActions.setLastError(result.error ?? "Invalid URLs"));
        return { status: 400, error: result.error };
      }

      if (result.httpStatus === 422) {
        const partial = result.data;
        if (partial?.company) {
          dispatch(CompaniesActions.upsertCompany(partial.company));
        }
        if (partial?.job) {
          dispatch(JobsActions.upsertJob(partial.job));
          dispatch(CurrentJobActions.setCurrentJob(partial.job));
        }
        dispatch(QuickApplyBuilderActions.setLastResult(partial ?? null));
        dispatch(QuickApplyBuilderActions.setPhase("error"));
        dispatch(QuickApplyBuilderActions.setLastError(result.error ?? "Job scrape failed"));
        return { status: 422, error: result.error, data: partial };
      }

      if (!result.success || !result.data) {
        dispatch(QuickApplyBuilderActions.setPhase("error"));
        dispatch(QuickApplyBuilderActions.setLastError(result.error ?? "Quick apply failed"));
        return { status: 500, error: result.error };
      }

      const data = result.data;

      if (data.company) {
        dispatch(CompaniesActions.upsertCompany(data.company));
        dispatch(CurrentCompanyActions.setCurrentCompany(data.company));
      }

      if (data.job) {
        dispatch(JobsActions.upsertJob(data.job));
        dispatch(CurrentJobActions.setCurrentJob(data.job));
        await dispatch(loadJobBulletsThunk(data.job.id));
      }

      await dispatch(loadJobListingSectionCountsThunk());
      void dispatch(loadImageGraphicsThunk());

      dispatch(QuickApplyBuilderActions.setLastResult(data));
      dispatch(QuickApplyBuilderActions.setPhase("done"));
      return { status: 200, data };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Quick apply failed";
      dispatch(QuickApplyBuilderActions.setPhase("error"));
      dispatch(QuickApplyBuilderActions.setLastError(message));
      return { status: 500, error: message };
    }
  };
