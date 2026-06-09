"use client";

import { useMemo, useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { generateSkillsComponentThunk, loadTechnicalSkillsThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { JobDetailGraphicList } from "../../../graphics-column/job-graphic-list";

/**
 * Generate resume TSX and list job-scoped resume graphics below the action.
 */
export const GenerateResume = () => {
  const dispatch = useAppDispatch();
  const loadStatus = useAppSelector((s) => s.technicalSkillsBuilder.loadStatus);
  const loadError = useAppSelector((s) => s.technicalSkillsBuilder.error);
  const draftTechnicalSkills = useAppSelector((s) => s.currentTechnicalSkills.draftTechnicalSkills);
  const jobId = useAppSelector((s) => s.currentJob.id);
  const [isGenerating, setIsGenerating] = useState(false);

  const promptLines = useMemo(
    () =>
      draftTechnicalSkills
        .filter((sk) => sk.status === "active")
        .map((sk) => (sk.body?.trim() ? `${sk.title} — ${sk.body.trim()}` : sk.title)),
    [draftTechnicalSkills],
  );

  const handleGenerate = async () => {
    if (!promptLines.length) {
      toast.error("Add skills in the Technical Skills Studio first.");
      return;
    }
    if (!jobId.trim()) {
      toast.error("Open a job before generating a resume.");
      return;
    }

    setIsGenerating(true);

    try {
      const status = await dispatch(
        generateSkillsComponentThunk({
          jobId,
        }),
      );

      if (status === 200) {
        toast.success("Resume generation started — it will appear below in a few minutes.");
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
  const hasActiveSkills = promptLines.length > 0;

  return (
    <div className={styles.root}>
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
      ) : !hasActiveSkills ? (
        <p className={styles.empty}>
          No active skills found. Add skills in the Technical Skills Studio first.
        </p>
      ) : null}

      <button
        type="button"
        className={t.btnPrimarySm}
        onClick={() => void handleGenerate()}
        disabled={
          isGenerating ||
          isSkillsLoading ||
          isSkillsError ||
          !hasActiveSkills ||
          !jobId.trim()
        }
      >
        {isGenerating ? (
          <>
            <Loader2 className={styles.iconSpin} aria-hidden />
            Starting…
          </>
        ) : (
          <>
            <Wand2 className={styles.icon} aria-hidden />
            Generate resume
          </>
        )}
      </button>

      <p className={styles.runningNote}>
        Generation runs on the server — you can switch jobs, close this tab, or queue several at
        once. Refresh this page to see new resumes when ready (usually 1–3 minutes).
      </p>

      <JobDetailGraphicList
        jobId={jobId}
        kind="resume"
        emptyLabel="No resumes for this job yet."
      />
    </div>
  );
};

const styles = {
  root: `space-y-3`,
  hint: `text-sm text-gray-500`,
  empty: `text-sm italic text-gray-400`,
  errorBlock: `space-y-2`,
  errorText: `text-sm text-red-700`,
  icon: `h-3 w-3 shrink-0 mr-1`,
  iconSpin: `h-3 w-3 shrink-0 mr-1 animate-spin`,
  runningNote: `text-sm leading-relaxed text-gray-600`,
};
