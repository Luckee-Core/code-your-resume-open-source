"use client";

import { Loader2, RefreshCw } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { CrmBuilderActions } from "@/store/builders/crmBuilder";
import { ProjectWebsiteResearchConfirmationModal } from "./confirmation-modal";
import { projectHasUrlForCrawl } from "./project-has-url-for-crawl";

type ProjectWebsiteResearchButtonProps = {
  variant?: "default" | "icon";
};

/**
 * Opens confirmation, then server crawl + optional AI summary into `websiteResearchSummary`.
 */
export const ProjectWebsiteResearchButton = (props: ProjectWebsiteResearchButtonProps) => {
  const { variant = "default" } = props;
  const dispatch = useAppDispatch();
  const phase = useAppSelector((s) => s.crmBuilder.projectWebsiteResearchRunPhase);
  const url = useAppSelector((s) => s.currentProject.url);

  const canRun = projectHasUrlForCrawl({ url });
  const isBusy = phase !== "idle";
  const showSpinner = isBusy && phase === "website";

  const openConfirmModal = () => {
    if (!canRun || isBusy) return;
    dispatch(CrmBuilderActions.setProjectWebsiteResearchConfirmModalOpen(true));
  };

  const noUrlTitle = "Set a project URL (Edit) before crawling";

  if (variant === "icon") {
    return (
      <>
        <button
          type="button"
          className={styles.iconTrigger}
          disabled={isBusy || !canRun}
          title={!canRun ? noUrlTitle : "Run website research (crawl + summary)"}
          aria-label="Run website research"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openConfirmModal();
          }}
        >
          {showSpinner ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
          ) : (
            <RefreshCw className="h-3.5 w-3.5" aria-hidden />
          )}
        </button>
        <ProjectWebsiteResearchConfirmationModal />
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        className={styles.runButton}
        disabled={isBusy || !canRun}
        title={!canRun ? noUrlTitle : undefined}
        onClick={openConfirmModal}
      >
        {showSpinner ? (
          <>
            <Loader2 className={styles.buttonSpinner} />
            Website crawl…
          </>
        ) : (
          "Run website research"
        )}
      </button>
      <ProjectWebsiteResearchConfirmationModal />
    </>
  );
};

const styles = {
  runButton: `
    inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800
    hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed
  `,
  iconTrigger: `
    inline-flex shrink-0 items-center justify-center rounded p-0.5 text-gray-500
    hover:text-orange-500 hover:bg-orange-50 disabled:opacity-40 disabled:cursor-not-allowed
  `,
  buttonSpinner: `h-4 w-4 animate-spin`,
};
