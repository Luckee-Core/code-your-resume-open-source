import { postJobStudioMessage } from "@/api/job-studio";
import { LOCAL_USER_ID } from "@/constants/local-user";
import type { AppThunk } from "@/store";
import { JobStudioBuilderActions } from "@/store/builders/jobStudioBuilder";
import { CurrentJobStudioActions } from "@/store/current/currentJobStudio";

type Status = Promise<200 | 400 | 500>;

/**
 * Post a user message to the Job Studio coach for the active job.
 */
export const sendJobStudioMessageThunk =
  (jobId: string, content: string): AppThunk<Status> => {
    return async (dispatch): Status => {
      if (!jobId || !content.trim()) return 400;
      dispatch(JobStudioBuilderActions.setPostingMessage(true));
      try {
        const payload = await postJobStudioMessage({
          jobId,
          userId: LOCAL_USER_ID,
          content: content.trim(),
        });
        dispatch(CurrentJobStudioActions.setLoadedJobId(jobId));
        dispatch(CurrentJobStudioActions.syncMessages(payload.messages));
        dispatch(JobStudioBuilderActions.setLoaded());
        return 200;
      } catch {
        return 500;
      } finally {
        dispatch(JobStudioBuilderActions.setPostingMessage(false));
      }
    };
  };
