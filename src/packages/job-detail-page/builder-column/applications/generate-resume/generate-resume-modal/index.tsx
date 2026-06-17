"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, X } from "lucide-react";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

const MODAL_TITLE_ID = "generate-resume-modal-title";
const MAX_FOCUS_POINTS_CHARS = 2000;

type Props = {
  jobTitle: string;
  companyName?: string;
  busy?: boolean;
  onSubmit: (focusPoints: string) => void;
  onClose: () => void;
};

/**
 * Collects optional focus points before queuing resume generation.
 */
export const GenerateResumeModal = ({
  jobTitle,
  companyName,
  busy = false,
  onSubmit,
  onClose,
}: Props) => {
  const [focusPoints, setFocusPoints] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget && !busy) onClose();
    },
    [busy, onClose],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && !busy) onClose();
    },
    [busy, onClose],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (busy) return;
      onSubmit(focusPoints.trim());
    },
    [busy, onSubmit, focusPoints],
  );

  const roleLabel = companyName?.trim()
    ? `${jobTitle.trim()} at ${companyName.trim()}`
    : jobTitle.trim();

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby={MODAL_TITLE_ID}
    >
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 id={MODAL_TITLE_ID} className={styles.title}>
            Generate resume
          </h2>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close"
            disabled={busy}
          >
            <X className={styles.closeIcon} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <p className={styles.intro}>
            Add optional focus for <span className={styles.role}>{roleLabel}</span>. The AI will
            steer the executive summary and Experience bullets toward the skills or themes you
            name when your background supports them.
          </p>

          <div className={styles.field}>
            <label htmlFor="resume-focus-points" className={styles.label}>
              Focus points
            </label>
            <textarea
              id="resume-focus-points"
              ref={textareaRef}
              rows={6}
              value={focusPoints}
              maxLength={MAX_FOCUS_POINTS_CHARS}
              onChange={(e) => setFocusPoints(e.target.value)}
              placeholder="Example: Lead with my React Native and TypeScript experience — I've shipped production mobile apps end-to-end and want the summary and bullets to emphasize mobile development and BFF patterns for this role."
              className={styles.textarea}
              disabled={busy}
            />
            <p className={styles.hint}>
              Optional. Leave blank to tailor from the job posting and technical skills alone.
            </p>
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelButton} disabled={busy}>
              Cancel
            </button>
            <button type="submit" className={t.btnPrimarySm} disabled={busy}>
              {busy ? (
                <>
                  <Loader2 className={styles.iconSpin} aria-hidden />
                  Starting…
                </>
              ) : (
                "Generate resume"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  backdrop: `
    fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4
  `,
  panel: `
    w-full max-w-lg rounded-xl bg-white shadow-xl
  `,
  header: `flex items-center justify-between border-b border-gray-100 px-5 py-4`,
  title: `text-sm font-semibold text-gray-900`,
  closeButton: `
    flex h-7 w-7 items-center justify-center rounded-md text-gray-400
    hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed
  `,
  closeIcon: `h-4 w-4`,
  form: `flex flex-col gap-4 px-5 py-5`,
  intro: `text-sm leading-relaxed text-gray-600`,
  role: `font-medium text-gray-900`,
  field: `flex flex-col gap-1`,
  label: `text-xs font-medium text-gray-700`,
  textarea: `
    rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm
    placeholder:text-gray-400 focus:border-[#FF7C1E] focus:outline-none focus:ring-1 focus:ring-[#FF7C1E]
    disabled:opacity-60
  `,
  hint: `text-xs text-gray-500`,
  actions: `flex justify-end gap-2 pt-1`,
  cancelButton: `
    rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600
    hover:border-gray-300 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed
  `,
  iconSpin: `h-3 w-3 shrink-0 mr-1 animate-spin`,
};
