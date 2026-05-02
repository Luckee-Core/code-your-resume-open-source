"use client";

import { EMPLOYEES_PATH } from "@/config/routes";
import { useAppSelector } from "@/store";
import { useRegisterBreadcrumbTrail } from "@/utils/navigation";
import type { BreadcrumbItem } from "@/model/breadcrumb";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { DetailHeader } from "./header";
import { AtAGlanceSection } from "./at-a-glance";
import { OnlineProfilesSection } from "./online-profiles";

export const CompanyEmployeeDetailPage = () => {
  const employee = useAppSelector((s) => s.currentCompanyEmployee);
  const companies = useAppSelector((s) => s.companies);
  const company = employee.companyId ? companies[employee.companyId] : undefined;

  useRegisterBreadcrumbTrail(
    () => {
      const items: BreadcrumbItem[] = [{ label: "Employees", href: EMPLOYEES_PATH }];
      if (!employee.id) {
        return items;
      }
      if (company) {
        items.push({ label: company.name });
      }
      items.push({ label: employee.name });
      return items;
    },
    [employee.id, employee.name, employee.companyId, company?.id, company?.name],
  );

  if (!employee.id) {
    return (
      <div className={styles.wrap}>
        <p className={styles.empty}>Select an employee from a company or the Employees list.</p>
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
    </div>
  );
};

const styles = {
  wrap: t.pageWrapFullWidth,
  empty: t.emptyMessage,
  researchGrid: t.researchGrid,
};
