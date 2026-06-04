import type { SidebarSection } from "./types";

import {
  COMPANIES_PATH,
  DOCS_PATH,
  EMPLOYEES_PATH,
  EXPERIENCE_PATH,
  EXPERIENCE_BACKGROUND_PATH,
  EXPERIENCE_STUDIO_PATH,
  JOB_APPLICATIONS_PATH,
  JOB_QUESTIONS_PATH,
  JOBS_PATH,
} from "@/config/routes";

/**
 * Primary nav: Graphics, Docs, and job-search CRM list routes (detail uses fixed `*-detail-page` URLs from lists).
 */
export const getAppSidebarSections = (): SidebarSection[] => {
  return [
    {
      title: "",
      links: [
        { name: "Graphics", href: "/" },
        { name: "Docs", href: DOCS_PATH },
      ],
    },
    {
      title: "Job search",
      links: [
        { name: "Companies", href: COMPANIES_PATH },
        { name: "Jobs", href: JOBS_PATH },
        { name: "Employees", href: EMPLOYEES_PATH },
        { name: "Applications", href: JOB_APPLICATIONS_PATH },
        { name: "Job questions", href: JOB_QUESTIONS_PATH },
        { name: "Work History", href: EXPERIENCE_PATH },
        { name: "Professional background", href: EXPERIENCE_BACKGROUND_PATH },
        { name: "Technical skills", href: EXPERIENCE_STUDIO_PATH },
      ],
    },
  ];
};
