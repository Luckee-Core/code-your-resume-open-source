import type { ProfessionalBackgroundSegments } from "@/model/professional-background";

/**
 * Stable fingerprint for dirty detection after save/load.
 */
export const getProfessionalBackgroundFingerprint = (segments: ProfessionalBackgroundSegments): string => {
  const ordered = {
    education: segments.education,
    credibility_bio: segments.credibility_bio,
    voice_style: segments.voice_style,
    portfolio_github: segments.portfolio_github,
  };
  return JSON.stringify(ordered);
};
