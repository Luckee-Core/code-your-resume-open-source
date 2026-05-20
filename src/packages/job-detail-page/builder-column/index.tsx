'use client';

import { JobDescriptionImportSection } from "./description-import";
import { ResponsibilitiesSection } from "./responsibilities";
import { RequirementsSection } from "./requirements";
import { NiceToHavesSection } from "./nice-to-haves";
import { ApplicationsSection } from "./applications";
import { jobDetailBuilderIcpStyles as s } from "./icp-aligned-styles";

/**
 * Builder column — Luckee `IcpStudioBuilderColumn`-style shell; list uses draft-body scroll pattern.
 */
export const JobDetailBuilderColumn = () => {
  return (
    <div className={styles.column}>
      <div className={styles.scroll}>
        <section className={s.draftColumn} aria-label="Listing bullets and applications">
          <div className={s.draftBody}>
            <ul className={s.draftList}>
              <JobDescriptionImportSection />
              <ResponsibilitiesSection />
              <RequirementsSection />
              <NiceToHavesSection />
              <ApplicationsSection />
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

/** Luckee `IcpStudioBuilderColumn` outer + scroll wrappers */
const styles = {
  column: `
    flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden
  `,
  scroll: `
    flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain
  `,
};
