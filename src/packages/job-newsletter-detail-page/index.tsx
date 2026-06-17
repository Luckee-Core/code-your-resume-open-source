"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { JOB_NEWSLETTERS_PATH } from "@/config/routes";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  loadJobNewsletterIngestRunsThunk,
  processJobNewsletterFromEmailManagerThunk,
  updateJobNewsletterSourceThunk,
} from "@/store/thunks";
import { useRegisterBreadcrumbTrail } from "@/utils/navigation";
import { formatDateMedium } from "@/utils/date-time";
import { SourceModal, type SourceModalValues } from "@/packages/job-newsletter-sources-list/source-modal";
import { IngestRunsTable } from "./ingest-runs-table";

export const JobNewsletterDetailPage = () => {
  const dispatch = useAppDispatch();
  const source = useAppSelector((s) => s.currentJobNewsletterSource);
  const [processing, setProcessing] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editBusy, setEditBusy] = useState(false);

  useRegisterBreadcrumbTrail(
    () => {
      const base = [{ label: "Job newsletters", href: JOB_NEWSLETTERS_PATH }];
      if (!source.id) return base;
      return [...base, { label: source.name }];
    },
    [source.id, source.name],
  );

  const reloadDetailData = useCallback(async () => {
    if (!source.id) return;
    await dispatch(loadJobNewsletterIngestRunsThunk({ sourceId: source.id }));
  }, [dispatch, source.id]);

  useEffect(() => {
    void reloadDetailData();
  }, [reloadDetailData]);

  const handleProcess = useCallback(async () => {
    setProcessing(true);
    const outcome = await dispatch(
      processJobNewsletterFromEmailManagerThunk({ senderEmail: source.senderEmail }),
    );
    setProcessing(false);

    if (outcome.status !== 200) {
      toast.error(outcome.error ?? "Could not process emails from Email Manager");
      return;
    }

    await reloadDetailData();

    const forSource = outcome.result.emailResults.filter(
      (row) =>
        row.sourceId === source.id ||
        row.sourceName?.toLowerCase() === source.name.toLowerCase(),
    );
    const listingsForSource = forSource.reduce((sum, row) => sum + row.listingsFound, 0);

    toast.success(
      `Processed ${outcome.result.emailsProcessed} email(s) — ${outcome.result.jobsCreated} job(s) created, ${outcome.result.jobsSkipped} skipped`,
    );

    if (forSource.length === 0 && outcome.result.emailsProcessed === 0) {
      toast.message("No unprocessed emails in Email Manager (checked up to 48h)");
    } else if (
      listingsForSource === 0 &&
      forSource.some((row) => row.status === "parse_error")
    ) {
      toast.error(
        forSource.find((row) => row.parseError)?.parseError ?? "Parse failed for this source",
      );
    }
  }, [dispatch, reloadDetailData, source.id, source.name, source.senderEmail]);

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
      <div className={styles.wrap}>
        <p className={t.emptyMessage}>
          Select a newsletter source from the list, or create one on Job newsletters.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
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
        <h2 className={styles.sectionTitle}>Previous ingest runs</h2>
        <IngestRunsTable sourceId={source.id} />
      </section>

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
  wrap: t.pageWrapFullWidth,
  statusOn: `text-xs font-medium text-green-700`,
  statusOff: `text-xs font-medium text-gray-500`,
  mono: `font-mono text-sm text-gray-800`,
  section: `space-y-3`,
  sectionTitle: `text-sm font-semibold text-gray-900 uppercase tracking-wider`,
} as const;
