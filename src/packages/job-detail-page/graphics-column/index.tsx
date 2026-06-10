"use client";

import { ApplicationQuestionsSection } from "../builder-column/application-questions";
import { GenerateCompanyInterest } from "../builder-column/applications/generate-company-interest";
import { GenerateTeamConversation } from "../builder-column/applications/generate-team-conversation";
import { GenerateCoverLetter } from "../builder-column/applications/generate-cover-letter";
import { GenerateResume } from "../builder-column/applications/generate-resume";
import { JobDetailSectionCard } from "../builder-column/section-card";
import { jobDetailBuilderIcpStyles as s } from "../builder-column/icp-aligned-styles";

/**
 * Right pane — resume and cover letter sections with generate actions + scoped graphics.
 */
export const JobDetailGraphicsColumn = () => {
  return (
    <div className={styles.column}>
      <div className={styles.scroll}>
        <section className={s.draftColumn} aria-label="Job graphics">
          <div className={s.draftBody}>
            <ul className={s.draftList}>
              <JobDetailSectionCard
                sectionKey="applications"
                title="Resume"
                headingId="crm-job-resume-heading"
              >
                <GenerateResume />
              </JobDetailSectionCard>
              <JobDetailSectionCard
                sectionKey="applications"
                title="Cover letter"
                headingId="crm-job-cover-letter-heading"
              >
                <GenerateCoverLetter />
              </JobDetailSectionCard>
              <JobDetailSectionCard
                sectionKey="applications"
                title="Company interest"
                headingId="crm-job-company-interest-heading"
              >
                <GenerateCompanyInterest />
              </JobDetailSectionCard>
              <JobDetailSectionCard
                sectionKey="applications"
                title="Team conversation"
                headingId="crm-job-team-conversation-heading"
              >
                <GenerateTeamConversation />
              </JobDetailSectionCard>
              <ApplicationQuestionsSection />
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
