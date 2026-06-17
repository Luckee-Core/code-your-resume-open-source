import type { Project } from "@/model/project";

/**
 * Client-side mirror of Express `assertHasNarrativeContext` — projects or voice style required.
 */
export const hasNarrativeContextForGeneration = (
  projects: Record<string, Project>,
  voiceStyleBody: string,
): boolean => Boolean(voiceStyleBody.trim()) || Object.keys(projects).length > 0;
