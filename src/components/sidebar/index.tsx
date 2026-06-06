"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Briefcase,
  Building2,
  FileText,
  MessageCircleQuestion,
  PanelLeft,
  PanelLeftClose,
  Rows3,
  Sparkles,
  UserSquare2,
} from "lucide-react";
import {
  COMPANIES_PATH,
  COMPANY_DETAIL_PAGE_PATH,
  DASHBOARD_PATH,
  COMPANY_EMPLOYEE_DETAIL_PAGE_PATH,
  DOCS_PATH,
  EMPLOYEES_PATH,
  EXPERIENCE_PATH,
  EXPERIENCE_STUDIO_PATH,
  JOB_APPLICATIONS_PATH,
  JOB_APPLICATION_DETAIL_PAGE_PATH,
  JOB_DETAIL_PAGE_PATH,
  JOB_QUESTIONS_PATH,
  JOBS_PATH,
} from "@/config/routes";
import { getAppSidebarSections } from "./get-app-sidebar-sections";

const isDashboardActive = (pathname: string): boolean => {
  if (pathname === DASHBOARD_PATH) return true;
  if (pathname === "/studio" || pathname.startsWith("/studio/")) return true;
  return false;
};

const navIcon = (name: string, active: boolean) => {
  const cls = active ? styles.navIconActive : styles.navIconIdle;
  switch (name) {
    case "Docs":
      return <BookOpen className={cls} />;
    case "Dashboard":
      return <Rows3 className={cls} />;
    case "Companies":
      return <Building2 className={cls} />;
    case "Jobs":
      return <Briefcase className={cls} />;
    case "Employees":
      return <UserSquare2 className={cls} />;
    case "Applications":
      return <FileText className={cls} />;
    case "Job questions":
      return <MessageCircleQuestion className={cls} />;
    case "Work History":
      return <Briefcase className={cls} />;
    case "Background Studio":
      return <Sparkles className={cls} />;
    default:
      return <Rows3 className={cls} />;
  }
};

/**
 * App shell sidebar (collapsible primary nav + job search CRM).
 */
