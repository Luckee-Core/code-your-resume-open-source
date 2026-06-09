import type { BreadcrumbItem } from "@/model/breadcrumb";
import {
  COMPANIES_PATH,
  COMPANY_DETAIL_PAGE_PATH,
  DASHBOARD_PATH,
  COMPANY_EMPLOYEE_DETAIL_PAGE_PATH,
  EMPLOYEES_PATH,
  EXPERIENCE_PATH,
  JOB_APPLICATIONS_PATH,
  JOB_APPLICATION_DETAIL_PAGE_PATH,
  JOB_DETAIL_PAGE_PATH,
  JOB_QUESTIONS_PATH,
  AI_COSTS_PATH,
  AI_PROMPTS_PATH,
  JOB_NEWSLETTERS_PATH,
  JOB_NEWSLETTER_DETAIL_PAGE_PATH,
  JOBS_PATH,
} from "@/config/routes";

/**
 * Fallback trail when no screen has registered Redux breadcrumbs yet.
 * Mirrors primary nav sections from the sidebar.
 */
export const resolveDefaultDashboardBreadcrumbForPathname = (pathname: string): BreadcrumbItem[] => {
  if (pathname === DASHBOARD_PATH) {
    return [{ label: "Dashboard" }];
  }
  if (pathname.startsWith("/studio")) {
    return [{ label: "Dashboard", href: DASHBOARD_PATH }, { label: "Studio" }];
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
  if (pathname === JOB_QUESTIONS_PATH) {
    return [{ label: "Job questions", href: JOB_QUESTIONS_PATH }];
  }
  if (pathname === JOB_NEWSLETTERS_PATH || pathname === JOB_NEWSLETTER_DETAIL_PAGE_PATH) {
    return [{ label: "Job newsletters", href: JOB_NEWSLETTERS_PATH }];
  }
  if (pathname === AI_PROMPTS_PATH) {
    return [{ label: "AI prompts", href: AI_PROMPTS_PATH }];
  }
  if (pathname === AI_COSTS_PATH) {
    return [{ label: "AI costs", href: AI_COSTS_PATH }];
  }
  if (pathname === EXPERIENCE_PATH) {
    return [{ label: "Experience", href: EXPERIENCE_PATH }];
  }

  return [];
};
