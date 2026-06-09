"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/store";
import { formatDateMedium } from "@/utils/date-time";
import type { JobNewsletterIngestRun } from "@/model/job-newsletter-ingest-run";

type IngestRunsTableProps = {
  sourceId: string;
};

const formatRunDate = (value: string | null): string => {
  if (!value) return "—";
  return formatDateMedium(value);
};

export const IngestRunsTable = ({ sourceId }: IngestRunsTableProps) => {
  const jobNewsletterIngestRuns = useAppSelector((s) => s.jobNewsletterIngestRuns);

  const runs = useMemo(
    () =>
      Object.values(jobNewsletterIngestRuns)
        .filter((row) => row.sourceId === sourceId)
        .sort((a, b) => b.startedAt.localeCompare(a.startedAt)),
    [jobNewsletterIngestRuns, sourceId],
  );

  if (runs.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>No ingest runs yet</p>
        <p className={styles.emptyDescription}>
          Click &quot;Process emails from Email Manager&quot; to record a run for this source.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.rowNumberHeader}>#</th>
            <th className={styles.tableHeaderCenter}>Emails</th>
            <th className={styles.tableHeaderCenter}>Listings</th>
            <th className={styles.tableHeaderCenter}>Jobs created</th>
            <th className={styles.tableHeaderCenter}>Skipped</th>
            <th className={styles.tableHeaderCenter}>Companies</th>
            <th className={styles.tableHeaderCenter}>Status</th>
            <th className={styles.tableHeader}>Started</th>
            <th className={styles.tableHeader}>Completed</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run: JobNewsletterIngestRun, index) => (
            <tr key={run.id} className={styles.tableRow}>
              <td className={styles.rowNumberCell}>{index + 1}</td>
              <td className={styles.tableCellCenter}>{run.emailsProcessed}</td>
              <td className={styles.tableCellCenter}>{run.listingsFound}</td>
              <td className={styles.tableCellCenter}>{run.jobsCreated}</td>
              <td className={styles.tableCellCenter}>{run.jobsSkipped}</td>
              <td className={styles.tableCellCenter}>{run.companiesCreated}</td>
              <td className={styles.tableCellCenter}>
                <span className={styles.statusBadge(run.status)} title={run.errorMessage ?? undefined}>
                  {run.status}
                </span>
              </td>
              <td className={styles.tableCellDate}>{formatRunDate(run.startedAt)}</td>
              <td className={styles.tableCellDate}>{formatRunDate(run.completedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableContainer: `
    bg-white rounded border border-gray-300 overflow-x-auto overflow-y-visible
  `,
  table: `w-full border-collapse text-sm relative`,
  rowNumberHeader: `
    px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide
    bg-gray-100 border-b border-gray-300 w-8
  `,
  tableHeader: `
    px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide
    bg-gray-100 border-b border-gray-300
  `,
  tableHeaderCenter: `
    px-3 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide
    bg-gray-100 border-b border-gray-300 whitespace-nowrap
  `,
  tableRow: `border-b border-gray-200 hover:bg-gray-50`,
  rowNumberCell: `px-2 py-2 text-gray-500 text-xs`,
  tableCellCenter: `px-3 py-2 text-gray-900 text-center tabular-nums`,
  tableCellDate: `px-3 py-2 text-gray-600 whitespace-nowrap`,
  statusBadge: (status: string) => {
    const normalized = status.toLowerCase();
    const isSuccess = normalized === "completed";
    const isError = normalized === "failed";
    return `inline-block rounded-full px-2 py-0.5 text-xs border ${
      isSuccess
        ? "bg-green-50 text-green-800 border-green-200"
        : isError
          ? "bg-red-50 text-red-800 border-red-200"
          : "bg-gray-50 text-gray-700 border-gray-200"
    }`;
  },
  emptyState: `bg-white rounded border border-gray-300 p-8 text-center`,
  emptyTitle: `text-lg font-semibold text-gray-900 mb-2`,
  emptyDescription: `text-sm text-gray-600`,
} as const;
