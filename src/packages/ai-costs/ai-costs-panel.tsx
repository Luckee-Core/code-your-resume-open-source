"use client";

import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { loadAiExchangeCostsThunk } from "@/store/thunks/ai";
import { formatDateMedium } from "@/utils/date-time";
import { formatEstimatedCostUsd } from "./format-estimated-cost-usd";

const formatTokens = (value: number | null): string => {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  return value.toLocaleString();
};

export const AiCostsPanel = () => {
  const dispatch = useAppDispatch();
  const aiExchangeCosts = useAppSelector((s) => s.aiExchangeCosts);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      setLoadError(null);
      const status = await dispatch(loadAiExchangeCostsThunk({ limit: 100 }));
      if (status !== 200) {
        setLoadError("Could not load AI exchange costs. Check that the Express server and Supabase registry are configured.");
      }
      setLoading(false);
    })();
  }, [dispatch]);

  const rows = useMemo(
    () =>
      Object.values(aiExchangeCosts).sort((a, b) => b.occurredAt.localeCompare(a.occurredAt)),
    [aiExchangeCosts],
  );

  const totalEstimatedCostUsd = useMemo(
    () => rows.reduce((sum, row) => sum + row.estimatedCostUsd, 0),
    [rows],
  );

  if (loading) {
    return <p className={styles.muted}>Loading…</p>;
  }

  if (loadError) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>Could not load AI costs</p>
        <p className={styles.emptyDescription}>{loadError}</p>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>No AI costs yet</p>
        <p className={styles.emptyDescription}>
          No exchanges found in registered Supabase exchange tables yet.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.summary}>
        <span className={styles.summaryLabel}>Total estimated cost</span>
        <span className={styles.summaryValue}>{formatEstimatedCostUsd(totalEstimatedCostUsd)}</span>
        <span className={styles.summaryMeta}>
          {rows.length} exchange{rows.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.rowNumberHeader}>#</th>
              <th className={styles.headerCell}>Flow</th>
              <th className={styles.headerCell}>Context</th>
              <th className={styles.headerCell}>Model</th>
              <th className={styles.headerCellRight}>In</th>
              <th className={styles.headerCellRight}>Out</th>
              <th className={styles.headerCellRight}>Est. cost</th>
              <th className={styles.headerCell}>Status</th>
              <th className={styles.headerCell}>When</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.exchangeId} className={styles.row}>
                <td className={styles.rowNumberCell}>{index + 1}</td>
                <td className={styles.cell}>
                  <span className={styles.flowText}>{row.flowLabel}</span>
                </td>
                <td className={styles.contextCell}>
                  <span className={styles.contextPreview} title={row.contextLabel}>
                    {row.contextLabel}
                  </span>
                </td>
                <td className={styles.cell}>
                  <span className={styles.modelText}>{row.modelUsed ?? "—"}</span>
                </td>
                <td className={styles.cellRight}>{formatTokens(row.inputTokens)}</td>
                <td className={styles.cellRight}>{formatTokens(row.outputTokens)}</td>
                <td className={styles.cellRight}>
                  {formatEstimatedCostUsd(row.estimatedCostUsd)}
                </td>
                <td className={styles.cell}>
                  <span
                    className={
                      row.status.toLowerCase() === "completed" ||
                      row.status.toLowerCase() === "success"
                        ? styles.statusOn
                        : row.status.toLowerCase() === "failed" ||
                            row.status.toLowerCase() === "error"
                          ? styles.statusError
                          : styles.statusOff
                    }
                  >
                    {row.status || "—"}
                  </span>
                </td>
                <td className={styles.cell}>{formatDateMedium(row.occurredAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  muted: `mb-2 text-sm text-gray-500`,
  wrap: `space-y-3`,
  summary: `
    flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded border border-gray-300 bg-white px-4 py-3
  `,
  summaryLabel: `text-sm text-gray-600`,
  summaryValue: `text-lg font-semibold text-gray-900`,
  summaryMeta: `text-xs text-gray-500`,
  tableContainer: `
    bg-white rounded border border-gray-300 overflow-x-auto overflow-y-visible
  `,
  table: `w-full border-collapse text-sm relative`,
  rowNumberHeader: `
    px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide
    bg-gray-100 border-b border-gray-300 w-8
  `,
  headerCell: `
    px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide
    bg-gray-100 border-b border-gray-300
  `,
  headerCellRight: `
    px-3 py-2 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide
    bg-gray-100 border-b border-gray-300 whitespace-nowrap
  `,
  row: `
    hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0
  `,
  rowNumberCell: `px-2 py-2 text-xs text-gray-500 tabular-nums`,
  cell: `px-3 py-2 text-sm text-gray-700`,
  cellRight: `px-3 py-2 text-sm text-gray-900 text-right tabular-nums`,
  contextCell: `max-w-md px-3 py-2 text-sm text-gray-600`,
  contextPreview: `line-clamp-2`,
  flowText: `text-gray-600`,
  modelText: `font-mono text-xs text-gray-700`,
  statusOn: `text-xs font-medium text-green-700`,
  statusOff: `text-xs font-medium text-gray-500`,
  statusError: `text-xs font-medium text-red-700`,
  emptyState: `bg-white rounded border border-gray-300 p-8 text-center`,
  emptyTitle: `text-lg font-semibold text-gray-900 mb-2`,
  emptyDescription: `text-sm text-gray-600`,
} as const;
