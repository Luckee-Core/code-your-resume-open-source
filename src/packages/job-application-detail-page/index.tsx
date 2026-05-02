"use client";

import { JOB_APPLICATIONS_PATH } from "@/config/routes";
import { useAppSelector } from "@/store";
import { useRegisterBreadcrumbTrail } from "@/utils/navigation";
import type { BreadcrumbItem } from "@/model/breadcrumb";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { DetailHeader } from "./header";
import { AtAGlanceSection } from "./at-a-glance";
import { JobApplicationResumeGraphicSection } from "./resume-graphic";

export const JobApplicationDetailPage = () => {
  const app = useAppSelector((s) => s.currentJobApplication);
  const jobs = useAppSelector((s) => s.jobs);
  const job = app.jobId ? jobs[app.jobId] : undefined;

  useRegisterBreadcrumbTrail(
    () => {
      const items: BreadcrumbItem[] = [{ label: "Applications", href: JOB_APPLICATIONS_PATH }];
      if (!app.id) {
        return items;
      }
      if (job) {
        items.push({ label: job.title });
      }
      items.push({ label: "Job application" });
      return items;
    },
    [app.id, app.jobId, job?.id, job?.title],
  );

  if (!app.id) {
    return (
      <div className={styles.wrap}>
        <p className={styles.empty}>Select an application from a job or the Applications list.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <DetailHeader />
      <AtAGlanceSection />
      <JobApplicationResumeGraphicSection />
    </div>
  );
};

const styles = {
  wrap: t.pageWrapFullWidth,
  empty: t.emptyMessage,
};
