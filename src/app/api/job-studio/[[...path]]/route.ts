import { createCrmProxyRouteHandlers } from "@/lib/crm-proxy/crm-proxy-route-handlers";

/** BFF proxy for `/api/job-studio` → Express. */
export const { GET, POST, PATCH, DELETE } = createCrmProxyRouteHandlers("/api/job-studio");
