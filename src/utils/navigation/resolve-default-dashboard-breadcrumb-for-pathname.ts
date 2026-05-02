import type { BreadcrumbItem } from "@/model/breadcrumb";
import {
  COMPANIES_PATH,
  COMPANY_DETAIL_PAGE_PATH,
  COMPANY_EMPLOYEE_DETAIL_PAGE_PATH,
  DOCS_GETTING_STARTED_PATH,
  DOCS_PATH,
  DOCS_SECURITY_TSX_PREVIEW_PATH,
  EMPLOYEES_PATH,
  EXPERIENCE_PATH,
  JOB_APPLICATIONS_PATH,
  JOB_APPLICATION_DETAIL_PAGE_PATH,
  JOB_DETAIL_PAGE_PATH,
  JOBS_PATH,
} from "@/config/routes";

const docsBase = (): BreadcrumbItem => ({ label: "Docs", href: DOCS_PATH });

/**
 * Fallback trail when no screen has registered Redux breadcrumbs yet.
 * Mirrors primary nav sections from the sidebar.
 */
export const resolveDefaultDashboardBreadcrumbForPathname = (pathname: string): BreadcrumbItem[] => {
  if (pathname === "/") {
    return [{ label: "Graphics" }];
  }
  if (pathname.startsWith("/studio")) {
    return [{ label: "Graphics", href: "/" }, { label: "Studio" }];
  }

  if (pathname === DOCS_PATH) {
    return [docsBase(), { label: "Overview" }];
  }
  if (pathname === DOCS_GETTING_STARTED_PATH) {
    return [docsBase(), { label: "Getting started" }];
  }
  if (pathname === DOCS_SECURITY_TSX_PREVIEW_PATH) {
    return [docsBase(), { label: "TSX live preview" }];
  }
  if (pathname.startsWith(`${DOCS_PATH}/`)) {
    return [docsBase()];
  }

  if (pathname === COMPANIES_PATH || pathname === COMPANY_DETAIL_PAGE_PATH) {
    return [{ label: "Companies", href: COMPANIES_PATH }];
  }
  if (pathname === JOBS_PATH || pathname === JOB_DETAIL_PAGE_PATH) {
    return [{ label: "Jobs", href: JOBS_PATH }];
  }
  if (pathname === EMPLOYEES_PATH || pathname === COMPANY_EMPLOYEE_DETAIL_PAGE_PATH) {
    return [{ label: "Employees", href: EMPLOYEES_PATH }];
  }
  if (pathname === JOB_APPLICATIONS_PATH || pathname === JOB_APPLICATION_DETAIL_PAGE_PATH) {
    return [{ label: "Applications", href: JOB_APPLICATIONS_PATH }];
  }
  if (pathname === EXPERIENCE_PATH) {
    return [{ label: "Experience", href: EXPERIENCE_PATH }];
  }

  return [];
};
