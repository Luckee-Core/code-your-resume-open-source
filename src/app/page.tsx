"use client";

import { ImageGraphicsListPage } from "@/packages/graphics";

export default function HomePage() {
  return (
    <div className={styles.wrap}>
      <ImageGraphicsListPage />
    </div>
  );
}

const styles = {
  wrap: `flex min-h-0 flex-1 flex-col`,
} as const;
