"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import {
  createJobQuestionThunk,
  deleteJobQuestionThunk,
  loadJobQuestionsThunk,
  updateJobQuestionThunk,
} from "@/store/thunks";
import { JobQuestionListRow } from "./table/job-question-list-row";

/**
 * Catalog of reusable application-form questions.
 */
export const JobQuestionsList = () => {
  const dispatch = useAppDispatch();
  const questionsMap = useAppSelector((s) => s.jobQuestions);
  const [newPrompt, setNewPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      await dispatch(loadJobQuestionsThunk());
      setLoading(false);
    })();
  }, [dispatch]);

  const questionIds = useMemo(
    () =>
      Object.values(questionsMap)
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .map((q) => q.id),
    [questionsMap],
  );

  const onAdd = async () => {
    const prompt = newPrompt.trim();
    if (!prompt) {
      toast.error("Enter a question prompt");
      return;
    }
    setBusy(true);
    const status = await dispatch(createJobQuestionThunk({ prompt }));
    setBusy(false);
    if (status === 200) {
      toast.success("Question added");
      setNewPrompt("");
    } else {
      toast.error("Could not add question");
    }
  };

  return (
    <div className={styles.pageWrap}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Job questions</h1>
        <p className={styles.muted}>Reusable application prompts. Link them to jobs from job detail.</p>
      </header>

      <div className={styles.addRow}>
        <textarea
          className={styles.textarea}
          rows={3}
          value={newPrompt}
          onChange={(e) => setNewPrompt(e.target.value)}
          placeholder="Paste or type a question prompt…"
          aria-label="New question prompt"
        />
        <button type="button" className={styles.addBtn} disabled={busy} onClick={() => void onAdd()}>
          {busy ? "Saving…" : "Add question"}
        </button>
      </div>

      {loading ? <p className={t.emptyMessage}>Loading…</p> : null}

      {!loading && questionIds.length === 0 ? (
        <p className={styles.empty}>{t.emptyMessage}</p>
      ) : (
        <div className={t.tableShell}>
          <table className={t.table}>
            <thead>
              <tr className={t.theadRow}>
                <th className={t.thCell}>Prompt</th>
                <th className={`${t.thCell} w-36`}>Updated</th>
                <th className={t.thCellRight}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questionIds.map((id) => (
                <JobQuestionListRow
                  key={id}
                  questionId={id}
                  onDelete={async () => {
                    const status = await dispatch(deleteJobQuestionThunk(id));
                    if (status === 200) {
                      toast.success("Question deleted");
                    } else if (status === 400) {
                      toast.error("Remove job links before deleting this question");
                    } else {
                      toast.error("Delete failed");
                    }
                  }}
                  onSave={async (prompt) => {
                    const status = await dispatch(updateJobQuestionThunk({ id, prompt }));
                    if (status === 200) {
                      toast.success("Question saved");
                    } else {
                      toast.error("Save failed");
                    }
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  pageWrap: `${t.pageWrap} space-y-4`,
  header: `space-y-1`,
  h1: `text-xl font-semibold text-gray-900`,
  muted: `text-sm text-gray-500`,
  empty: `text-sm italic text-gray-400`,
  addRow: `${t.formDashedBox} space-y-2`,
  textarea: t.formTextarea,
  addBtn: t.btnPrimaryMd,
} as const;
