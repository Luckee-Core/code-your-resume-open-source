"use client";

import { useRouter } from "next/navigation";
import { COMPANY_EMPLOYEE_DETAIL_PAGE_PATH } from "@/config/routes";
import type { Employee } from "@/model/employee";
import { useAppDispatch } from "@/store";
import { CurrentCompanyEmployeeActions } from "@/store/current/currentCompanyEmployee";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

type EmployeeRowProps = {
  employee: Employee;
};

export const EmployeeRow = (props: EmployeeRowProps) => {
  const { employee } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onOpen = () => {
    dispatch(CurrentCompanyEmployeeActions.setCurrentCompanyEmployee(employee));
    router.push(COMPANY_EMPLOYEE_DETAIL_PAGE_PATH);
  };

  return (
    <tr className={styles.row} onClick={onOpen}>
      <td className={styles.nameCell}>{employee.name}</td>
      <td className={styles.metaCell}>{employee.role || employee.email || "—"}</td>
    </tr>
  );
};

const styles = {
  row: t.tbodyRow,
  nameCell: t.tdCell,
  metaCell: t.tdCellMuted,
};
