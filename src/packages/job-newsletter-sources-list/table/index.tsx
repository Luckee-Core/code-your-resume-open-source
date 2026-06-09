"use client";

import { JobNewsletterSourceRow } from "./job-newsletter-source-row";

type Props = {
  sourceIds: string[];
  onEdit: (sourceId: string) => void;
};

export const JobNewsletterSourcesTable = ({ sourceIds, onEdit }: Props) => {
  if (sourceIds.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>No newsletter sources yet</p>
        <p className={styles.emptyDescription}>
          Add a source to match forwarded emails by sender and tell AI how to parse job postings.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.rowNumberHeader}>#</th>
            <th className={styles.headerCell}>Name</th>
            <th className={styles.headerCell}>Sender</th>
            <th className={styles.headerCell}>Status</th>
            <th className={styles.headerCell}>Parse instructions</th>
            <th className={styles.headerCell}>Updated</th>
            <th className={styles.headerCellRight}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sourceIds.map((id, index) => (
            <JobNewsletterSourceRow
              key={id}
              sourceId={id}
              rowNumber={index + 1}
              onEdit={() => onEdit(id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableContainer: `
    bg-white rounded border border-gray-300 overflow-x-auto overflow-y-visible
  `,
  table: `w-full border-collapse text-sm relative`,
  rowNumberHeader: `
    px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide
    bg-gray-100 border-b border-gray-300 w-8
  `,
  headerCell: `
    px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide
    bg-gray-100 border-b border-gray-300
  `,
  headerCellRight: `
    px-3 py-2 text-right text-xs font-semibold text-gray-600 uppercase tracking-wide
    bg-gray-100 border-b border-gray-300
  `,
  emptyState: `bg-white rounded border border-gray-300 p-8 text-center`,
  emptyTitle: `text-lg font-semibold text-gray-900 mb-2`,
  emptyDescription: `text-sm text-gray-600`,
};
