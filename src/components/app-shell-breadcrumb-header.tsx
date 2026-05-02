"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { BreadcrumbBuilderActions } from "@/store/builders/breadcrumbBuilder";
import { resolveDefaultDashboardBreadcrumbForPathname } from "@/utils/navigation";
import type { BreadcrumbItem } from "@/model/breadcrumb";

/**
 * Luckee-style breadcrumb row: small gray trail with `/` separators, under a light border.
 */
export const AppShellBreadcrumbHeader = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const reduxItems = useAppSelector((s) => s.breadcrumbBuilder.items);

  useLayoutEffect(() => {
    dispatch(BreadcrumbBuilderActions.reset());
  }, [dispatch, pathname]);

  const fallbackItems = useMemo(
    () => resolveDefaultDashboardBreadcrumbForPathname(pathname),
    [pathname],
  );

  const items: BreadcrumbItem[] = reduxItems.length > 0 ? reduxItems : fallbackItems;

  if (items.length === 0) {
    return null;
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Breadcrumb">
        <ol className={styles.list}>
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {index > 0 ? (
                <span className={styles.sep} aria-hidden="true">
                  /
                </span>
              ) : null}
              {item.onSelect ? (
                <button type="button" className={styles.action} onClick={item.onSelect}>
                  {item.label}
                </button>
              ) : item.href ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current}>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
};

const styles = {
  header: `
    shrink-0 border-b border-gray-200/80 bg-zinc-50/90 px-4 py-2.5
  `,
  nav: `flex min-w-0 flex-1 items-center`,
  list: `flex min-w-0 flex-wrap items-center gap-2`,
  item: `flex min-w-0 items-center gap-2 text-xs font-medium text-gray-600`,
  sep: `text-xs font-normal text-gray-400`,
  link: `
    truncate text-gray-600 transition-colors hover:text-gray-900 focus:outline-none
  `,
  action: `
    truncate cursor-pointer border-none bg-transparent p-0 text-left text-xs font-medium
    text-gray-600 transition-colors hover:text-gray-900 focus:outline-none
  `,
  current: `truncate text-xs font-medium text-gray-900`,
};
