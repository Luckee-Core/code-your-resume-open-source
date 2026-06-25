"use client";

import type { QuickApplyPhase } from "@/store/builders/quickApplyBuilder";

type Props = {
  phase: QuickApplyPhase;
  lastError: string | null;
  warnings: string[];
  resumeQueued: boolean;
  resumeSkipReason?: string;
};

/**
 * Inline status for the quick-apply pipeline on the dashboard.
 */
export const QuickApplyStatus = ({
  phase,
  lastError,
  warnings,
  resumeQueued,
  resumeSkipReason,
}: Props) => {
  if (phase === "idle") {
    return null;
  }

  if (phase === "running") {
    return (
      <p className={styles.running} role="status">
        Scraping company and job listing, then queuing your resume… This can take a minute.
      </p>
    );
  }

  if (phase === "error" && lastError) {
    return (
      <div className={styles.block}>
        <p className={styles.error}>{lastError}</p>
        {warnings.length > 0 ? (
          <ul className={styles.warningList}>
            {warnings.map((warning) => (
              <li key={warning} className={styles.warningItem}>
                {warning}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className={styles.block}>
        {resumeQueued ? (
          <p className={styles.success}>Resume generation started — it will appear on the job page shortly.</p>
        ) : resumeSkipReason ? (
          <p className={styles.warning}>{resumeSkipReason}</p>
        ) : null}
        {warnings.length > 0 ? (
          <ul className={styles.warningList}>
            {warnings.map((warning) => (
              <li key={warning} className={styles.warningItem}>
                {warning}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }

  return null;
};

const styles = {
  block: `flex flex-col gap-2`,
  running: `text-sm text-slate-600`,
  success: `text-sm text-emerald-700`,
  warning: `text-sm text-amber-800`,
  error: `text-sm text-red-700`,
  warningList: `list-disc pl-5 text-sm text-amber-800`,
  warningItem: `mt-1`,
};
