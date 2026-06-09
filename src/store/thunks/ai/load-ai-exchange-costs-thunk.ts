import { listExchangeRegistryApi, type ListExchangeRegistryInput } from "@/api/exchange-registry";
import type { AppThunk } from "@/store";
import { AiExchangeCostsActions } from "@/store/dumps/aiExchangeCosts";

type Status = Promise<200 | 400 | 500>;

/**
 * Loads exchanges from exchange_table_registry into Redux (with computed USD estimates).
 */
export const loadAiExchangeCostsThunk =
  (input: ListExchangeRegistryInput = {}): AppThunk<Status> =>
  async (dispatch): Status => {
    const result = await listExchangeRegistryApi(input);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(AiExchangeCostsActions.setAiExchangeCosts(result.data.rows));
    return 200;
  };
