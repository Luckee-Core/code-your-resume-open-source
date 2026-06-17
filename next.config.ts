import type { NextConfig } from "next";

/**
 * Fallback rewrites to Express when no matching App Router BFF proxy route exists.
 * CRM list/read/write traffic uses catch-all route handlers that attach CRM_API_SECRET server-side.
 */
const nextConfig: NextConfig = {
  async rewrites() {
    const rules: { source: string; destination: string }[] = [];

    const crmTarget =
      process.env.EXPRESS_API_URL?.trim() ||
      process.env.CRM_EXPRESS_INTERNAL_URL?.trim() ||
      (process.env.NODE_ENV !== "production" ? "http://127.0.0.1:3053" : "");
    if (crmTarget) {
      const base = crmTarget.replace(/\/$/, "");
      rules.push({ source: "/api/data/:path*", destination: `${base}/api/data/:path*` });
      rules.push({
        source: "/api/technical-skills/:path*",
        destination: `${base}/api/technical-skills/:path*`,
      });
      rules.push({
        source: "/api/voice-style",
        destination: `${base}/api/voice-style`,
      });
      rules.push({
        source: "/api/voice-style/:path*",
        destination: `${base}/api/voice-style/:path*`,
      });
      rules.push({
        source: "/api/technical-skills",
        destination: `${base}/api/technical-skills`,
      });
      rules.push({
        source: "/api/job-studio/:path*",
        destination: `${base}/api/job-studio/:path*`,
      });
      rules.push({
        source: "/api/job-studio",
        destination: `${base}/api/job-studio`,
      });
      rules.push({
        source: "/api/user-background-studio/:path*",
        destination: `${base}/api/user-background-studio/:path*`,
      });
      rules.push({
        source: "/api/job-newsletter-ingest/:path*",
        destination: `${base}/api/job-newsletter-ingest/:path*`,
      });
      rules.push({
        source: "/api/job-newsletter-ingest",
        destination: `${base}/api/job-newsletter-ingest`,
      });
    }

    return rules;
  },
};

export default nextConfig;
