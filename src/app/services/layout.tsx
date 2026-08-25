import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Development Services | Codeluz",
  description: "Custom website design, booking systems, admin dashboards, and payment integration — built for clinics, gyms, salons, and growing businesses in Pakistan.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}