import { getJobStudioPayload } from "@/api/job-studio";
import type { AppThunk } from "@/store";
import { JobStudioBuilderActions } from "@/store/builders/jobStudioBuilder";
import { CurrentJobStudioActions } from "@/store/current/currentJobStudio";

type Status = Promise<200 | 400 | 500>;

/**
 * Load Job Studio chat history for the given CRM job from Express/Supabase.
 */
export const loadJobStudioChatThunk = (jobId: string): AppThunk<Status> => {
  return async (dispatch): Status => {
    if (!jobId) return 400;
    dispatch(JobStudioBuilderActions.setLoading());
    try {
      const result = await getJobStudioPayload(jobId);
      if (!result.success || !result.data) {
        dispatch(
          JobStudioBuilderActions.setError(result.error ?? "Failed to load Job Studio chat"),
        );
        dispatch(CurrentJobStudioActions.syncMessages([]));
        return 500;
      }
      dispatch(CurrentJobStudioActions.setLoadedJobId(jobId));
      dispatch(CurrentJobStudioActions.syncMessages(result.data.messages));
      dispatch(JobStudioBuilderActions.setLoaded());
      return 200;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to load Job Studio chat";
      dispatch(JobStudioBuilderActions.setError(msg));
      dispatch(CurrentJobStudioActions.syncMessages([]));
      return 500;
    }
  };
};
