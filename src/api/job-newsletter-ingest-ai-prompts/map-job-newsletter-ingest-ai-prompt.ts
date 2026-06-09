import type { JobNewsletterIngestAiPrompt } from "@/model/job-newsletter-ingest-ai-prompt";

type ApiRow = {
  id: string;
  name: string;
  version: number;
  system_prompt: string;
  is_active: boolean;
  created_at: string;
};

/**
 * Map Express/Supabase row to frontend camelCase model.
 */
export const mapJobNewsletterIngestAiPrompt = (row: ApiRow): JobNewsletterIngestAiPrompt => ({
  id: row.id,
  name: row.name,
  version: row.version,
  systemPrompt: row.system_prompt,
  isActive: row.is_active,
  createdAt: row.created_at,
});
