"use client";

import { useCallback, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { JOB_DETAIL_PAGE_PATH } from "@/config/routes";
import { JOB_STATUSES, type Job, type JobStatus } from "@/model/job";
import { useAppDispatch } from "@/store";
import { CurrentJobActions } from "@/store/current/currentJob";
import { updateJobThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { getJobPostingHref } from "@/utils/job/get-job-posting-href";

type JobRowProps = {
  job: Job;
};

export const JobRow = (props: JobRowProps) => {
  const { job } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [savingStatus, setSavingStatus] = useState(false);

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
      <td className={styles.titleCell}>{job.title}</td>
      <td className={styles.statusCell} onClick={stopRowClick}>
        <select
          className={styles.statusSelect}
          value={job.status}
          disabled={savingStatus}
          aria-label={`Status for ${job.title}`}
          onChange={(e) => void onChangeStatus(e.target.value as JobStatus)}
        >
          {JOB_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </td>
      <td className={styles.urlCell} onClick={stopRowClick}>
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
          "—"
        )}
      </td>
    </tr>
  );
};

const styles = {
  row: t.tbodyRow,
  titleCell: t.tdCell,
  statusCell: t.tdCellMuted,
  statusSelect: `${t.selectSm} w-full max-w-[8.5rem] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60`,
  urlCell: t.tdCellTruncate,
  urlLink: `inline-flex items-center gap-1 text-orange-700 hover:text-orange-800 hover:underline`,
  urlIcon: `h-3.5 w-3.5 shrink-0`,
};
