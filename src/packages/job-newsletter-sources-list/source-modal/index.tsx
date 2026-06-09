"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { JobNewsletterSource } from "@/model/job-newsletter-source";

export type SourceModalValues = {
  name: string;
  senderEmail: string;
  enabled: boolean;
  parseInstructions: string;
};

type Props = {
  mode: "create" | "edit";
  initial?: JobNewsletterSource;
  busy?: boolean;
  onSubmit: (values: SourceModalValues) => void;
  onClose: () => void;
};

export const SourceModal = ({ mode, initial, busy = false, onSubmit, onClose }: Props) => {
  const [name, setName] = useState(initial?.name ?? "");
  const [senderEmail, setSenderEmail] = useState(initial?.senderEmail ?? "");
  const [enabled, setEnabled] = useState(initial?.enabled ?? true);
  const [parseInstructions, setParseInstructions] = useState(initial?.parseInstructions ?? "");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim() || !senderEmail.trim() || !parseInstructions.trim()) return;
      onSubmit({
        name: name.trim(),
        senderEmail: senderEmail.trim(),
        enabled,
        parseInstructions: parseInstructions.trim(),
      });
    },
    [name, senderEmail, enabled, parseInstructions, onSubmit],
  );

  const title = mode === "create" ? "New newsletter source" : "Edit newsletter source";
  const submitLabel = mode === "create" ? "Create" : "Save";

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-source-modal-title"
    >
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 id="newsletter-source-modal-title" className={styles.title}>
            {title}
          </h2>
          <button type="button" onClick={onClose} className={styles.closeButton} aria-label="Close">
            <X className={styles.closeIcon} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="source-name" className={styles.label}>
                Name <span className={styles.required}>*</span>
              </label>
              <input
                id="source-name"
                ref={nameRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Matcha daily digest"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="source-sender" className={styles.label}>
                Sender email <span className={styles.required}>*</span>
              </label>
              <input
                id="source-sender"
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="fico@matcha.fm"
                className={styles.input}
                required
              />
            </div>
          </div>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
            Enabled for email ingest
          </label>

          <div className={styles.field}>
            <label htmlFor="source-instructions" className={styles.label}>
              Parse instructions <span className={styles.required}>*</span>
            </label>
            <textarea
              id="source-instructions"
              rows={6}
              value={parseInstructions}
              onChange={(e) => setParseInstructions(e.target.value)}
              placeholder="Describe how jobs appear in this newsletter so AI can extract title, company, URL, description, and salary…"
              className={styles.textarea}
              required
            />
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                busy || !name.trim() || !senderEmail.trim() || !parseInstructions.trim()
              }
              className={styles.submitButton}
            >
              {busy ? "Saving…" : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  backdrop: `
    fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4
  `,
  panel: `
    w-full max-w-lg rounded-xl bg-white shadow-xl
  `,
  header: `flex items-center justify-between border-b border-gray-100 px-5 py-4`,
  title: `text-sm font-semibold text-gray-900`,
  closeButton: `
    flex h-7 w-7 items-center justify-center rounded-md text-gray-400
    hover:bg-gray-100 hover:text-gray-600
  `,
  closeIcon: `h-4 w-4`,
  form: `flex flex-col gap-4 px-5 py-5`,
  fieldRow: `grid gap-4 sm:grid-cols-2`,
  field: `flex flex-col gap-1`,
  label: `text-xs font-medium text-gray-700`,
  required: `text-red-500`,
  checkboxLabel: `flex items-center gap-2 text-xs font-medium text-gray-700`,
  input: `
    rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm
    placeholder:text-gray-400 focus:border-[#FF7C1E] focus:outline-none focus:ring-1 focus:ring-[#FF7C1E]
  `,
  textarea: `
    rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm
    placeholder:text-gray-400 focus:border-[#FF7C1E] focus:outline-none focus:ring-1 focus:ring-[#FF7C1E]
  `,
  actions: `flex justify-end gap-2 pt-1`,
  cancelButton: `
    rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600
    hover:border-gray-300 hover:text-gray-900
  `,
  submitButton: `
    rounded-md bg-[#FF7C1E] px-3 py-1.5 text-xs font-medium text-white
    hover:bg-[#e66b10] disabled:cursor-not-allowed disabled:opacity-50
  `,
};
