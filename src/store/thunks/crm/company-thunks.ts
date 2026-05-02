import {
  listCompaniesApi,
  postCompanyDiscoverSitePageUrls,
  postCompanyWebsiteResearch,
  type PostCompanyDiscoverSitePageUrlsBody,
  type PostCompanyWebsiteResearchBody,
} from "@/api/company";
import { createCompanyApi } from "@/api/company/create";
import { deleteCompanyApi } from "@/api/company/delete";
import { getCompanyApi } from "@/api/company/get";
import { updateCompanyApi } from "@/api/company/update";
import type { AppThunk } from "@/store";
import { CrmBuilderActions } from "@/store/builders/crmBuilder";
import { CompaniesActions } from "@/store/dumps/companies";
import { CurrentCompanyActions } from "@/store/current/currentCompany";

type Status = Promise<200 | 400 | 500>;

export type RunCompanyDiscoverSitePageUrlsResult =
  | { ok: true; companyUpdated: boolean; linkCount: number }
  | { ok: false; status: 400 | 500 | 502; error?: string; message?: string };

/**
 * POST same-origin homepage link harvest for one company (one run per company).
 */
export const runCompanyDiscoverSitePageUrlsThunk = (
  targetCompanyId?: string,
): AppThunk<Promise<RunCompanyDiscoverSitePageUrlsResult>> => {
  return async (dispatch, getState): Promise<RunCompanyDiscoverSitePageUrlsResult> => {
    const companyId = targetCompanyId ?? getState().currentCompany?.id;
    if (!companyId) {
      return { ok: false, status: 400 };
    }

    try {
      const res = await postCompanyDiscoverSitePageUrls(companyId);
      const text = await res.text();
      let json: PostCompanyDiscoverSitePageUrlsBody = {};
      try {
        json = JSON.parse(text) as PostCompanyDiscoverSitePageUrlsBody;
      } catch {
        return { ok: false, status: 400 };
      }

      if (!res.ok) {
        const status: 400 | 500 | 502 = res.status === 502 ? 502 : res.status >= 500 ? 500 : 400;
        return {
          ok: false,
          status,
          error: typeof json.error === "string" ? json.error : undefined,
          message: typeof json.message === "string" ? json.message : undefined,
        };
      }

      if (json.success === false) {
        return {
          ok: false,
          status: 400,
          error: typeof json.error === "string" ? json.error : undefined,
          message: typeof json.message === "string" ? json.message : undefined,
        };
      }

      if (json.data) {
        dispatch(CompaniesActions.upsertCompany(json.data));
        const cur = getState().currentCompany;
        if (cur.id === json.data.id) {
          dispatch(CurrentCompanyActions.setCurrentCompany(json.data));
        }
      }

      return {
        ok: true,
        companyUpdated: json.companyUpdated === true,
        linkCount: typeof json.linkCount === "number" ? json.linkCount : 0,
      };
    } catch {
      return { ok: false, status: 500 };
    }
  };
};

/**
 * Crawls the current company’s website URLs on the server and refreshes Redux from the response.
 */
export const runCompanyWebsiteResearchThunk = (): AppThunk<Promise<200 | 400 | 500>> => {
  return async (dispatch, getState): Promise<200 | 400 | 500> => {
    const companyId = getState().currentCompany.id;
    if (!companyId) {
      return 400;
    }
    if (getState().crmBuilder.companyWebsiteResearchRunPhase !== "idle") {
      return 400;
    }

    dispatch(CrmBuilderActions.setCompanyWebsiteResearchRunPhase("website"));
    try {
      const res = await postCompanyWebsiteResearch(companyId);
      const text = await res.text();
      let json: PostCompanyWebsiteResearchBody = {};
      try {
        json = JSON.parse(text) as PostCompanyWebsiteResearchBody;
      } catch {
        return 400;
      }

      if (!res.ok) {
        return res.status >= 500 ? 500 : 400;
      }

      if (json.success === false || !json.data) {
        return 400;
      }

      dispatch(CompaniesActions.upsertCompany(json.data));
      const curId = getState().currentCompany.id;
      if (curId === json.data.id) {
        dispatch(CurrentCompanyActions.setCurrentCompany(json.data));
      }
      return 200;
    } catch {
      return 500;
    } finally {
      dispatch(CrmBuilderActions.setCompanyWebsiteResearchRunPhase("idle"));
    }
  };
};

/**
 * Fetches a company by id, merges into the dump, and sets `currentCompany`.
 */
export const openCompanyThunk = (id: string): AppThunk<Status> => {
  return async (dispatch): Status => {
    dispatch(CrmBuilderActions.setCompanyWebsiteResearchConfirmModalOpen(false));
    const result = await getCompanyApi(id);
    if (!result.success || !result.data) {
      return 400;
    }
    dispatch(CompaniesActions.upsertCompany(result.data));
    dispatch(CurrentCompanyActions.setCurrentCompany(result.data));
    return 200;
  };
};

/**
 * Creates a company via API and upserts into the dump.
 */
export const createCompanyThunk = (input: {
  name: string;
  website: string;
  notes: string;
}): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await createCompanyApi(input);
    if (!result.success || !result.data) {
      return 400;
    }
    dispatch(CompaniesActions.upsertCompany(result.data));
    dispatch(CurrentCompanyActions.setCurrentCompany(result.data));
    return 200;
  };
};

/**
 * Updates a company and refreshes dump + current when ids match.
 */
export const updateCompanyThunk = (input: {
  id: string;
  name?: string;
  website?: string;
  notes?: string;
}): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const result = await updateCompanyApi(input);
    if (!result.success || !result.data) {
      return 400;
    }
    dispatch(CompaniesActions.upsertCompany(result.data));
    const cur = getState().currentCompany;
    if (cur.id === result.data.id) {
      dispatch(CurrentCompanyActions.setCurrentCompany(result.data));
    }
    return 200;
  };
};

/**
 * Deletes a company by id and clears current if it was the same row.
 */
export const deleteCompanyThunk = (id: string): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const result = await deleteCompanyApi(id);
    if (!result.success) {
      return 400;
    }
    dispatch(CompaniesActions.removeCompany(id));
    if (getState().currentCompany.id === id) {
      dispatch(CurrentCompanyActions.resetCurrentCompany());
    }
    return 200;
  };
};

/**
 * Reloads companies list from the server (e.g. after external edits).
 */
export const refreshCompaniesThunk = (): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await listCompaniesApi();
    if (!result.success || !result.data) {
      return 400;
    }
    dispatch(CompaniesActions.upsertCompanies(result.data));
    return 200;
  };
};
