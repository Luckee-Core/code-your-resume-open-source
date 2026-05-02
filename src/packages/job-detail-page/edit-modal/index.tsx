"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateJobThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

type Props = {
  onClose: () => void;
};

export const JobEditModal = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const job = useAppSelector((s) => s.currentJob);

  const [title, setTitle] = useState(job.title);
  const [url, setUrl] = useState(job.url);
  const [busy, setBusy] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
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
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!job.id || busy) return;
      setBusy(true);
      const status = await dispatch(updateJobThunk({ id: job.id, title: title.trim(), url: url.trim() }));
      setBusy(false);
      if (status === 200) {
        toast.success("Job updated");
        onClose();
      } else {
        toast.error("Could not update job");
      }
    },
    [dispatch, job.id, title, url, busy, onClose],
  );

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="job-edit-title"
    >
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 id="job-edit-title" className={styles.heading}>
            Edit job
          </h2>
          <button type="button" onClick={onClose} className={styles.closeBtn} aria-label="Close">
            <X className={styles.closeIcon} />
          </button>
        </div>

        <form onSubmit={(e) => void handleSubmit(e)} className={styles.form}>
          <label className={t.formLabel}>
            Title
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Senior Engineer"
              className={t.formInput}
            />
          </label>

          <label className={t.formLabel}>
            Posting URL
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://jobs.example.com/posting/123"
              className={t.formInput}
            />
          </label>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" disabled={busy} className={styles.saveBtn}>
              {busy ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  backdrop: `fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4`,
  panel: `w-full max-w-md rounded-xl bg-white shadow-xl`,
  header: `flex items-center justify-between border-b border-gray-100 px-5 py-4`,
  heading: `text-sm font-semibold text-gray-900`,
  closeBtn: `flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600`,
  closeIcon: `h-4 w-4`,
  form: `flex flex-col gap-4 px-5 py-5`,
  actions: `flex justify-end gap-2 pt-1`,
  cancelBtn: `rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-300 hover:text-gray-900`,
  saveBtn: `rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50`,
};
