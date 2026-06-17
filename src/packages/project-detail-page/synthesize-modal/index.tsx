"use client";

import { useCallback, useState } from "react";
import { Loader2, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { synthesizeProjectNotesThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

const MIN_SYNTHESIS_CHARS = 40;

type Props = {
  onClose: () => void;
};

/**
 * Paste a large blob of project narrative and synthesize resume-ready project notes via AI.
 * Replaces all existing notes for the current project.
 */
export const ProjectSynthesizeModal = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const projectId = useAppSelector((s) => s.currentProject.id);

  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);

  const charCount = draft.trim().length;
  const canSynthesize = !!projectId && charCount >= MIN_SYNTHESIS_CHARS && !busy;

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

  const onSynthesize = async () => {
    if (!canSynthesize || !projectId) return;
    setBusy(true);
    const status = await dispatch(
      synthesizeProjectNotesThunk({ projectId, synthesisText: draft }),
    );
    setBusy(false);

    if (status === 200) {
      toast.success("Project notes synthesized");
      onClose();
      return;
    }
    if (status === 500) {
      toast.error("Server error while synthesizing notes");
      return;
    }
    toast.error(
      charCount < MIN_SYNTHESIS_CHARS
        ? `Paste at least ${MIN_SYNTHESIS_CHARS} characters of project narrative.`
        : "Could not synthesize notes. Check the text or server logs.",
    );
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-synthesize-modal-title"
    >
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 id="project-synthesize-modal-title" className={styles.heading}>
            Synthesize project notes
          </h2>
          <button type="button" onClick={onClose} className={styles.closeBtn} aria-label="Close">
            <X className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.body}>
          <p className={styles.help}>
            Paste a README, LinkedIn write-up, résumé bullets, or meeting notes. AI will extract
            resume-ready notes and replace all existing notes for this project.
          </p>
          <label className={t.formLabel} htmlFor="project-synthesis-paste">
            Project narrative
          </label>
          <textarea
            id="project-synthesis-paste"
            className={styles.textarea}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Paste project narrative here…"
            rows={12}
            disabled={busy}
          />
          <p className={styles.meta}>
            {charCount < MIN_SYNTHESIS_CHARS
              ? `${MIN_SYNTHESIS_CHARS - charCount} more characters needed`
              : `${charCount.toLocaleString()} characters`}
          </p>
          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Cancel
            </button>
            <button
              type="button"
              className={styles.primaryBtn}
              disabled={!canSynthesize}
              onClick={() => void onSynthesize()}
            >
              {busy ? (
                <>
                  <Loader2 className={styles.btnIconSpin} aria-hidden />
                  Synthesizing…
                </>
              ) : (
                <>
                  <Sparkles className={styles.btnIcon} aria-hidden />
                  Synthesize notes
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
    leading-relaxed placeholder:text-gray-400 min-h-[240px]
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
