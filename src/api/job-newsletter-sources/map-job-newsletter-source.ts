import type { JobNewsletterSource } from "@/model/job-newsletter-source";

type ApiRow = {
  id: string;
  name: string;
  sender_email: string;
  enabled: boolean;
  parse_instructions: string;
  created_at: string;
  updated_at: string;
};

/**
 * Map Express/Supabase row to frontend camelCase model.
 */
export const mapJobNewsletterSource = (row: ApiRow): JobNewsletterSource => ({
  id: row.id,
  name: row.name,
  senderEmail: row.sender_email,
  enabled: row.enabled,
  parseInstructions: row.parse_instructions,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});
