import type { Metadata } from "next";
import { MarketingLanding } from "@/packages/landing";
import { LANDING_PAGE_METADATA } from "@/packages/landing/constants";

export const metadata: Metadata = {
  title: LANDING_PAGE_METADATA.title,
  description: LANDING_PAGE_METADATA.description,
  openGraph: {
    title: LANDING_PAGE_METADATA.title,
    description: LANDING_PAGE_METADATA.openGraphDescription,
    type: "website",
  },
};

/**
 * Public marketing home (no AppShell).
 */
export default function MarketingHomePage() {
  return <MarketingLanding />;
}
