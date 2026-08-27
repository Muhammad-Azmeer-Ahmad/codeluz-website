import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { SideMarquee } from "@/components/SideMarquee";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Websites for Clinics, Gyms & Salons — Pakistan | Codeluz",
  description: "Codeluz creates high-performance, custom-built websites designed specifically for clinics, gyms, and salons in Pakistan. Get a premium digital presence that drives real business growth.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/icon.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="bg-black text-slate-200 antialiased font-body min-h-screen flex flex-col selection:bg-[#00F0FF]/30 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="fixed top-0 left-0 w-screen h-screen object-cover z-0 opacity-30 pointer-events-none"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_3GJaYKPxdnQG0Q9O26lu6DPmcHu/hf_20260805_192612_e00017a8-56b0-4957-935b-9ffd87663994.mp4" type="video/mp4" />
          </video>
          <SmoothScroll>
            <div className="relative z-10 flex flex-col min-h-screen w-full">
              <SideMarquee />
              <Navbar />
              <main className="flex-1 pl-10 md:pl-24">{children}</main>
              <div className="pl-10 md:pl-24">
                <Footer />
              </div>
              <WhatsAppCTA />
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}