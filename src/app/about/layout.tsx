import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Codeluz | Custom Web Development, Built with Care",
  description: "Learn why Codeluz builds every website by hand — no templates, security-conscious development, and direct support from the people building your site.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}