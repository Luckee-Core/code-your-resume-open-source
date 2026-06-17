"use client";

import { Sparkles } from "lucide-react";
import { useAppSelector } from "@/store";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { ProjectWebsiteResearchButton } from "./actions/website-research";

const formatResearchStamp = (iso: string): string | null => {
  const trimmed = iso.trim();
  if (!trimmed) return null;
  const d = new Date(trimmed);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
};

export const AtAGlanceSection = () => {
  const project = useAppSelector((s) => s.currentProject);
  const summary = project.websiteResearchSummary.trim();
  const hasSummary = summary.length > 0;
  const hasDescription = project.description.trim().length > 0;
  const researchStamp = formatResearchStamp(project.websiteResearchCompletedAt);

  return (
    <section className={styles.card} aria-labelledby="crm-project-at-a-glance-heading">
      <div className={styles.cardHeader}>
        <Sparkles className={styles.sparkles} aria-hidden />
        <div className={styles.cardHeaderBody}>
          <div className={styles.titleRow}>
            <h2 id="crm-project-at-a-glance-heading" className={styles.cardTitle}>
              At a glance
            </h2>
            <div className={styles.headerActions}>
              <ProjectWebsiteResearchButton variant="icon" />
            </div>
          </div>
          <p className={styles.cardSubtitle}>
            Website research summary (stored on the project). Use notes for timing and metrics.
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
          No website summary yet. Set a project URL, then use the refresh control to run research.
        </p>
      )}

      <div className={styles.descriptionBlock}>
        <h3 className={styles.subheading}>Description</h3>
        {hasDescription ? (
          <p className={styles.body}>{project.description}</p>
        ) : (
          <p className={styles.emptyBody}>No description yet. Use Edit to add one.</p>
        )}
      </div>
    </section>
  );
};

const styles = {
  card: t.researchCard,
  cardHeader: `flex items-start gap-2`,
  sparkles: t.onlineProfilesIcon,
  cardHeaderBody: `min-w-0 flex-1 space-y-0.5`,
  titleRow: `flex items-center justify-between gap-2 min-w-0`,
  headerActions: `inline-flex items-center gap-1`,
  cardTitle: t.researchCardTitle,
  cardSubtitle: `text-xs text-gray-500 mt-0.5`,
  summaryBlock: `space-y-2`,
  summaryText: `${t.researchCardBody} whitespace-pre-wrap`,
  descriptionBlock: `mt-5 pt-4 border-t border-gray-100 space-y-2`,
  subheading: `text-xs font-semibold uppercase tracking-wide text-gray-500`,
  body: t.researchCardBody,
  emptyBody: t.headerMutedLine,
  metaLine: `text-xs text-gray-400`,
};
