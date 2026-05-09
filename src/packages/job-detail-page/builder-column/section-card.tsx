"use client";

import type { ReactNode } from "react";
import type { JobDetailBuilderSectionKey } from "@/model/job-detail-builder";
import { jobDetailBuilderIcpStyles as s } from "./icp-aligned-styles";

type Props = {
  sectionKey: JobDetailBuilderSectionKey;
  title: string;
  headingId: string;
  children: ReactNode;
};

/**
 * Section heading sits above the bordered card (title is not inside the card chrome).
 */
export const JobDetailSectionCard = ({ sectionKey, title, headingId, children }: Props) => {
  return (
    <li className={s.sectionItem} data-section={sectionKey}>
      <h2 id={headingId} className={s.rowSectionTitle}>
        {title}
      </h2>
      <div className={s.rowCard}>{children}</div>
    </li>
  );
};
