"use client";

import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { loadCrmVaultThunk } from "@/store/thunks";
import { ExperienceBuilderActions } from "@/store/builders/experienceBuilder";
import type { Employment } from "@/model/employment";
import { AddEmploymentModal } from "./add-employment-modal";
import { EmploymentTableRow } from "./employment-table-row";

export const ExperiencePage = () => {
  const dispatch = useAppDispatch();
  const employments = useAppSelector((s) => s.employments);
  const modalOpen = useAppSelector((s) => s.experienceBuilder.isAddEmploymentModalOpen);

  useEffect(() => {
    void dispatch(loadCrmVaultThunk());
  }, [dispatch]);

  const sortedEmploymentIds = useMemo(() => {
    const list = Object.values(employments) as Employment[];
    return [...list]
      .sort((a, b) => {
        const ta = a.startDate ? new Date(a.startDate).getTime() : 0;
        const tb = b.startDate ? new Date(b.startDate).getTime() : 0;
        return tb - ta;
      })
      .map((e) => e.id);
  }, [employments]);

  const handleCloseModal = () => {
    dispatch(ExperienceBuilderActions.setAddEmploymentModalOpen(false));
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.h1}>Work History</h1>
          <p className={styles.muted}>Link a CRM company and job with start and end dates.</p>
        </div>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => dispatch(ExperienceBuilderActions.setAddEmploymentModalOpen(true))}
        >
          Add employment
        </button>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Company</th>
              <th className={styles.th}>Role</th>
              <th className={styles.th}>Start</th>
              <th className={styles.th}>End</th>
              <th className={styles.th} aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {sortedEmploymentIds.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.empty}>
                  No employment rows yet. Add one to tie a company and job to dates.
                </td>
              </tr>
            ) : (
              sortedEmploymentIds.map((id) => <EmploymentTableRow key={id} employmentId={id} />)
            )}
          </tbody>
        </table>
      </div>

      {modalOpen ? <AddEmploymentModal onClose={handleCloseModal} /> : null}
    </div>
  );
};

const styles = {
  wrap: `w-full max-w-4xl space-y-6 p-6`,
  headerRow: `flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between`,
  h1: `text-xl font-semibold text-zinc-900`,
  muted: `text-sm text-zinc-500`,
  tableWrap: `overflow-x-auto rounded-lg border border-zinc-200 bg-white`,
  table: `min-w-full border-collapse text-left text-sm`,
  th: `border-b border-zinc-200 bg-zinc-50 px-3 py-2 font-medium text-zinc-700`,
  empty: `px-3 py-8 text-center text-sm text-zinc-500`,
  primaryBtn: `rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50`,
};
