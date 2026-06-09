import { listJobNewsletterIngestAiPromptsApi } from "@/api/job-newsletter-ingest-ai-prompts";
import type { AppThunk } from "@/store";
import { JobNewsletterIngestAiPromptsActions } from "@/store/dumps/jobNewsletterIngestAiPrompts";

type Status = Promise<200 | 400 | 500>;

/**
 * Loads all job newsletter ingest AI prompts into the Redux dump.
 */
export const loadJobNewsletterIngestAiPromptsThunk = (): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await listJobNewsletterIngestAiPromptsApi();
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(JobNewsletterIngestAiPromptsActions.upsertJobNewsletterIngestAiPrompts(result.data));
    return 200;
  };
};
