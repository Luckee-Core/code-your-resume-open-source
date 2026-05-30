"use client";

import { ClipboardCopy, HelpCircle, Info, Save } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { CurrentStudioEditorActions } from "@/store/current/currentStudioEditor";
import { saveImageGraphicStudioDraftThunk } from "@/store/thunks";

/**
 * Left column: TSX from your own LLM/CLI + Save/Copy.
 */
export const ImageCreationStudioEditorColumn = () => {
  const dispatch = useAppDispatch();
  const tsxDraft = useAppSelector((s) => s.currentStudioEditor.tsxDraft);
  const isSavingDraft = useAppSelector((s) => s.currentStudioEditor.isSavingDraft);

  const handleCopyTsx = async () => {
    const text = tsxDraft.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("TSX copied");
    } catch {
      toast.error("Could not copy");
    }
  };

  const handleSaveDraft = async () => {
    const code = await dispatch(saveImageGraphicStudioDraftThunk());
    if (code === 200) {
      toast.success("Draft saved");
      return;
    }
    if (code === 400) {
      toast.error("Missing graphic");
      return;
    }
    toast.error("Could not save draft");
  };

  return (
    <div className={styles.root}>
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <div className={styles.titleCluster}>
            <h2 className={styles.h2}>TSX (from your LLM)</h2>
            <span className={styles.tooltipWrap}>
              <button type="button" className={styles.tooltipTrigger} aria-label="How live TSX preview works">
                <Info className={styles.tooltipIcon} aria-hidden="true" />
              </button>
              <div role="tooltip" className={styles.tooltipPanel}>
                <p className={styles.tooltipTitle}>Live TSX preview</p>
                <p className={styles.tooltipBody}>
                  With TSX in the editor, this panel compiles it in your browser (debounced) and renders React inside the
                  iframe with Tailwind Play CDN. Your component must{" "}
                  <strong className={styles.tooltipStrong}>export default</strong> a React component. Only{" "}
                  <strong className={styles.tooltipStrong}>react</strong> imports are supported in preview; other modules will
                  fail. Tailwind may miss dynamically built class names—prefer static{" "}
                  <code className={styles.tooltipCode}>className</code> keys. Code runs in your browser profile; treat it like
                  trusted studio input, not a public sandbox.
                </p>
              </div>
            </span>
            <span className={styles.tooltipWrap}>
              <button type="button" className={styles.tooltipTrigger} aria-label="How to use this editor">
                <HelpCircle className={styles.tooltipIcon} aria-hidden="true" />
              </button>
              <div role="tooltip" className={styles.tooltipPanel}>
                <p className={styles.tooltipTitle}>TSX editor</p>
                <p className={styles.tooltipBody}>
                  Use ChatGPT, Claude, Cursor, a CLI—whatever you like—to generate a Next.js{" "}
                  <code className={styles.tooltipCode}>use client</code> component. Paste the TSX here—the preview compiles it
                  after a short debounce. <strong className={styles.tooltipStrong}>Save</strong> persists TSX for this graphic.
                </p>
              </div>
            </span>
          </div>
          <div className={styles.panelHeaderActions}>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => void handleCopyTsx()}
              disabled={!tsxDraft.trim()}
            >
              <ClipboardCopy className={styles.btnIcon} aria-hidden />
              Copy
            </button>
            <button type="button" className={styles.primaryBtn} onClick={() => void handleSaveDraft()} disabled={isSavingDraft}>
              <Save className={styles.btnIcon} aria-hidden />
              {isSavingDraft ? "Saving…" : "Save"}
            </button>
          </div>
        </div>

        <textarea
          className={styles.codeArea}
          value={tsxDraft}
          onChange={(e) => dispatch(CurrentStudioEditorActions.setTsxDraft(e.target.value))}
          placeholder={`'use client';\nimport React from 'react';\n\nexport default function GeneratedPreview() { ... }`}
          spellCheck={false}
        />
      </div>
    </div>
  );
};

const styles = {
  root: `
    flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden
  `,
  panel: `
    flex min-h-0 min-w-0 flex-1 flex-col rounded-sm border border-gray-200 bg-white p-4 shadow-sm
  `,
  panelHeader: `
    flex flex-wrap items-center justify-between gap-2 shrink-0
  `,
  titleCluster: `
    flex min-w-0 flex-wrap items-center gap-1.5
  `,
  panelHeaderActions: `
    flex flex-wrap items-center gap-2
  `,
  h2: `
    text-sm font-semibold text-gray-900
  `,
  tooltipWrap: `
    group relative inline-flex shrink-0
  `,
  tooltipTrigger: `
    inline-flex h-5 w-5 items-center justify-center rounded-full text-gray-400
    hover:text-gray-600 focus:text-gray-600 focus:outline-none
    focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1
  `,
  tooltipIcon: `
    h-3.5 w-3.5
  `,
  tooltipPanel: `
    pointer-events-none invisible absolute left-0 top-full z-20 mt-1.5 w-72 max-w-[min(18rem,calc(100vw-2rem))]
    rounded-md border border-amber-200 bg-amber-50 px-3 py-2 opacity-0 shadow-md transition
    group-hover:visible group-hover:opacity-100
    group-focus-within:visible group-focus-within:opacity-100
  `,
  tooltipTitle: `
    text-xs font-semibold text-amber-900
  `,
  tooltipBody: `
    mt-1 text-xs leading-relaxed text-amber-950/90
  `,
  tooltipStrong: `
    font-semibold text-amber-950
  `,
  tooltipCode: `
    rounded bg-amber-100/80 px-1 py-0.5 text-xs font-mono text-amber-950
  `,
  codeArea: `
    mt-3 min-h-[min(50vh,320px)] w-full flex-1 resize-none rounded-md border border-gray-200 bg-zinc-50 px-3 py-2
    font-mono text-xs text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500
  `,
  secondaryBtn: `
    inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium
    text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50
  `,
  primaryBtn: `
    inline-flex items-center gap-1.5 rounded-md border border-orange-500 bg-orange-500 px-2.5 py-1.5 text-xs font-medium
    text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50
  `,
  btnIcon: `
    h-4 w-4 shrink-0
  `,
};
