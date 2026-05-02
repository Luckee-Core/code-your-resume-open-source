import { createEmployeeApi } from "@/api/employee/create";
import { deleteEmployeeApi } from "@/api/employee/delete";
import { getEmployeeApi } from "@/api/employee/get";
import { listEmployeesApi } from "@/api/employee/list";
import { updateEmployeeApi } from "@/api/employee/update";
import type { AppThunk } from "@/store";
import { EmployeesActions } from "@/store/dumps/employees";
import { CurrentCompanyEmployeeActions } from "@/store/current/currentCompanyEmployee";

type Status = Promise<200 | 400 | 500>;

/**
 * Fetches an employee by id and sets `currentCompanyEmployee`.
 */
export const openCompanyEmployeeThunk = (id: string): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await getEmployeeApi(id);
    if (!result.success || !result.data) {
      return 400;
    }
    dispatch(EmployeesActions.upsertEmployee(result.data));
    dispatch(CurrentCompanyEmployeeActions.setCurrentCompanyEmployee(result.data));
    return 200;
  };
};

/**
 * Creates an employee row.
 */
export const createEmployeeThunk = (input: {
  companyId: string;
  name: string;
  role: string;
  email: string;
  linkedinUrl: string;
}): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await createEmployeeApi(input);
    if (!result.success || !result.data) {
      return 400;
    }
    dispatch(EmployeesActions.upsertEmployee(result.data));
    dispatch(CurrentCompanyEmployeeActions.setCurrentCompanyEmployee(result.data));
    return 200;
  };
};

/**
 * Updates an employee row.
 */
export const updateEmployeeThunk = (input: {
  id: string;
  companyId?: string;
  name?: string;
  role?: string;
  email?: string;
  linkedinUrl?: string;
}): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const result = await updateEmployeeApi(input);
    if (!result.success || !result.data) {
      return 400;
    }
    dispatch(EmployeesActions.upsertEmployee(result.data));
    const cur = getState().currentCompanyEmployee;
    if (cur.id === result.data.id) {
      dispatch(CurrentCompanyEmployeeActions.setCurrentCompanyEmployee(result.data));
    }
    return 200;
  };
};

/**
 * Deletes an employee by id.
 */
export const deleteEmployeeThunk = (id: string): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const result = await deleteEmployeeApi(id);
    if (!result.success) {
      return 400;
    }
    dispatch(EmployeesActions.removeEmployee(id));
    if (getState().currentCompanyEmployee.id === id) {
      dispatch(CurrentCompanyEmployeeActions.resetCurrentCompanyEmployee());
    }
    return 200;
  };
};

/**
 * Reloads employees from the server.
 */
export const refreshEmployeesThunk = (): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await listEmployeesApi();
    if (!result.success || !result.data) {
      return 400;
    }
    dispatch(EmployeesActions.upsertEmployees(result.data));
    return 200;
  };
};
