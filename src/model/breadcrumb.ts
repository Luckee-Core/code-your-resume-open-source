/**
 * One segment in the app shell breadcrumb trail (ADR 010).
 */
export type BreadcrumbItem = {
  label: string;
  href?: string;
  onSelect?: () => void;
};
