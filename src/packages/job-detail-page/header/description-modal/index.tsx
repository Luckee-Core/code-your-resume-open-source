"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { importJobDescriptionThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

const MIN_DESCRIPTION_CHARS = 40;

type Props = {
  onClose: () => void;
};

/**
 * Paste a job posting description and extract responsibilities, requirements, and nice-to-haves.
 */
export const JobDescriptionModal = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const jobId = useAppSelector((st) => st.currentJob.id);
  const savedDescription = useAppSelector((st) => st.currentJob.description);

  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setDraft(savedDescription.trim());
  }, [jobId, savedDescription]);

  const charCount = draft.trim().length;
  const canExtract = !!jobId && charCount >= MIN_DESCRIPTION_CHARS && !busy;

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  const onExtract = async () => {
    if (!canExtract || !jobId) return;
    setBusy(true);
    const status = await dispatch(
      importJobDescriptionThunk({ jobId, descriptionText: draft }),
    );
    setBusy(false);

    if (status === 200) {
      toast.success("Responsibilities, requirements, and nice-to-haves updated");
      onClose();
      return;
    }
    if (status === 500) {
      toast.error("Server error while extracting sections");
      return;
    }
    toast.error(
      charCount < MIN_DESCRIPTION_CHARS
        ? `Paste at least ${MIN_DESCRIPTION_CHARS} characters of the job description.`
        : "Could not extract sections. Check the text or server logs.",
    );
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="job-description-modal-title"
    >
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 id="job-description-modal-title" className={styles.heading}>
            Job description
          </h2>
          <button type="button" onClick={onClose} className={styles.closeBtn} aria-label="Close">
            <X className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.body}>
          <p className={styles.help}>
            Paste the full posting text (from a PDF, email, or job board). Then extract structured
            bullets — no posting URL required.
          </p>
          <label className={t.formLabel} htmlFor="crm-job-description-paste">
            Description text
          </label>
          <textarea
            id="crm-job-description-paste"
            className={styles.textarea}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Paste the job description here…"
            rows={10}
            disabled={busy}
          />
          <p className={styles.meta}>
            {charCount < MIN_DESCRIPTION_CHARS
              ? `${MIN_DESCRIPTION_CHARS - charCount} more characters needed to extract`
              : `${charCount.toLocaleString()} characters`}
          </p>
          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Cancel
            </button>
            <button
              type="button"
              className={styles.primaryBtn}
              disabled={!canExtract}
              onClick={() => void onExtract()}
            >
              {busy ? (
                <>
                  <Loader2 className={styles.btnIconSpin} aria-hidden />
                  Extracting…
                </>
              ) : (
                <>
                  <Sparkles className={styles.btnIcon} aria-hidden />
                  Update listing sections
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  backdrop: `fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4`,
  panel: `w-full max-w-lg rounded-xl bg-white shadow-xl`,
  header: `flex items-center justify-between border-b border-gray-100 px-5 py-4`,
  heading: `text-sm font-semibold text-gray-900`,
  closeBtn: `flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600`,
  closeIcon: `h-4 w-4`,
  body: `flex flex-col gap-3 px-5 py-5`,
  help: `text-sm leading-relaxed text-gray-600`,
  textarea: `
    w-full resize-y rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900
    leading-relaxed placeholder:text-gray-400
    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
    disabled:bg-gray-100 disabled:cursor-not-allowed
  `,
  meta: `text-xs text-gray-500`,
  actions: `flex justify-end gap-2 pt-1`,
  cancelBtn: `rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-300 hover:text-gray-900`,
  primaryBtn: `
    inline-flex items-center gap-2 rounded-md bg-orange-500 px-3 py-2 text-sm font-medium text-white
    hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50
  `,
  btnIcon: `h-4 w-4 shrink-0`,
  btnIconSpin: `h-4 w-4 shrink-0 animate-spin`,
};
