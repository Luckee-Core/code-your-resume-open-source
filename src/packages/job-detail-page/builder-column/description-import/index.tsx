"use client";

import { useEffect, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { importJobDescriptionThunk } from "@/store/thunks";
import { jobDetailBuilderIcpStyles as s } from "../icp-aligned-styles";

const MIN_DESCRIPTION_CHARS = 40;

/**
 * Paste a job posting description and extract responsibilities, requirements, and nice-to-haves.
 */
export const JobDescriptionImportSection = () => {
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

  const onExtract = async () => {
    if (!canExtract) return;
    setBusy(true);
    const status = await dispatch(
      importJobDescriptionThunk({ jobId, descriptionText: draft }),
    );
    setBusy(false);

    if (status === 200) {
      toast.success("Responsibilities, requirements, and nice-to-haves updated");
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
    <li className={s.sectionItem} data-section="description-import">
      <h2 id="crm-job-description-import-heading" className={s.rowSectionTitle}>
        Job description
      </h2>
      <div className={s.rowCard}>
        <p className={styles.help}>
          Paste the full posting text (from a PDF, email, or job board). Then extract structured
          bullets — no posting URL required.
        </p>
        <label className={styles.label} htmlFor="crm-job-description-paste">
          Description text
        </label>
        <textarea
          id="crm-job-description-paste"
          className={styles.textarea}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Paste the job description here…"
          rows={8}
          disabled={busy}
        />
        <p className={styles.meta}>
          {charCount < MIN_DESCRIPTION_CHARS
            ? `${MIN_DESCRIPTION_CHARS - charCount} more characters needed to extract`
            : `${charCount.toLocaleString()} characters`}
        </p>
        <div className={styles.actions}>
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
    </li>
  );
};

const styles = {
  help: `text-sm leading-relaxed text-gray-600 mb-3`,
  label: `block text-xs font-medium text-gray-700 mb-1`,
  textarea: `
    w-full resize-y rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900
    leading-relaxed placeholder:text-gray-400
    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
    disabled:bg-gray-100 disabled:cursor-not-allowed
  `,
  meta: `mt-1 text-xs text-gray-500`,
  actions: `mt-3 flex flex-wrap items-center gap-2`,
  primaryBtn: `
    inline-flex items-center gap-2 rounded-md bg-orange-500 px-3 py-2 text-sm font-medium text-white
    hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50
  `,
  btnIcon: `h-4 w-4 shrink-0`,
  btnIconSpin: `h-4 w-4 shrink-0 animate-spin`,
};
