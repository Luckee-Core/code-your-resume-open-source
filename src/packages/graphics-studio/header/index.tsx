"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { DASHBOARD_PATH, JOB_DETAIL_PAGE_PATH } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/store";
import { CurrentJobActions } from "@/store/current/currentJob";
import { deleteImageGraphicThunk } from "@/store/thunks";
import { ImageCreationStudioEditGraphicModal } from "./edit-graphic-modal";

/**
 * Studio top bar: graphic title, linked job/company/status, canvas dimensions, ellipsis menu.
 */
export const ImageCreationStudioHeader = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const graphic = useAppSelector((s) => s.currentImageGraphic);
  const jobs = useAppSelector((s) => s.jobs);
  const companies = useAppSelector((s) => s.companies);

  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
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

  const onEdit = () => {
    setMenuOpen(false);
    setEditOpen(true);
  };

  const onDelete = () => {
    void (async () => {
      setMenuOpen(false);
      if (!graphic.id) return;
      if (!window.confirm("Delete this graphic? This cannot be undone.")) {
        return;
      }
      const status = await dispatch(deleteImageGraphicThunk(graphic.id));
      if (status === 200) {
        toast.success("Graphic deleted");
        void router.push(DASHBOARD_PATH);
      } else {
        toast.error("Could not delete graphic");
      }
    })();
  };

  const title = graphic.title.trim() || "Untitled";
  const dimLabel = `${graphic.canvasWidthPx}×${graphic.canvasHeightPx}px`;

  const linkedJobId = graphic.jobId.trim();
  const job = linkedJobId ? jobs[linkedJobId] : undefined;
  const companyName = job?.companyId ? companies[job.companyId]?.name?.trim() : undefined;
  const jobContextLabel = job
    ? [companyName, job.title.trim()].filter(Boolean).join(" · ")
    : linkedJobId
      ? "Linked job"
      : "";

  const onOpenJob = () => {
    if (!job) return;
    dispatch(CurrentJobActions.setCurrentJob(job));
    router.push(JOB_DETAIL_PAGE_PATH);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>{title}</h1>
          {jobContextLabel ? (
            job ? (
              <div className={styles.jobContextRow}>
                <button type="button" className={styles.jobContextBtn} onClick={onOpenJob}>
                  {jobContextLabel}
                </button>
                <span className={styles.jobStatus} aria-label={`Job status: ${job.status}`}>
                  {job.status}
                </span>
              </div>
            ) : (
              <p className={styles.jobContextMuted}>{jobContextLabel}</p>
            )
          ) : null}
          <p className={styles.meta}>
            Canvas <span className={styles.metaStrong}>{dimLabel}</span>
          </p>
        </div>

        <div ref={menuRef} className={styles.menuWrap}>
          <button
            type="button"
            className={styles.ellipsisBtn}
            aria-label="Graphic actions"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <MoreHorizontal className={styles.ellipsisIcon} aria-hidden />
          </button>
          {menuOpen ? (
            <div className={styles.dropdown} role="menu">
              <button type="button" className={styles.menuItem} role="menuitem" onClick={onEdit}>
                Edit
              </button>
              <div className={styles.menuDivider} aria-hidden />
              <button type="button" className={styles.menuItemDanger} role="menuitem" onClick={onDelete}>
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </header>

      <ImageCreationStudioEditGraphicModal open={editOpen} onClose={() => setEditOpen(false)} />
    </>
  );
};

const styles = {
  header: `
    flex shrink-0 items-start justify-between gap-3 rounded-sm border border-gray-200 bg-white px-4 py-3 shadow-sm
  `,
  titleBlock: `min-w-0 flex-1`,
  title: `
    truncate text-base font-semibold text-gray-900
  `,
  jobContextRow: `mt-0.5 flex min-w-0 flex-wrap items-center gap-2`,
  jobContextBtn: `
    min-w-0 max-w-full truncate text-left text-xs font-medium text-blue-700
    hover:text-blue-800 hover:underline
  `,
  jobStatus: `
    shrink-0 rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-medium
    uppercase tracking-wide text-gray-600
  `,
  jobContextMuted: `mt-0.5 truncate text-xs text-gray-500`,
  meta: `mt-0.5 text-xs text-gray-500`,
  metaStrong: `font-medium text-gray-700`,
  menuWrap: `relative shrink-0`,
  ellipsisBtn: `
    flex h-8 w-8 items-center justify-center rounded-md border border-gray-300
    bg-white text-gray-600 shadow-sm hover:bg-gray-50
  `,
  ellipsisIcon: `h-4 w-4`,
  dropdown: `
    absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-lg border border-gray-200
    bg-white py-1 shadow-lg
  `,
  menuItem: `
    flex w-full items-center px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50
  `,
  menuDivider: `my-1 border-t border-gray-100`,
  menuItemDanger: `
    flex w-full items-center px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50
  `,
};
