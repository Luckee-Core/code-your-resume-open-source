"use client";

import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { loadVoiceStyleThunk, saveVoiceStyleThunk } from "@/store/thunks";
import { CurrentVoiceStyleActions } from "@/store/current/currentVoiceStyle";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { getVoiceStyleFingerprint } from "@/utils/voice-style";

const STARTER_BODY = `Core voice:
- Consultative peer, concrete over abstract, one clear CTA.
- Explain what's possible without hype.

Channel notes:
- Email outreach: short plain-language opener, problem-first framing.
- Technical blogs: outcome-led headings, practical constraints, copy-paste examples.
- Plain-text channels: no markdown formatting, direct and concise.`;

/**
 * Edit singleton voice/tone notes persisted in Supabase (voice_style table).
 */
export const VoiceStyleStudio = () => {
  const dispatch = useAppDispatch();
  const loadStatus = useAppSelector((s) => s.voiceStyleBuilder.loadStatus);
  const loadError = useAppSelector((s) => s.voiceStyleBuilder.error);
  const isSaving = useAppSelector((s) => s.voiceStyleBuilder.isSaving);
  const draftBody = useAppSelector((s) => s.currentVoiceStyle.draftBody);
  const committedFingerprint = useAppSelector((s) => s.currentVoiceStyle.committedFingerprint);
  const updatedAt = useAppSelector((s) => s.currentVoiceStyle.updatedAt);

  useEffect(() => {
    void dispatch(loadVoiceStyleThunk());
  }, [dispatch]);

  const dirty = useMemo(
    () => getVoiceStyleFingerprint(draftBody) !== committedFingerprint,
    [draftBody, committedFingerprint],
  );

  const onSave = async () => {
    await dispatch(saveVoiceStyleThunk());
  };

  const applyStarterContent = () => {
    dispatch(CurrentVoiceStyleActions.syncDraftBody(STARTER_BODY));
  };

  if (loadStatus === "loading") {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>Loading voice style…</p>
      </div>
    );
  }

  if (loadStatus === "error") {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>Could not load voice style</p>
        <p className={styles.emptyHint}>{loadError ?? "Unknown error"}</p>
        <button
          type="button"
          className={styles.retryButton}
          onClick={() => void dispatch(loadVoiceStyleThunk())}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Voice style</h1>
          <p className={styles.subtitle}>
            Tone and channel notes for cover letters and application answers. Work history lives in
            Projects.
          </p>
          {updatedAt ? (
            <p className={styles.meta}>Last saved {new Date(updatedAt).toLocaleString()}</p>
          ) : null}
        </div>
        <div className={styles.headerActions}>
          <button type="button" className={styles.secondaryButton} onClick={applyStarterContent}>
            Use starter template
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            disabled={!dirty || isSaving}
            onClick={() => void onSave()}
          >
            {isSaving ? "Saving…" : dirty ? "Save changes" : "Saved"}
          </button>
        </div>
      </header>

      <section className={styles.editorSection}>
        <label className={styles.label} htmlFor="voice-style-body">
          Voice & style notes
        </label>
        <p className={styles.hint}>
          Summarize how you write: sentence length, tone, channel-specific rules, and phrases to
          avoid. AI generation reads this alongside your projects.
        </p>
        <textarea
          id="voice-style-body"
          className={styles.textarea}
          value={draftBody}
          rows={18}
          onChange={(e) =>
            dispatch(CurrentVoiceStyleActions.syncDraftBody(e.target.value))
          }
        />
      </section>
    </div>
  );
};

const styles = {
  root: `${t.narrowWrap} flex flex-col gap-6`,
  header: `flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between`,
  title: `text-2xl font-semibold text-slate-900`,
  subtitle: `mt-1 max-w-2xl text-sm text-slate-600`,
  meta: `mt-2 text-xs text-slate-500`,
  headerActions: `flex shrink-0 flex-wrap gap-2`,
  primaryButton: `rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50`,
  secondaryButton: `rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700`,
  editorSection: `rounded-lg border border-slate-200 bg-white p-4 shadow-sm`,
  label: `text-sm font-medium text-slate-900`,
  hint: `mt-1 text-xs text-slate-500`,
  textarea: `mt-3 w-full resize-y rounded-md border border-slate-200 px-3 py-2 font-mono text-sm leading-relaxed text-slate-800 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400`,
  emptyState: `mx-auto max-w-lg px-4 py-16 text-center`,
  emptyTitle: `text-lg font-medium text-slate-900`,
  emptyHint: `mt-2 text-sm text-slate-600`,
  retryButton: `mt-4 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white`,
};
