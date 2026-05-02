"use client";

import { Sparkles } from "lucide-react";
import { useAppSelector } from "@/store";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { CompanyWebsiteResearchButton } from "./actions/website-research";

const formatResearchStamp = (iso: string): string | null => {
  const t = iso.trim();
  if (!t) return null;
  const d = new Date(t);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
};

export const AtAGlanceSection = () => {
  const company = useAppSelector((s) => s.currentCompany);
  const summary = company.websiteResearchSummary.trim();
  const hasSummary = summary.length > 0;
  const hasNotes = company.notes.trim().length > 0;
  const researchStamp = formatResearchStamp(company.websiteResearchCompletedAt);

  return (
    <section className={styles.card} aria-labelledby="crm-company-at-a-glance-heading">
      <div className={styles.cardHeader}>
        <Sparkles className={styles.sparkles} aria-hidden />
        <div className={styles.cardHeaderBody}>
          <div className={styles.titleRow}>
            <h2 id="crm-company-at-a-glance-heading" className={styles.cardTitle}>
              At a glance
            </h2>
            <div className={styles.headerActions}>
              <CompanyWebsiteResearchButton variant="icon" />
            </div>
          </div>
          <p className={styles.cardSubtitle}>
            Website research summary (stored on the company). Hiring notes appear below.
          </p>
        </div>
      </div>

      {hasSummary ? (
        <div className={styles.summaryBlock}>
          <p className={styles.summaryText}>{summary}</p>
          {researchStamp ? <p className={styles.metaLine}>Research updated {researchStamp}</p> : null}
        </div>
      ) : (
        <p className={styles.emptyBody}>
          No website summary yet. Set a website (or discovered URLs), then use the refresh control
          to run research.
        </p>
      )}

      <div className={styles.notesBlock}>
        <h3 className={styles.notesHeading}>Hiring notes</h3>
        {hasNotes ? (
          <p className={styles.body}>{company.notes}</p>
        ) : (
          <p className={styles.emptyBody}>No notes yet. Use Edit to add hiring notes and follow-ups.</p>
        )}
      </div>
    </section>
  );
};

const styles = {
  card: t.researchCard,
  cardHeader: `flex items-start gap-2`,
  sparkles: `h-4 w-4 shrink-0 text-orange-500`,
  cardHeaderBody: `min-w-0 flex-1 space-y-0.5`,
  titleRow: `flex items-center justify-between gap-2 min-w-0`,
  headerActions: `inline-flex items-center gap-1`,
  cardTitle: `text-sm font-semibold text-gray-900`,
  cardSubtitle: `text-xs text-gray-500 mt-0.5`,
  summaryBlock: `space-y-2`,
  summaryText: `${t.researchCardBody} whitespace-pre-wrap`,
  notesBlock: `mt-5 pt-4 border-t border-gray-100 space-y-2`,
  notesHeading: `text-xs font-semibold uppercase tracking-wide text-gray-500`,
  body: t.researchCardBody,
  emptyBody: t.headerMutedLine,
  metaLine: `text-xs text-gray-400`,
};
