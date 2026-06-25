"use client";

import { useCallback, useState } from "react";
import { Loader2, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EXPERIENCE_STUDIO_PATH, JOB_DETAIL_PAGE_PATH, MY_LINKEDIN_PATH } from "@/config/routes";
import { useAppDispatch, useAppSelector, store } from "@/store";
import { QuickApplyBuilderActions } from "@/store/builders/quickApplyBuilder";
import { loadTechnicalSkillsThunk, runQuickApplyPipelineThunk } from "@/store/thunks";
import { QuickApplyStatus } from "../status";

/**
 * Two-URL form that kicks off the quick-apply pipeline.
 */
export const QuickApplyForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const phase = useAppSelector((s) => s.quickApplyBuilder.phase);
  const lastResult = useAppSelector((s) => s.quickApplyBuilder.lastResult);
  const lastError = useAppSelector((s) => s.quickApplyBuilder.lastError);
  const draftTechnicalSkills = useAppSelector((s) => s.currentTechnicalSkills.draftTechnicalSkills);

  const [companyWebsiteUrl, setCompanyWebsiteUrl] = useState("");
  const [jobListingUrl, setJobListingUrl] = useState("");

  const isRunning = phase === "running";

  const onSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (isRunning) {
        return;
      }

      let activeSkillCount = draftTechnicalSkills.filter((sk) => sk.status === "active").length;
      if (activeSkillCount === 0) {
        await dispatch(loadTechnicalSkillsThunk());
        activeSkillCount = store
          .getState()
          .currentTechnicalSkills.draftTechnicalSkills.filter((sk) => sk.status === "active").length;
        if (activeSkillCount === 0) {
          toast.error("Add skills in the Technical Skills Studio first.", {
            action: {
              label: "Open studio",
              onClick: () => router.push(EXPERIENCE_STUDIO_PATH),
            },
          });
          return;
        }
      }

      const outcome = await dispatch(
        runQuickApplyPipelineThunk({
          companyWebsiteUrl,
          jobListingUrl,
        }),
      );

      if (outcome.status === 200) {
        const { data } = outcome;
        if (data.resumeQueued) {
          toast.success("Quick apply complete — resume is generating.");
        } else if (data.resumeSkipReason) {
          const reason = data.resumeSkipReason.toLowerCase();
          if (reason.includes("linkedin")) {
            toast.warning(data.resumeSkipReason, {
              action: {
                label: "My LinkedIn",
                onClick: () => router.push(MY_LINKEDIN_PATH),
              },
            });
          } else if (reason.includes("skill")) {
            toast.warning(data.resumeSkipReason, {
              action: {
                label: "Skills studio",
                onClick: () => router.push(EXPERIENCE_STUDIO_PATH),
              },
            });
          } else {
            toast.warning(data.resumeSkipReason);
          }
        }
        router.push(JOB_DETAIL_PAGE_PATH);
        dispatch(QuickApplyBuilderActions.resetQuickApply());
        return;
      }

      if (outcome.status === 422) {
        toast.error(outcome.error ?? "Job listing scrape failed.");
        return;
      }

      if (outcome.status === 400) {
        toast.error(outcome.error ?? "Enter valid company and job URLs.");
        return;
      }

      toast.error(outcome.error ?? lastError ?? "Quick apply failed. Check server logs.");
    },
    [companyWebsiteUrl, dispatch, draftTechnicalSkills, isRunning, jobListingUrl, lastError, router],
  );

  return (
    <form onSubmit={(e) => void onSubmit(e)} className={styles.form}>
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="quick-apply-company-url" className={styles.label}>
            Company website
          </label>
          <input
            id="quick-apply-company-url"
            type="url"
            value={companyWebsiteUrl}
            onChange={(e) => setCompanyWebsiteUrl(e.target.value)}
            placeholder="https://company.com"
            className={styles.input}
            required
            disabled={isRunning}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="quick-apply-job-url" className={styles.label}>
            Job listing URL
          </label>
          <input
            id="quick-apply-job-url"
            type="url"
            value={jobListingUrl}
            onChange={(e) => setJobListingUrl(e.target.value)}
            placeholder="https://boards.greenhouse.io/…"
            className={styles.input}
            required
            disabled={isRunning}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submitButton} disabled={isRunning}>
          {isRunning ? (
            <>
              <Loader2 className={styles.spinner} aria-hidden />
              Running…
            </>
          ) : (
            <>
              <Zap className={styles.icon} aria-hidden />
              Quick apply
            </>
          )}
        </button>
      </div>

      <QuickApplyStatus
        phase={phase}
        lastError={lastError}
        warnings={lastResult?.warnings ?? []}
        resumeQueued={lastResult?.resumeQueued === true}
        resumeSkipReason={lastResult?.resumeSkipReason}
      />
    </form>
  );
};

const styles = {
  form: `flex flex-col gap-4`,
  fields: `grid gap-4 sm:grid-cols-2`,
  field: `flex flex-col gap-1`,
  label: `text-xs font-medium text-gray-700`,
  input: `
    rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm
    placeholder:text-gray-400 focus:border-[#FF7C1E] focus:outline-none focus:ring-1 focus:ring-[#FF7C1E]
    disabled:cursor-not-allowed disabled:bg-gray-50
  `,
  actions: `flex flex-wrap items-center gap-3`,
  submitButton: `
    inline-flex items-center gap-2 rounded-md bg-[#FF7C1E] px-4 py-2 text-sm font-medium text-white
    shadow-sm hover:bg-[#e66f15] disabled:cursor-not-allowed disabled:opacity-60
  `,
  spinner: `h-4 w-4 animate-spin`,
  icon: `h-4 w-4`,
};
