"use client";

import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteEmploymentThunk } from "@/store/thunks";

type Props = {
  employmentId: string;
};

export const EmploymentTableRow = ({ employmentId }: Props) => {
  const dispatch = useAppDispatch();
  const employment = useAppSelector((s) => s.employments[employmentId]);
  const companyName = useAppSelector((s) =>
    employment ? (s.companies[employment.companyId]?.name ?? employment.companyId) : "",
  );
  const job = useAppSelector((s) => (employment ? s.jobs[employment.jobId] : undefined));
  const saving = useAppSelector((s) => s.experienceBuilder.isSavingEmployment);

  const jobDisplay = useMemo(() => {
    if (!employment) return null;
    if (!job) return employment.jobId;
    return { title: job.title, isContract: job.type === "contract" };
  }, [employment, job]);

  if (!employment) return null;

  return (
    <tr>
      <td className={styles.td}>{companyName}</td>
      <td className={styles.td}>
        {typeof jobDisplay === "string" ? (
          jobDisplay
        ) : jobDisplay ? (
          <span className={styles.jobTitleRow}>
            {jobDisplay.title}
            {jobDisplay.isContract && (
              <span className={styles.contractBadge}>Contract</span>
            )}
          </span>
        ) : (
          "—"
        )}
      </td>
      <td className={styles.tdMuted}>{employment.startDate || "—"}</td>
      <td className={styles.tdMuted}>
        {employment.endDate?.trim() ? employment.endDate : "Present"}
      </td>
      <td className={styles.tdRight}>
        <button
          type="button"
          className={styles.dangerBtn}
          disabled={saving}
          onClick={() => void dispatch(deleteEmploymentThunk(employmentId))}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

const styles = {
  td: `border-b border-zinc-100 px-3 py-2.5 text-zinc-900`,
  tdMuted: `border-b border-zinc-100 px-3 py-2.5 text-zinc-600`,
  tdRight: `border-b border-zinc-100 px-3 py-2.5 text-right`,
  dangerBtn: `text-sm text-red-600 hover:text-red-700 disabled:opacity-50`,
  contractBadge: `inline-flex items-center rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-800`,
  jobTitleRow: `flex items-center gap-1.5`,
} as const;
