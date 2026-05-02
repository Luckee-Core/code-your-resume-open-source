"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { loadCrmVaultThunk } from "@/store/thunks";
import { CurrentCompanyEmployeeActions } from "@/store/current/currentCompanyEmployee";
import { COMPANY_EMPLOYEE_DETAIL_PAGE_PATH } from "@/config/routes";

export default function EmployeesPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const employees = useAppSelector((s) => s.employees);

  useEffect(() => {
    void dispatch(loadCrmVaultThunk());
  }, [dispatch]);

  const rows = useMemo(() => Object.values(employees), [employees]);

  return (
    <div className={styles.wrap}>
      <h1 className={styles.h1}>Employees</h1>
      <p className={styles.muted}>People tied to companies (recruiters, hiring managers, etc.).</p>
      <ul className={styles.list}>
        {rows.length === 0 ? (
          <li className={styles.muted}>No employees yet.</li>
        ) : (
          rows.map((e) => (
            <li key={e.id}>
              <button
                type="button"
                className={styles.row}
                onClick={() => {
                  dispatch(CurrentCompanyEmployeeActions.setCurrentCompanyEmployee(e));
                  router.push(COMPANY_EMPLOYEE_DETAIL_PAGE_PATH);
                }}
              >
                <span className={styles.name}>{e.name}</span>
                <span className={styles.meta}>{e.email || e.role || "—"}</span>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

const styles = {
  wrap: `mx-auto w-full max-w-3xl space-y-4 p-4`,
  h1: `text-xl font-semibold text-zinc-900`,
  muted: `text-sm text-zinc-500`,
  list: `divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-white`,
  row: `flex w-full flex-col items-start gap-0.5 px-3 py-3 text-left hover:bg-zinc-50`,
  name: `text-sm font-medium text-zinc-900`,
  meta: `text-xs text-zinc-500`,
};
