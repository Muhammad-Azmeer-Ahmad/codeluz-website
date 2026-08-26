import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gym & Fitness Website Demo | Codeluz",
  description: "Explore our fully-functional gym website demo. Complete with class schedules, trainer profiles, membership tiers, and lead generation forms.",
};

export default function DemoGymLayout({ children }: { children: React.ReactNode }) {
  return children;
}
