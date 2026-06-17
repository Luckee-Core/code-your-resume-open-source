"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { PROJECTS_PATH } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteProjectThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { EditProjectModal } from "../edit";
import { ProjectSynthesizeModal } from "../synthesize-modal";

export const ProjectDetailHeader = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const project = useAppSelector((s) => s.currentProject);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSynthesizeModal, setShowSynthesizeModal] = useState(false);
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

  const onEdit = useCallback(() => {
    setMenuOpen(false);
    setShowEditModal(true);
  }, []);

  const onSynthesize = useCallback(() => {
    setMenuOpen(false);
    setShowSynthesizeModal(true);
  }, []);

  const onDelete = useCallback(async () => {
    if (!project.id) return;
    setMenuOpen(false);
    if (!window.confirm("Delete this project and all its notes?")) return;
    const status = await dispatch(deleteProjectThunk(project.id));
    if (status === 200) {
      toast.success("Project deleted");
      router.push(PROJECTS_PATH);
    } else {
      toast.error("Could not delete project");
    }
  }, [dispatch, project.id, router]);

  const postingHref = project.url.trim()
    ? project.url.trim().startsWith("http")
      ? project.url.trim()
      : `https://${project.url.trim()}`
    : "";

  return (
    <>
      <header>
        <div className={styles.headerCard}>
          <div className={styles.headerOneLine}>
            <div className={styles.headerTitleRow}>
              <h2 className={styles.businessTitle}>
                {project.businessName.trim() || "Untitled project"}
              </h2>
            </div>
            <div className={styles.headerActions}>
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
                    <button type="button" className={styles.menuItem} onClick={onEdit}>
                      Edit
                    </button>
                    <button type="button" className={styles.menuItem} onClick={onSynthesize}>
                      Synthesize notes
                    </button>
                    <div className={styles.menuDivider} />
                    <button
                      type="button"
                      className={styles.menuItemDanger}
                      onClick={() => void onDelete()}
                    >
                      Delete project
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {postingHref ? (
            <div className={styles.metaRow}>
              <a
                className={styles.postingLink}
                href={postingHref}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink className={styles.postingIcon} aria-hidden />
                Project website
              </a>
            </div>
          ) : null}
        </div>
      </header>

      {showEditModal ? (
        <EditProjectModal open onClose={() => setShowEditModal(false)} />
      ) : null}
      {showSynthesizeModal ? (
        <ProjectSynthesizeModal onClose={() => setShowSynthesizeModal(false)} />
      ) : null}
    </>
  );
};

const styles = {
  headerCard: t.headerCard,
  headerOneLine: t.headerOneLine,
  headerTitleRow: t.headerTitleRow,
  businessTitle: t.headerPrimaryTitle,
  headerActions: t.headerActions,
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
  metaRow: `mt-2 border-t border-gray-100 pt-2`,
  postingLink: `
    inline-flex shrink-0 items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-medium
    text-orange-700 shadow-sm hover:bg-orange-50
  `,
  postingIcon: `h-3.5 w-3.5`,
};
