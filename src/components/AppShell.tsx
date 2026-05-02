"use client";

import type { ReactNode } from "react";
import { AppShellBreadcrumbHeader } from "./app-shell-breadcrumb-header";
import { LocalWelcomeModal } from "./local-welcome-modal";
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
      <div className="flex h-screen w-full overflow-hidden bg-zinc-50">
        <Sidebar />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <AppShellBreadcrumbHeader />
          <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
      <LocalWelcomeModal />
    </>
  );
};
