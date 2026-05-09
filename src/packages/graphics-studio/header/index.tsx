"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteImageGraphicThunk } from "@/store/thunks";
import { ImageCreationStudioEditGraphicModal } from "./edit-graphic-modal";

/**
 * Studio top bar: graphic title, canvas dimensions, ellipsis menu (edit / delete).
 */
export const ImageCreationStudioHeader = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const graphic = useAppSelector((s) => s.currentImageGraphic);

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
        void router.push("/");
      } else {
        toast.error("Could not delete graphic");
      }
    })();
  };

  const title = graphic.title.trim() || "Untitled";
  const dimLabel = `${graphic.canvasWidthPx}×${graphic.canvasHeightPx}px`;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>{title}</h1>
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
