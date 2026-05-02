import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Company } from "@/model/company";

type InitialState = Record<string, Company>;

const initialState: InitialState = {};

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    upsertCompanies: (state, action: PayloadAction<Company[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    upsertCompany: (state, action: PayloadAction<Company>) => {
      state[action.payload.id] = action.payload;
    },
    removeCompany: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    resetCompanies: () => initialState,
  },
});

export const CompaniesActions = companiesSlice.actions;
export default companiesSlice.reducer;
