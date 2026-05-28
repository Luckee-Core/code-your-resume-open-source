"use client";

import { useEffect, useId, useState } from "react";
import { isLocalDevHostname } from "@/constants/local-welcome-modal";

/**
 * Welcome for **local** hostnames: data on Supabase via Express, TSX preview security notes.
 * Dismissal is in-memory only (shows again after a full page reload).
 */
export const LocalWelcomeModal = () => {
  const titleId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const host = window.location.hostname;
    if (!isLocalDevHostname(host)) {
      return;
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open || typeof document === "undefined") {
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className={styles.scrim} role="presentation">
      <div
        className={styles.cardWrap}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={titleId} className={styles.title}>
          You’re on localhost
        </h2>
        <p className={styles.lead}>
          This app is meant to run on your machine for layout / TSX preview work. Nothing here replaces legal,
          compliance, or security review for how <em className={styles.em}>you</em> use it.
        </p>

        <div className={styles.sections}>
          <section aria-labelledby={`${titleId}-data`}>
            <h3 id={`${titleId}-data`} className={styles.h3}>
              Where your data lives
            </h3>
            <ul className={styles.list}>
              <li className={styles.li}>
                CRM data (companies, jobs) uses the Express JSON vault under{" "}
                <code className={styles.code}>.data/crm/</code>. Graphics use Supabase on the server only — the browser
                calls Express, not Supabase.
              </li>
            </ul>
          </section>

          <section aria-labelledby={`${titleId}-preview`}>
            <h3 id={`${titleId}-preview`} className={styles.h3}>
              Studio / TSX preview (security in one breath)
            </h3>
            <ul className={styles.list}>
              <li className={styles.li}>
                The studio <strong className={styles.strong}>compiles TSX in the browser</strong> and runs the result in
                an iframe with Tailwind + React loaded from public CDNs. That is arbitrary code execution in{" "}
                <em className={styles.em}>your</em> profile—treat pasted or model-generated TSX as{" "}
                <strong className={styles.strong}>trusted input</strong>.
              </li>
              <li className={styles.li}>
                See <code className={styles.code}>docs/tsx-live-preview-security.md</code> in the repo for the full note.
              </li>
            </ul>
          </section>
        </div>

        <p className={styles.footer}>
          Open source (MIT), as-is. Run the Express server on port 3053 so Next can proxy{" "}
          <code className={styles.code}>/api/data/*</code>.
        </p>

        <div className={styles.actions}>
          <button type="button" className={styles.primaryBtn} onClick={() => setOpen(false)}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  scrim: `
    fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4
    backdrop-blur-[2px]
  `,
  cardWrap: `
    max-h-[min(90vh,720px)] w-full max-w-lg overflow-y-auto rounded-lg border border-gray-200 bg-white p-5 shadow-xl
  `,
  title: `
    text-lg font-semibold text-gray-900
  `,
  lead: `
    mt-2 text-sm text-gray-600 leading-relaxed
  `,
  sections: `
    mt-4 space-y-4
  `,
  h3: `
    text-xs font-semibold uppercase tracking-wide text-gray-500
  `,
  list: `
    mt-2 list-disc space-y-2 pl-5 text-sm text-gray-700 leading-relaxed
  `,
  li: `
    marker:text-gray-400
  `,
  footer: `
    mt-4 text-xs text-gray-500 leading-relaxed
  `,
  actions: `
    mt-5 flex flex-wrap items-center gap-2
  `,
  primaryBtn: `
    inline-flex items-center justify-center rounded-md border border-orange-500 bg-orange-500 px-4 py-2 text-sm
    font-medium text-white hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400
    focus-visible:ring-offset-2
  `,
  code: `
    rounded bg-gray-100 px-1 py-0.5 text-[11px] font-mono text-gray-800
  `,
  em: `
    not-italic font-semibold text-gray-800
  `,
  strong: `
    font-semibold text-gray-900
  `,
};
