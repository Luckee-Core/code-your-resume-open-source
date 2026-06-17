import type { BreadcrumbItem } from "@/model/breadcrumb";
import {
  COMPANIES_PATH,
  COMPANY_DETAIL_PAGE_PATH,
  DASHBOARD_PATH,
  EXPERIENCE_VOICE_PATH,
  EXPERIENCE_STUDIO_PATH,
  PROJECTS_PATH,
  PROJECT_DETAIL_PAGE_PATH,
  JOB_DETAIL_PAGE_PATH,
  JOB_QUESTIONS_PATH,
  AI_COSTS_PATH,
  AI_PROMPTS_PATH,
  JOB_NEWSLETTERS_PATH,
  JOB_NEWSLETTER_DETAIL_PAGE_PATH,
  JOBS_PATH,
  MY_LINKEDIN_PATH,
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
  if (pathname === EXPERIENCE_VOICE_PATH) {
    return [{ label: "Voice style", href: EXPERIENCE_VOICE_PATH }];
  }
  if (pathname === EXPERIENCE_STUDIO_PATH) {
    return [{ label: "Technical skills", href: EXPERIENCE_STUDIO_PATH }];
  }
  if (pathname === PROJECTS_PATH || pathname === PROJECT_DETAIL_PAGE_PATH) {
    return [{ label: "Projects", href: PROJECTS_PATH }];
  }
  if (pathname === MY_LINKEDIN_PATH) {
    return [{ label: "My LinkedIn", href: MY_LINKEDIN_PATH }];
  }

  return [];
};
