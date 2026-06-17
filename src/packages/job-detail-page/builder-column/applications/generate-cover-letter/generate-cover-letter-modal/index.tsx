"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, X } from "lucide-react";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

const MODAL_TITLE_ID = "generate-cover-letter-modal-title";
const MAX_POINT_OF_EMPHASIS_CHARS = 2000;

type Props = {
  jobTitle: string;
  companyName?: string;
  busy?: boolean;
  onSubmit: (pointOfEmphasis: string) => void;
  onClose: () => void;
};

/**
 * Collects an optional point of emphasis before queuing cover letter generation.
 */
export const GenerateCoverLetterModal = ({
  jobTitle,
  companyName,
  busy = false,
  onSubmit,
  onClose,
}: Props) => {
  const [pointOfEmphasis, setPointOfEmphasis] = useState("");
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
      onSubmit(pointOfEmphasis.trim());
    },
    [busy, onSubmit, pointOfEmphasis],
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
            Generate cover letter
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
            Add optional context for <span className={styles.role}>{roleLabel}</span>. The AI will
            weave this into the letter when explaining why the role appeals to you.
          </p>

          <div className={styles.field}>
            <label htmlFor="cover-letter-point-of-emphasis" className={styles.label}>
              Point of emphasis
            </label>
            <textarea
              id="cover-letter-point-of-emphasis"
              ref={textareaRef}
              rows={6}
              value={pointOfEmphasis}
              maxLength={MAX_POINT_OF_EMPHASIS_CHARS}
              onChange={(e) => setPointOfEmphasis(e.target.value)}
              placeholder="Example: This role appeals to me because I love business and operations. I'd welcome the chance to focus on the ops side of building and scaling the product—not just shipping features."
              className={styles.textarea}
              disabled={busy}
            />
            <p className={styles.hint}>
              Optional. Leave blank to generate from the job posting, projects, and voice style
              alone.
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
                "Generate cover letter"
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
