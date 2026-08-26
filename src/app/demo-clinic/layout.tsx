import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clinic Website Demo | Codeluz",
  description: "View our interactive demo of a premium clinic website. Features include doctor bios, service listings, and an integrated appointment booking system built for healthcare practices.",
};

export default function DemoClinicLayout({ children }: { children: React.ReactNode }) {
  return children;
}
