"use client";

import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { loadAiPromptsThunk } from "@/store/thunks/ai";
import { formatDateMedium } from "@/utils/date-time";

export const AiPromptsPanel = () => {
  const dispatch = useAppDispatch();
  const aiPrompts = useAppSelector((s) => s.aiPrompts);
  const [setupWarning, setSetupWarning] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      const status = await dispatch(loadAiPromptsThunk());
      if (status === 500) {
        setSetupWarning("Could not load AI prompts from Express.");
      }
      setLoading(false);
    })();
  }, [dispatch]);

  const prompts = useMemo(
    () =>
      Object.values(aiPrompts).sort((a, b) => {
        const flowCmp = a.flowLabel.localeCompare(b.flowLabel);
        if (flowCmp !== 0) return flowCmp;
        const nameCmp = a.name.localeCompare(b.name);
        if (nameCmp !== 0) return nameCmp;
        return b.version - a.version;
      }),
    [aiPrompts],
  );

  if (loading) {
    return <p className={styles.muted}>Loading…</p>;
  }

  if (prompts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>AI prompt tables not in Supabase</p>
        <p className={styles.emptyDescription}>
          Supabase → SQL Editor → run{" "}
          <code className={styles.code}>docs/supabase-crm-ai-prompts-migration.sql</code>.
        </p>
        {setupWarning ? <p className={styles.errorText}>{setupWarning}</p> : null}
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.rowNumberHeader}>#</th>
            <th className={styles.headerCell}>Flow</th>
            <th className={styles.headerCell}>Name</th>
            <th className={styles.headerCellCenter}>Version</th>
            <th className={styles.headerCell}>Active</th>
            <th className={styles.headerCell}>Created</th>
            <th className={styles.headerCell}>System prompt</th>
          </tr>
        </thead>
        <tbody>
          {prompts.map((prompt, index) => (
            <tr key={prompt.id} className={styles.row}>
              <td className={styles.rowNumberCell}>{index + 1}</td>
              <td className={styles.cell}>
                <span className={styles.flowText}>{prompt.flowLabel}</span>
              </td>
              <td className={styles.cell}>
                <span className={styles.nameText}>{prompt.name}</span>
              </td>
              <td className={styles.cellCenter}>v{prompt.version}</td>
              <td className={styles.cell}>
                <span className={prompt.isActive ? styles.statusOn : styles.statusOff}>
                  {prompt.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className={styles.cell}>{formatDateMedium(prompt.createdAt)}</td>
              <td className={styles.promptCell}>
                <span className={styles.promptPreview} title={prompt.systemPrompt}>
                  {prompt.systemPrompt}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  muted: `mb-2 text-sm text-gray-500`,
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
  headerCellCenter: `
    px-3 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wide
    bg-gray-100 border-b border-gray-300 whitespace-nowrap
  `,
  row: `
    hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0
  `,
  rowNumberCell: `px-2 py-2 text-xs text-gray-500 tabular-nums`,
  cell: `px-3 py-2 text-sm text-gray-700`,
  cellCenter: `px-3 py-2 text-center text-sm text-gray-700`,
  nameText: `font-medium text-gray-900`,
  flowText: `text-gray-600`,
  statusOn: `text-xs font-medium text-green-700`,
  statusOff: `text-xs font-medium text-gray-500`,
  promptCell: `max-w-xl px-3 py-2 text-sm text-gray-600`,
  promptPreview: `line-clamp-2 font-mono text-xs`,
  emptyState: `bg-white rounded border border-gray-300 p-8 text-center`,
  emptyTitle: `text-lg font-semibold text-gray-900 mb-2`,
  emptyDescription: `text-sm text-gray-600`,
  code: `font-mono text-xs bg-gray-100 px-1 py-0.5 rounded`,
  errorText: `text-sm text-red-700 mt-3`,
} as const;
