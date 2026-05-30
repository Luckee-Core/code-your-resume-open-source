"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/store";
import { JOB_DETAIL_BUILDER_SECTION_TITLE } from "@/model/job-detail-builder";
import { collectSortedJobBulletRowsByJobId } from "@/utils/job";
import { JobDetailSectionCard } from "../section-card";

export const RequirementsSection = () => {
  const jobId = useAppSelector((s) => s.currentJob.id);
  const allRows = useAppSelector((s) => s.jobRequirements);

  const items = useMemo(
    () => collectSortedJobBulletRowsByJobId(allRows, jobId),
    [allRows, jobId],
  );

  return (
    <JobDetailSectionCard
      sectionKey="requirements"
      title={JOB_DETAIL_BUILDER_SECTION_TITLE.requirements}
      headingId="crm-job-requirements-heading"
    >
      {items.length === 0 ? (
        <p className={styles.empty}>—</p>
      ) : (
        <table className={styles.table}>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className={styles.row}>
                <td className={styles.cell}>{item.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </JobDetailSectionCard>
  );
};

const styles = {
  empty: `text-sm italic text-gray-400`,
  table: `w-full border-collapse text-sm text-gray-800`,
  row: `border-b border-gray-100 last:border-0`,
  cell: `py-2 leading-relaxed`,
};
