import type { LinkedInCertification } from "@/model/linkedin-certification";
import type { LinkedInEducation } from "@/model/linkedin-education";
import type { LinkedInEmployment } from "@/model/linkedin-employment";
import type { LinkedInProfile } from "@/model/linkedin-profile";

export type LinkedInProfileBundle = {
  profile: LinkedInProfile;
  employments: LinkedInEmployment[];
  educations: LinkedInEducation[];
  certifications: LinkedInCertification[];
};
