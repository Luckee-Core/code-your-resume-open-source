import type { NextConfig } from "next";

/**
 * Proxies browser `fetch("/api/data/...")` and `fetch("/api/technical-skills/...")`
 * to the CRM Express server.
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
        source: "/api/technical-skills",
        destination: `${base}/api/technical-skills`,
      });
    }

    return rules;
  },
};

export default nextConfig;
