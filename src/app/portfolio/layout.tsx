import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Portfolio | Codeluz — Custom Website Demos",
  description: "See real demo websites built by Codeluz — including a clinic booking site and a gym membership website — before you start your own project.",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}