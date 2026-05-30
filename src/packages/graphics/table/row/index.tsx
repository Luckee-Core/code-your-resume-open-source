"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteImageGraphicThunk, openImageGraphicStudioByIdThunk } from "@/store/thunks";
import { formatDateMedium } from "@/utils/date-time";

type ImageGraphicsTableRowProps = {
  graphicId: string;
};

export const ImageGraphicsTableRow = (props: ImageGraphicsTableRowProps) => {
  const { graphicId } = props;
  const graphic = useAppSelector((s) => s.imageGraphics[graphicId]);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
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

  if (!graphic) return null;

  const handleOpenStudio = () => {
    void (async () => {
      const code = await dispatch(openImageGraphicStudioByIdThunk(graphicId));
      if (code !== 200) {
        toast.error("Could not open studio");
        return;
      }
      startTransition(() => {
        router.push("/studio");
      });
    })();
  };

  const onEdit = () => {
    setMenuOpen(false);
    handleOpenStudio();
  };

  const onDelete = () => {
    void (async () => {
      setMenuOpen(false);
      if (!window.confirm("Delete this graphic? This cannot be undone.")) {
        return;
      }
      const status = await dispatch(deleteImageGraphicThunk(graphicId));
      if (status === 200) {
        toast.success("Graphic deleted");
      } else {
        toast.error("Could not delete graphic");
      }
    })();
  };

  return (
    <tr className={styles.tr}>
      <td className={styles.td}>
        <button type="button" className={styles.titleLink} onClick={handleOpenStudio}>
          {graphic.title || "Untitled"}
        </button>
      </td>
      <td className={styles.tdMuted}>
        {graphic.canvasWidthPx}×{graphic.canvasHeightPx}
      </td>
      <td className={styles.tdMuted}>{formatDateMedium(graphic.updatedAt)}</td>
      <td className={styles.tdActions}>
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
      </td>
    </tr>
  );
};

const styles = {
  tr: `
    hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0
  `,
  td: `px-3 py-2 align-top text-sm text-gray-900`,
  tdMuted: `px-3 py-2 align-top text-sm text-gray-500 whitespace-nowrap`,
  tdActions: `
    px-2 py-2 align-middle text-right w-[3rem]
  `,
  titleLink: `
    block w-full text-left font-semibold text-gray-900
    hover:text-orange-600 hover:underline
    cursor-pointer bg-transparent border-0 p-0
  `,
  menuWrap: `relative inline-flex`,
  ellipsisBtn: `
    inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300
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
