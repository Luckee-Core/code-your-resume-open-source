"use client";

import { ProfessionalBackgroundStudio } from "@/packages/professional-background-studio";

export default function ExperienceBackgroundPage() {
  return (
    <div className={styles.wrap}>
      <ProfessionalBackgroundStudio />
    </div>
  );
}

const styles = {
  wrap: `flex min-h-0 min-w-0 flex-1 overflow-auto`,
} as const;
