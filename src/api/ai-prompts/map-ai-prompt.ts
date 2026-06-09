import type { AiPrompt } from "@/model/ai-prompt";

type ApiRow = {
  id: string;
  flow: string;
  flowLabel: string;
  name: string;
  version: number;
  systemPrompt: string;
  isActive: boolean;
  createdAt: string;
};

/**
 * Map Express AI prompt row to frontend model.
 */
export const mapAiPrompt = (row: ApiRow): AiPrompt => ({
  id: row.id,
  flow: row.flow,
  flowLabel: row.flowLabel,
  name: row.name,
  version: row.version,
  systemPrompt: row.systemPrompt,
  isActive: row.isActive,
  createdAt: row.createdAt,
});
