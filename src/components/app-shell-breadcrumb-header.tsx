"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { BreadcrumbBuilderActions } from "@/store/builders/breadcrumbBuilder";
import { resolveDefaultDashboardBreadcrumbForPathname } from "@/utils/navigation";
import type { BreadcrumbItem } from "@/model/breadcrumb";
import { AppShellBreadcrumbBar } from "./app-shell-breadcrumb-bar";

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
          <AppShellBreadcrumbBar items={items} />
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
};
