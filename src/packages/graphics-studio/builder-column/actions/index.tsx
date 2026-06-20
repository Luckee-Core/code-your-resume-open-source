"use client";

import { useState } from "react";
import { Download, Loader2, Printer, Ruler } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  downloadImageGraphicPreviewPngThunk,
  fitImageGraphicCanvasHeightToContentThunk,
  printImageGraphicPreviewThunk,
} from "@/store/thunks";

type ImageCreationStudioBuilderColumnActionsProps = {
  previewHasContent: boolean;
  /** Measured TSX content height; enables **Fit height to content** when it differs from canvas. */
  contentHeightPx: number | null;
  canvasHeightPx: number;
};

/**
 * Toolbar actions for the studio builder column (e.g. PNG export, print/PDF).
 */
export const ImageCreationStudioBuilderColumnActions = (props: ImageCreationStudioBuilderColumnActionsProps) => {
  const { previewHasContent, contentHeightPx, canvasHeightPx } = props;
  const dispatch = useAppDispatch();
  const isDownloadingPreviewPng = useAppSelector((s) => s.currentStudioEditor.isDownloadingPreviewPng);
  const [isFittingHeight, setIsFittingHeight] = useState(false);

  const canFitHeightToContent =
    previewHasContent &&
    contentHeightPx != null &&
    contentHeightPx !== canvasHeightPx &&
    !isFittingHeight;

  const onFitHeightToContent = async () => {
    if (!canFitHeightToContent || contentHeightPx == null) {
      return;
    }
    setIsFittingHeight(true);
    const status = await dispatch(fitImageGraphicCanvasHeightToContentThunk());
    setIsFittingHeight(false);

    if (status === 200) {
      toast.success("Canvas height fitted to content");
    }
  };

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.secondaryBtn}
        onClick={() => void onFitHeightToContent()}
        disabled={!canFitHeightToContent}
        title="Set canvas height to match measured TSX content"
      >
        {isFittingHeight ? (
          <Loader2 className={styles.btnIconSpin} aria-hidden />
        ) : (
          <Ruler className={styles.btnIcon} aria-hidden />
        )}
        Fit height to content
      </button>
      <button
        type="button"
        className={styles.secondaryBtn}
        onClick={() => void dispatch(downloadImageGraphicPreviewPngThunk())}
        disabled={!previewHasContent || isDownloadingPreviewPng}
        title="Download the preview as a PNG"
      >
        {isDownloadingPreviewPng ? (
          <Loader2 className={styles.btnIconSpin} aria-hidden />
        ) : (
          <Download className={styles.btnIcon} aria-hidden />
        )}
        Download image
      </button>
      <button
        type="button"
        className={styles.secondaryBtn}
        onClick={() => void dispatch(printImageGraphicPreviewThunk())}
        disabled={!previewHasContent}
        title="Print the preview or save as PDF (better for fonts/spacing)"
      >
        <Printer className={styles.btnIcon} aria-hidden />
        Print / PDF
      </button>
    </div>
  );
};

const styles = {
  root: `
    flex flex-wrap items-center gap-2
  `,
  secondaryBtn: `
    inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium
    text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50
  `,
  btnIcon: `
    h-4 w-4 shrink-0
  `,
  btnIconSpin: `
    h-4 w-4 shrink-0 animate-spin
  `,
};
