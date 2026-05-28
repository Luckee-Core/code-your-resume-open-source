"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { EXPERIENCE_BACKGROUND_PATH } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  generateCompanyInterestThunk,
  loadProfessionalBackgroundThunk,
} from "@/store/thunks";
import { filterJobGraphicsByKind } from "@/utils/image-graphics";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { JobDetailGraphicList } from "../../../graphics-column/job-graphic-list";

/**
 * Generate a short company-interest answer and list matching graphics below.
 */
export const GenerateCompanyInterest = () => {
  const dispatch = useAppDispatch();
  const loadStatus = useAppSelector((s) => s.professionalBackgroundBuilder.loadStatus);
  const loadError = useAppSelector((s) => s.professionalBackgroundBuilder.error);
  const draftSegments = useAppSelector((s) => s.currentProfessionalBackground.draftSegments);
  const draftTechnicalSkills = useAppSelector((s) => s.currentTechnicalSkills.draftTechnicalSkills);
  const job = useAppSelector((s) => s.currentJob);
  const companies = useAppSelector((s) => s.companies);
  const imageGraphics = useAppSelector((s) => s.imageGraphics);
  const [isGenerating, setIsGenerating] = useState(false);

  const companyName = job.companyId ? companies[job.companyId]?.name : undefined;

  const hasBackgroundVoice =
    Boolean(draftSegments.credibility_bio?.trim()) ||
    Boolean(draftSegments.voice_style?.trim());

  const skillPromptLines = useMemo(
    () =>
      draftTechnicalSkills
        .filter((sk) => sk.status === "active")
        .map((sk) =>
          sk.body?.trim() ? `${sk.title} — ${sk.body.trim()}` : sk.title,
        ),
    [draftTechnicalSkills],
  );

  const companyInterestGraphics = useMemo(
    () => filterJobGraphicsByKind(imageGraphics, job.id, "companyInterest"),
    [imageGraphics, job.id],
  );

  const handleGenerate = async () => {
    if (!hasBackgroundVoice) {
      toast.error("Add credibility bio or voice style in Professional Background Studio first.");
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
        generateCompanyInterestThunk({
          jobId: job.id,
          jobTitle: job.title,
          companyName: companyName?.trim() || undefined,
          skills: skillPromptLines.length > 0 ? skillPromptLines : undefined,
          professionalBackgroundSegments: draftSegments,
        }),
      );

      if (status === 200) {
        toast.success("Company interest saved — open Graphics Studio to edit or export.");
      } else if (status === 400) {
        toast.error("Add professional background (bio or voice) before generating.");
      } else {
        toast.error("Generation failed. Check server logs.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const isBackgroundLoading = loadStatus === "loading";
  const isBackgroundError = loadStatus === "error";

  return (
    <div className={styles.root}>
      <p className={styles.promptHint}>
        Answers: What interests you about working for this company?
      </p>

      {isBackgroundLoading ? (
        <p className={styles.hint}>Loading professional background…</p>
      ) : isBackgroundError ? (
        <div className={styles.errorBlock}>
          <p className={styles.errorText}>{loadError ?? "Could not load professional background."}</p>
          <button
            type="button"
            className={t.btnPrimarySm}
            onClick={() => void dispatch(loadProfessionalBackgroundThunk())}
          >
            Retry
          </button>
        </div>
      ) : !hasBackgroundVoice ? (
        <p className={styles.empty}>
          Add a credibility bio or voice style in{" "}
          <Link href={EXPERIENCE_BACKGROUND_PATH} className={styles.link}>
            Professional Background Studio
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
          isBackgroundLoading ||
          isBackgroundError ||
          !hasBackgroundVoice ||
          !job.id.trim() ||
          !job.title?.trim()
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
            Generate company interest
          </>
        )}
      </button>

      {isGenerating ? (
        <p className={styles.runningNote} role="status">
          Writing a short answer. This typically takes 1–3 minutes.
        </p>
      ) : null}

      <JobDetailGraphicList
        graphics={companyInterestGraphics}
        emptyLabel="No company interest answers for this job yet."
      />
    </div>
  );
};

const styles = {
  root: `space-y-3`,
  promptHint: `text-sm text-gray-600 leading-relaxed`,
  hint: `text-sm text-gray-500`,
  empty: `text-sm italic text-gray-400`,
  link: `underline text-orange-700 hover:text-orange-900`,
  errorBlock: `space-y-2`,
  errorText: `text-sm text-red-700`,
  icon: `h-3 w-3 shrink-0 mr-1`,
  iconSpin: `h-3 w-3 shrink-0 mr-1 animate-spin`,
  runningNote: `text-sm leading-relaxed text-gray-600`,
};
