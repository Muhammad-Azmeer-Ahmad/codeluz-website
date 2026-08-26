import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salon & Spa Website Demo | Codeluz",
  description: "View our premium salon and spa website demo. Designed with elegant aesthetics, service menus, and integrated booking for beauty professionals.",
};

export default function DemoSalonLayout({ children }: { children: React.ReactNode }) {
  return children;
}
