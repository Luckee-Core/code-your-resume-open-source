"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type Props = {
  onSubmit: (name: string, website: string) => void;
  onClose: () => void;
};

export const CreateCompanyModal = ({ onSubmit, onClose }: Props) => {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
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
      if (!name.trim()) return;
      onSubmit(name.trim(), website.trim());
    },
    [name, website, onSubmit],
  );

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-company-title"
    >
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 id="create-company-title" className={styles.title}>
            New company
          </h2>
          <button type="button" onClick={onClose} className={styles.closeButton} aria-label="Close">
            <X className={styles.closeIcon} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="company-name" className={styles.label}>
              Company name <span className={styles.required}>*</span>
            </label>
            <input
              id="company-name"
              ref={nameRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Acme Corp"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="company-website" className={styles.label}>
              Website
            </label>
            <input
              id="company-website"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://acme.com"
              className={styles.input}
            />
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" disabled={!name.trim()} className={styles.submitButton}>
              Create
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
    w-full max-w-md rounded-xl bg-white shadow-xl
  `,
  header: `flex items-center justify-between border-b border-gray-100 px-5 py-4`,
  title: `text-sm font-semibold text-gray-900`,
  closeButton: `
    flex h-7 w-7 items-center justify-center rounded-md text-gray-400
    hover:bg-gray-100 hover:text-gray-600
  `,
  closeIcon: `h-4 w-4`,
  form: `flex flex-col gap-4 px-5 py-5`,
  field: `flex flex-col gap-1`,
  label: `text-xs font-medium text-gray-700`,
  required: `text-red-500`,
  input: `
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
