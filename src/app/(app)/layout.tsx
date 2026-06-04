import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";

type AppLayoutProps = {
  children: ReactNode;
};

/**
 * Dashboard and CRM routes: Luckee-style shell with sidebar.
 */
export default function AppLayout({ children }: AppLayoutProps) {
  return <AppShell>{children}</AppShell>;
}
