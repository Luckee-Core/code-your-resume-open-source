import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Employment } from "@/model/employment";

type InitialState = Record<string, Employment>;

const initialState: InitialState = {};

const employmentsSlice = createSlice({
  name: "employments",
  initialState,
  reducers: {
    upsertEmployments: (state, action: PayloadAction<Employment[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    upsertEmployment: (state, action: PayloadAction<Employment>) => {
      state[action.payload.id] = action.payload;
    },
    removeEmployment: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    resetEmployments: () => initialState,
  },
});

export const EmploymentsActions = employmentsSlice.actions;
export default employmentsSlice.reducer;
