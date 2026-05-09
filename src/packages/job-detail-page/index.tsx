"use client";

import { useEffect } from "react";
import { JOBS_PATH } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  loadCrmVaultThunk,
  loadImageGraphicsThunk,
  loadJobBulletsThunk,
  loadProfessionalBackgroundThunk,
  loadTechnicalSkillsThunk,
  loadJobStudioChatThunk,
} from "@/store/thunks";
import { CurrentJobStudioActions } from "@/store/current/currentJobStudio";
import { JobStudioBuilderActions } from "@/store/builders/jobStudioBuilder";
import { useRegisterBreadcrumbTrail } from "@/utils/navigation";
import type { BreadcrumbItem } from "@/model/breadcrumb";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { JobDetailChatColumn } from "./chat-column";
import { JobDetailBuilderColumn } from "./builder-column";
import { JobHeader } from "./header";

export const JobDetailPage = () => {
  const dispatch = useAppDispatch();
  const job = useAppSelector((s) => s.currentJob);
  const companies = useAppSelector((s) => s.companies);
  const company = job.companyId ? companies[job.companyId] : undefined;

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
      return;
    }
    void dispatch(loadJobStudioChatThunk(job.id));
  }, [dispatch, job.id]);

  useRegisterBreadcrumbTrail(
    () => {
      const items: BreadcrumbItem[] = [{ label: "Jobs", href: JOBS_PATH }];
      if (!job.id) {
        return items;
      }
      if (company) {
        items.push({ label: company.name });
      }
      items.push({ label: job.title });
      return items;
    },
    [job.id, job.title, job.companyId, company?.id, company?.name],
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
        <div className={styles.chatPane}>
          <JobDetailChatColumn />
        </div>
        <div className={styles.divider} aria-hidden />
        <div className={styles.builderPane}>
          <JobDetailBuilderColumn />
        </div>
      </div>
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
  chatPane: `
    flex min-w-0 flex-col
    max-lg:w-full max-lg:flex-none max-lg:shrink-0
    lg:min-h-0 lg:max-w-[55%] lg:flex-1
  `,
  divider: `
    hidden w-px shrink-0 self-stretch bg-gray-300 lg:block
  `,
  builderPane: `
    flex min-h-0 min-w-0 flex-1 flex-col
    max-lg:w-full max-lg:flex-none max-lg:shrink-0
    lg:h-full lg:w-[45%] lg:max-w-[45%]
  `,
};
