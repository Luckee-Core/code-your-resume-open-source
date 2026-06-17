"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { EXPERIENCE_VOICE_PATH, PROJECTS_PATH } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  generateCoverLetterThunk,
  loadProjectsThunk,
  loadVoiceStyleThunk,
} from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { hasNarrativeContextForGeneration } from "@/utils/narrative-context";
import { JobDetailGraphicList } from "../../../graphics-column/job-graphic-list";
import { GenerateCoverLetterModal } from "./generate-cover-letter-modal";

/**
 * Generate cover letter TSX and list job-scoped cover letter graphics below the action.
 */
export const GenerateCoverLetter = () => {
  const dispatch = useAppDispatch();
  const voiceLoadStatus = useAppSelector((s) => s.voiceStyleBuilder.loadStatus);
  const voiceLoadError = useAppSelector((s) => s.voiceStyleBuilder.error);
  const draftVoiceBody = useAppSelector((s) => s.currentVoiceStyle.draftBody);
  const projects = useAppSelector((s) => s.projects);
  const job = useAppSelector((s) => s.currentJob);
  const company = useAppSelector((s) => s.currentCompany);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    void dispatch(loadVoiceStyleThunk());
    void dispatch(loadProjectsThunk());
  }, [dispatch]);

  const hasNarrativeContext = useMemo(
    () => hasNarrativeContextForGeneration(projects, draftVoiceBody),
    [projects, draftVoiceBody],
  );

  const isContextLoading = voiceLoadStatus === "loading";
  const isContextError = voiceLoadStatus === "error";

  const canGenerate =
    hasNarrativeContext &&
    job.id.trim() &&
    job.title?.trim() &&
    !isContextLoading &&
    !isContextError;

  const handleGenerate = async (pointOfEmphasis: string) => {
    if (!hasNarrativeContext) {
      toast.error("Add projects or voice style notes before generating.");
      return;
    }
    if (!job.id.trim()) {
      toast.error("Open a job before generating a cover letter.");
      return;
    }
    if (!job.title?.trim()) {
      toast.error("Job title is required to generate a cover letter.");
      return;
    }

    setIsGenerating(true);

    try {
      const status = await dispatch(
        generateCoverLetterThunk({
          jobId: job.id,
          pointOfEmphasis: pointOfEmphasis || undefined,
        }),
      );

      if (status === 200) {
        setIsModalOpen(false);
        toast.success("Cover letter generation started — it will appear below in a few minutes.");
      } else if (status === 400) {
        toast.error("Add projects or voice style before generating.");
      } else {
        toast.error("Generation failed. Check server logs.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={styles.root}>
      {isContextLoading ? (
        <p className={styles.hint}>Loading projects and voice style…</p>
      ) : isContextError ? (
        <div className={styles.errorBlock}>
          <p className={styles.errorText}>{voiceLoadError ?? "Could not load voice style."}</p>
          <button
            type="button"
            className={t.btnPrimarySm}
            onClick={() => void dispatch(loadVoiceStyleThunk())}
          >
            Retry
          </button>
        </div>
      ) : !hasNarrativeContext ? (
        <p className={styles.empty}>
          Add at least one{" "}
          <Link href={PROJECTS_PATH} className={styles.link}>
            project
          </Link>{" "}
          or voice style in{" "}
          <Link href={EXPERIENCE_VOICE_PATH} className={styles.link}>
            Voice style studio
          </Link>{" "}
          first.
        </p>
      ) : null}

      <button
        type="button"
        className={t.btnPrimarySm}
        onClick={() => setIsModalOpen(true)}
        disabled={!canGenerate || isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className={styles.iconSpin} aria-hidden />
            Starting…
          </>
        ) : (
          <>
            <Wand2 className={styles.icon} aria-hidden />
            Generate cover letter
          </>
        )}
      </button>

      <p className={styles.runningNote}>
        Generation runs on the server — you can leave this page. Refresh to see new cover letters
        when ready (usually 1–3 minutes).
      </p>

      <JobDetailGraphicList
        jobId={job.id}
        kind="coverLetter"
        emptyLabel="No cover letters for this job yet."
      />

      {isModalOpen ? (
        <GenerateCoverLetterModal
          jobTitle={job.title ?? ""}
          companyName={company.name}
          busy={isGenerating}
          onClose={() => {
            if (!isGenerating) setIsModalOpen(false);
          }}
          onSubmit={(pointOfEmphasis) => void handleGenerate(pointOfEmphasis)}
        />
      ) : null}
    </div>
  );
};

const styles = {
  root: `space-y-3`,
  hint: `text-sm text-gray-500`,
  empty: `text-sm italic text-gray-400`,
  link: `underline text-orange-700 hover:text-orange-900`,
  errorBlock: `space-y-2`,
  errorText: `text-sm text-red-700`,
  icon: `h-3 w-3 shrink-0 mr-1`,
  iconSpin: `h-3 w-3 shrink-0 mr-1 animate-spin`,
  runningNote: `text-sm leading-relaxed text-gray-600`,
};
