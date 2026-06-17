"use client";

import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { CrmBuilderActions } from "@/store/builders/crmBuilder";
import { runProjectWebsiteResearchThunk } from "@/store/thunks";
import { projectHasUrlForCrawl } from "../project-has-url-for-crawl";

const MODAL_TITLE_ID = "project-website-research-confirm-title";

/**
 * Confirms server-side website crawl + summary before starting the run.
 */
export const ProjectWebsiteResearchConfirmationModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((s) => s.crmBuilder.isProjectWebsiteResearchConfirmModalOpen);
  const phase = useAppSelector((s) => s.crmBuilder.projectWebsiteResearchRunPhase);
  const url = useAppSelector((s) => s.currentProject.url);
  if (!isOpen) return null;

  const canRun = projectHasUrlForCrawl({ url });
  const isBusy = phase !== "idle";

  const close = () => {
    dispatch(CrmBuilderActions.setProjectWebsiteResearchConfirmModalOpen(false));
  };

  const handleConfirm = () => {
    close();
    void (async () => {
      if (!canRun || isBusy) return;
      const status = await dispatch(runProjectWebsiteResearchThunk());
      if (status !== 200) {
        toast.error("Website research failed");
        return;
      }
      toast.success("Website research finished");
    })();
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby={MODAL_TITLE_ID}
    >
      <div className={styles.modal}>
        <h3 id={MODAL_TITLE_ID} className={styles.title}>
          Run website research?
        </h3>
        <div className={styles.body}>
          <p className={styles.p}>
            The server will visit this project&apos;s URL, capture page text, and save a summary on
            the project record shown in At a glance.
          </p>
          <p className={styles.p}>
            When <code className={styles.code}>ANTHROPIC_API_KEY</code> is set on the CRM Express
            server, an AI step condenses the page text into the summary. Otherwise you get a short
            excerpt from the readable page content.
          </p>
        </div>
        <div className={styles.buttons}>
          <button type="button" className={styles.cancel} onClick={close}>
            Cancel
          </button>
          <button
            type="button"
            className={styles.confirm}
            disabled={!canRun || isBusy}
            onClick={handleConfirm}
          >
            Start website research
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: `fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4`,
  modal: `bg-white rounded-lg shadow-xl max-w-lg w-full p-6`,
  title: `text-lg font-semibold text-gray-900 mb-3`,
  body: `space-y-3 mb-6`,
  p: `text-sm text-gray-700 leading-relaxed`,
  buttons: `flex justify-end gap-2`,
  cancel: `
    px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md
    hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
  `,
  confirm: `
    px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md border-none
    hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
  `,
  code: `rounded bg-gray-100 px-1 py-0.5 text-xs font-mono text-gray-800`,
};
