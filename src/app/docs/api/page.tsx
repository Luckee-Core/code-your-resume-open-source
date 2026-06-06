import type { Metadata } from "next";
import { ApiDocsView } from "@/packages/api-docs";

export const metadata: Metadata = {
  title: "API reference | Documentation",
  description: "Live API reference for the Code Your Resume Express server.",
};

/**
 * API reference page — catalog rendered from Express GET /api-docs.json.
 */
export default function DocsApiPage() {
  return <ApiDocsView />;
}
