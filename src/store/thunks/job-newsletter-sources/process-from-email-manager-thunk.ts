import {
  processJobNewsletterFromEmailManagerApi,
  type ProcessJobNewsletterFromEmailManagerInput,
} from "@/api/job-newsletter-ingest";
import type { JobNewsletterIngestResult } from "@/model/job-newsletter-ingest-result";
import type { AppThunk } from "@/store";
import { loadCrmVaultThunk } from "@/store/thunks/crm";

export type ProcessFromEmailManagerOutcome =
  | { status: 200; result: JobNewsletterIngestResult }
  | { status: 400 | 500; error?: string };

/**
 * Sync Gmail via email-manager, parse newsletters, ingest CRM jobs, refresh vault.
 */
export const processJobNewsletterFromEmailManagerThunk =
  (
    input: ProcessJobNewsletterFromEmailManagerInput = {},
  ): AppThunk<Promise<ProcessFromEmailManagerOutcome>> =>
  async (dispatch) => {
    const response = await processJobNewsletterFromEmailManagerApi(input);

    if (response.httpStatus === 0) {
      return { status: 500, error: response.error };
    }

    if (!response.success || !response.data) {
      return {
        status: response.httpStatus === 400 ? 400 : 500,
        error: response.error,
      };
    }

    await dispatch(loadCrmVaultThunk());

    return { status: 200, result: response.data };
  };
