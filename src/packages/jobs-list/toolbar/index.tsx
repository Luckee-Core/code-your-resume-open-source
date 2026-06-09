"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { JobsListBuilderActions } from "@/store/builders/jobsListBuilder";
import {
  BULK_DRAFT_LISTING_IMPORT_BATCH_SIZE,
  bulkImportDraftJobListingsThunk,
} from "@/store/thunks";
import {
  JOBS_LIST_STATUS_FILTER_OPTIONS,
  type JobsListStatusFilter,
} from "@/utils/job";

export const JobsListToolbar = () => {
  const dispatch = useAppDispatch();
  const running = useAppSelector((s) => s.crmBuilder.isBulkDraftListingImportRunning);
  const listLoading = useAppSelector((s) => s.crmBuilder.listLoadStatus === "loading");
  const statusFilter = useAppSelector((s) => s.jobsListBuilder.statusFilter);

  const onStatusFilterChange = useCallback(
    (value: string) => {
      dispatch(JobsListBuilderActions.setStatusFilter(value as JobsListStatusFilter));
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
        <label className={styles.statusFilterLabel}>
          <span className={styles.statusFilterText}>Status</span>
          <select
            className={styles.statusSelect}
            value={statusFilter}
            aria-label="Filter jobs by status"
            onChange={(e) => onStatusFilterChange(e.target.value)}
          >
            {JOBS_LIST_STATUS_FILTER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
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
        Default view hides archived jobs. Bulk import: draft only, with a posting URL and no
        responsibilities yet. Listing column: R · Req · NTH counts.
      </p>
    </div>
  );
};

const styles = {
  container: `mb-3 space-y-1`,
  row: `flex flex-wrap items-center gap-2`,
  statusFilterLabel: `inline-flex items-center gap-1.5`,
  statusFilterText: `text-xs font-medium text-gray-600`,
  statusSelect: `
    rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900
    shadow-sm cursor-pointer
  `,
  button: `
    px-3 py-1.5 text-sm font-medium rounded border border-orange-300 bg-orange-50
    text-orange-900 hover:bg-orange-100 disabled:opacity-60 disabled:cursor-not-allowed
  `,
  hint: `text-xs text-gray-500`,
};
