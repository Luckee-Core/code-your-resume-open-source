import { createCrmProxyRouteHandlers } from "@/lib/crm-proxy/crm-proxy-route-handlers";

/** BFF proxy for `/api/job-newsletter-ingest` → Express. */
export const { GET, POST, PATCH, DELETE } = createCrmProxyRouteHandlers(
  "/api/job-newsletter-ingest",
);
