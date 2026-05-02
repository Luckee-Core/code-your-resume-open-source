"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import { toast } from "sonner";
import { COMPANY_EMPLOYEE_DETAIL_PAGE_PATH } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/store";
import { createEmployeeThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";
import { EmployeeRow } from "./EmployeeRow";

export const EmployeesSection = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const companyId = useAppSelector((s) => s.currentCompany.id);
  const employees = useAppSelector((s) => s.employees);

  const rows = useMemo(
    () => (companyId ? Object.values(employees).filter((e) => e.companyId === companyId) : []),
    [employees, companyId],
  );

  const onAdd = async () => {
    if (!companyId) return;
    const name = window.prompt("Employee name?");
    if (!name?.trim()) return;
    const status = await dispatch(
      createEmployeeThunk({
        companyId,
        name: name.trim(),
        role: "",
        email: "",
        linkedinUrl: "",
      }),
    );
    if (status !== 200) {
      toast.error("Could not create employee");
      return;
    }
    toast.success("Employee created");
    router.push(COMPANY_EMPLOYEE_DETAIL_PAGE_PATH);
  };

  return (
    <section className={styles.panel} aria-labelledby="crm-company-employees-heading">
      <div className={styles.sectionHeader}>
        <h2 id="crm-company-employees-heading" className={styles.sectionTitle}>
          Employees
        </h2>
        <div className={styles.sectionAction}>
          <button type="button" className={styles.addButton} onClick={() => void onAdd()}>
            Add employee
          </button>
        </div>
      </div>
      {rows.length === 0 ? (
        <div className={styles.emptyState}>
          <Users className={styles.emptyIcon} aria-hidden />
          <p className={styles.emptyTitle}>No employees yet</p>
          <p className={styles.emptyHint}>Add people at this company to track outreach and roles.</p>
        </div>
      ) : (
        <div className={styles.tableViewport}>
          <div className={styles.tableShell}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.theadRow}>
                  <th className={styles.thCell}>Name</th>
                  <th className={styles.thCell}>Role / email</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((e) => (
                  <EmployeeRow key={e.id} employee={e} />
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
  panel: t.sectionPanel,
  sectionHeader: t.sectionHeader,
  sectionTitle: t.sectionTitle,
  sectionAction: t.sectionAction,
  addButton: t.btnPrimarySm,
  emptyState: t.emptyState,
  emptyIcon: t.emptyIcon,
  emptyTitle: t.emptyTitle,
  emptyHint: t.emptyHint,
  tableViewport: t.tableViewport,
  tableShell: t.tableShell,
  table: t.table,
  theadRow: t.theadRow,
  thCell: t.thCell,
};
