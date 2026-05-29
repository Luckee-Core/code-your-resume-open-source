import { createCrmProxyRouteHandlers } from "@/lib/crm-proxy/crm-proxy-route-handlers";

/** BFF proxy for `/api/technical-skills` → Express. */
export const { GET, POST, PATCH, DELETE } = createCrmProxyRouteHandlers("/api/technical-skills");
