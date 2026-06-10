import { updateTenantLinkedInProfileUrlApi } from "@/api/linkedin-profile";
import type { AppThunk } from "@/store";
import { LinkedInProfilesActions } from "@/store/dumps/linkedinProfiles";

type Status = Promise<200 | 400 | 500>;

/**
 * Updates the tenant LinkedIn profile URL.
 */
export const updateTenantLinkedInProfileUrlThunk = (input: {
  linkedinUrl: string;
}): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await updateTenantLinkedInProfileUrlApi(input);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }

    dispatch(LinkedInProfilesActions.upsertLinkedInProfile(result.data));
    return 200;
  };
};
