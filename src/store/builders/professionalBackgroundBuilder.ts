import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ProfessionalBackgroundBuilderState = {
  loadStatus: "idle" | "loading" | "loaded" | "error";
  error: string | null;
  isSaving: boolean;
};

const initialState: ProfessionalBackgroundBuilderState = {
  loadStatus: "idle",
  error: null,
  isSaving: false,
};

const professionalBackgroundBuilderSlice = createSlice({
  name: "professionalBackgroundBuilder",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loadStatus = "loading";
      state.error = null;
    },
    setLoaded: (state) => {
      state.loadStatus = "loaded";
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loadStatus = "error";
      state.error = action.payload;
    },
    setSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },
    reset: () => initialState,
  },
});

export const ProfessionalBackgroundBuilderActions = professionalBackgroundBuilderSlice.actions;
export default professionalBackgroundBuilderSlice.reducer;
