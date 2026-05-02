"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteEmployeeThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

export const DetailHeader = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const employee = useAppSelector((s) => s.currentCompanyEmployee);
  const companies = useAppSelector((s) => s.companies);
  const companyName = employee.companyId ? companies[employee.companyId]?.name : undefined;

  const onDelete = async () => {
    if (!employee.id) return;
    if (!window.confirm("Delete this employee?")) return;
    const status = await dispatch(deleteEmployeeThunk(employee.id));
    if (status === 200) {
      toast.success("Employee deleted");
      router.push("/employees");
    } else {
      toast.error("Could not delete");
    }
  };

  return (
    <header>
      <div className={styles.headerCard}>
        <div className={styles.headerOneLine}>
          <div className={styles.titleBlock}>
            <h2 className={styles.businessTitle}>{employee.name.trim() || "Untitled"}</h2>
            {companyName ? <span className={styles.metaLine}>{companyName}</span> : null}
            {employee.role ? <span className={styles.roleLine}>{employee.role}</span> : null}
          </div>
          <div className={styles.headerActions}>
            <button type="button" className={styles.btnDanger} onClick={() => void onDelete()}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const styles = {
  headerCard: t.headerCard,
  headerOneLine: t.headerOneLine,
  titleBlock: `flex min-w-0 flex-1 flex-col gap-0.5`,
  businessTitle: t.headerPrimaryTitle,
  metaLine: `text-xs text-gray-500 truncate`,
  roleLine: `text-sm text-gray-700`,
  headerActions: t.headerActions,
  btnDanger: t.btnDanger,
};
