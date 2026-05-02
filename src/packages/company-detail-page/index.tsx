"use client";

import { COMPANIES_PATH } from "@/config/routes";
import { useAppSelector } from "@/store";
import { useRegisterBreadcrumbTrail } from "@/utils/navigation";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { DetailHeader } from "./header";
import { AtAGlanceSection } from "./at-a-glance";
import { OnlineProfilesSection } from "./online-profiles";
import { EmployeesSection } from "./employees";
import { JobsSection } from "./jobs";
import { EditCompanyModal } from "./edit";

export const CompanyDetailPage = () => {
  const company = useAppSelector((s) => s.currentCompany);

  useRegisterBreadcrumbTrail(
    () => {
      const base = [{ label: "Companies", href: COMPANIES_PATH }];
      if (!company.id) {
        return base;
      }
      return [...base, { label: company.name }];
    },
    [company.id, company.name],
  );

  if (!company.id) {
    return (
      <div className={styles.wrap}>
        <p className={styles.empty}>Select a company from the list, or create one on Companies.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <DetailHeader />
      <div className={styles.researchGrid}>
        <AtAGlanceSection />
        <OnlineProfilesSection />
      </div>
      <div className={styles.twoCol}>
        <EmployeesSection />
        <JobsSection />
      </div>
      <EditCompanyModal />
    </div>
  );
};

const styles = {
  wrap: t.pageWrapFullWidth,
  empty: t.emptyMessage,
  researchGrid: t.researchGrid,
  twoCol: t.twoCol,
};
