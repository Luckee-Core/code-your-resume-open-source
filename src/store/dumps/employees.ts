import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Employee } from "@/model/employee";

type InitialState = Record<string, Employee>;

const initialState: InitialState = {};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    upsertEmployees: (state, action: PayloadAction<Employee[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    upsertEmployee: (state, action: PayloadAction<Employee>) => {
      state[action.payload.id] = action.payload;
    },
    removeEmployee: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    resetEmployees: () => initialState,
  },
});

export const EmployeesActions = employeesSlice.actions;
export default employeesSlice.reducer;
