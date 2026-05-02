import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserBackgroundStudioBuilderState = {
  loadStatus: "idle" | "loading" | "loaded" | "error";
  error: string | null;
  isPostingMessage: boolean;
  isSavingSections: boolean;
  isSavingProfile: boolean;
};

const initialState: UserBackgroundStudioBuilderState = {
  loadStatus: "idle",
  error: null,
  isPostingMessage: false,
  isSavingSections: false,
  isSavingProfile: false,
};

const userBackgroundStudioBuilderSlice = createSlice({
  name: "userBackgroundStudioBuilder",
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
    setPostingMessage: (state, action: PayloadAction<boolean>) => {
      state.isPostingMessage = action.payload;
    },
    setSavingSections: (state, action: PayloadAction<boolean>) => {
      state.isSavingSections = action.payload;
    },
    setSavingProfile: (state, action: PayloadAction<boolean>) => {
      state.isSavingProfile = action.payload;
    },
    reset: () => initialState,
  },
});

export const UserBackgroundStudioBuilderActions = userBackgroundStudioBuilderSlice.actions;
export default userBackgroundStudioBuilderSlice.reducer;
