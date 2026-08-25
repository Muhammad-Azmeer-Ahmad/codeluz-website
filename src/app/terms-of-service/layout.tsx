import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Codeluz",
  description: "Read the terms of service governing use of the Codeluz website and our web development services.",
};

export default function TermsOfServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}