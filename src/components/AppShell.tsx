"use client";

import type { ReactNode } from "react";
import { AppShellBreadcrumbHeader } from "./app-shell-breadcrumb-header";
import { Sidebar } from "./sidebar";

type AppShellProps = {
  children: ReactNode;
};

/**
 * Luckee-style layout: fixed sidebar + scrollable main column.
 */
export const AppShell = (props: AppShellProps) => {
  const { children } = props;

  return (
    <>
      <div className={styles.shell}>
        <Sidebar />
        <div className={styles.mainColumn}>
          <AppShellBreadcrumbHeader />
          <main className={styles.main}>{children}</main>
        </div>
      </div>
    </>
  );
};

const styles = {
  shell: `flex h-screen w-full overflow-hidden bg-zinc-50`,
  mainColumn: `flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden`,
  main: `flex min-h-0 flex-1 flex-col overflow-y-auto`,
} as const;
