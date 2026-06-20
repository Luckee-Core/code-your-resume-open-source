"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/store";
import {
  filterJobGraphicsByKind,
  type JobGraphicKind,
} from "@/utils/image-graphics";
import { ImageGraphicsTableRow } from "@/packages/graphics/table/row";
import { imageGraphicsTableShellStyles as shell } from "@/packages/graphics/table/shell-styles";

type Props = {
  jobId: string;
  kind: JobGraphicKind;
  emptyLabel: string;
};

/**
 * Compact table of job-scoped graphics inside a generate section.
 */
export const JobDetailGraphicList = ({ jobId, kind, emptyLabel }: Props) => {
  const imageGraphics = useAppSelector((s) => s.imageGraphics);

  const graphicIds = useMemo(() => {
    return filterJobGraphicsByKind(imageGraphics, jobId, kind).map((g) => g.id);
  }, [imageGraphics, jobId, kind]);

  if (graphicIds.length === 0) {
    return <p className={styles.empty}>{emptyLabel}</p>;
  }

  return (
    <div className={shell.tableViewport}>
      <div className={shell.tableWrap}>
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
          {graphicIds.map((graphicId) => (
            <ImageGraphicsTableRow key={graphicId} graphicId={graphicId} />
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

const styles = {
  empty: `text-sm italic text-gray-400`,
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
