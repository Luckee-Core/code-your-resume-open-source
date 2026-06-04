import type { Metadata } from "next";
import { MarketingLanding } from "@/packages/landing";

export const metadata: Metadata = {
  title: "Code Your Resume — Open-source job application studio",
  description:
    "Tailored resumes, cover letters, and graphics per job. CRM, AI studios, and editable TSX you can export to PNG. Self-hosted, open source.",
  openGraph: {
    title: "Code Your Resume — Open-source job application studio",
    description:
      "Every role gets a resume — and cover letter — that actually fits. CRM + AI studios + TSX graphics, fully self-hosted.",
    type: "website",
  },
};

/**
 * Public marketing home (no AppShell).
 */
export default function MarketingHomePage() {
  return <MarketingLanding />;
}
