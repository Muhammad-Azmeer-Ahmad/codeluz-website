import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Codeluz — Get a Free Consultation",
  description: "Get in touch with Codeluz to discuss your website project. Free consultation, no pressure — message us or book a quick call.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}