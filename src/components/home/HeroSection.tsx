"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isQuoteHovered, setIsQuoteHovered] = useState(false);

  useEffect(() => {
    // --- GSAP Hero Text Animations ---
    const ctx = gsap.context(() => {
      gsap.set(".hero-anim", { opacity: 0, y: 50 });
      gsap.to(".hero-anim", {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.13,
        ease: "power3.out",
        delay: 0.2,
      });

      // Fixed Scroll Fade (Prevents Double Text Ghosting)
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "50% top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
    }, containerRef);

    // --- Interactive Canvas Wave System ---
    const canvas = canvasRef.current;
    if (!canvas) return () => ctx.revert();
    const c = canvas.getContext("2d");
    if (!c) return () => ctx.revert();

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    let step = 0;

    const render = () => {
      step += 0.012;
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      c.clearRect(0, 0, width, height);

      const mouseFactorX = (mouse.x / width - 0.5) * 220;
      const mouseFactorY = (mouse.y / height - 0.5) * 180;

      const drawWave = (
        colorStop1: string,
        colorStop2: string,
        lineWidth: number,
        frequency: number,
        amplitude: number,
        speedMultiplier: number,
        yOffset: number,
        blurAmount: number
      ) => {
        c.save();
        c.shadowColor = colorStop1;
        c.shadowBlur = blurAmount;

        const gradient = c.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, colorStop1);
        gradient.addColorStop(0.6, colorStop2);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        c.beginPath();
        c.lineWidth = lineWidth;
        c.strokeStyle = gradient;

        for (let x = -50; x <= width + 50; x += 8) {
          const y =
            Math.sin(x * frequency + step * speedMultiplier) * amplitude +
            Math.cos(x * 0.0012 + step * 0.8) * (amplitude * 0.4) +
            height * yOffset +
            mouseFactorY * (1 - x / width);

          if (x === -50) {
            c.moveTo(x + mouseFactorX * 0.25, y);
          } else {
            c.lineTo(x + mouseFactorX * 0.25, y);
          }
        }

        c.stroke();
        c.restore();
      };

      drawWave("rgba(0, 212, 255, 0.95)", "rgba(37, 99, 235, 0.8)", 32, 0.002, 110, 1.3, 0.48, 30);
      drawWave("rgba(59, 130, 246, 0.9)", "rgba(147, 51, 234, 0.7)", 42, 0.0014, 150, 0.8, 0.56, 35);
      drawWave("rgba(212, 175, 55, 0.9)", "rgba(0, 212, 255, 0.4)", 14, 0.0028, 75, 1.6, 0.42, 20);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      /* Added -mb-px to eliminate the bottom 1px seam line */
      className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-[#020204] -mb-px"
      style={{ minHeight: "100vh" }}
    >
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none w-full h-full"
      />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 212, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 212, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%)",
        }}
      />

      {/* Seam Vignette Mask */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#020204] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020204] to-transparent" />
      </div>

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="relative z-[2] w-full max-w-[1100px] mx-auto px-6 flex flex-col items-center text-center pt-28 pb-20 transform-gpu"
      >
        <div className="hero-anim mb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 bg-white/[0.08] border border-white/[0.18] hover:border-[#D4AF37]/60 text-white/80 text-[0.78rem] font-semibold tracking-wide px-4 py-2 rounded-full transition-all duration-300 group backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            Custom Websites for Growing Businesses
            <ChevronRight
              size={14}
              className="text-[#D4AF37] group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </div>

        <h1
          className="hero-anim font-display font-bold text-white leading-[1.08] tracking-[-0.03em] mb-6 drop-shadow-lg"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 5rem)" }}
        >
          Websites Built For <br />
          <span className="relative inline-block">
            <span
              style={{
                background:
                  "linear-gradient(135deg, #D4AF37 0%, #f5d87a 50%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Your Business
            </span>
            <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent rounded-full" />
          </span>
        </h1>

        <p className="hero-anim max-w-[640px] text-[1.1rem] text-white/70 leading-relaxed font-body mb-10 drop-shadow-md">
          Code Luz creates professional, custom-built websites that help
          businesses present their services, reach more customers, and make it
          easier for people to take action.
        </p>

        <div className="hero-anim flex flex-wrap gap-4 items-center justify-center">
          {/* Get a Quote button with "It's free" hover tooltip */}
          <div
            className="relative inline-flex flex-col items-center"
            onMouseEnter={() => setIsQuoteHovered(true)}
            onMouseLeave={() => setIsQuoteHovered(false)}
          >
            {/* Tooltip */}
            <span
              className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#00FF88] text-black text-[0.72rem] font-bold tracking-wide px-3 py-1.5 rounded-full shadow-[0_4px_16px_rgba(0,255,136,0.4)] transition-all duration-300 ease-out ${
                isQuoteHovered
                  ? "opacity-100 -translate-y-1 scale-100"
                  : "opacity-0 translate-y-1 scale-90 pointer-events-none"
              }`}
            >
              It&apos;s free — no cost to ask
              <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-[5px] border-x-transparent border-t-[6px] border-t-[#00FF88]" />
            </span>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 bg-[#D4AF37] hover:bg-[#c9a430] text-black font-heading font-bold text-sm tracking-widest uppercase px-7 py-4 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_55px_rgba(212,175,55,0.65)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Get a Quote
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold tracking-wide transition-colors duration-200 group"
          >
            View Our Services
            <ChevronRight
              size={16}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}