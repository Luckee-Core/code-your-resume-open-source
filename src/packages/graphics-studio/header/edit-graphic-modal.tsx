"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { patchImageGraphicDetailsThunk } from "@/store/thunks";

type ImageCreationStudioEditGraphicModalProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Modal to edit the current graphic title and canvas dimensions (local vault).
 */
export const ImageCreationStudioEditGraphicModal = (props: ImageCreationStudioEditGraphicModalProps) => {
  const { open, onClose } = props;
  const dispatch = useAppDispatch();
  const graphic = useAppSelector((s) => s.currentImageGraphic);

  const [titleDraft, setTitleDraft] = useState("");
  const [widthPx, setWidthPx] = useState(960);
  const [heightPx, setHeightPx] = useState(540);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open || !graphic.id) {
      return;
    }
    setTitleDraft(graphic.title);
    setWidthPx(graphic.canvasWidthPx);
    setHeightPx(graphic.canvasHeightPx);
  }, [open, graphic.id, graphic.title, graphic.canvasWidthPx, graphic.canvasHeightPx]);

  const handleSave = async () => {
    const w = Math.round(widthPx);
    const h = Math.round(heightPx);
    if (!Number.isFinite(w) || !Number.isFinite(h) || w < 64 || h < 64) {
      toast.error("Width and height must be numbers of at least 64px");
      return;
    }
    setSaving(true);
    const status = await dispatch(
      patchImageGraphicDetailsThunk({
        title: titleDraft.trim() || "Untitled graphic",
        canvasWidthPx: w,
        canvasHeightPx: h,
      }),
    );
    setSaving(false);
    if (status === 200) {
      toast.success("Graphic updated");
      onClose();
    } else {
      toast.error("Could not save changes");
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className={styles.backdrop} role="presentation" onClick={onClose}>
      <div
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-labelledby="studio-edit-graphic-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="studio-edit-graphic-title" className={styles.h2}>
          Edit graphic
        </h2>
        <label className={styles.label}>
          <span className={styles.labelText}>Title</span>
          <input
            type="text"
            className={styles.input}
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            placeholder="e.g. Reddit banner"
            autoFocus
          />
        </label>

        <div className={styles.dimSection}>
          <p className={styles.sectionTitle}>Canvas size (px)</p>
          <div className={styles.dimRow}>
            <label className={styles.dimField}>
              <span className={styles.labelText}>Width</span>
              <input
                type="number"
                className={styles.input}
                min={64}
                max={8192}
                value={widthPx || ""}
                onChange={(e) => {
                  const n = parseInt(e.target.value, 10);
                  setWidthPx(Number.isFinite(n) ? n : 0);
                }}
              />
            </label>
            <label className={styles.dimField}>
              <span className={styles.labelText}>Height</span>
              <input
                type="number"
                className={styles.input}
                min={64}
                max={8192}
                value={heightPx || ""}
                onChange={(e) => {
                  const n = parseInt(e.target.value, 10);
                  setHeightPx(Number.isFinite(n) ? n : 0);
                }}
              />
            </label>
          </div>
          <p className={styles.dimHint}>Between 64 and 8192 pixels per side.</p>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancel} onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button type="button" className={styles.primary} onClick={() => void handleSave()} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  backdrop: `
    fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4
  `,
  card: `
    w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow-lg
  `,
  h2: `text-sm font-semibold text-gray-900`,
  label: `mt-3 flex flex-col gap-1`,
  labelText: `text-xs font-medium text-gray-700`,
  input: `
    w-full rounded-md border border-gray-300 px-2 py-1.5 text-xs text-gray-900
    focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500
  `,
  dimSection: `mt-4`,
  sectionTitle: `text-xs font-semibold text-gray-900`,
  dimRow: `mt-2 grid grid-cols-2 gap-2`,
  dimField: `flex min-w-0 flex-col gap-1`,
  dimHint: `mt-1.5 text-[11px] text-gray-500`,
  actions: `mt-4 flex justify-end gap-2`,
  cancel: `
    rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-800
    hover:bg-gray-50 disabled:opacity-50
  `,
  primary: `
    rounded-md bg-orange-500 px-2 py-1 text-xs font-semibold text-white hover:bg-orange-600
    disabled:opacity-50
  `,
};
