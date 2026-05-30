import type { Metadata } from "next";
import Link from "next/link";
import { DOCS_PATH } from "@/config/routes";

export const metadata: Metadata = {
  title: "Getting started | Documentation",
  description: "Run Code Your Resume locally with Express CRM JSON persistence.",
};

/**
 * Getting started: mirrors root README essentials for the in-app docs site.
 */
export default function DocsGettingStartedPage() {
  return (
    <article className={styles.article}>
      <p className={styles.breadcrumb}>
        <Link href={DOCS_PATH} className={styles.breadcrumbLink}>
          Documentation
        </Link>
        <span className={styles.breadcrumbSep} aria-hidden>
          /
        </span>
        <span className={styles.breadcrumbCurrent}>Getting started</span>
      </p>
      <h1 className={styles.h1}>Getting started</h1>
      <p className={styles.lead}>
        Next.js app that compiles TSX in the browser, shows a live iframe preview at each graphic&apos;s canvas size,
        and lets you save a draft and download a PNG. CRM uses Express JSON; graphics use Express → Supabase (
        <code className={styles.code}>image_graphics</code>).
      </p>

      <section className={styles.section}>
        <h2 className={styles.h2}>Run locally</h2>
        <pre className={styles.pre}>
          <code>{`# Terminal 1 — Express (port 3053)
cd code-your-resume-open-source-express-server
npm install && npm run dev

# Terminal 2 — Next (port 3000)
cd code-your-resume-open-source
npm install && npm run dev`}</code>
        </pre>
        <p className={styles.p}>
          Open <code className={styles.code}>http://localhost:3000</code>. Create a graphic, then open{" "}
          <strong className={styles.strong}>Studio</strong> from the list (<code className={styles.code}>/studio</code>
          ).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Persistence</h2>
        <p className={styles.p}>
          Companies and jobs: <code className={styles.code}>.data/crm/*.json</code> on Express. Graphics: Supabase table{" "}
          <code className={styles.code}>image_graphics</code> (run{" "}
          <code className={styles.code}>docs/supabase-image-graphics-schema.sql</code> in your tenant project). Production
          thunk failures are stored in <code className={styles.code}>thunk_errors</code> (run{" "}
          <code className={styles.code}>docs/supabase-error-log-schema.sql</code> on Express). Set{" "}
          <code className={styles.code}>SUPABASE_URL</code> and{" "}
          <code className={styles.code}>SUPABASE_SERVICE_ROLE_KEY</code> on Express only.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>API layer</h2>
        <p className={styles.p}>
          <code className={styles.code}>src/api/image-creation-studio/</code> calls Express at{" "}
          <code className={styles.code}>/api/data/image-graphic/*</code> (proxied by Next rewrites). Thunks return{" "}
          <code className={styles.code}>200 | 400 | 500</code>.
        </p>
      </section>
    </article>
  );
}

const styles = {
  article: `mx-auto max-w-2xl px-4 py-8`,
  breadcrumb: `text-xs text-gray-500`,
  breadcrumbLink: `text-orange-600 hover:underline`,
  breadcrumbSep: `mx-1`,
  breadcrumbCurrent: `text-gray-700`,
  h1: `mt-2 text-2xl font-semibold text-gray-900`,
  lead: `mt-3 text-sm text-gray-600 leading-relaxed`,
  section: `mt-8`,
  h2: `text-sm font-semibold uppercase tracking-wide text-gray-500`,
  p: `mt-2 text-sm text-gray-700 leading-relaxed`,
  pre: `mt-2 overflow-x-auto rounded-md border border-gray-200 bg-gray-50 p-3 text-xs`,
  code: `rounded bg-gray-100 px-1 py-0.5 font-mono text-[11px]`,
  strong: `font-semibold text-gray-900`,
};
