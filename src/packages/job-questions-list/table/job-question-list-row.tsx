"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store";

type JobQuestionListRowProps = {
  questionId: string;
  onSave: (prompt: string) => Promise<void>;
  onDelete: () => Promise<void>;
};

export const JobQuestionListRow = ({ questionId, onSave, onDelete }: JobQuestionListRowProps) => {
  const question = useAppSelector((s) => s.jobQuestions[questionId]);
  const [prompt, setPrompt] = useState(question?.prompt ?? "");
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setPrompt(question?.prompt ?? "");
  }, [question?.id, question?.prompt]);

  if (!question) return null;

  const onSaveClick = async () => {
    setBusy(true);
    await onSave(prompt.trim());
    setBusy(false);
    setEditing(false);
  };

  const onDeleteClick = async () => {
    setBusy(true);
    await onDelete();
    setBusy(false);
  };

  return (
    <tr className={styles.row}>
      <td className={styles.cell}>
        {editing ? (
          <textarea
            className={styles.textarea}
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            aria-label="Edit question prompt"
          />
        ) : (
          <span className={styles.promptPreview}>{question.prompt}</span>
        )}
      </td>
      <td className={styles.cellMuted}>{new Date(question.updatedAt).toLocaleDateString()}</td>
      <td className={styles.actionsCell}>
        {editing ? (
          <>
            <button type="button" className={styles.saveBtn} disabled={busy} onClick={() => void onSaveClick()}>
              Save
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              disabled={busy}
              onClick={() => {
                setPrompt(question.prompt);
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button type="button" className={styles.editBtn} disabled={busy} onClick={() => setEditing(true)}>
              Edit
            </button>
            <button type="button" className={styles.deleteBtn} disabled={busy} onClick={() => void onDeleteClick()}>
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

const styles = {
  row: `border-b border-gray-100 hover:bg-gray-50`,
  cell: `px-3 py-3 align-top`,
  cellMuted: `px-3 py-3 align-top text-gray-500 whitespace-nowrap`,
  promptPreview: `line-clamp-3`,
  textarea: `w-full rounded border border-gray-300 px-2 py-1 text-sm`,
  actionsCell: `px-3 py-3 align-top text-right space-x-2`,
  editBtn: `text-xs font-medium text-blue-600 hover:text-blue-800`,
  saveBtn: `text-xs font-medium text-blue-600 hover:text-blue-800`,
  cancelBtn: `text-xs font-medium text-gray-500 hover:text-gray-700`,
  deleteBtn: `text-xs font-medium text-red-600 hover:text-red-800`,
};
