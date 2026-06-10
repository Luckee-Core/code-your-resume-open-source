import { syncTenantLinkedInProfileApi } from "@/api/linkedin-profile";
import type { AppThunk } from "@/store";
import { LinkedInCertificationsActions } from "@/store/dumps/linkedinCertifications";
import { LinkedInEducationsActions } from "@/store/dumps/linkedinEducations";
import { LinkedInEmploymentsActions } from "@/store/dumps/linkedinEmployments";
import { LinkedInProfilesActions } from "@/store/dumps/linkedinProfiles";

type Status = Promise<200 | 400 | 500>;

/**
 * Syncs tenant LinkedIn profile from Apify and hydrates Redux dumps.
 */
export const syncTenantLinkedInProfileThunk = (): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await syncTenantLinkedInProfileApi();
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }

    const { profile, employments, educations, certifications } = result.data;
    dispatch(LinkedInProfilesActions.upsertLinkedInProfile(profile));
    dispatch(LinkedInEmploymentsActions.resetLinkedInEmployments());
    dispatch(LinkedInEducationsActions.resetLinkedInEducations());
    dispatch(LinkedInCertificationsActions.resetLinkedInCertifications());
    dispatch(LinkedInEmploymentsActions.upsertLinkedInEmployments(employments));
    dispatch(LinkedInEducationsActions.upsertLinkedInEducations(educations));
    dispatch(LinkedInCertificationsActions.upsertLinkedInCertifications(certifications));

    return 200;
  };
};
