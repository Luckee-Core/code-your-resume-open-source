"use client";

import { useCallback, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { JOB_DETAIL_PAGE_PATH } from "@/config/routes";
import type { Job, JobStatus } from "@/model/job";
import { useAppDispatch, useAppSelector } from "@/store";
import { CurrentJobActions } from "@/store/current/currentJob";
import { updateJobThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { getJobPostingHref } from "@/utils/job/get-job-posting-href";

const statuses: JobStatus[] = ["draft", "applied", "closed", "archived"];

type JobListRowProps = {
  job: Job;
  rowNumber: number;
};

/**
 * Jobs list table row — reads company name from Redux; only `job` and row index are passed from parent.
 */
export const JobListRow = ({ job, rowNumber }: JobListRowProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [savingStatus, setSavingStatus] = useState(false);
  const companyName = useAppSelector((s) => s.companies[job.companyId]?.name);

  const postingHref = getJobPostingHref(job.url);

  const onOpen = () => {
    dispatch(CurrentJobActions.setCurrentJob(job));
    router.push(JOB_DETAIL_PAGE_PATH);
  };

  const onChangeStatus = useCallback(
    async (status: JobStatus) => {
      if (!job.id || status === job.status || savingStatus) return;
      setSavingStatus(true);
      const result = await dispatch(updateJobThunk({ id: job.id, status }));
      setSavingStatus(false);
      if (result === 200) {
        toast.success("Status updated");
      } else {
        toast.error("Could not update status");
      }
    },
    [dispatch, job.id, job.status, savingStatus],
  );

  const stopRowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <tr className={styles.row} onClick={onOpen}>
      <td className={styles.rowNumberCell}>{rowNumber}</td>
      <td className={styles.cell}>
        <span className={styles.titleText}>{job.title}</span>
      </td>
      <td className={styles.cell}>
        <span className={styles.companyMuted}>{companyName?.trim() || "—"}</span>
      </td>
      <td className={styles.cell} onClick={stopRowClick}>
        <select
          className={styles.statusSelect}
          value={job.status}
          disabled={savingStatus}
          aria-label={`Status for ${job.title}`}
          onChange={(e) => void onChangeStatus(e.target.value as JobStatus)}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </td>
      <td className={styles.cell} onClick={stopRowClick}>
        {postingHref ? (
          <a
            className={styles.urlLink}
            href={postingHref}
            target="_blank"
            rel="noreferrer"
            title={postingHref}
          >
            <ExternalLink className={styles.urlIcon} aria-hidden />
            Posting
          </a>
        ) : (
          <span className={styles.companyMuted}>—</span>
        )}
      </td>
    </tr>
  );
};

const styles = {
  row: `
    hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0 cursor-pointer
  `,
  rowNumberCell: `px-2 py-2 text-xs text-gray-500 tabular-nums`,
  cell: `px-3 py-2 text-sm text-gray-700`,
  titleText: `font-medium text-gray-900`,
  companyMuted: `text-gray-600`,
  statusSelect: `${t.selectSm} w-full max-w-[8.5rem] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`,
  urlLink: `inline-flex items-center gap-1 text-orange-700 hover:text-orange-800 hover:underline`,
  urlIcon: `h-3.5 w-3.5 shrink-0`,
};
