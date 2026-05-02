"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase } from "lucide-react";
import { toast } from "sonner";
import { JOB_DETAIL_PAGE_PATH } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/store";
import { createJobFromListingUrlThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { JobRow } from "./JobRow";

const MODAL_TITLE_ID = "crm-company-add-job-url-title";

export const JobsSection = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const companyId = useAppSelector((s) => s.currentCompany.id);
  const jobs = useAppSelector((s) => s.jobs);

  const [modalOpen, setModalOpen] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [busy, setBusy] = useState(false);

  const rows = useMemo(
    () => (companyId ? Object.values(jobs).filter((j) => j.companyId === companyId) : []),
    [jobs, companyId],
  );

  const closeModal = () => {
    setModalOpen(false);
    setUrlInput("");
  };

  const openModal = () => {
    setUrlInput("");
    setModalOpen(true);
  };

  const onSubmitAddFromUrl = async () => {
    if (!companyId || busy) return;
    setBusy(true);
    const result = await dispatch(
      createJobFromListingUrlThunk({ companyId, urlRaw: urlInput }),
    );
    setBusy(false);

    if (result.outcome === "invalid_input") {
      toast.error(
        "Enter a valid posting URL — paste the full https://… link from the job board, not other text.",
      );
      return;
    }
    if (result.outcome === "create_failed") {
      toast.error("Could not create job");
      return;
    }
    if (result.outcome === "import_failed") {
      toast.warning("Job saved, but the listing could not be imported.", {
        description:
          result.error?.trim() ||
          "Check the URL or use Import listing on the job page.",
      });
      closeModal();
      router.push(JOB_DETAIL_PAGE_PATH);
      return;
    }
    toast.success("Job added and listing imported");
    closeModal();
    router.push(JOB_DETAIL_PAGE_PATH);
  };

  return (
    <section className={styles.panel} aria-labelledby="crm-company-jobs-heading">
      <div className={styles.sectionHeader}>
        <h2 id="crm-company-jobs-heading" className={styles.sectionTitle}>
          Jobs
        </h2>
        <div className={styles.sectionAction}>
          <button type="button" className={styles.addButton} onClick={openModal}>
            Add job
          </button>
        </div>
      </div>
      {modalOpen ? (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby={MODAL_TITLE_ID}
        >
          <div className={styles.modal}>
            <h3 id={MODAL_TITLE_ID} className={styles.modalTitle}>
              Add job from posting URL
            </h3>
            <p className={styles.modalBody}>
              The server will fetch this page and fill title and description when possible. Many
              JavaScript-only job boards cannot be scraped.
            </p>
            <label className={styles.label} htmlFor="crm-add-job-url-input">
              Posting URL
            </label>
            <input
              id="crm-add-job-url-input"
              type="url"
              className={styles.input}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://…"
              autoComplete="url"
              disabled={busy}
            />
            <div className={styles.modalButtons}>
              <button type="button" className={styles.cancelBtn} onClick={closeModal} disabled={busy}>
                Cancel
              </button>
              <button
                type="button"
                className={styles.submitBtn}
                disabled={busy}
                onClick={() => void onSubmitAddFromUrl()}
              >
                {busy ? "Working…" : "Add and import"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {rows.length === 0 ? (
        <div className={styles.emptyState}>
          <Briefcase className={styles.emptyIcon} aria-hidden />
          <p className={styles.emptyTitle}>No jobs yet</p>
          <p className={styles.emptyHint}>Track postings and applications for this company.</p>
        </div>
      ) : (
        <div className={styles.tableViewport}>
          <div className={styles.tableShell}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.theadRow}>
                  <th className={styles.thCell}>Title</th>
                  <th className={styles.thCell}>Status</th>
                  <th className={styles.thCell}>URL</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((j) => (
                  <JobRow key={j.id} job={j} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

const styles = {
  panel: t.sectionPanel,
  sectionHeader: t.sectionHeader,
  sectionTitle: t.sectionTitle,
  sectionAction: t.sectionAction,
  addButton: t.btnPrimarySm,
  emptyState: t.emptyState,
  emptyIcon: t.emptyIcon,
  emptyTitle: t.emptyTitle,
  emptyHint: t.emptyHint,
  tableViewport: t.tableViewport,
  tableShell: t.tableShell,
  table: t.table,
  theadRow: t.theadRow,
  thCell: t.thCell,
  overlay: `
    fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4
  `,
  modal: `bg-white rounded-lg shadow-xl max-w-lg w-full p-6`,
  modalTitle: `text-lg font-semibold text-gray-900 mb-2`,
  modalBody: `text-sm text-gray-700 leading-relaxed mb-4`,
  label: `block text-sm font-medium text-gray-800 mb-1`,
  input: `
    w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900
    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
    disabled:bg-gray-100 disabled:cursor-not-allowed
  `,
  modalButtons: `flex justify-end gap-2 mt-5`,
  cancelBtn: `
    px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md
    hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
  `,
  submitBtn: `
    px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md border-none
    hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
  `,
};
