"use client";

import { useCallback, useEffect } from "react";
import { useAppDispatch } from "@/store";
import { CurrentStudioEditorActions } from "@/store/current/currentStudioEditor";
import {
  clampStudioPreviewDimension,
  IMAGE_STUDIO_PREVIEW_HEIGHT_POST_MESSAGE_TYPE,
  IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID,
  isStudioPreviewMeasuredHeightCredible,
  measureStudioPreviewIframeContentHeightPx,
} from "@/utils/image-creation-studio";

type UseStudioPreviewMeasuredHeightInput = {
  /** Reset measured height when the open graphic changes. */
  graphicId: string;
  /** Stored canvas height — used as clamp fallback. */
  canvasHeightPx: number;
  /** Re-measure when iframe srcDoc changes (debounced TSX). */
  iframeSrcDoc: string;
};

/**
 * Listens for preview iframe height postMessages and polls on load as a fallback.
 * Writes measured content height into `currentStudioEditor.previewMeasuredContentHeightPx`.
 */
export const useStudioPreviewMeasuredHeight = (input: UseStudioPreviewMeasuredHeightInput): void => {
  const dispatch = useAppDispatch();
  const { graphicId, canvasHeightPx, iframeSrcDoc } = input;

  const applyMeasuredHeight = useCallback(
    (raw: number | null) => {
      if (raw == null || !Number.isFinite(raw) || raw <= 0) {
        return;
      }
      const clamped = clampStudioPreviewDimension(raw, canvasHeightPx);
      if (!isStudioPreviewMeasuredHeightCredible(clamped, canvasHeightPx)) {
        return;
      }
      dispatch(CurrentStudioEditorActions.setPreviewMeasuredContentHeightPx(clamped));
    },
    [canvasHeightPx, dispatch],
  );

  useEffect(() => {
    dispatch(CurrentStudioEditorActions.setPreviewMeasuredContentHeightPx(null));
  }, [dispatch, graphicId]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data as { type?: string; heightPx?: unknown } | null;
      if (data?.type !== IMAGE_STUDIO_PREVIEW_HEIGHT_POST_MESSAGE_TYPE) {
        return;
      }
      if (typeof data.heightPx !== "number") {
        return;
      }
      applyMeasuredHeight(data.heightPx);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [applyMeasuredHeight]);

  useEffect(() => {
    if (!iframeSrcDoc.trim()) {
      return;
    }

    const poll = () => {
      const iframe = document.getElementById(
        IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID,
      ) as HTMLIFrameElement | null;
      if (!iframe) {
        return;
      }
      applyMeasuredHeight(measureStudioPreviewIframeContentHeightPx(iframe));
    };

    const t0 = window.setTimeout(poll, 100);
    const t1 = window.setTimeout(poll, 500);
    const t2 = window.setTimeout(poll, 1200);
    const t3 = window.setTimeout(poll, 2500);

    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [applyMeasuredHeight, iframeSrcDoc]);
};
