import { MarketingFeatureCrm } from "@/packages/landing/feature-crm";
import { MarketingFeatureJobStudio } from "@/packages/landing/feature-job-studio";
import { MarketingFinalCta } from "@/packages/landing/final-cta";
import { MarketingGeneratePerJob } from "@/packages/landing/generate-per-job";
import { MarketingHero } from "@/packages/landing/hero";
import { MarketingNav } from "@/packages/landing/nav";
import { MarketingOpenSource } from "@/packages/landing/open-source";
import { MarketingStudios } from "@/packages/landing/studios";

/**
 * Marketing home: hero, CRM, Job Studio, generators, studios, open source, CTA.
 */
export const MarketingLanding = () => {
  return (
    <div className={styles.page}>
      <MarketingNav />
      <main>
        <MarketingHero />
        <MarketingFeatureCrm />
        <MarketingFeatureJobStudio />
        <MarketingGeneratePerJob />
        <MarketingStudios />
        <MarketingOpenSource />
        <MarketingFinalCta />
      </main>
    </div>
  );
};

const styles = {
  page: `
    relative min-h-screen bg-background font-sans text-foreground antialiased
  `,
} as const;
