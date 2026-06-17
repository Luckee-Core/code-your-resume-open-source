import type { SidebarSection } from "./types";

import {
  COMPANIES_PATH,
  DASHBOARD_PATH,
  DOCS_PATH,
  EXPERIENCE_VOICE_PATH,
  EXPERIENCE_STUDIO_PATH,
  PROJECTS_PATH,
  JOB_QUESTIONS_PATH,
  AI_COSTS_PATH,
  AI_PROMPTS_PATH,
  JOB_NEWSLETTERS_PATH,
  JOBS_PATH,
  MY_LINKEDIN_PATH,
} from "@/config/routes";

/**
 * Primary nav: Dashboard, Docs, and job-search CRM list routes (detail uses fixed `*-detail-page` URLs from lists).
 */
export const getAppSidebarSections = (): SidebarSection[] => {
  return [
    {
      title: "",
      links: [
        { name: "Dashboard", href: DASHBOARD_PATH },
        { name: "Docs", href: DOCS_PATH },
      ],
    },
    {
      title: "Profile",
      links: [{ name: "My LinkedIn", href: MY_LINKEDIN_PATH }],
    },
    {
      title: "Job search",
      links: [
        { name: "Companies", href: COMPANIES_PATH },
        { name: "Jobs", href: JOBS_PATH },
        { name: "Job questions", href: JOB_QUESTIONS_PATH },
        { name: "Job newsletters", href: JOB_NEWSLETTERS_PATH },
        { name: "AI prompts", href: AI_PROMPTS_PATH },
        { name: "AI costs", href: AI_COSTS_PATH },
        { name: "Voice style", href: EXPERIENCE_VOICE_PATH },
        { name: "Projects", href: PROJECTS_PATH },
        { name: "Technical skills", href: EXPERIENCE_STUDIO_PATH },
      ],
    },
  ];
};
