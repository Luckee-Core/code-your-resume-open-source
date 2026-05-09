"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { JOB_APPLICATION_DETAIL_PAGE_PATH } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/store";
import { createJobApplicationThunk } from "@/store/thunks";
import { JOB_DETAIL_BUILDER_SECTION_TITLE } from "@/model/job-detail-builder";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { JobDetailSectionCard } from "../section-card";
import { ApplicationRow } from "./ApplicationRow";
import { GenerateResume } from "./generate-resume";

export const ApplicationsSection = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const jobId = useAppSelector((s) => s.currentJob.id);
  const applicationsMap = useAppSelector((s) => s.jobApplications);
  const imageGraphics = useAppSelector((s) => s.imageGraphics);
  const [graphicId, setGraphicId] = useState("");
  const [busy, setBusy] = useState(false);

  const rows = useMemo(
    () => (jobId ? Object.values(applicationsMap).filter((a) => a.jobId === jobId) : []),
    [applicationsMap, jobId],
  );

  const graphicsList = useMemo(() => Object.values(imageGraphics), [imageGraphics]);

  const onLog = async () => {
    if (!jobId) return;
    if (!graphicId) {
      toast.error("Pick a resume graphic");
      return;
    }
    setBusy(true);
    const status = await dispatch(
      createJobApplicationThunk({
        jobId,
        submittedAt: new Date().toISOString(),
        imageGraphicId: graphicId,
        notes: "",
      }),
    );
    setBusy(false);
    if (status === 200) {
      toast.success("Application recorded");
      setGraphicId("");
      router.push(JOB_APPLICATION_DETAIL_PAGE_PATH);
    } else {
      toast.error("Could not create application");
    }
  };

  return (
    <JobDetailSectionCard
      sectionKey="applications"
      title={JOB_DETAIL_BUILDER_SECTION_TITLE.applications}
      headingId="crm-job-applications-heading"
    >
      <div className={styles.stack}>
        <GenerateResume />
        <div className={styles.logRow}>
          <select
            className={styles.select}
            value={graphicId}
            onChange={(e) => setGraphicId(e.target.value)}
            aria-label="Resume graphic"
          >
            <option value="">Log application…</option>
            {graphicsList.map((g) => (
              <option key={g.id} value={g.id}>
                {g.title || g.id}
              </option>
            ))}
          </select>
          <button
            type="button"
            className={styles.logBtn}
            disabled={!graphicId || busy}
            onClick={() => void onLog()}
          >
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
        {rows.length === 0 ? (
          <p className={styles.empty}>No applications yet.</p>
        ) : (
          <table className={styles.table}>
            <tbody>
              {rows.map((a) => (
                <ApplicationRow key={a.id} application={a} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </JobDetailSectionCard>
  );
};

const styles = {
  stack: `space-y-3`,
  logRow: `flex items-center gap-2`,
  select: `flex-1 ${t.formInput} text-xs`,
  logBtn: t.btnPrimarySm,
  empty: `text-sm italic text-gray-400`,
  table: `w-full border-collapse text-sm text-gray-800`,
};
