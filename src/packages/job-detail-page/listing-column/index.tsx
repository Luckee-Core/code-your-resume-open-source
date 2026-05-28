"use client";

import { ResponsibilitiesSection } from "../builder-column/responsibilities";
import { RequirementsSection } from "../builder-column/requirements";
import { NiceToHavesSection } from "../builder-column/nice-to-haves";
import { jobDetailBuilderIcpStyles as s } from "../builder-column/icp-aligned-styles";

/**
 * Left pane — job listing bullets (responsibilities, requirements, nice-to-haves).
 */
export const JobDetailListingColumn = () => {
  return (
    <div className={styles.column}>
      <div className={styles.scroll}>
        <section className={s.draftColumn} aria-label="Job listing sections">
          <div className={s.draftBody}>
            <ul className={s.draftList}>
              <ResponsibilitiesSection />
              <RequirementsSection />
              <NiceToHavesSection />
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

const styles = {
  column: `
    flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden
  `,
  scroll: `
    flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain
  `,
};
