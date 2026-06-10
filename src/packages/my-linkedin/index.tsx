"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import {
  createTenantLinkedInProfileThunk,
  loadTenantLinkedInProfileThunk,
  syncTenantLinkedInProfileThunk,
  updateTenantLinkedInProfileUrlThunk,
} from "@/store/thunks";
import type { LinkedInCertification } from "@/model/linkedin-certification";
import type { LinkedInEducation } from "@/model/linkedin-education";
import type { LinkedInEmployment } from "@/model/linkedin-employment";
import type { LinkedInProfile } from "@/model/linkedin-profile";
import { formatLinkedInEmploymentDates } from "./format-linkedin-employment-dates";

/**
 * My LinkedIn — save profile URL, sync from Apify, view normalized profile data.
 */
export const MyLinkedInPage = () => {
  const dispatch = useAppDispatch();
  const linkedInProfiles = useAppSelector((s) => s.linkedInProfiles);
  const linkedInEmployments = useAppSelector((s) => s.linkedInEmployments);
  const linkedInEducations = useAppSelector((s) => s.linkedInEducations);
  const linkedInCertifications = useAppSelector((s) => s.linkedInCertifications);

  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      await dispatch(loadTenantLinkedInProfileThunk());
      setLoading(false);
    })();
  }, [dispatch]);

  const tenantProfile = useMemo((): LinkedInProfile | null => {
    return Object.values(linkedInProfiles).find((p) => p.isTenant) ?? null;
  }, [linkedInProfiles]);

  useEffect(() => {
    if (tenantProfile?.linkedinUrl) {
      setUrlInput(tenantProfile.linkedinUrl);
    }
  }, [tenantProfile?.linkedinUrl]);

  const profileId = tenantProfile?.id ?? null;

  const employmentRows = useMemo((): LinkedInEmployment[] => {
    if (!profileId) return [];
    return Object.values(linkedInEmployments)
      .filter((row) => row.linkedinProfileId === profileId)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [linkedInEmployments, profileId]);

  const educationRows = useMemo((): LinkedInEducation[] => {
    if (!profileId) return [];
    return Object.values(linkedInEducations)
      .filter((row) => row.linkedinProfileId === profileId)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [linkedInEducations, profileId]);

  const certificationRows = useMemo((): LinkedInCertification[] => {
    if (!profileId) return [];
    return Object.values(linkedInCertifications)
      .filter((row) => row.linkedinProfileId === profileId)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [linkedInCertifications, profileId]);

  const onSaveProfile = async () => {
    const linkedinUrl = urlInput.trim();
    if (!linkedinUrl) {
      toast.error("Enter your LinkedIn profile URL");
      return;
    }

    setBusy(true);
    const status = tenantProfile
      ? await dispatch(updateTenantLinkedInProfileUrlThunk({ linkedinUrl }))
      : await dispatch(createTenantLinkedInProfileThunk({ linkedinUrl }));
    setBusy(false);

    if (status === 200) {
      toast.success(tenantProfile ? "Profile URL saved" : "Profile saved");
    } else if (status === 400) {
      toast.error("Invalid LinkedIn profile URL");
    } else {
      toast.error("Could not save profile URL");
    }
  };

  const onSync = async () => {
    setSyncing(true);
    const status = await dispatch(syncTenantLinkedInProfileThunk());
    setSyncing(false);

    if (status === 200) {
      toast.success("LinkedIn profile synced");
    } else if (status === 400) {
      toast.error("Save your LinkedIn profile URL before syncing");
    } else {
      toast.error("LinkedIn sync failed — is linkedin-scraper-express-server running?");
    }
  };

  return (
    <div className={styles.pageWrap}>
      <header className={styles.header}>
        <h1 className={styles.h1}>My LinkedIn</h1>
        <p className={styles.muted}>
          Save your profile URL, then sync to pull experience, education, and certifications from LinkedIn.
        </p>
      </header>

      <div className={styles.formBox}>
        <label className={styles.label} htmlFor="linkedin-url">
          LinkedIn profile URL
        </label>
        <input
          id="linkedin-url"
          className={styles.input}
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="https://www.linkedin.com/in/your-handle"
        />
        <div className={styles.actions}>
          <button type="button" className={styles.primaryBtn} disabled={busy} onClick={() => void onSaveProfile()}>
            {busy ? "Saving…" : tenantProfile ? "Save URL" : "Save profile"}
          </button>
          {tenantProfile ? (
            <button
              type="button"
              className={styles.secondaryBtn}
              disabled={syncing}
              onClick={() => void onSync()}
            >
              {syncing ? "Syncing…" : "Sync from LinkedIn"}
            </button>
          ) : null}
        </div>
      </div>

      {loading ? <p className={t.emptyMessage}>Loading…</p> : null}

      {!loading && tenantProfile ? (
        <section className={styles.summary}>
          <h2 className={styles.sectionTitle}>Profile</h2>
          <dl className={styles.summaryGrid}>
            <div>
              <dt className={styles.dt}>Name</dt>
              <dd className={styles.dd}>{tenantProfile.name || "—"}</dd>
            </div>
            <div>
              <dt className={styles.dt}>Headline</dt>
              <dd className={styles.dd}>{tenantProfile.headline || "—"}</dd>
            </div>
            <div>
              <dt className={styles.dt}>Location</dt>
              <dd className={styles.dd}>{tenantProfile.location || "—"}</dd>
            </div>
            <div>
              <dt className={styles.dt}>Last synced</dt>
              <dd className={styles.dd}>
                {tenantProfile.syncedAt
                  ? new Date(tenantProfile.syncedAt).toLocaleString()
                  : "Not synced yet"}
              </dd>
            </div>
          </dl>
        </section>
      ) : null}

      {!loading && tenantProfile ? (
        <>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Employment</h2>
            {employmentRows.length === 0 ? (
              <p className={styles.empty}>No employment rows yet. Sync from LinkedIn.</p>
            ) : (
              <div className={t.tableShell}>
                <table className={t.table}>
                  <thead>
                    <tr className={t.theadRow}>
                      <th className={t.thCell}>Position</th>
                      <th className={t.thCell}>Company</th>
                      <th className={t.thCell}>Dates</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employmentRows.map((row) => (
                      <tr key={row.id} className={t.tbodyRow}>
                        <td className={t.tdCell}>{row.position || "—"}</td>
                        <td className={t.tdCell}>{row.companyName || "—"}</td>
                        <td className={t.tdCell}>{formatLinkedInEmploymentDates(row)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Education</h2>
            {educationRows.length === 0 ? (
              <p className={styles.empty}>No education rows yet. Sync from LinkedIn.</p>
            ) : (
              <div className={t.tableShell}>
                <table className={t.table}>
                  <thead>
                    <tr className={t.theadRow}>
                      <th className={t.thCell}>School</th>
                      <th className={t.thCell}>Degree</th>
                      <th className={t.thCell}>Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {educationRows.map((row) => (
                      <tr key={row.id} className={t.tbodyRow}>
                        <td className={t.tdCell}>{row.schoolName || "—"}</td>
                        <td className={t.tdCell}>{row.degree || row.fieldOfStudy || "—"}</td>
                        <td className={t.tdCell}>{row.period || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Certifications</h2>
            {certificationRows.length === 0 ? (
              <p className={styles.empty}>No certifications yet. Sync from LinkedIn.</p>
            ) : (
              <div className={t.tableShell}>
                <table className={t.table}>
                  <thead>
                    <tr className={t.theadRow}>
                      <th className={t.thCell}>Title</th>
                      <th className={t.thCell}>Issuer</th>
                      <th className={t.thCell}>Issued</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificationRows.map((row) => (
                      <tr key={row.id} className={t.tbodyRow}>
                        <td className={t.tdCell}>{row.title || "—"}</td>
                        <td className={t.tdCell}>{row.issuedBy || "—"}</td>
                        <td className={t.tdCell}>{row.issuedAt || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      ) : null}

      {!loading && !tenantProfile ? (
        <p className={styles.empty}>Add your LinkedIn profile URL above to get started.</p>
      ) : null}
    </div>
  );
};

const styles = {
  pageWrap: `${t.pageWrap} space-y-6`,
  header: `space-y-1`,
  h1: `text-xl font-semibold text-gray-900`,
  muted: `text-sm text-gray-500`,
  formBox: `${t.formDashedBox} space-y-3`,
  label: `text-sm font-medium text-gray-700`,
  input: `${t.formInput} w-full`,
  actions: `flex flex-wrap gap-2`,
  primaryBtn: t.btnPrimaryMd,
  secondaryBtn: `rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50`,
  summary: `rounded-lg border border-gray-200 bg-white p-4 space-y-3`,
  summaryGrid: `grid gap-4 sm:grid-cols-2`,
  dt: `text-xs font-medium uppercase tracking-wide text-gray-500`,
  dd: `mt-1 text-sm text-gray-900`,
  section: `space-y-2`,
  sectionTitle: `text-base font-semibold text-gray-900`,
  empty: `text-sm italic text-gray-400`,
} as const;
