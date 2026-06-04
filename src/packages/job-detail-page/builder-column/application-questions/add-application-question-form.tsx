"use client";

import { useState } from "react";
import type { JobQuestion } from "@/model/job-question";

type AddApplicationQuestionFormProps = {
  availableQuestions: JobQuestion[];
  onAddExisting: (jobQuestionId: string) => void;
  onAddNew: (prompt: string, answer: string) => void;
};

export const AddApplicationQuestionForm = ({
  availableQuestions,
  onAddExisting,
  onAddNew,
}: AddApplicationQuestionFormProps) => {
  const [mode, setMode] = useState<"existing" | "new">("existing");
  const [selectedId, setSelectedId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  const onSubmit = () => {
    if (mode === "existing") {
      if (!selectedId) return;
      onAddExisting(selectedId);
      setSelectedId("");
      return;
    }
    if (!prompt.trim()) return;
    onAddNew(prompt.trim(), answer);
    setPrompt("");
    setAnswer("");
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.modeRow}>
        <button
          type="button"
          className={styles.modeBtn(mode === "existing")}
          onClick={() => setMode("existing")}
        >
          Existing question
        </button>
        <button
          type="button"
          className={styles.modeBtn(mode === "new")}
          onClick={() => setMode("new")}
        >
          New question
        </button>
      </div>

      {mode === "existing" ? (
        <div className={styles.row}>
          <select
            className={styles.select}
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            aria-label="Pick existing question"
          >
            <option value="">Select a question…</option>
            {availableQuestions.map((q) => (
              <option key={q.id} value={q.id}>
                {q.prompt.length > 80 ? `${q.prompt.slice(0, 80)}…` : q.prompt}
              </option>
            ))}
          </select>
          <button
            type="button"
            className={styles.addBtn}
            disabled={!selectedId}
            onClick={onSubmit}
          >
            Link
          </button>
        </div>
      ) : (
        <div className={styles.newStack}>
          <textarea
            className={styles.textarea}
            rows={2}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Question prompt"
            aria-label="New question prompt"
          />
          <textarea
            className={styles.textarea}
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer for this job"
            aria-label="Answer for this job"
          />
          <button
            type="button"
            className={styles.addBtn}
            disabled={!prompt.trim()}
            onClick={onSubmit}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrap: `rounded border border-gray-200 bg-gray-50 p-3 space-y-3`,
  modeRow: `flex gap-2`,
  modeBtn: (active: boolean) =>
    `rounded px-2 py-1 text-xs font-medium ${
      active ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-300"
    }`,
  row: `flex items-center gap-2`,
  select: `flex-1 rounded border border-gray-300 px-2 py-1.5 text-xs text-gray-800`,
  newStack: `space-y-2`,
  textarea: `w-full rounded border border-gray-300 px-2 py-1.5 text-xs text-gray-800`,
  addBtn: `rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50`,
};
