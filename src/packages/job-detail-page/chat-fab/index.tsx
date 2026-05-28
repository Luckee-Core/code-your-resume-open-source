"use client";

import { useCallback } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { JobDetailChatFabActions } from "@/store/builders/jobDetailChatFab";
import { JobDetailChatColumn } from "../chat-column";

/**
 * Floating job coach for the job detail page (expand/minimize like Luckee tickets FAB).
 */
export const JobDetailChatFab = () => {
  const dispatch = useAppDispatch();
  const isExpanded = useAppSelector((s) => s.jobDetailChatFab.isExpanded);
  const jobId = useAppSelector((s) => s.currentJob.id);

  const handleMinimize = useCallback(() => {
    dispatch(JobDetailChatFabActions.collapse());
  }, [dispatch]);

  if (!jobId) {
    return null;
  }

  return (
    <div className={styles.anchor}>
      {isExpanded ? (
        <div className={styles.shellExpanded}>
          <div className={styles.panel}>
            <div className={styles.chrome}>
              <span className={styles.chromeTitle}>Job coach</span>
              <button
                type="button"
                className={styles.iconBtn}
                aria-label="Minimize"
                onClick={handleMinimize}
              >
                <ChevronDown className={styles.iconBtnGlyph} aria-hidden />
              </button>
            </div>
            <div className={styles.chatBody}>
              <JobDetailChatColumn variant="fab" />
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className={styles.fab}
          aria-label="Open job coach"
          onClick={() => dispatch(JobDetailChatFabActions.expand())}
        >
          <MessageCircle className={styles.fabIcon} aria-hidden />
        </button>
      )}
    </div>
  );
};

const styles = {
  anchor: `fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-none`,
  shellExpanded: `
    pointer-events-auto transition-all duration-300 ease-out
    w-[min(100vw-1.25rem,420px)] max-h-[min(100vh-3.5rem,720px)]
  `,
  panel: `
    flex flex-col min-h-0 w-full h-[min(100vh-3.5rem,720px)] max-h-[min(100vh-3.5rem,720px)]
    rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden
  `,
  chrome: `
    flex items-center justify-between gap-2 px-3 py-2.5 border-b border-gray-100
    bg-gray-50 shrink-0
  `,
  chromeTitle: `text-xs font-semibold text-gray-900`,
  iconBtn: `
    p-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-200/80
    border-none bg-transparent cursor-pointer
  `,
  iconBtnGlyph: `h-4 w-4`,
  chatBody: `flex min-h-0 flex-1 flex-col overflow-hidden`,
  fab: `
    pointer-events-auto flex items-center justify-center shrink-0
    w-11 h-11 rounded-full shadow-lg border border-orange-700
    bg-orange-600 text-white hover:bg-orange-700 cursor-pointer
    transition-transform duration-300 ease-out hover:scale-105
  `,
  fabIcon: `h-5 w-5`,
} as const;
