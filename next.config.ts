import type { NextConfig } from "next";

/**
 * Proxies browser `fetch("/api/data/...")`, `fetch("/api/technical-skills/...")`,
 * `fetch("/api/job-studio...")`, and `fetch("/api/professional-background...")` to the CRM Express server.
 */
const nextConfig: NextConfig = {
  async rewrites() {
    const rules: { source: string; destination: string }[] = [];

    const crmFromEnv = process.env.CRM_EXPRESS_INTERNAL_URL?.trim();
    const crmTarget =
      crmFromEnv ||
      (process.env.NODE_ENV !== "production" ? "http://127.0.0.1:3053" : "");
    if (crmTarget) {
      const base = crmTarget.replace(/\/$/, "");
      rules.push({ source: "/api/data/:path*", destination: `${base}/api/data/:path*` });
      rules.push({
        source: "/api/technical-skills/:path*",
        destination: `${base}/api/technical-skills/:path*`,
      });
      rules.push({
        source: "/api/professional-background",
        destination: `${base}/api/professional-background`,
      });
      rules.push({
        source: "/api/professional-background/:path*",
        destination: `${base}/api/professional-background/:path*`,
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
    }

    return rules;
  },
};

export default nextConfig;
