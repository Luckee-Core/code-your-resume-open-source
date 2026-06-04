"use client";

import { TechnicalSkillsStudio } from "@/packages/technical-skills-studio";

export default function ExperienceStudioPage() {
  return (
    <div className={styles.wrap}>
      <TechnicalSkillsStudio />
    </div>
  );
}

const styles = {
  wrap: `flex min-h-0 min-w-0 flex-1 overflow-hidden`,
} as const;
