"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isQuoteHovered, setIsQuoteHovered] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Simple, elegant entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-element",
        { y: 40, opacity: 0, filter: "blur(10px)" },
        { 
          y: 0, 
          opacity: 1, 
          filter: "blur(0px)",
          duration: 1.2, 
          stagger: 0.15, 
          ease: "power3.out",
          delay: 0.1
        }
      );
      
      gsap.fromTo(
        ".hero-glow",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center justify-center bg-background overflow-hidden pt-20 pb-20">
      
      {/* Background Lighting & Noise */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Ambient Brand Glows */}
        <div className="hero-glow absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] sm:w-[600px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[120px] sm:blur-[180px]" />
        <div className="hero-glow absolute bottom-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] sm:w-[500px] h-[300px] bg-[#00D4FF]/8 rounded-full blur-[100px] sm:blur-[150px]" />
        
        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.05] sm:opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "4rem 4rem",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)",
          }}
        />

        {/* Film Grain Noise Overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-[10] w-full max-w-[1100px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        
        {/* Pill Badge */}
        <div className="hero-element mb-6 sm:mb-8 opacity-0">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 sm:gap-2.5 bg-black/5 dark:bg-white/[0.04] border border-border hover:border-[#D4AF37]/50 text-muted hover:text-foreground text-[0.75rem] sm:text-[0.8rem] font-semibold tracking-wide px-4 py-2 rounded-full transition-all duration-300 group backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            Custom Web Development Agency
            <ChevronRight
              size={14}
              className="text-[#D4AF37] group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </div>

        {/* Main Headline */}
        <h1
          className="hero-element font-display font-bold text-foreground leading-[1.05] tracking-[-0.03em] mb-6 drop-shadow-2xl opacity-0"
          style={{ fontSize: "clamp(2.1rem, 8vw, 6rem)" }}
        >
          Websites Built For <br />
          <span className="relative inline-block">
            <span
              className="bg-[length:200%_auto] animate-shimmer"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #D4AF37 0%, #FFF 25%, #D4AF37 50%, #f5d87a 75%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Your Business
            </span>
            <span className="absolute -bottom-1 sm:-bottom-3 left-0 w-full h-[2px] sm:h-[4px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent rounded-full" />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-element max-w-[540px] sm:max-w-[650px] text-[0.95rem] sm:text-[1.15rem] text-muted leading-relaxed font-body mb-10 sm:mb-12 opacity-0">
          We don&apos;t just build websites. We engineer high-performance digital platforms that present your services, reach more customers, and drive action at every layer.
        </p>

        {/* CTA Buttons */}
        <div className="hero-element flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 items-center justify-center opacity-0">
          <div
            className="relative inline-flex flex-col items-center"
            onMouseEnter={() => setIsQuoteHovered(true)}
            onMouseLeave={() => setIsQuoteHovered(false)}
          >
            <span
              className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#00FF88] text-black text-[0.75rem] font-bold tracking-wide px-3 py-1.5 rounded-full shadow-[0_4px_16px_rgba(0,255,136,0.3)] transition-all duration-300 ease-out ${
                isQuoteHovered
                  ? "opacity-100 -translate-y-1 scale-100"
                  : "opacity-0 translate-y-1 scale-90 pointer-events-none"
              }`}
            >
              It&apos;s free — no cost to ask
              <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-[5px] border-x-transparent border-t-[6px] border-t-[#00FF88]" />
            </span>

            <MagneticButton
              href="/contact"
              className="group inline-flex items-center gap-2.5 bg-foreground hover:opacity-90 text-background font-heading font-bold text-sm sm:text-base tracking-widest uppercase px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_55px_rgba(255,255,255,0.4)] transition-all duration-300"
            >
              Get a Quote
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </MagneticButton>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground text-sm sm:text-base font-semibold tracking-wide transition-colors duration-200 group"
          >
            View Our Services
            <ChevronRight
              size={18}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </div>

      </div>
    </section>
  );
}