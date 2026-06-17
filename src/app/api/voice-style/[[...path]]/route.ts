import { createCrmProxyRouteHandlers } from "@/lib/crm-proxy/crm-proxy-route-handlers";

/** BFF proxy for `/api/voice-style` → Express. */
export const { GET, POST, PATCH, DELETE } = createCrmProxyRouteHandlers("/api/voice-style");
