"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import type { JobStatus } from "@/model/job";
import { useAppDispatch, useAppSelector } from "@/store";
import { JobsListBuilderActions } from "@/store/builders/jobsListBuilder";
import {
  BULK_DRAFT_LISTING_IMPORT_BATCH_SIZE,
  bulkImportDraftJobListingsThunk,
} from "@/store/thunks";
import { JOBS_LIST_STATUS_FILTER_OPTIONS } from "@/utils/job";

export const JobsListToolbar = () => {
  const dispatch = useAppDispatch();
  const running = useAppSelector((s) => s.crmBuilder.isBulkDraftListingImportRunning);
  const listLoading = useAppSelector((s) => s.crmBuilder.listLoadStatus === "loading");
  const statusFilters = useAppSelector((s) => s.jobsListBuilder.statusFilters);

  const onStatusFilterToggle = useCallback(
    (status: JobStatus) => {
      dispatch(JobsListBuilderActions.toggleStatusFilter(status));
    },
    [dispatch],
  );

  const onBulkImport = useCallback(async () => {
    if (running || listLoading) return;

    const result = await dispatch(bulkImportDraftJobListingsThunk());
    if (result === null) {
      return;
    }

    if (result.queued === 0) {
      toast.info("No draft jobs need listing import (all have responsibilities or no posting URL).");
      return;
    }

    if (result.failed === 0) {
      toast.success(
        `Imported ${result.succeeded} listing${result.succeeded === 1 ? "" : "s"}.`,
      );
      return;
    }

    if (result.succeeded === 0) {
      toast.error(`Failed to import ${result.failed} listing${result.failed === 1 ? "" : "s"}.`);
      return;
    }

    toast.warning(
      `Imported ${result.succeeded}; ${result.failed} failed.`,
    );
  }, [dispatch, listLoading, running]);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <fieldset className={styles.statusFilterFieldset}>
          <legend className={styles.statusFilterLegend}>Status</legend>
          <div className={styles.statusFilterOptions}>
            {JOBS_LIST_STATUS_FILTER_OPTIONS.map((opt) => (
              <label key={opt.value} className={styles.statusFilterOption}>
                <input
                  type="checkbox"
                  className={styles.statusCheckbox}
                  checked={statusFilters.includes(opt.value)}
                  aria-label={`Show ${opt.label} jobs`}
                  onChange={() => onStatusFilterToggle(opt.value)}
                />
                <span className={styles.statusFilterLabel}>{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <button
          type="button"
          className={styles.button}
          disabled={running || listLoading}
          onClick={() => void onBulkImport()}
        >
          {running
            ? "Importing listings…"
            : `Import missing listings (${BULK_DRAFT_LISTING_IMPORT_BATCH_SIZE})`}
        </button>
      </div>
      <p className={styles.hint}>
        Default view shows draft jobs only. Bulk import: draft only, with a posting URL and no
        responsibilities yet. Listing column: R · Req · NTH counts.
      </p>
    </div>
  );
};

const styles = {
  container: `mb-3 space-y-1`,
  row: `flex flex-wrap items-start gap-3`,
  statusFilterFieldset: `min-w-0 border-0 p-0 m-0 flex flex-wrap items-center gap-x-3 gap-y-1.5`,
  statusFilterLegend: `text-xs font-medium text-gray-600 shrink-0`,
  statusFilterOptions: `flex flex-wrap items-center gap-x-3 gap-y-1.5`,
  statusFilterOption: `inline-flex items-center gap-1.5 cursor-pointer select-none`,
  statusCheckbox: `h-3.5 w-3.5 rounded border-gray-300 text-orange-600 cursor-pointer`,
  statusFilterLabel: `text-xs font-medium text-gray-700`,
  button: `
    px-3 py-1.5 text-sm font-medium rounded border border-orange-300 bg-orange-50
    text-orange-900 hover:bg-orange-100 disabled:opacity-60 disabled:cursor-not-allowed
    shrink-0
  `,
  hint: `text-xs text-gray-500`,
};
