"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { EXPERIENCE_BACKGROUND_PATH } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  generateCoverLetterThunk,
  loadProfessionalBackgroundThunk,
} from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { collectSortedJobBulletBodies } from "@/utils/job";

/**
 * Applications card — generate a US Letter TSX cover letter from job context
 * and professional background. Optional active technical skills supplement context.
 */
export const GenerateCoverLetter = () => {
  const dispatch = useAppDispatch();
  const loadStatus = useAppSelector((s) => s.professionalBackgroundBuilder.loadStatus);
  const loadError = useAppSelector((s) => s.professionalBackgroundBuilder.error);
  const draftSegments = useAppSelector((s) => s.currentProfessionalBackground.draftSegments);
  const draftTechnicalSkills = useAppSelector((s) => s.currentTechnicalSkills.draftTechnicalSkills);
  const job = useAppSelector((s) => s.currentJob);
  const companies = useAppSelector((s) => s.companies);
  const jobResponsibilities = useAppSelector((s) => s.jobResponsibilities);
  const jobRequirements = useAppSelector((s) => s.jobRequirements);
  const jobNiceToHaves = useAppSelector((s) => s.jobNiceToHaves);
  const [isGenerating, setIsGenerating] = useState(false);

  const companyName = job.companyId ? companies[job.companyId]?.name : undefined;

  const responsibilityBodies = useMemo(
    () => collectSortedJobBulletBodies(jobResponsibilities, job.id),
    [jobResponsibilities, job.id],
  );
  const requirementBodies = useMemo(
    () => collectSortedJobBulletBodies(jobRequirements, job.id),
    [jobRequirements, job.id],
  );
  const niceToHaveBodies = useMemo(
    () => collectSortedJobBulletBodies(jobNiceToHaves, job.id),
    [jobNiceToHaves, job.id],
  );

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

  const contextSummary = useMemo(() => {
    const parts: string[] = [];
    if (job.title?.trim()) {
      parts.push(job.title.trim());
    }
    if (companyName?.trim()) {
      parts.push(companyName.trim());
    }
    const reqCount = requirementBodies.length;
    const respCount = responsibilityBodies.length;
    if (reqCount > 0 || respCount > 0) {
      parts.push(
        `${reqCount} requirement${reqCount === 1 ? "" : "s"}, ${respCount} responsibilit${respCount === 1 ? "y" : "ies"}`,
      );
    }
    return parts.length > 0 ? parts.join(" · ") : "No job context loaded";
  }, [job.title, requirementBodies.length, responsibilityBodies.length, companyName]);

  const handleGenerate = async () => {
    if (!hasBackgroundVoice) {
      toast.error("Add credibility bio or voice style in Professional Background Studio first.");
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
          jobTitle: job.title,
          companyName: companyName?.trim() || undefined,
          skills: skillPromptLines.length > 0 ? skillPromptLines : undefined,
          professionalBackgroundSegments: draftSegments,
        }),
      );

      if (status === 200) {
        toast.success("Cover letter saved — open Graphics Studio to edit or export.");
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
      <p className={styles.label}>Generate cover letter</p>

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
      ) : (
        <p className={styles.context}>{contextSummary}</p>
      )}

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
            Generate cover letter
          </>
        )}
      </button>

      {isGenerating && (
        <p className={styles.runningNote} role="status">
          The Cursor agent is writing your cover letter. This typically takes 1–3 minutes.
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
  context: `
    text-[11px] text-indigo-900/80 leading-relaxed
  `,
  link: `
    underline text-indigo-700 hover:text-indigo-900
  `,
  errorBlock: `
    space-y-2
  `,
  errorText: `
    text-[11px] text-red-700
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
