import { createCrmProxyRouteHandlers } from "@/lib/crm-proxy/crm-proxy-route-handlers";

/** BFF proxy for `/api/professional-background` → Express. */
export const { GET, POST, PATCH, DELETE } = createCrmProxyRouteHandlers("/api/professional-background");
