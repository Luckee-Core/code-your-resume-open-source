import {
  listLinkedInCertificationsApi,
} from "@/api/linkedin-certification";
import {
  listLinkedInEducationsApi,
} from "@/api/linkedin-education";
import {
  listLinkedInEmploymentsApi,
} from "@/api/linkedin-employment";
import { getTenantLinkedInProfileApi } from "@/api/linkedin-profile";
import type { AppThunk } from "@/store";
import { LinkedInCertificationsActions } from "@/store/dumps/linkedinCertifications";
import { LinkedInEducationsActions } from "@/store/dumps/linkedinEducations";
import { LinkedInEmploymentsActions } from "@/store/dumps/linkedinEmployments";
import { LinkedInProfilesActions } from "@/store/dumps/linkedinProfiles";

type Status = Promise<200 | 400 | 500>;

/**
 * Loads tenant LinkedIn profile and related child rows into Redux dumps.
 */
export const loadTenantLinkedInProfileThunk = (): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await getTenantLinkedInProfileApi();
    if (!result.success) {
      return result.httpStatus === 400 ? 400 : 500;
    }

    if (!result.data) {
      dispatch(LinkedInProfilesActions.resetLinkedInProfiles());
      dispatch(LinkedInEmploymentsActions.resetLinkedInEmployments());
      dispatch(LinkedInEducationsActions.resetLinkedInEducations());
      dispatch(LinkedInCertificationsActions.resetLinkedInCertifications());
      return 200;
    }

    dispatch(LinkedInProfilesActions.upsertLinkedInProfile(result.data));

    const profileId = result.data.id;
    const [employments, educations, certifications] = await Promise.all([
      listLinkedInEmploymentsApi(profileId),
      listLinkedInEducationsApi(profileId),
      listLinkedInCertificationsApi(profileId),
    ]);

    if (!employments.success || !employments.data) return employments.httpStatus === 400 ? 400 : 500;
    if (!educations.success || !educations.data) return educations.httpStatus === 400 ? 400 : 500;
    if (!certifications.success || !certifications.data) {
      return certifications.httpStatus === 400 ? 400 : 500;
    }

    dispatch(LinkedInEmploymentsActions.resetLinkedInEmployments());
    dispatch(LinkedInEducationsActions.resetLinkedInEducations());
    dispatch(LinkedInCertificationsActions.resetLinkedInCertifications());
    dispatch(LinkedInEmploymentsActions.upsertLinkedInEmployments(employments.data));
    dispatch(LinkedInEducationsActions.upsertLinkedInEducations(educations.data));
    dispatch(LinkedInCertificationsActions.upsertLinkedInCertifications(certifications.data));

    return 200;
  };
};
