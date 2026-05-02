"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import type { JobStatus } from "@/model/job";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteJobThunk, importJobListingThunk, updateJobThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { JobEditModal } from "../edit-modal";

const statuses: JobStatus[] = ["draft", "applied", "closed", "archived"];

export const JobHeader = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const job = useAppSelector((s) => s.currentJob);
  const companies = useAppSelector((s) => s.companies);
  const companyName = job.companyId ? companies[job.companyId]?.name : undefined;

  const [menuOpen, setMenuOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [importing, setImporting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [menuOpen]);

  const onChangeStatus = useCallback(
    async (status: JobStatus) => {
      if (!job.id) return;
      const result = await dispatch(updateJobThunk({ id: job.id, status }));
      if (result === 200) {
        toast.success("Status updated");
      } else {
        toast.error("Update failed");
      }
    },
    [dispatch, job.id],
  );

  const onImport = useCallback(async () => {
    if (!job.id || importing) return;
    setMenuOpen(false);
    setImporting(true);
    const status = await dispatch(importJobListingThunk(job.id));
    setImporting(false);
    if (status === 200) {
      toast.success("Listing imported");
    } else if (status === 500) {
      toast.error("Server error while importing");
    } else {
      toast.error("Could not import listing. Check the posting URL (many job boards are JS-only).");
    }
  }, [dispatch, job.id, importing]);

  const onEdit = useCallback(() => {
    setMenuOpen(false);
    setShowEditModal(true);
  }, []);

  const onDelete = useCallback(async () => {
    if (!job.id) return;
    setMenuOpen(false);
    if (!window.confirm("Delete this job?")) return;
    const status = await dispatch(deleteJobThunk(job.id));
    if (status === 200) {
      toast.success("Job deleted");
      router.push("/jobs");
    } else {
      toast.error("Could not delete job");
    }
  }, [dispatch, job.id, router]);

  const canImport = !!job.id && !!job.url.trim() && !importing;

  return (
    <>
      <header>
        <div className={styles.headerCard}>
          <div className={styles.headerOneLine}>
            <div className={styles.titleBlock}>
              <h2 className={styles.businessTitle}>{job.title.trim() || "Untitled job"}</h2>
              {companyName ? <span className={styles.companyLine}>at {companyName}</span> : null}
            </div>
            <div className={styles.headerActions}>
              <label className={styles.labelInline}>
                Status
                <select
                  className={styles.selectSm}
                  value={job.status}
                  onChange={(e) => void onChangeStatus(e.target.value as JobStatus)}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <div ref={menuRef} className={styles.menuWrap}>
                <button
                  type="button"
                  className={styles.ellipsisBtn}
                  aria-label="More actions"
                  onClick={() => setMenuOpen((o) => !o)}
                >
                  <MoreHorizontal className={styles.ellipsisIcon} />
                </button>

                {menuOpen ? (
                  <div className={styles.dropdown}>
                    <button
                      type="button"
                      className={styles.menuItem}
                      onClick={() => void onImport()}
                      disabled={!canImport}
                    >
                      {importing ? "Importing…" : "Import listing"}
                    </button>
                    <button type="button" className={styles.menuItem} onClick={onEdit}>
                      Edit
                    </button>
                    <div className={styles.menuDivider} />
                    <button
                      type="button"
                      className={styles.menuItemDanger}
                      onClick={() => void onDelete()}
                    >
                      Delete job
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>

      {showEditModal ? <JobEditModal onClose={() => setShowEditModal(false)} /> : null}
    </>
  );
};

const styles = {
  headerCard: t.headerCard,
  headerOneLine: t.headerOneLine,
  titleBlock: `flex min-w-0 flex-1 flex-col gap-0.5`,
  businessTitle: t.headerPrimaryTitle,
  companyLine: `text-xs text-gray-500 truncate`,
  headerActions: t.headerActions,
  labelInline: t.labelInline,
  selectSm: t.selectSm,
  menuWrap: `relative`,
  ellipsisBtn: `
    flex h-7 w-7 items-center justify-center rounded-md border border-gray-300
    bg-white text-gray-600 shadow-sm hover:bg-gray-50
  `,
  ellipsisIcon: `h-4 w-4`,
  dropdown: `
    absolute right-0 top-full z-30 mt-1 min-w-[160px] rounded-lg border border-gray-200
    bg-white py-1 shadow-lg
  `,
  menuItem: `
    flex w-full items-center px-3 py-2 text-left text-xs text-gray-700
    hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40
  `,
  menuDivider: `my-1 border-t border-gray-100`,
  menuItemDanger: `
    flex w-full items-center px-3 py-2 text-left text-xs text-red-600
    hover:bg-red-50
  `,
};
