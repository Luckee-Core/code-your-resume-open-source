"use client";

import { useRouter } from "next/navigation";
import { JOB_APPLICATION_DETAIL_PAGE_PATH } from "@/config/routes";
import type { JobApplication } from "@/model/job-application";
import { useAppDispatch, useAppSelector } from "@/store";
import { CurrentJobApplicationActions } from "@/store/current/currentJobApplication";

type ApplicationRowProps = {
  application: JobApplication;
};

export const ApplicationRow = (props: ApplicationRowProps) => {
  const { application } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const imageGraphics = useAppSelector((s) => s.imageGraphics);
  const title = imageGraphics[application.imageGraphicId]?.title || application.imageGraphicId;

  const onOpen = () => {
    dispatch(CurrentJobApplicationActions.setCurrentJobApplication(application));
    router.push(JOB_APPLICATION_DETAIL_PAGE_PATH);
  };

  return (
    <tr className={styles.row} onClick={onOpen}>
      <td className={styles.titleCell}>{title}</td>
      <td className={styles.dateCell}>{new Date(application.submittedAt).toLocaleString()}</td>
    </tr>
  );
};

const styles = {
  row: `
    cursor-pointer border-b border-gray-100 last:border-0
    transition-colors hover:bg-gray-50/80
  `,
  titleCell: `py-2 pr-2 leading-relaxed`,
  dateCell: `py-2 text-right text-xs text-gray-500 whitespace-nowrap`,
};
