"use client";

import { ImageGraphicsListPage } from "@/packages/graphics";

/**
 * App home: graphics list (formerly root `/`).
 */
export default function DashboardPage() {
  return (
    <div className={styles.wrap}>
      <ImageGraphicsListPage />
    </div>
  );
}

const styles = {
  wrap: `flex min-h-0 flex-1 flex-col`,
} as const;
