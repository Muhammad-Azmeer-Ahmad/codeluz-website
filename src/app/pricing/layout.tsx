import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Codeluz — Transparent Website Packages",
  description: "Simple, transparent pricing for custom websites — from a 1-page launch site to a full booking system with payments. Free consultation before you commit.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}