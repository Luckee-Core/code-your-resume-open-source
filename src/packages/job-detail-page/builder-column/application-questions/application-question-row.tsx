"use client";

import { useEffect, useState } from "react";
import type { JobQuestion } from "@/model/job-question";
import type { JobQuestionAnswer } from "@/model/job-question-answer";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

type ApplicationQuestionRowProps = {
  question: JobQuestion;
  answerRow: JobQuestionAnswer;
  onSavePrompt: (prompt: string) => Promise<void>;
  onSaveAnswer: (answer: string) => Promise<void>;
  onRemove: () => Promise<void>;
};

export const ApplicationQuestionRow = ({
  question,
  answerRow,
  onSavePrompt,
  onSaveAnswer,
  onRemove,
}: ApplicationQuestionRowProps) => {
  const [prompt, setPrompt] = useState(question.prompt);
  const [answer, setAnswer] = useState(answerRow.answer);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setPrompt(question.prompt);
  }, [question.id, question.prompt]);

  useEffect(() => {
    setAnswer(answerRow.answer);
  }, [answerRow.id, answerRow.answer]);

  const onCopyAnswer = async () => {
    try {
      await navigator.clipboard.writeText(answer);
    } catch {
      // clipboard may be unavailable
    }
  };

  const onSave = async () => {
    setBusy(true);
    if (prompt.trim() !== question.prompt) {
      await onSavePrompt(prompt.trim());
    }
    if (answer !== answerRow.answer) {
      await onSaveAnswer(answer);
    }
    setBusy(false);
  };

  return (
    <li className={styles.card}>
      <label className={styles.label} htmlFor={`job-q-prompt-${answerRow.id}`}>
        Question
      </label>
      <textarea
        id={`job-q-prompt-${answerRow.id}`}
        className={styles.textarea}
        rows={2}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <label className={styles.label} htmlFor={`job-q-answer-${answerRow.id}`}>
        Answer
      </label>
      <textarea
        id={`job-q-answer-${answerRow.id}`}
        className={styles.textarea}
        rows={5}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <div className={styles.actions}>
        <button type="button" className={styles.saveBtn} disabled={busy} onClick={() => void onSave()}>
          Save
        </button>
        <button type="button" className={styles.copyBtn} disabled={busy} onClick={() => void onCopyAnswer()}>
          Copy answer
        </button>
        <button type="button" className={styles.removeBtn} disabled={busy} onClick={() => void onRemove()}>
          Remove
        </button>
      </div>
    </li>
  );
};

const styles = {
  card: `rounded border border-gray-200 bg-white p-3 space-y-2`,
  label: `text-xs font-semibold uppercase tracking-wider text-gray-600`,
  textarea: `${t.formTextarea} w-full text-xs`,
  actions: `flex flex-wrap gap-2 pt-1`,
  saveBtn: t.btnPrimarySm,
  copyBtn: `rounded border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50`,
  removeBtn: `rounded border border-red-300 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-50`,
};
