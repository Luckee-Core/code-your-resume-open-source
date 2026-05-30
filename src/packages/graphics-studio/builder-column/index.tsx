"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { CurrentStudioEditorActions } from "@/store/current/currentStudioEditor";
import {
  clampStudioPreviewDimension,
  compileImageStudioTsx,
  computePreviewDisplayScale,
  computeStudioIframeSrcDoc,
  IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID,
} from "@/utils/image-creation-studio";
import { ImageCreationStudioBuilderColumnActions } from "./actions";

const TSX_PREVIEW_DEBOUNCE_MS = 400;

/**
 * Tracks an element's content-box width via `ResizeObserver` so the preview can fit-to-container.
 * Returns 0 until measured (caller treats 0 as "unknown — use full canvas width").
 */
function useElementWidth<T extends HTMLElement>(): [React.RefObject<T | null>, number] {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (Number.isFinite(w)) setWidth(w);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, width];
}

/**
 * Right column: live TSX preview for the layout builder.
 */
export const ImageCreationStudioBuilderColumn = () => {
  const dispatch = useAppDispatch();
  const tsxDraft = useAppSelector((s) => s.currentStudioEditor.tsxDraft);
  const tsxBaselineForPreview = useAppSelector((s) => s.currentStudioEditor.tsxBaselineForPreview);
  const graphicId = useAppSelector((s) => s.currentImageGraphic.id);
  const canvasWidthPx = useAppSelector((s) => s.currentImageGraphic.canvasWidthPx);
  const canvasHeightPx = useAppSelector((s) => s.currentImageGraphic.canvasHeightPx);

  const previewW = clampStudioPreviewDimension(canvasWidthPx, 960);
  const previewH = clampStudioPreviewDimension(canvasHeightPx, 540);

  const [previewAreaRef, previewAreaWidth] = useElementWidth<HTMLDivElement>();

  const previewDisplayScale = useMemo(
    () => computePreviewDisplayScale(previewW, previewAreaWidth),
    [previewW, previewAreaWidth],
  );

  const previewDisplayW = previewW * previewDisplayScale;
  const previewDisplayH = previewH * previewDisplayScale;

  const tsxPreviewOutOfSync = Boolean(tsxDraft.trim()) && tsxDraft !== tsxBaselineForPreview;

  const [debouncedTsxDraft, setDebouncedTsxDraft] = useState(tsxDraft);

  useEffect(() => {
    if (!tsxDraft.trim()) {
      setDebouncedTsxDraft("");
      return;
    }
    const id = window.setTimeout(() => setDebouncedTsxDraft(tsxDraft), TSX_PREVIEW_DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [tsxDraft]);

  /** When the graphic changes, align baseline to the loaded draft. */
  useEffect(() => {
    dispatch(CurrentStudioEditorActions.alignTsxBaselineToCurrentDraft());
  }, [dispatch, graphicId]);

  const iframeSrcDoc = useMemo(
    () =>
      computeStudioIframeSrcDoc({
        tsxDraft: debouncedTsxDraft,
        previewW,
        previewH,
      }),
    [debouncedTsxDraft, previewW, previewH],
  );

  const tsxCompileError = useMemo(() => {
    const trimmed = debouncedTsxDraft.trim();
    if (!trimmed) {
      return null;
    }
    const result = compileImageStudioTsx(debouncedTsxDraft);
    if ("error" in result) {
      return result.error;
    }
    return null;
  }, [debouncedTsxDraft]);

  const previewHasContent = Boolean(iframeSrcDoc.trim());

  return (
    <div className={styles.root}>
      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div className={styles.headerRow}>
            <div className={styles.titleBlock}>
              <h2 className={styles.h2}>Preview</h2>
              <p className={styles.canvasMeta}>
                Canvas {previewW}×{previewH}px
              </p>
            </div>
            <ImageCreationStudioBuilderColumnActions previewHasContent={previewHasContent} />
          </div>
          {tsxPreviewOutOfSync ? (
            <p className={styles.staleBanner} role="status">
              TSX changed since last alignment—live preview follows TSX. Save to persist the current draft.
            </p>
          ) : null}
          {tsxCompileError ? (
            <div className={styles.compileError} role="alert">
              <p className={styles.compileErrorTitle}>TSX compile error</p>
              <pre className={styles.compileErrorPre}>{tsxCompileError}</pre>
            </div>
          ) : null}
        </div>

        <div ref={previewAreaRef} className={styles.previewArea}>
          {iframeSrcDoc ? (
            <div className={styles.frameViewport}>
              <div
                className={styles.previewScaleWrap}
                style={{ width: previewDisplayW, height: previewDisplayH }}
              >
                <iframe
                  id={IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID}
                  title="Layout preview"
                  className={styles.previewFrame}
                  width={previewW}
                  height={previewH}
                  sandbox="allow-scripts allow-same-origin allow-modals allow-popups allow-popups-to-escape-sandbox"
                  srcDoc={iframeSrcDoc}
                  style={{
                    width: previewW,
                    height: previewH,
                    transform: `scale(${previewDisplayScale})`,
                    transformOrigin: "top left",
                  }}
                />
              </div>
            </div>
          ) : (
            <div className={styles.frameViewport}>
              <div
                className={styles.placeholder}
                style={{ width: previewDisplayW, height: previewDisplayH }}
              >
                <p className={styles.placeholderText}>
                  {tsxDraft.trim()
                    ? "TSX preview will appear after a short debounce once TSX compiles, or fix compile errors above."
                    : "Add TSX in the editor to render a preview."}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const styles = {
  root: `
    flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto p-0
  `,
  panel: `
    flex flex-col gap-3 rounded-sm border border-gray-200 bg-white p-4 shadow-sm
  `,
  panelHeader: `
    flex flex-col gap-3
  `,
  previewArea: `
    w-full max-w-full
  `,
  h2: `
    text-sm font-semibold text-gray-900
  `,
  titleBlock: `
    flex min-w-0 flex-col gap-0.5
  `,
  canvasMeta: `
    text-[11px] font-medium text-gray-500
  `,
  staleBanner: `
    mt-2 rounded-md border border-orange-300 bg-orange-50 px-3 py-2 text-xs font-medium text-orange-900
  `,
  compileError: `
    mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-2
  `,
  compileErrorTitle: `
    text-xs font-semibold text-red-900
  `,
  compileErrorPre: `
    mt-1 max-h-32 overflow-auto text-xs font-mono text-red-950 whitespace-pre-wrap break-words
  `,
  headerRow: `
    flex flex-wrap items-center justify-between gap-2
  `,
  frameViewport: `
    inline-block max-w-full shrink-0 rounded-md border border-gray-200 bg-gray-100
  `,
  previewScaleWrap: `
    relative shrink-0 overflow-hidden rounded-[inherit]
  `,
  placeholder: `
    flex max-w-none shrink-0 items-center justify-center rounded-md border border-dashed
    border-gray-300 bg-gray-50 px-2 py-3 text-center
  `,
  placeholderText: `
    text-sm text-gray-500
  `,
  previewFrame: `
    absolute left-0 top-0 block border-0 bg-white
  `,
};
