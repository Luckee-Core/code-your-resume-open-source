"use client";

import { useMemo } from "react";
import { Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import type { Job } from "@/model/job";
import { useAppDispatch, useAppSelector } from "@/store";
import { JobsListBuilderActions } from "@/store/builders/jobsListBuilder";
import { generateSkillsComponentThunk } from "@/store/thunks";
import { filterJobGraphicsByKind } from "@/utils/image-graphics";
import { jobsTableActionStyles as s } from "./job-table-action-styles";

type Props = {
  job: Job;
};

/**
 * Jobs table resume action — queues server-side Cursor resume generation for one job.
 */
export const JobListRowResumeButton = ({ job }: Props) => {
  const dispatch = useAppDispatch();
  const busy = useAppSelector((state) => state.jobsListBuilder.resumeGenerateBusyByJobId[job.id] === true);
  const imageGraphics = useAppSelector((state) => state.imageGraphics);
  const draftTechnicalSkills = useAppSelector((state) => state.currentTechnicalSkills.draftTechnicalSkills);
  const skillsLoadStatus = useAppSelector((state) => state.technicalSkillsBuilder.loadStatus);

  const hasActiveSkills = useMemo(
    () => draftTechnicalSkills.some((skill) => skill.status === "active"),
    [draftTechnicalSkills],
  );

  const hasResumeGraphic = useMemo(
    () => filterJobGraphicsByKind(imageGraphics, job.id, "resume").length > 0,
    [imageGraphics, job.id],
  );

  const skillsStillLoading = skillsLoadStatus === "loading";
  const canGenerate = hasActiveSkills && !skillsStillLoading;

  const handleGenerateResume = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!job.id.trim() || busy || !canGenerate) {
      if (!canGenerate && !skillsStillLoading) {
        toast.error("Add active skills in Technical Skills Studio first.");
      }
      return;
    }

    dispatch(JobsListBuilderActions.setResumeGenerateBusy({ jobId: job.id, busy: true }));
    try {
      const status = await dispatch(generateSkillsComponentThunk({ jobId: job.id }));
      if (status === 200) {
        toast.success(`Resume generation started for ${job.title.trim() || "job"}.`);
      } else if (status === 400) {
        toast.error("No active skills to generate from.");
      } else {
        toast.error("Could not queue resume generation.");
      }
    } finally {
      dispatch(JobsListBuilderActions.setResumeGenerateBusy({ jobId: job.id, busy: false }));
    }
  };

  return (
    <span className={s.actionButtonWrap}>
      <button
        type="button"
        className={s.actionIconButton}
        disabled={busy || !canGenerate}
        title={
          skillsStillLoading
            ? "Loading skills…"
            : !canGenerate
              ? "Add active skills in Technical Skills Studio first"
              : hasResumeGraphic
                ? "Generate resume · Resume on file"
                : "Generate resume (runs on server)"
        }
        aria-label={`Generate resume for ${job.title.trim() || "job"}`}
        onClick={(e) => void handleGenerateResume(e)}
      >
        {busy ? (
          <Loader2 className={`${s.actionIcon} animate-spin`} aria-hidden />
        ) : (
          <Wand2 className={s.actionIcon} aria-hidden />
        )}
      </button>
      {hasResumeGraphic && !busy ? (
        <span className={s.actionDataDot} title="Resume graphic saved for this job" aria-hidden />
      ) : null}
    </span>
  );
};
