"use client";

import { ImageDown, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { downloadImageGraphicPreviewPngThunk } from "@/store/thunks";

type StudioThumbnailDownloadPanelProps = {
  previewHasContent: boolean;
};

/**
 * Studio control: capture preview at lower scale as `-thumbnail.png` (see ADR 007).
 */
export const StudioThumbnailDownloadPanel = (props: StudioThumbnailDownloadPanelProps) => {
  const { previewHasContent } = props;
  const dispatch = useAppDispatch();
  const isDownloadingPreviewPng = useAppSelector((s) => s.studioBuilder.isDownloadingPreviewPng);

  return (
    <div className={styles.root}>
      <p className={styles.label}>Thumbnail</p>
      <button
        type="button"
        className={styles.btn}
        onClick={() => void dispatch(downloadImageGraphicPreviewPngThunk({ variant: "thumbnail" }))}
        disabled={!previewHasContent || isDownloadingPreviewPng}
        title="Download a smaller PNG (scale 1) for thumbnails"
      >
        {isDownloadingPreviewPng ? (
          <Loader2 className={styles.iconSpin} aria-hidden />
        ) : (
          <ImageDown className={styles.icon} aria-hidden />
        )}
        Download thumbnail PNG
      </button>
      <p className={styles.hint}>Uses the same preview capture as full export, with a lighter scale and filename suffix.</p>
    </div>
  );
};

const styles = {
  root: `
    mt-4 rounded-md border border-gray-200 bg-gray-50/80 px-3 py-3
  `,
  label: `
    text-[11px] font-semibold uppercase tracking-wide text-gray-500
  `,
  btn: `
    mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-2
    text-xs font-medium text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50
    sm:w-auto sm:justify-start
  `,
  icon: `
    h-4 w-4 shrink-0
  `,
  iconSpin: `
    h-4 w-4 shrink-0 animate-spin
  `,
  hint: `
    mt-2 text-[11px] leading-relaxed text-gray-500
  `,
};
