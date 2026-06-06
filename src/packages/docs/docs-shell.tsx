import type { ReactNode } from "react";
import type { DocsSidebarLeaf } from "./navigation";
import { DocsSidebar } from "./sidebar";

type DocsShellProps = {
  children: ReactNode;
  apiGroupNav: DocsSidebarLeaf[];
};

/**
 * Docs layout: inner sidebar + scrollable article column (nested under AppShell).
 */
export const DocsShell = (props: DocsShellProps) => {
  const { children, apiGroupNav } = props;

  return (
    <div className={styles.root}>
      <DocsSidebar apiGroupNav={apiGroupNav} />
      <div className={styles.main}>{children}</div>
    </div>
  );
};

const styles = {
  root: `
    flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden
    lg:flex-row
  `,
  main: `
    min-h-0 min-w-0 flex-1 overflow-y-auto bg-white
    lg:border-l lg:border-zinc-200
  `,
};
