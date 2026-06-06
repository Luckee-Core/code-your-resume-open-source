import type { ReactNode } from "react";
import { getApiDocsCatalogCached } from "@/api/api-docs";
import { DocsCatalogProvider, DocsShell } from "@/packages/docs";
import { buildApiGroupSidebarChildren } from "@/utils/api-docs";

/**
 * Standalone docs layout (outside AppShell): sidebar + article column; loads API catalog once.
 */
export default async function DocsLayout(props: { children: ReactNode }) {
  const { children } = props;
  const result = await getApiDocsCatalogCached();
  const apiGroupNav = result.success && result.data ? buildApiGroupSidebarChildren(result.data.groups) : [];

  return (
    <DocsCatalogProvider
      catalog={result.success && result.data ? result.data : null}
      catalogStatus={result.httpStatus}
    >
      <DocsShell apiGroupNav={apiGroupNav}>{children}</DocsShell>
    </DocsCatalogProvider>
  );
}
