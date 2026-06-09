import { listJobNewsletterIngestAiCostsApi } from "@/api/job-newsletter-ingest-ai-costs";
import type { AppThunk } from "@/store";
import { JobNewsletterIngestAiCostsActions } from "@/store/dumps/jobNewsletterIngestAiCosts";

type Status = Promise<200 | 400 | 500>;

export type LoadJobNewsletterIngestAiCostsInput = {
  sourceId: string;
  limit?: number;
};

/**
 * Loads AI exchange cost rows for a newsletter source into the Redux dump.
 */
export const loadJobNewsletterIngestAiCostsThunk =
  (input: LoadJobNewsletterIngestAiCostsInput): AppThunk<Status> =>
  async (dispatch): Status => {
    const result = await listJobNewsletterIngestAiCostsApi(input);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(
      JobNewsletterIngestAiCostsActions.upsertJobNewsletterIngestAiCosts(
        result.data.rows.map((row) => ({ ...row, sourceId: input.sourceId })),
      ),
    );
    return 200;
  };
