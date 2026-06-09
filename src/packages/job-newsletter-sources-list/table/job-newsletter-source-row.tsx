"use client";

import { useRouter } from "next/navigation";
import { JOB_NEWSLETTER_DETAIL_PAGE_PATH } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/store";
import { CurrentJobNewsletterSourceActions } from "@/store/current/currentJobNewsletterSource";
import { formatDateMedium } from "@/utils/date-time";

type Props = {
  sourceId: string;
  rowNumber: number;
  onEdit: () => void;
};

export const JobNewsletterSourceRow = ({ sourceId, rowNumber, onEdit }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const source = useAppSelector((s) => s.jobNewsletterSources[sourceId]);
  if (!source) return null;

  const handleOpen = () => {
    dispatch(CurrentJobNewsletterSourceActions.setCurrentJobNewsletterSource(source));
    router.push(JOB_NEWSLETTER_DETAIL_PAGE_PATH);
  };

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    onEdit();
  };

  return (
    <tr className={styles.row} onClick={handleOpen} role="button" tabIndex={0}>
      <td className={styles.rowNumberCell}>{rowNumber}</td>
      <td className={styles.cell}>
        <span className={styles.nameText}>{source.name}</span>
      </td>
      <td className={styles.cell}>
        <span className={styles.senderText}>{source.senderEmail}</span>
      </td>
      <td className={styles.cell}>
        <span className={source.enabled ? styles.statusOn : styles.statusOff}>
          {source.enabled ? "Enabled" : "Disabled"}
        </span>
      </td>
      <td className={styles.instructionsCell}>
        <span className={styles.instructionsPreview}>{source.parseInstructions}</span>
      </td>
      <td className={styles.cell}>{formatDateMedium(source.updatedAt)}</td>
      <td className={styles.actionsCell}>
        <button type="button" className={styles.editButton} onClick={handleEdit}>
          Edit
        </button>
      </td>
    </tr>
  );
};

const styles = {
  row: `
    cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0
  `,
  rowNumberCell: `px-2 py-2 text-xs text-gray-500 tabular-nums`,
  cell: `px-3 py-2 text-sm text-gray-700`,
  instructionsCell: `max-w-md px-3 py-2 text-sm text-gray-600`,
  nameText: `font-medium text-gray-900`,
  senderText: `text-gray-600`,
  instructionsPreview: `line-clamp-2`,
  statusOn: `text-xs font-medium text-green-700`,
  statusOff: `text-xs font-medium text-gray-500`,
  actionsCell: `px-3 py-2 text-right`,
  editButton: `
    rounded-md border border-gray-200 px-2 py-1 text-xs font-medium text-gray-600
    hover:border-gray-300 hover:text-gray-900
  `,
};
