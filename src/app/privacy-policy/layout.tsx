import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Codeluz",
  description: "Read Codeluz's privacy policy — how we collect, use, and protect information submitted through our website.",
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}