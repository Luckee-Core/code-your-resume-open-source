import { listJobNewsletterIngestRunsApi } from "@/api/job-newsletter-ingest-runs";
import type { AppThunk } from "@/store";
import { JobNewsletterIngestRunsActions } from "@/store/dumps/jobNewsletterIngestRuns";

type Status = Promise<200 | 400 | 500>;

export type LoadJobNewsletterIngestRunsInput = {
  sourceId: string;
  limit?: number;
};

/**
 * Loads ingest runs for a newsletter source into the Redux dump.
 */
export const loadJobNewsletterIngestRunsThunk =
  (input: LoadJobNewsletterIngestRunsInput): AppThunk<Status> =>
  async (dispatch): Status => {
    const result = await listJobNewsletterIngestRunsApi(input);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(JobNewsletterIngestRunsActions.upsertJobNewsletterIngestRuns(result.data));
    return 200;
  };
