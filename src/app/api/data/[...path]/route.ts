import { createCrmProxyRouteHandlers } from "@/lib/crm-proxy/crm-proxy-route-handlers";

/**
 * BFF proxy for `/api/data/*` → Express. Ensures `CRM_API_SECRET` is sent server-side.
 * More specific routes (e.g. `skills-component/generate`) override this catch-all.
 */
export const { GET, POST, PATCH, DELETE } = createCrmProxyRouteHandlers("/api/data");
