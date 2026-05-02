import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BreadcrumbItem } from "@/model/breadcrumb";

type BreadcrumbBuilderState = {
  items: BreadcrumbItem[];
};

const initialState: BreadcrumbBuilderState = {
  items: [],
};

export const breadcrumbBuilderSlice = createSlice({
  name: "breadcrumbBuilder",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<BreadcrumbItem[]>) => {
      state.items = action.payload;
    },
    clearItems: (state) => {
      state.items = [];
    },
    reset: () => initialState,
  },
});

export const BreadcrumbBuilderActions = breadcrumbBuilderSlice.actions;
export default breadcrumbBuilderSlice.reducer;
