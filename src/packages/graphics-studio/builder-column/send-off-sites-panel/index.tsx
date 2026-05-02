"use client";

const SEND_OFF_SITES = [
  { label: "Luckee Blueprints", href: "https://luckeeblueprints.com" },
  { label: "Luckee App", href: "https://luckeeapp.com" },
  { label: "Trout House Tech", href: "https://trouthousetech.com" },
  { label: "Philly AI Consulting", href: "https://phillyaiconsulting.com" },
] as const;

/**
 * Simple “send off” strip: outbound links after export / studio work.
 */
export const SendOffSitesPanel = () => {
  return (
    <div className={styles.root}>
      <p className={styles.title}>Send off</p>
      <p className={styles.sub}>Related sites</p>
      <ul className={styles.list}>
        {SEND_OFF_SITES.map((site) => (
          <li key={site.href}>
            <a className={styles.link} href={site.href} target="_blank" rel="noreferrer">
              {site.label}
              <span className={styles.host}>{new URL(site.href).host}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  root: `
    mt-4 rounded-md border border-emerald-200 bg-emerald-50/60 px-3 py-3
  `,
  title: `
    text-[11px] font-semibold uppercase tracking-wide text-emerald-800
  `,
  sub: `
    mt-1 text-xs text-emerald-900/80
  `,
  list: `
    mt-2 flex flex-col gap-1.5
  `,
  link: `
    flex flex-col rounded-md border border-emerald-200/80 bg-white px-2.5 py-2 text-sm font-medium text-emerald-950
    transition-colors hover:border-emerald-400 hover:bg-emerald-50
  `,
  host: `
    mt-0.5 text-[11px] font-normal text-emerald-700/90
  `,
};
