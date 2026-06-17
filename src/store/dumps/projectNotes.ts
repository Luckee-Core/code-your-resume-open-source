import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProjectNote } from "@/model/project";

type InitialState = Record<string, ProjectNote>;

const initialState: InitialState = {};

const projectNotesSlice = createSlice({
  name: "projectNotes",
  initialState,
  reducers: {
    upsertProjectNotes: (state, action: PayloadAction<ProjectNote[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    upsertProjectNote: (state, action: PayloadAction<ProjectNote>) => {
      state[action.payload.id] = action.payload;
    },
    removeProjectNote: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    removeProjectNotesForProject: (state, action: PayloadAction<string>) => {
      const projectId = action.payload;
      for (const [id, note] of Object.entries(state)) {
        if (note.projectId === projectId) {
          delete state[id];
        }
      }
    },
    resetProjectNotes: () => initialState,
  },
});

export const ProjectNotesActions = projectNotesSlice.actions;
export default projectNotesSlice.reducer;
