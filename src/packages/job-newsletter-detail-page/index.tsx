"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { JOB_NEWSLETTERS_PATH } from "@/config/routes";
import type { JobNewsletterIngestEmailResult } from "@/model/job-newsletter-ingest-result";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  processJobNewsletterFromEmailManagerThunk,
  updateJobNewsletterSourceThunk,
} from "@/store/thunks";
import { useRegisterBreadcrumbTrail } from "@/utils/navigation";
import { formatDateMedium } from "@/utils/date-time";
import { SourceModal, type SourceModalValues } from "@/packages/job-newsletter-sources-list/source-modal";

export const JobNewsletterDetailPage = () => {
  const dispatch = useAppDispatch();
  const source = useAppSelector((s) => s.currentJobNewsletterSource);
  const [processing, setProcessing] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editBusy, setEditBusy] = useState(false);
  const [lastResults, setLastResults] = useState<JobNewsletterIngestEmailResult[]>([]);

  useRegisterBreadcrumbTrail(
    () => {
      const base = [{ label: "Job newsletters", href: JOB_NEWSLETTERS_PATH }];
      if (!source.id) return base;
      return [...base, { label: source.name }];
    },
    [source.id, source.name],
  );

  const sourceEmailResults = useMemo(
    () =>
      lastResults.filter(
        (row) =>
          row.sourceId === source.id ||
          row.sourceName?.toLowerCase() === source.name.toLowerCase(),
      ),
    [lastResults, source.id, source.name],
  );

  const handleProcess = useCallback(async () => {
    setProcessing(true);
    const outcome = await dispatch(processJobNewsletterFromEmailManagerThunk());
    setProcessing(false);

    if (outcome.status !== 200) {
      toast.error(outcome.error ?? "Could not process emails from Email Manager");
      return;
    }

    setLastResults(outcome.result.emailResults);

    const forSource = outcome.result.emailResults.filter(
      (row: JobNewsletterIngestEmailResult) =>
        row.sourceId === source.id ||
        row.sourceName?.toLowerCase() === source.name.toLowerCase(),
    );
    const listingsForSource = forSource.reduce(
      (sum: number, row: JobNewsletterIngestEmailResult) => sum + row.listingsFound,
      0,
    );

    toast.success(
      `Processed ${outcome.result.emailsProcessed} email(s) — ${outcome.result.jobsCreated} job(s) created, ${outcome.result.jobsSkipped} skipped`,
    );

    if (forSource.length === 0 && outcome.result.emailsProcessed === 0) {
      toast.message("No unprocessed emails in Email Manager");
    } else if (listingsForSource === 0 && forSource.some((r: JobNewsletterIngestEmailResult) => r.status === "parse_error")) {
      toast.error(
        forSource.find((r: JobNewsletterIngestEmailResult) => r.parseError)?.parseError ??
          "Parse failed for this source",
      );
    }
  }, [dispatch, source.id, source.name]);

  const handleUpdate = useCallback(
    async (values: SourceModalValues) => {
      if (!source.id) return;
      setEditBusy(true);
      const status = await dispatch(updateJobNewsletterSourceThunk({ id: source.id, ...values }));
      setEditBusy(false);
      if (status === 200) {
        toast.success("Newsletter source saved");
        setEditOpen(false);
      } else {
        toast.error("Save failed");
      }
    },
    [dispatch, source.id],
  );

  if (!source.id) {
    return (
      <div className={t.pageWrap}>
        <p className={t.emptyMessage}>
          Select a newsletter source from the list, or create one on Job newsletters.
        </p>
      </div>
    );
  }

  return (
    <div className={t.pageWrap}>
      <div className={t.headerCard}>
        <div className={t.headerOneLine}>
          <div className={t.headerTitleRow}>
            <h1 className={t.headerPrimaryTitle}>{source.name}</h1>
            <span className={source.enabled ? styles.statusOn : styles.statusOff}>
              {source.enabled ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className={t.headerActions}>
            <button type="button" className={t.btnGhost} onClick={() => setEditOpen(true)}>
              Edit
            </button>
            <button
              type="button"
              className={t.btnPrimarySm}
              disabled={processing || !source.enabled}
              onClick={() => void handleProcess()}
            >
              {processing ? "Processing…" : "Process emails from Email Manager"}
            </button>
          </div>
        </div>
        <p className={t.headerMetaLine}>
          Sender: <span className={styles.mono}>{source.senderEmail}</span>
        </p>
        <p className={t.headerMutedLine}>Updated {formatDateMedium(source.updatedAt)}</p>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Parse instructions</h2>
        <pre className={styles.instructionsBlock}>{source.parseInstructions}</pre>
      </section>

      {sourceEmailResults.length > 0 ? (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Last run (this source)</h2>
          <ul className={styles.resultsList}>
            {sourceEmailResults.map((row) => (
              <li key={row.gmailMessageId} className={styles.resultItem}>
                <p className={styles.resultMeta}>
                  {row.status} · {row.listingsFound} listing(s) · {row.jobs.length} job row(s)
                </p>
                {row.parseError ? <p className={styles.resultError}>{row.parseError}</p> : null}
                {row.jobs.length > 0 ? (
                  <ul className={styles.jobList}>
                    {row.jobs.map((job) => (
                      <li key={`${row.gmailMessageId}-${job.url}-${job.title}`}>
                        {job.title || "Untitled"} @ {job.companyName || "Unknown"} — {job.status}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {editOpen ? (
        <SourceModal
          mode="edit"
          initial={source}
          busy={editBusy}
          onClose={() => setEditOpen(false)}
          onSubmit={(values) => void handleUpdate(values)}
        />
      ) : null}
    </div>
  );
};

const styles = {
  statusOn: `text-xs font-medium text-green-700`,
  statusOff: `text-xs font-medium text-gray-500`,
  mono: `font-mono text-sm text-gray-800`,
  section: `rounded-lg border border-gray-200 bg-white p-5 space-y-3`,
  sectionTitle: `text-sm font-semibold text-gray-900 uppercase tracking-wider`,
  instructionsBlock: `
    whitespace-pre-wrap text-sm leading-relaxed text-gray-800 font-sans
    rounded-md border border-gray-100 bg-gray-50 p-4
  `,
  resultsList: `space-y-3`,
  resultItem: `rounded-md border border-gray-200 p-3 text-sm`,
  resultMeta: `font-medium text-gray-900`,
  resultError: `mt-1 text-red-600`,
  jobList: `mt-2 list-disc pl-5 text-gray-700 space-y-1`,
} as const;
