import { listJobResponsibilitiesApi } from "@/api/job-responsibilities";
import type { AppThunk } from "@/store";
import { CrmBuilderActions } from "@/store/builders/crmBuilder";
import { collectSortedJobBulletRowsByJobId, selectDraftJobsWithPostingUrl } from "@/utils/job";
import { importJobListingThunk } from "./job-thunks";
import { loadJobListingSectionCountsThunk } from "./load-job-listing-section-counts-thunk";

export const BULK_DRAFT_LISTING_IMPORT_BATCH_SIZE = 5;

export type BulkImportDraftJobListingsResult = {
  scanned: number;
  queued: number;
  succeeded: number;
  failed: number;
};

/**
 * Finds up to {@link BULK_DRAFT_LISTING_IMPORT_BATCH_SIZE} draft jobs with no responsibility
 * rows, then runs import-listing sequentially for each.
 */
export const bulkImportDraftJobListingsThunk =
  (): AppThunk<Promise<BulkImportDraftJobListingsResult | null>> => {
  return async (dispatch, getState): Promise<BulkImportDraftJobListingsResult | null> => {
    if (getState().crmBuilder.isBulkDraftListingImportRunning) {
      return null;
    }

    dispatch(CrmBuilderActions.setBulkDraftListingImportRunning(true));

    const result: BulkImportDraftJobListingsResult = {
      scanned: 0,
      queued: 0,
      succeeded: 0,
      failed: 0,
    };

    try {
      const draftJobs = selectDraftJobsWithPostingUrl(Object.values(getState().jobs));
      const jobIdsToImport: string[] = [];

      for (const job of draftJobs) {
        if (jobIdsToImport.length >= BULK_DRAFT_LISTING_IMPORT_BATCH_SIZE) {
          break;
        }

        result.scanned += 1;

        const cachedCount = collectSortedJobBulletRowsByJobId(
          getState().jobResponsibilities,
          job.id,
        ).length;
        if (cachedCount > 0) {
          continue;
        }

        const listed = await listJobResponsibilitiesApi(job.id);
        if (!listed.success) {
          continue;
        }
        if ((listed.data?.length ?? 0) > 0) {
          continue;
        }

        jobIdsToImport.push(job.id);
      }

      result.queued = jobIdsToImport.length;

      for (const jobId of jobIdsToImport) {
        const status = await dispatch(importJobListingThunk(jobId));
        if (status === 200) {
          result.succeeded += 1;
        } else {
          result.failed += 1;
        }
      }

      if (result.queued > 0) {
        await dispatch(loadJobListingSectionCountsThunk());
      }

      return result;
    } finally {
      dispatch(CrmBuilderActions.setBulkDraftListingImportRunning(false));
    }
  };
};
