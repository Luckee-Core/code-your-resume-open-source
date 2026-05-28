"use client";

import { useMemo, useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { generateSkillsComponentThunk, loadTechnicalSkillsThunk } from "@/store/thunks";
import { filterJobGraphicsByKind } from "@/utils/image-graphics";
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
  const professionalBackgroundSegments = useAppSelector(
    (s) => s.currentProfessionalBackground.draftSegments,
  );
  const jobId = useAppSelector((s) => s.currentJob.id);
  const jobTitle = useAppSelector((s) => s.currentJob.title);
  const imageGraphics = useAppSelector((s) => s.imageGraphics);
  const [isGenerating, setIsGenerating] = useState(false);

  const promptLines = useMemo(
    () =>
      draftTechnicalSkills
        .filter((sk) => sk.status === "active")
        .map((sk) => (sk.body?.trim() ? `${sk.title} — ${sk.body.trim()}` : sk.title)),
    [draftTechnicalSkills],
  );

  const resumeGraphics = useMemo(
    () => filterJobGraphicsByKind(imageGraphics, jobId, "resume"),
    [imageGraphics, jobId],
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
          skills: promptLines,
          jobId,
          jobTitle: jobTitle || undefined,
          professionalBackgroundSegments,
        }),
      );

      if (status === 200) {
        toast.success("Resume saved — open Graphics Studio to edit or export.");
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
            Generating…
          </>
        ) : (
          <>
            <Wand2 className={styles.icon} aria-hidden />
            Generate resume
          </>
        )}
      </button>

      {isGenerating ? (
        <p className={styles.runningNote} role="status">
          The Cursor agent is writing your resume. This typically takes 1–3 minutes.
        </p>
      ) : null}

      <JobDetailGraphicList
        graphics={resumeGraphics}
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
