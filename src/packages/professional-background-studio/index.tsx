"use client";

import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  loadProfessionalBackgroundThunk,
  saveProfessionalBackgroundThunk,
} from "@/store/thunks";
import { CurrentProfessionalBackgroundActions } from "@/store/current/currentProfessionalBackground";
import type {
  ProfessionalBackgroundSegmentKey,
  ProfessionalBackgroundSegments,
} from "@/model/professional-background";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { getProfessionalBackgroundFingerprint } from "@/utils/professional-background";

const SEGMENTS: {
  key: ProfessionalBackgroundSegmentKey;
  title: string;
  hint: string;
}[] = [
  {
    key: "education",
    title: "Education",
    hint:
      "Degrees, institution, graduation year. Paste plain text or short bullets (e.g. B.S. Computer Science, West Chester University, 2018).",
  },
  {
    key: "credibility_bio",
    title: "Credibility & background facts",
    hint:
      "Ground-truth bio: who you are, location, stack, products/clients — similar to “§1 Who you are” in your unified voice guide.",
  },
  {
    key: "voice_style",
    title: "Voice, channels & style notes",
    hint:
      "Summarize outreach voice rules, channel-specific tone, and tutorial vs plain-text modes.",
  },
  {
    key: "portfolio_github",
    title: "Portfolio / GitHub narrative",
    hint:
      "Project blurbs and tools — same spirit as a GitHub portfolio README.",
  },
];

const STARTER_SEGMENTS: ProfessionalBackgroundSegments = {
  education: `B.S. Computer Science, Example State University (2020)

Completed coursework in algorithms, databases, and software engineering.`,
  credibility_bio: `Alex Chen — software engineer at Acme Labs (remote).

Hands-on builder across React, TypeScript, Node.js, PostgreSQL, and cloud deployment workflows.

Build focus: shipping full-stack products, improving developer workflows, and mentoring junior engineers.`,
  voice_style: `Core voice:
- Consultative peer, concrete over abstract, one clear CTA.
- Explain what's possible without hype.

Channel notes:
- Email outreach: short plain-language opener, problem-first framing.
- Technical blogs: outcome-led headings, practical constraints, copy-paste examples.
- Plain-text channels: no markdown formatting, direct and concise.`,
  portfolio_github: `Portfolio highlights:
- TaskFlow: team workflow dashboard (React, Node.js, PostgreSQL).
- MetricsKit: internal analytics tooling with charting and export.

Representative tooling:
- React, TypeScript, Redux, Next.js
- Node.js, PostgreSQL, Supabase
- CI/testing, Vercel deployment workflows

Open-source note:
- Maintainer of small npm utilities and sample OSS apps.`,
};

/**
 * Edit four long-form segments persisted in Supabase (professional_background table).
 */
export const ProfessionalBackgroundStudio = () => {
  const dispatch = useAppDispatch();
  const loadStatus = useAppSelector((s) => s.professionalBackgroundBuilder.loadStatus);
  const loadError = useAppSelector((s) => s.professionalBackgroundBuilder.error);
  const isSaving = useAppSelector((s) => s.professionalBackgroundBuilder.isSaving);
  const draftSegments = useAppSelector((s) => s.currentProfessionalBackground.draftSegments);
  const committedFingerprint = useAppSelector((s) => s.currentProfessionalBackground.committedFingerprint);
  const updatedAt = useAppSelector((s) => s.currentProfessionalBackground.updatedAt);

  useEffect(() => {
    void dispatch(loadProfessionalBackgroundThunk());
  }, [dispatch]);

  const dirty = useMemo(
    () =>
      getProfessionalBackgroundFingerprint(draftSegments) !== committedFingerprint,
    [draftSegments, committedFingerprint],
  );

  const onSave = async () => {
    await dispatch(saveProfessionalBackgroundThunk());
  };

  const applyStarterContent = () => {
    dispatch(CurrentProfessionalBackgroundActions.syncDraftSegments(STARTER_SEGMENTS));
  };

  if (loadStatus === "loading") {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>Loading Professional Background…</p>
      </div>
    );
  }

  if (loadStatus === "error") {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>Could not load Professional Background</p>
        <p className={styles.emptySub}>{loadError ?? "Unknown error"}</p>
        <button
          type="button"
          className={styles.retryBtn}
          onClick={() => void dispatch(loadProfessionalBackgroundThunk())}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <header className={styles.headerRow}>
        <div>
          <h1 className={styles.h1}>Professional background</h1>
          <p className={styles.muted}>
            Education and narrative text you can reuse in résumés and outreach. Stored in Supabase
            with your technical skills.
          </p>
          {updatedAt ? (
            <p className={styles.savedMeta}>Last saved: {new Date(updatedAt).toLocaleString()}</p>
          ) : null}
        </div>
        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={applyStarterContent}
        >
          Use starter content
        </button>
        <button
          type="button"
          className={styles.saveBtn}
          disabled={!dirty || isSaving}
          onClick={() => void onSave()}
        >
          {isSaving ? "Saving…" : "Save"}
        </button>
      </header>

      <div className={styles.stack}>
        {SEGMENTS.map(({ key, title, hint }) => (
          <label key={key} className={styles.field}>
            <span className={styles.fieldTitle}>{title}</span>
            <span className={styles.fieldHint}>{hint}</span>
            <textarea
              className={styles.textarea}
              rows={key === "portfolio_github" ? 12 : 8}
              value={draftSegments[key]}
              onChange={(e) =>
                dispatch(
                  CurrentProfessionalBackgroundActions.updateDraftSegment({
                    key,
                    value: e.target.value,
                  }),
                )
              }
              spellCheck
            />
          </label>
        ))}
      </div>
    </div>
  );
};

const styles = {
  root: `w-full max-w-3xl space-y-6 p-6`,
  headerRow: `flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between`,
  h1: `text-xl font-semibold text-zinc-900`,
  muted: `mt-1 text-sm text-zinc-500`,
  savedMeta: `mt-1 text-xs text-zinc-400`,
  saveBtn: `${t.btnPrimaryMd} shrink-0`,
  secondaryBtn: `rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50`,
  stack: `flex flex-col gap-8`,
  field: `flex flex-col gap-1`,
  fieldTitle: `text-sm font-semibold text-zinc-900`,
  fieldHint: `text-xs leading-relaxed text-zinc-500`,
  textarea: `${t.formTextarea} min-h-[120px] w-full font-mono text-sm`,
  emptyState: `flex flex-col items-center justify-center gap-2 py-16`,
  emptyTitle: `text-base font-semibold text-gray-900`,
  emptySub: `text-sm text-gray-600`,
  retryBtn: `mt-4 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700`,
};
