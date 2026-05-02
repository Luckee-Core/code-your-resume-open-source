"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/store";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

export const NiceToHavesSection = () => {
  const jobId = useAppSelector((s) => s.currentJob.id);
  const allRows = useAppSelector((s) => s.jobNiceToHaves);

  const items = useMemo(
    () =>
      Object.values(allRows)
        .filter((r) => r.jobId === jobId)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    [allRows, jobId],
  );

  console.log("[NiceToHavesSection]", {
    jobId,
    totalRowsInDump: Object.keys(allRows).length,
    itemsForJob: items.length,
    sample: items.slice(0, 2),
  });

  return (
    <section className={styles.card} aria-labelledby="crm-job-nice-to-haves-heading">
      <h2 id="crm-job-nice-to-haves-heading" className={styles.cardTitle}>
        Nice to haves
      </h2>
      {items.length === 0 ? (
        <p className={styles.empty}>—</p>
      ) : (
        <div className={styles.tableViewport}>
          <div className={styles.tableShell}>
            <table className={styles.table}>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className={styles.row}>
                    <td className={styles.cell}>{item.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

const styles = {
  card: t.researchCard,
  cardTitle: t.researchCardTitle,
  empty: `text-sm text-gray-400 italic`,
  tableViewport: t.tableViewport,
  tableShell: t.tableShell,
  table: t.table,
  row: `border-b border-gray-100 last:border-0`,
  cell: `px-4 py-2 text-sm text-gray-800`,
};
