"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { EXPERIENCE_VOICE_PATH, PROJECTS_PATH } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  generateTeamConversationThunk,
  loadProjectsThunk,
  loadVoiceStyleThunk,
} from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { hasNarrativeContextForGeneration } from "@/utils/narrative-context";
import { JobDetailGraphicList } from "../../../graphics-column/job-graphic-list";

/**
 * Build the YC-style team conversation prompt for the current company.
 */
const buildTeamConversationPromptHint = (companyName?: string): string => {
  const trimmed = companyName?.trim();
  if (trimmed) {
    return (
      `Start a conversation with the team at ${trimmed}. Share something about you, ` +
      `what you're looking for, or why ${trimmed} interests you.`
    );
  }
  return (
    "Start a conversation with the team. Share something about you, what you're looking for, " +
    "or why this role interests you."
  );
};

/**
 * Generate a YC-style team conversation opener and list matching graphics below.
 */
export const GenerateTeamConversation = () => {
  const dispatch = useAppDispatch();
  const voiceLoadStatus = useAppSelector((s) => s.voiceStyleBuilder.loadStatus);
  const voiceLoadError = useAppSelector((s) => s.voiceStyleBuilder.error);
  const draftVoiceBody = useAppSelector((s) => s.currentVoiceStyle.draftBody);
  const projects = useAppSelector((s) => s.projects);
  const job = useAppSelector((s) => s.currentJob);
  const company = useAppSelector((s) => s.currentCompany);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    void dispatch(loadVoiceStyleThunk());
    void dispatch(loadProjectsThunk());
  }, [dispatch]);

  const promptHint = useMemo(
    () => buildTeamConversationPromptHint(company.name),
    [company.name],
  );

  const hasNarrativeContext = useMemo(
    () => hasNarrativeContextForGeneration(projects, draftVoiceBody),
    [projects, draftVoiceBody],
  );

  const handleGenerate = async () => {
    if (!hasNarrativeContext) {
      toast.error("Add projects or voice style notes before generating.");
      return;
    }
    if (!job.id.trim()) {
      toast.error("Open a job before generating.");
      return;
    }
    if (!job.title?.trim()) {
      toast.error("Job title is required.");
      return;
    }

    setIsGenerating(true);

    try {
      const status = await dispatch(
        generateTeamConversationThunk({
          jobId: job.id,
        }),
      );

      if (status === 200) {
        toast.success(
          "Team conversation generation started — it will appear below in a few minutes.",
        );
      } else if (status === 400) {
        toast.error("Add projects or voice style before generating.");
      } else {
        toast.error("Generation failed. Check server logs.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const isContextLoading = voiceLoadStatus === "loading";
  const isContextError = voiceLoadStatus === "error";

  return (
    <div className={styles.root}>
      <p className={styles.promptHint}>{promptHint}</p>
      <p className={styles.humanNote}>Human-written messages are more likely to get a response.</p>

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
        onClick={() => void handleGenerate()}
        disabled={
          isGenerating ||
          isContextLoading ||
          isContextError ||
          !hasNarrativeContext ||
          !job.id.trim() ||
          !job.title?.trim()
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
            Generate team conversation
          </>
        )}
      </button>

      <p className={styles.runningNote}>
        Generation runs on the server — you can leave this page. Refresh to see new answers when
        ready (usually 1–3 minutes).
      </p>

      <JobDetailGraphicList
        jobId={job.id}
        kind="teamConversation"
        emptyLabel="No team conversation answers for this job yet."
      />
    </div>
  );
};

const styles = {
  root: `space-y-3`,
  promptHint: `text-sm text-gray-600 leading-relaxed`,
  humanNote: `text-xs text-gray-500 italic`,
  hint: `text-sm text-gray-500`,
  empty: `text-sm italic text-gray-400`,
  link: `underline text-orange-700 hover:text-orange-900`,
  errorBlock: `space-y-2`,
  errorText: `text-sm text-red-700`,
  icon: `h-3 w-3 shrink-0 mr-1`,
  iconSpin: `h-3 w-3 shrink-0 mr-1 animate-spin`,
  runningNote: `text-sm leading-relaxed text-gray-600`,
};
