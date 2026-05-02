"use client";

import { useEffect } from "react";
import { JOBS_PATH } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  loadCrmVaultThunk,
  loadImageGraphicsThunk,
  loadJobBulletsThunk,
  loadTechnicalSkillsThunk,
} from "@/store/thunks";
import { useRegisterBreadcrumbTrail } from "@/utils/navigation";
import type { BreadcrumbItem } from "@/model/breadcrumb";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { JobHeader } from "./header";
import { AtAGlanceSection } from "./at-a-glance";
import { OnlineProfilesSection } from "./online-profiles";
import { ResponsibilitiesSection } from "./responsibilities";
import { RequirementsSection } from "./requirements";
import { NiceToHavesSection } from "./nice-to-haves";
import { ApplicationsSection } from "./applications";

export const JobDetailPage = () => {
  const dispatch = useAppDispatch();
  const job = useAppSelector((s) => s.currentJob);
  const companies = useAppSelector((s) => s.companies);
  const company = job.companyId ? companies[job.companyId] : undefined;

  useEffect(() => {
    void dispatch(loadCrmVaultThunk());
    void dispatch(loadImageGraphicsThunk());
    void dispatch(loadTechnicalSkillsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (job.id) {
      void dispatch(loadJobBulletsThunk(job.id));
    }
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
      <div className={styles.summaryGrid}>
        <AtAGlanceSection />
        <OnlineProfilesSection />
      </div>
      <div className={styles.bulletsGrid}>
        <ResponsibilitiesSection />
        <RequirementsSection />
        <NiceToHavesSection />
        <ApplicationsSection />
      </div>
    </div>
  );
};

const styles = {
  wrap: t.pageWrapFullWidth,
  empty: t.emptyMessage,
  summaryGrid: t.researchGrid,
  bulletsGrid: `grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4`,
};