export const Sidebar = () => {
  const pathname = usePathname();
  const sections = useMemo(() => getAppSidebarSections(), []);
  const [collapsed, setCollapsed] = useState(false);

  const isActiveHref = useCallback(
    (href: string, name: string) => {
      if (name === "Dashboard") return isDashboardActive(pathname);
      if (name === "Docs") return pathname === DOCS_PATH || pathname.startsWith(`${DOCS_PATH}/`);
      if (name === "Companies") {
        return pathname === COMPANIES_PATH || pathname === COMPANY_DETAIL_PAGE_PATH;
      }
      if (name === "Jobs") {
        return pathname === JOBS_PATH || pathname === JOB_DETAIL_PAGE_PATH;
      }
      if (name === "Employees") {
        return pathname === EMPLOYEES_PATH || pathname === COMPANY_EMPLOYEE_DETAIL_PAGE_PATH;
      }
      if (name === "Applications") {
        return pathname === JOB_APPLICATIONS_PATH || pathname === JOB_APPLICATION_DETAIL_PAGE_PATH;
      }
      if (name === "Job questions") {
        return pathname === JOB_QUESTIONS_PATH;
      }
      if (name === "Background Studio") return pathname === EXPERIENCE_STUDIO_PATH;
      if (name === "Work History") return pathname === EXPERIENCE_PATH;
      if (href === DASHBOARD_PATH) return pathname === DASHBOARD_PATH;
      return pathname === href;
    },
    [pathname],
  );

  return (
    <aside className={styles.sidebar(collapsed)}>
      <div className={styles.logoArea}>
        <Link href={DASHBOARD_PATH} className={styles.logoLink}>
          <span className={styles.logoMark}>
            <svg
              className={styles.logoSvg}
              viewBox="0 0 212 286"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={38}
              aria-hidden
            >
              <path
                fill="#ff7c1e"
                d="M199.005 0.0665482C197.108 -0.183221 195.208 0.274403 193.665 1.3669L3.32023 129.596C0.904057 131.218 -0.349119 134.064 0.085027 136.94C0.51918 139.817 2.56374 142.176 5.32169 143.032L80.7433 166.434L8.03238 273.498C5.65471 276.487 5.90422 280.754 8.58061 283.464C11.257 286.173 15.5128 286.477 18.5477 284.154L208.443 155.785C210.859 154.163 212.112 151.317 211.678 148.441C211.244 145.564 209.199 143.205 206.441 142.349L133.721 119.785L204.025 11.7281C205.361 9.70909 205.661 7.15285 204.792 4.88107C203.924 2.60928 202.014 0.907865 199.681 0.276121C199.455 0.206262 199.23 0.136407 199.005 0.0665482ZM171.264 34.5851L115.457 119.786C114.129 121.777 113.847 124.277 114.64 126.494C115.452 128.749 117.288 130.489 119.576 131.168L186.893 152.055L42.493 249.936L99.233 166.503C100.56 164.512 100.842 162.012 100.05 159.795C99.2374 157.54 97.4017 155.8 95.1135 155.121L24.87 133.326L171.264 34.5851Z"
              />
            </svg>
          </span>
          {!collapsed && <span className={styles.logoText}>Code Your Resume</span>}
        </Link>
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className={styles.collapseBtn}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeft className={styles.panelIcon} /> : <PanelLeftClose className={styles.panelIcon} />}
        </button>
      </div>

      <nav className={styles.nav}>
        {sections.map((section) => (
          <div key={section.title || "nav"} className={styles.navGroup}>
            {!collapsed && section.title.trim() ? (
              <p className={styles.navGroupTitle}>{section.title}</p>
            ) : null}
            <div className={styles.navGroupItems}>
              {section.links.map((link) => {
                const leafActive = isActiveHref(link.href, link.name);
                return (
                  <div key={`${link.name}-${link.href}`} className={styles.parentRow(leafActive)}>
                    <Link href={link.href} className={styles.parentLink(collapsed)} title={link.name}>
                      {navIcon(link.name, leafActive)}
                      {!collapsed && <span className={styles.linkLabel}>{link.name}</span>}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        {!collapsed ? (
          <p className={styles.footerText}>
            CRM & graphics via Express (Supabase, port 3053).
          </p>
        ) : null}
      </div>
    </aside>
  );
};

const styles = {
  sidebar: (collapsed: boolean) =>
    `${collapsed ? "w-16" : "w-56"} flex flex-col border-r border-zinc-800 bg-zinc-900 text-zinc-100 transition-all duration-200 shrink-0`,
  logoArea: `flex items-center justify-between px-3 py-4 border-b border-zinc-800 shrink-0`,
  logoLink: `flex items-center gap-2.5 min-w-0`,
  logoMark: `flex shrink-0 items-center justify-center`,
  logoSvg: `block h-8 w-auto shrink-0 text-[#ff7c1e]`,
  logoText: `truncate text-base font-semibold tracking-tight text-zinc-50`,
  collapseBtn: `shrink-0 rounded p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100`,
  nav: `min-h-0 flex-1 space-y-0.5 overflow-y-auto px-2 py-3`,
  navGroup: `space-y-1`,
  navGroupTitle: `px-2.5 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500`,
  navGroupItems: `space-y-0.5`,
  parentRow: (active: boolean) =>
    `group flex items-center rounded-md ${
      active ? "bg-zinc-800 text-zinc-50" : "text-zinc-200 hover:bg-zinc-800/60"
    }`,
  parentLink: (collapsed: boolean) =>
    `flex min-w-0 flex-1 items-center gap-2 truncate px-2.5 py-2 text-sm font-medium ${
      collapsed ? "justify-center" : ""
    }`,
  linkLabel: `truncate`,
  footer: `mt-auto shrink-0 border-t border-zinc-800 px-2 py-3`,
  footerText: `text-center text-[11px] leading-relaxed text-zinc-500`,
  mono: `rounded bg-zinc-800 px-0.5 font-mono text-[10px] text-zinc-300`,
  navIconIdle: `h-4 w-4 shrink-0 text-zinc-500`,
  navIconActive: `h-4 w-4 shrink-0 text-orange-400`,
  panelIcon: `h-4 w-4`,
} as const;
