"use client";

import { Globe } from "lucide-react";
import { useAppSelector } from "@/store";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { OnlineProfilesGoogleSearchRow } from "./google-search";

/**
 * Manual research links + Site pages row (Google + same-domain link harvest).
 */
export const OnlineProfilesSection = () => {
  const company = useAppSelector((s) => s.currentCompany);
  const href = company.website
    ? company.website.startsWith("http")
      ? company.website
      : `https://${company.website}`
    : "";

  return (
    <section className={styles.card} aria-labelledby="crm-company-research-links-heading">
      <div className={styles.cardHeader}>
        <Globe className={styles.icon} aria-hidden />
        <h2 id="crm-company-research-links-heading" className={styles.cardTitle}>
          Research links
        </h2>
      </div>
      <div className={styles.grid}>
        {href ? (
          <a className={styles.chip} href={href} target="_blank" rel="noreferrer">
            Company website
          </a>
        ) : (
          <span className={styles.muted}>Add a website on the company to pin a link here.</span>
        )}
      </div>
      <div className={styles.sitePagesWrap}>
        <OnlineProfilesGoogleSearchRow />
      </div>
    </section>
  );
};

const styles = {
  card: t.researchCard,
  cardHeader: t.onlineProfilesCardHeader,
  icon: t.onlineProfilesIcon,
  cardTitle: t.researchCardTitle,
  grid: t.profileChipGrid,
  chip: t.chipLink,
  muted: `text-sm text-gray-500`,
  sitePagesWrap: `mt-4 pt-4 border-t border-gray-100`,
};
