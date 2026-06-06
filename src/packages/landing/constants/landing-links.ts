import { DASHBOARD_PATH, DOCS_GETTING_STARTED_PATH } from "@/config/routes";

/** Default OSS repo when env is unset. */
const DEFAULT_GITHUB_URL =
  "https://github.com/Luckee-Core/code-your-resume-open-source";

/**
 * Public GitHub URL for landing CTAs (`NEXT_PUBLIC_LANDING_GITHUB_URL`).
 */
export const getLandingGithubUrl = (): string => {
  const fromEnv = process.env.NEXT_PUBLIC_LANDING_GITHUB_URL?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_GITHUB_URL;
};

export const LANDING_CTA_PATHS = {
  dashboard: DASHBOARD_PATH,
  docsGettingStarted: DOCS_GETTING_STARTED_PATH,
} as const;
