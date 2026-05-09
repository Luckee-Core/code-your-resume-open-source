"use client";

import { useMemo, useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { generateSkillsComponentThunk, loadTechnicalSkillsThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

/**
 * Applications card — generate a TSX skills showcase from Redux technical skills.
 *
 * Expects `currentTechnicalSkills` to be populated by a parent route (e.g. job
 * detail page dispatches `loadTechnicalSkillsThunk` on mount). Reads active rows
 * only; each Cursor prompt line is `Title — body` when body is set.
 */
export const GenerateResume = () => {
  const dispatch = useAppDispatch();
  const loadStatus = useAppSelector((s) => s.technicalSkillsBuilder.loadStatus);
  const loadError = useAppSelector((s) => s.technicalSkillsBuilder.error);
  const draftTechnicalSkills = useAppSelector((s) => s.currentTechnicalSkills.draftTechnicalSkills);
  const professionalBackgroundSegments = useAppSelector(
    (s) => s.currentProfessionalBackground.draftSegments,
  );
  const jobId = useAppSelector((s) => s.currentJob.id);
  const jobTitle = useAppSelector((s) => s.currentJob.title);
  const [isGenerating, setIsGenerating] = useState(false);

  const activeSkills = useMemo(
    () =>
      draftTechnicalSkills
        .filter((sk) => sk.status === "active")
        .map((sk) => ({
          id: sk.id,
          title: sk.title,
          promptLine: sk.body?.trim() ? `${sk.title} — ${sk.body.trim()}` : sk.title,
        })),
    [draftTechnicalSkills],
  );

  const promptLines = useMemo(() => activeSkills.map((s) => s.promptLine), [activeSkills]);

  const handleGenerate = async () => {
    if (!promptLines.length) {
      toast.error("Add skills in the Technical Skills Studio first.");
      return;
    }
    if (!jobId.trim()) {
      toast.error("Open a job before generating a skills graphic.");
      return;
    }

    setIsGenerating(true);

    try {
      const status = await dispatch(
        generateSkillsComponentThunk({
          skills: promptLines,
          jobId,
          jobTitle: jobTitle || undefined,
          professionalBackgroundSegments,
        }),
      );

      if (status === 200) {
        toast.success("Skills graphic saved — open Graphics Studio to edit or export.");
      } else if (status === 400) {
        toast.error("No skills or job to generate from.");
      } else {
        toast.error("Generation failed. Check server logs.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const isSkillsLoading = loadStatus === "loading";
  const isSkillsError = loadStatus === "error";

  return (
    <div className={styles.root}>
      <p className={styles.label}>Generate skills component</p>

      {isSkillsLoading ? (
        <p className={styles.hint}>Loading skills…</p>
      ) : isSkillsError ? (
        <div className={styles.errorBlock}>
          <p className={styles.errorText}>{loadError ?? "Could not load skills."}</p>
          <button
            type="button"
            className={t.btnPrimarySm}
            onClick={() => void dispatch(loadTechnicalSkillsThunk())}
          >
            Retry
          </button>
        </div>
      ) : activeSkills.length === 0 ? (
        <p className={styles.empty}>
          No active skills found. Add skills in the Technical Skills Studio first.
        </p>
      ) : (
        <div className={styles.pillRow}>
          {activeSkills.map((s) => (
            <span key={s.id} className={styles.pill}>
              {s.title}
            </span>
          ))}
        </div>
      )}

      <button
        type="button"
        className={t.btnPrimarySm}
        onClick={() => void handleGenerate()}
        disabled={
          isGenerating ||
          isSkillsLoading ||
          isSkillsError ||
          activeSkills.length === 0 ||
          !jobId.trim()
        }
      >
        {isGenerating ? (
          <>
            <Loader2 className={styles.iconSpin} aria-hidden />
            Generating…
          </>
        ) : (
          <>
            <Wand2 className={styles.icon} aria-hidden />
            Generate component
          </>
        )}
      </button>

      {isGenerating && (
        <p className={styles.runningNote} role="status">
          The Cursor agent is writing your component. This typically takes 1–3 minutes.
        </p>
      )}
    </div>
  );
};

const styles = {
  root: `
    rounded-md border border-indigo-200 bg-indigo-50/60 px-3 py-3 space-y-2
  `,
  label: `
    text-[11px] font-semibold uppercase tracking-wide text-indigo-700
  `,
  hint: `
    text-[11px] text-indigo-900/60
  `,
  empty: `
    text-[11px] italic text-indigo-900/50
  `,
  errorBlock: `
    space-y-2
  `,
  errorText: `
    text-[11px] text-red-700
  `,
  pillRow: `
    flex flex-wrap gap-1
  `,
  pill: `
    inline-flex items-center rounded-full border border-indigo-200 bg-white
    px-2 py-0.5 text-[11px] font-medium text-indigo-800
  `,
  icon: `
    h-3 w-3 shrink-0 mr-1
  `,
  iconSpin: `
    h-3 w-3 shrink-0 mr-1 animate-spin
  `,
  runningNote: `
    text-[11px] leading-relaxed text-indigo-700
  `,
};
