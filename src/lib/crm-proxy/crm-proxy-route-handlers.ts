import { proxyToCrmExpress } from "@/lib/crm-proxy/proxy-to-crm-express";
import type { NextRequest } from "next/server";

type PathParams = { path?: string[] };

/**
 * Route handler exports that proxy an API prefix to Express (adds CRM secret server-side).
 */
export const createCrmProxyRouteHandlers = (apiPrefix: string) => {
  const resolveSegments = async (ctx: { params: Promise<PathParams> }): Promise<string[]> => {
    const { path } = await ctx.params;
    return path ?? [];
  };

  return {
    GET: async (req: NextRequest, ctx: { params: Promise<PathParams> }) =>
      proxyToCrmExpress(req, apiPrefix, await resolveSegments(ctx)),
    POST: async (req: NextRequest, ctx: { params: Promise<PathParams> }) =>
      proxyToCrmExpress(req, apiPrefix, await resolveSegments(ctx)),
    PATCH: async (req: NextRequest, ctx: { params: Promise<PathParams> }) =>
      proxyToCrmExpress(req, apiPrefix, await resolveSegments(ctx)),
    DELETE: async (req: NextRequest, ctx: { params: Promise<PathParams> }) =>
      proxyToCrmExpress(req, apiPrefix, await resolveSegments(ctx)),
  };
};
