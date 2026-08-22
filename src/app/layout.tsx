import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Codeluz — Custom Web Development & Solutions",
  description: "Codeluz creates high-performance, custom-built websites designed around how your business operates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${outfit.variable} dark`}>
      <body className="bg-black text-slate-200 antialiased font-body min-h-screen flex flex-col">
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
        <SpeedInsights />
      </body>
    </html>
  );
}