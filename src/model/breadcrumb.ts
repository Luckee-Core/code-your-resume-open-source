/**
 * One menu row in a breadcrumb dropdown (Luckee `AppLayoutBreadcrumbMenuItem`).
 */
export type BreadcrumbMenuItem = {
  label: string;
  onSelect: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
};

/**
 * One segment in the app shell breadcrumb trail (ADR 010).
 */
export type BreadcrumbItem = {
  label: string;
  href?: string;
  onSelect?: () => void;
  menuItems?: BreadcrumbMenuItem[];
  isPendingSelection?: boolean;
};
