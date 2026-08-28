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
  metadataBase: new URL("https://codeluz.com"),
  title: "Websites for Clinics, Gyms & Salons — Pakistan | Codeluz",
  description: "Codeluz builds high-performance, custom websites for clinics, gyms, and salons in Pakistan — designed to drive real business growth.",
  openGraph: {
    title: "Codeluz | Websites for Clinics, Gyms & Salons",
    description: "Codeluz builds high-performance, custom websites for clinics, gyms, and salons in Pakistan.",
    url: "https://codeluz.com",
    siteName: "Codeluz",
    images: [
      {
        url: "/icon.png",
        width: 800,
        height: 800,
        alt: "Codeluz Image",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codeluz | Premium Websites",
    description: "High-performance, custom websites for clinics, gyms, and salons.",
    images: ["/icon.png"],
  },
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