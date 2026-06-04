"use client";

import { ImageCreationStudio } from "@/packages/graphics-studio";

export default function StudioPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <ImageCreationStudio />
      </div>
    </div>
  );
}

const styles = {
  wrap: `flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden`,
  inner: `flex min-h-0 flex-1 flex-col overflow-auto p-4`,
} as const;
