import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AiExchangeCost } from "@/model/ai-exchange-cost";

type AiExchangeCostsState = Record<string, AiExchangeCost>;

const initialState: AiExchangeCostsState = {};

const aiExchangeCostsSlice = createSlice({
  name: "aiExchangeCosts",
  initialState,
  reducers: {
    setAiExchangeCosts: (state, action: PayloadAction<AiExchangeCost[]>) => {
      for (const key of Object.keys(state)) {
        delete state[key];
      }
      for (const row of action.payload) {
        state[row.exchangeId] = row;
      }
    },
    clearAiExchangeCosts: () => initialState,
  },
});

export const AiExchangeCostsActions = aiExchangeCostsSlice.actions;
export default aiExchangeCostsSlice.reducer;
