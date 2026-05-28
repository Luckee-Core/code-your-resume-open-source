"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { COMPANY_DETAIL_PAGE_PATH } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/store";
import { JobDetailChatFabActions } from "@/store/builders/jobDetailChatFab";
import { CurrentCompanyActions } from "@/store/current/currentCompany";
import { CurrentJobActions } from "@/store/current/currentJob";
import {
  loadCrmVaultThunk,
  loadImageGraphicsThunk,
  loadJobBulletsThunk,
  loadProfessionalBackgroundThunk,
  loadTechnicalSkillsThunk,
  loadJobStudioChatThunk,
  openCompanyThunk,
  openJobThunk,
} from "@/store/thunks";
import { CurrentJobStudioActions } from "@/store/current/currentJobStudio";
import { JobStudioBuilderActions } from "@/store/builders/jobStudioBuilder";
import {
  buildJobDetailBreadcrumbTrail,
  useRegisterBreadcrumbTrail,
} from "@/utils/navigation";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { JobDetailChatFab } from "./chat-fab";
import { JobDetailListingColumn } from "./listing-column";
import { JobDetailGraphicsColumn } from "./graphics-column";
import { JobHeader } from "./header";

export const JobDetailPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const job = useAppSelector((s) => s.currentJob);
  const companies = useAppSelector((s) => s.companies);
  const jobs = useAppSelector((s) => s.jobs);
  const company = job.companyId ? companies[job.companyId] : undefined;

  const onSelectCompany = useCallback(
    (companyId: string) => {
      const row = companies[companyId];
      if (row) {
        dispatch(CurrentCompanyActions.setCurrentCompany(row));
      } else {
        void dispatch(openCompanyThunk(companyId));
      }
      router.push(COMPANY_DETAIL_PAGE_PATH);
    },
    [companies, dispatch, router],
  );

  const onSelectJob = useCallback(
    (jobId: string) => {
      const row = jobs[jobId];
      if (row) {
        dispatch(CurrentJobActions.setCurrentJob(row));
      } else {
        void dispatch(openJobThunk(jobId));
      }
    },
    [dispatch, jobs],
  );

  useEffect(() => {
    void dispatch(loadCrmVaultThunk());
    void dispatch(loadImageGraphicsThunk());
    void dispatch(loadTechnicalSkillsThunk());
    void dispatch(loadProfessionalBackgroundThunk());
  }, [dispatch]);

  useEffect(() => {
    if (job.id) {
      void dispatch(loadJobBulletsThunk(job.id));
    }
  }, [dispatch, job.id]);

  useEffect(() => {
    if (!job.id) {
      dispatch(CurrentJobStudioActions.resetCurrentJobStudio());
      dispatch(JobStudioBuilderActions.reset());
      dispatch(JobDetailChatFabActions.resetForJobChange());
      return;
    }
    dispatch(JobDetailChatFabActions.resetForJobChange());
    void dispatch(loadJobStudioChatThunk(job.id));
  }, [dispatch, job.id]);

  useRegisterBreadcrumbTrail(
    () =>
      buildJobDetailBreadcrumbTrail({
        job,
        companies,
        jobs,
        onSelectCompany,
        onSelectJob,
      }),
    [job, companies, jobs, onSelectCompany, onSelectJob],
  );

  if (!job.id) {
    return (
      <div className={styles.wrap}>
        <p className={styles.empty}>Select a job from the list or from a company.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <JobHeader />
      <div className={styles.shell}>
        <div className={styles.listingPane}>
          <JobDetailListingColumn />
        </div>
        <div className={styles.divider} aria-hidden />
        <div className={styles.graphicsPane}>
          <JobDetailGraphicsColumn />
        </div>
      </div>
      <JobDetailChatFab />
    </div>
  );
};

const styles = {
  wrap: `w-full min-w-0 flex min-h-0 flex-col gap-4 px-4 py-4`,
  empty: t.emptyMessage,
  shell: `
    flex w-full min-w-0 flex-col gap-4
    max-lg:flex-none
    lg:min-h-[min(70vh,720px)] lg:flex-1 lg:flex-row lg:gap-5 lg:overflow-hidden
  `,
  listingPane: `
    flex min-w-0 flex-col
    max-lg:w-full max-lg:flex-none max-lg:shrink-0
    lg:min-h-0 lg:max-w-[55%] lg:flex-1
  `,
  divider: `
    hidden w-px shrink-0 self-stretch bg-gray-300 lg:block
  `,
  graphicsPane: `
    flex min-h-0 min-w-0 flex-1 flex-col
    max-lg:w-full max-lg:flex-none max-lg:shrink-0
    lg:h-full lg:w-[45%] lg:max-w-[45%]
  `,
};
