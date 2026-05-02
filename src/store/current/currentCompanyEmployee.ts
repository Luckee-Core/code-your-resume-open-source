import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Employee } from "@/model/employee";

const emptyEmployee = (): Employee => ({
  id: "",
  companyId: "",
  name: "",
  role: "",
  email: "",
  linkedinUrl: "",
  createdAt: "",
  updatedAt: "",
});

const initialState: Employee = emptyEmployee();

const currentCompanyEmployeeSlice = createSlice({
  name: "currentCompanyEmployee",
  initialState,
  reducers: {
    setCurrentCompanyEmployee: (_state, action: PayloadAction<Employee>) => action.payload,
    resetCurrentCompanyEmployee: () => emptyEmployee(),
  },
});

export const CurrentCompanyEmployeeActions = currentCompanyEmployeeSlice.actions;
export default currentCompanyEmployeeSlice.reducer;
