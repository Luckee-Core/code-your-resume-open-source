"use client";

import { useRouter } from "next/navigation";
import { JOB_DETAIL_PAGE_PATH } from "@/config/routes";
import type { Job } from "@/model/job";
import { useAppDispatch } from "@/store";
import { CurrentJobActions } from "@/store/current/currentJob";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

type JobRowProps = {
  job: Job;
};

export const JobRow = (props: JobRowProps) => {
  const { job } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onOpen = () => {
    dispatch(CurrentJobActions.setCurrentJob(job));
    router.push(JOB_DETAIL_PAGE_PATH);
  };

  return (
    <tr className={styles.row} onClick={onOpen}>
      <td className={styles.titleCell}>{job.title}</td>
      <td className={styles.statusCell}>{job.status}</td>
      <td className={styles.urlCell}>{job.url || "—"}</td>
    </tr>
  );
};

const styles = {
  row: t.tbodyRow,
  titleCell: t.tdCell,
  statusCell: t.tdCellMuted,
  urlCell: t.tdCellTruncate,
};
