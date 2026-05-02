"use client";

import { UserCircle } from "lucide-react";
import { useAppSelector } from "@/store";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

export const OnlineProfilesSection = () => {
  const employee = useAppSelector((s) => s.currentCompanyEmployee);
  const li = employee.linkedinUrl
    ? employee.linkedinUrl.startsWith("http")
      ? employee.linkedinUrl
      : `https://${employee.linkedinUrl}`
    : "";

  return (
    <section className={styles.card} aria-labelledby="crm-employee-profiles-heading">
      <div className={styles.cardHeader}>
        <UserCircle className={styles.icon} aria-hidden />
        <h2 id="crm-employee-profiles-heading" className={styles.cardTitle}>
          Contact & profiles
        </h2>
      </div>
      <div className={styles.grid}>
        {employee.email ? (
          <a className={styles.chip} href={`mailto:${employee.email}`}>
            Email
          </a>
        ) : null}
        {li ? (
          <a className={styles.chip} href={li} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        ) : (
          <span className={styles.muted}>Add LinkedIn URL via Employees list edit (coming soon) or API.</span>
        )}
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
};
