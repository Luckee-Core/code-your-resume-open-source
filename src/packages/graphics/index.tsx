"use client";

import { GraphicsListHeader } from "./header";
import { GraphicsListCreateModal } from "./header/create";

import { ImageGraphicsTable } from "./table";

/**
 * Table of layout projects stored in `localStorage`; create opens the studio.
 */
export const ImageGraphicsListPage = () => {
  return (
    <div className={styles.routeShell}>
      <GraphicsListHeader />

      <div className={styles.itemsBody}>
        <ImageGraphicsTable />
      </div>

      <GraphicsListCreateModal />
    </div>
  );
};

const styles = {
  routeShell: `flex w-full min-w-0 flex-col`,
  itemsBody: `flex min-w-0 flex-col gap-2 px-4 pb-8 pt-1`,
};
