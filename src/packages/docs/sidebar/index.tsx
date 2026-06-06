"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DOCS_API_PATH, DOCS_PATH } from "@/config/routes";
import { DOCS_NAV_ENTRIES, type DocsNavEntry, type DocsSidebarLeaf } from "@/packages/docs/navigation";

const getHrefHash = (href: string): string => {
  const hashIndex = href.indexOf("#");
  return hashIndex === -1 ? "" : href.slice(hashIndex);
};

const isLinkActive = (href: string, pathname: string): boolean => {
  if (href === DOCS_PATH) {
    return pathname === DOCS_PATH;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
};

const renderGuideEntry = (entry: DocsNavEntry, pathname: string) => {
  if (entry.kind === "label") {
    return (
      <li key={entry.text} className={styles.labelRow}>
        <p className={styles.sectionLabel}>{entry.text}</p>
      </li>
    );
  }
  const active = isLinkActive(entry.href, pathname);
  return (
    <li key={entry.href}>
      <Link href={entry.href} className={active ? styles.linkActive : styles.link}>
        {entry.name}
      </Link>
    </li>
  );
};

const renderApiEntity = (entity: DocsSidebarLeaf, pathname: string, hash: string) => {
  const entityHash = getHrefHash(entity.href);
  const entityPath = entity.href.split("#")[0];
  const active = pathname === entityPath && hash === entityHash;

  return (
    <li key={entity.href}>
      <a href={entity.href} className={active ? styles.linkActive : styles.link}>
        {entity.name}
      </a>
    </li>
  );
};

type DocsSidebarProps = {
  apiGroupNav: DocsSidebarLeaf[];
};

/**
 * Left rail for `/docs`: guides from {@link DOCS_NAV_ENTRIES} + API catalog groups.
 */
export const DocsSidebar = (props: DocsSidebarProps) => {
  const { apiGroupNav } = props;
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  const guideItems = useMemo(
    () => DOCS_NAV_ENTRIES.map((entry) => renderGuideEntry(entry, pathname)),
    [pathname],
  );

  const apiItems = useMemo(
    () => apiGroupNav.map((entity) => renderApiEntity(entity, pathname, hash)),
    [apiGroupNav, pathname, hash],
  );

  const onApiPage = pathname === DOCS_API_PATH;

  return (
    <aside className={styles.aside}>
      <div className={styles.inner}>
        <p className={styles.kicker}>Documentation</p>
        <nav className={styles.nav} aria-label="Guides">
          <p className={styles.sectionLabel}>Guides</p>
          <ul className={styles.list}>{guideItems}</ul>
        </nav>
        <nav className={styles.nav} aria-label="API">
          <p className={styles.sectionLabel}>API</p>
          <ul className={styles.list}>{apiItems}</ul>
          {onApiPage && apiGroupNav.length === 0 ? (
            <p className={styles.apiHint}>Start Express to load API entities.</p>
          ) : null}
        </nav>
      </div>
    </aside>
  );
};

const styles = {
  aside: `
    w-full shrink-0 border-b border-zinc-200 bg-zinc-50
    lg:w-56 lg:border-b-0 lg:border-r
  `,
  inner: `flex flex-col gap-6 px-4 py-6 lg:py-8`,
  kicker: `
    text-[11px] font-semibold uppercase tracking-wide text-zinc-500
  `,
  nav: `flex flex-col gap-2`,
  list: `space-y-1`,
  labelRow: `pt-3 pb-1 first:pt-0`,
  sectionLabel: `text-[11px] font-semibold uppercase tracking-wide text-zinc-400`,
  link: `
    block rounded-md px-2.5 py-2 text-sm font-medium text-zinc-700
    hover:bg-white hover:text-zinc-900
  `,
  linkActive: `
    block rounded-md px-2.5 py-2 text-sm font-semibold text-orange-700
    bg-orange-50 ring-1 ring-orange-200/80
  `,
  apiHint: `text-xs text-zinc-500 leading-relaxed`,
};
