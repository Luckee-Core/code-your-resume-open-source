"use client";

import type { ImageGraphic } from "@/model";
import { ImageGraphicsTableRow } from "@/packages/graphics/table/row";

type Props = {
  graphics: ImageGraphic[];
  emptyLabel: string;
};

/**
 * Compact table of job-scoped graphics inside a generate section.
 */
export const JobDetailGraphicList = ({ graphics, emptyLabel }: Props) => {
  if (graphics.length === 0) {
    return <p className={styles.empty}>{emptyLabel}</p>;
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.trHead}>
            <th className={styles.th}>Title</th>
            <th className={styles.thMuted}>Canvas</th>
            <th className={styles.thMuted}>Updated</th>
            <th className={styles.thActions} aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {graphics.map((graphic) => (
            <ImageGraphicsTableRow key={graphic.id} graphic={graphic} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  empty: `text-sm italic text-gray-400`,
  tableWrap: `
    overflow-x-auto rounded-md border border-gray-200 bg-white
  `,
  table: `
    min-w-full border-collapse text-left text-sm
  `,
  trHead: `
    border-b border-gray-200 bg-gray-50
  `,
  th: `
    px-3 py-2 font-semibold text-gray-900
  `,
  thMuted: `
    px-3 py-2 font-semibold text-gray-500 whitespace-nowrap
  `,
  thActions: `
    w-12 px-2 py-2
  `,
};
