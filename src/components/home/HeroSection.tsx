"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 120;
const FRAME_PATH = "/hero-frames-opt/frame-";

function getFrameSrc(index: number): string {
  const num = String(index + 1).padStart(3, "0");
  return `${FRAME_PATH}${num}.jpg`;
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef({ value: 0 });
  const lastDrawnFrameRef = useRef(-1);
  const rafIdRef = useRef<number | null>(null);
  const dprRef = useRef(1);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isQuoteHovered, setIsQuoteHovered] = useState(false);

  // --- High-quality canvas rendering with DPR support ---
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const idx = Math.min(
      Math.max(Math.round(frameIndexRef.current.value), 0),
      FRAME_COUNT - 1
    );

    // Skip if same frame — avoid redundant draws
    if (idx === lastDrawnFrameRef.current) return;

    const img = imagesRef.current[idx];
    if (!img || !img.complete) return;

    lastDrawnFrameRef.current = idx;

    // High-quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Scale image to cover the canvas (object-fit: cover)
    const dpr = dprRef.current;
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.drawImage(img, sx, sy, sw, sh);
    ctx.restore();
  }, []);

  // --- Resize canvas with DPR for retina sharpness ---
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;

    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    lastDrawnFrameRef.current = -1; // Force redraw
    renderFrame();
  }, [renderFrame]);

  // --- Preload frames in priority order (first, last, then fill middle) ---
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let cancelled = false;

    // Build a loading order: first few frames first (for immediate display),
    // then every Nth frame for quick scrub coverage, then fill the rest
    const loadOrder: number[] = [];
    const added = new Set<number>();

    // Priority 1: First 5 frames (instant display)
    for (let i = 0; i < Math.min(5, FRAME_COUNT); i++) {
      loadOrder.push(i);
      added.add(i);
    }

    // Priority 2: Every 10th frame (quick scrub coverage)
    for (let i = 0; i < FRAME_COUNT; i += 10) {
      if (!added.has(i)) {
        loadOrder.push(i);
        added.add(i);
      }
    }

    // Priority 3: All remaining frames
    for (let i = 0; i < FRAME_COUNT; i++) {
      if (!added.has(i)) {
        loadOrder.push(i);
      }
    }

    // Load in batches to avoid overwhelming the browser
    const BATCH_SIZE = 12;
    let batchIndex = 0;

    function loadBatch() {
      if (cancelled) return;
      const start = batchIndex * BATCH_SIZE;
      const end = Math.min(start + BATCH_SIZE, FRAME_COUNT);

      for (let b = start; b < end; b++) {
        const frameIdx = loadOrder[b];
        const img = new Image();
        img.decoding = "async";
        img.src = getFrameSrc(frameIdx);

        const onDone = () => {
          if (cancelled) return;
          loaded++;
          setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
          if (loaded === FRAME_COUNT) {
            setIsLoaded(true);
          }
        };

        img.onload = onDone;
        img.onerror = onDone;
        images[frameIdx] = img;
      }

      batchIndex++;
      if (end < FRAME_COUNT) {
        // Small delay between batches to keep UI responsive
        requestAnimationFrame(() => setTimeout(loadBatch, 0));
      }
    }

    loadBatch();
    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, []);

  // --- Setup canvas resize with debounce ---
  useEffect(() => {
    resizeCanvas();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [resizeCanvas]);

  // --- Render first frame once loaded ---
  useEffect(() => {
    if (isLoaded) {
      lastDrawnFrameRef.current = -1;
      renderFrame();
    }
  }, [isLoaded, renderFrame]);

  // --- GSAP ScrollTrigger animation ---
  useEffect(() => {
    if (!isLoaded || !sectionRef.current) return;

    // Refresh ScrollTrigger after images load to recalculate positions
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // --- Frame scrubbing animation with pinning ---
      gsap.to(frameIndexRef.current, {
        value: FRAME_COUNT - 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          pin: pinWrapperRef.current,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: () => {
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = requestAnimationFrame(renderFrame);
          },
        },
      });

      // --- Phase 1: Initial headline (0% - 20%) ---
      const phase1Tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=50vh",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Entrance animations
      gsap.set(".hero-phase-1", { opacity: 0, y: 40 });
      gsap.to(".hero-phase-1", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      });

      // Exit: fade out phase 1
      phase1Tl.to(".hero-phase-1", {
        opacity: 0,
        y: -30,
        stagger: 0.05,
        ease: "power2.in",
      });

      // --- Phase 2: "We don't just build websites" (20% - 45%) ---
      const phase2Tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "+=45vh",
          end: "+=110vh",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(".hero-phase-2", { opacity: 0, y: 50, scale: 0.95 });
      phase2Tl
        .to(".hero-phase-2", {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
        })
        .to(
          ".hero-phase-2",
          {
            opacity: 0,
            y: -30,
            stagger: 0.05,
            ease: "power2.in",
          },
          "+=0.3"
        );

      // --- Phase 3: "We engineer every layer" (45% - 70%) ---
      const phase3Tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "+=105vh",
          end: "+=180vh",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(".hero-phase-3", { opacity: 0, y: 50, scale: 0.95 });
      phase3Tl
        .to(".hero-phase-3", {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
        })
        .to(
          ".hero-phase-3",
          {
            opacity: 0,
            y: -30,
            stagger: 0.05,
            ease: "power2.in",
          },
          "+=0.3"
        );

      // --- Phase 4: CTA buttons (70% - 100%) ---
      const phase4Tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "+=175vh",
          end: "+=230vh",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(".hero-phase-4", { opacity: 0, y: 40 });
      phase4Tl.to(".hero-phase-4", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isLoaded, renderFrame]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#020204]"
    >
      {/* Pinned wrapper — GSAP ScrollTrigger pins this while animation plays */}
      <div
        ref={pinWrapperRef}
        className="relative w-full flex items-center justify-center overflow-hidden will-change-transform"
        style={{ height: "100dvh" }}
      >
        {/* Instant fallback frame for zero-delay loading */}
        <NextImage
          src="/hero-frames-opt/frame-001.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover opacity-80"
          sizes="100vw"
        />

        {/* Canvas for frame animation */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 will-change-transform opacity-100 mix-blend-normal"
        />

        {/* Vignette overlay on canvas edges */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {/* Top vignette */}
          <div className="absolute top-0 left-0 w-full h-32 sm:h-40 bg-gradient-to-b from-[#020204] to-transparent" />
          {/* Bottom vignette */}
          <div className="absolute bottom-0 left-0 w-full h-32 sm:h-40 bg-gradient-to-t from-[#020204] to-transparent" />
          {/* Left vignette */}
          <div className="absolute top-0 left-0 w-16 sm:w-32 h-full bg-gradient-to-r from-[#020204]/80 to-transparent" />
          {/* Right vignette */}
          <div className="absolute top-0 right-0 w-16 sm:w-32 h-full bg-gradient-to-l from-[#020204]/80 to-transparent" />
          {/* Radial vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, #020204 100%)",
            }}
          />
        </div>

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none opacity-[0.08] sm:opacity-[0.12]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 212, 255, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 212, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "3rem 3rem",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%)",
          }}
        />

        {/* Ambient brand glows */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[200px] sm:h-[300px] bg-[#D4AF37]/8 rounded-full blur-[100px] sm:blur-[150px]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[400px] h-[150px] sm:h-[250px] bg-[#00D4FF]/6 rounded-full blur-[80px] sm:blur-[130px]" />
        </div>

        {/* ====== TEXT CONTENT PHASES ====== */}
        <div
          ref={contentRef}
          className="relative z-[10] w-full max-w-[1100px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center transform-gpu will-change-transform"
        >
          {/* ── Phase 1: Opening headline ── */}
          <div className="hero-phase-1 mb-4 sm:mb-6">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 sm:gap-2.5 bg-white/[0.08] border border-white/[0.18] hover:border-[#D4AF37]/60 text-white/80 text-[0.7rem] sm:text-[0.78rem] font-semibold tracking-wide px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 group backdrop-blur-md"
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
            className="hero-phase-1 font-display font-bold text-white leading-[1.08] tracking-[-0.03em] mb-3 sm:mb-5 drop-shadow-lg"
            style={{ fontSize: "clamp(2rem, 6.5vw, 5rem)" }}
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
              <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-[2px] sm:h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent rounded-full" />
            </span>
          </h1>

          <p className="hero-phase-1 max-w-[540px] sm:max-w-[600px] text-[0.9rem] sm:text-[1.05rem] text-white/65 leading-relaxed font-body mb-6 sm:mb-8 drop-shadow-md px-2">
            Code Luz creates professional, custom-built websites that help
            businesses present their services, reach more customers, and make it
            easier for people to take action.
          </p>

          <div className="hero-phase-1 absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60">
            <span className="text-[0.65rem] uppercase tracking-widest text-white/50 mb-2">Scroll</span>
            <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center p-1">
              <div className="w-1 h-1 bg-[#D4AF37] rounded-full animate-[bounce_1.5s_infinite]" />
            </div>
          </div>

          {/* ── Phase 2: Mid-scroll statement ── */}
          <div className="hero-phase-2 absolute inset-0 flex items-center justify-center pointer-events-none px-4">
            <h2
              className="font-display font-bold text-white leading-[1.1] tracking-[-0.02em] text-center drop-shadow-2xl"
              style={{ fontSize: "clamp(1.8rem, 5.5vw, 4.2rem)" }}
            >
              We Don&apos;t Just Build
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #00D4FF 0%, #00F0FF 50%, #00D4FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Websites
              </span>
            </h2>
          </div>

          {/* ── Phase 3: Exploded view statement ── */}
          <div className="hero-phase-3 absolute inset-0 flex items-center justify-center pointer-events-none px-4">
            <h2
              className="font-display font-bold text-white leading-[1.1] tracking-[-0.02em] text-center drop-shadow-2xl"
              style={{ fontSize: "clamp(1.8rem, 5.5vw, 4.2rem)" }}
            >
              We Engineer
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #D4AF37 0%, #f5d87a 50%, #D4AF37 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Every Layer
              </span>
            </h2>
          </div>

          {/* ── Phase 4: Final CTA ── */}
          <div className="hero-phase-4 absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-5 pointer-events-auto px-4">
            <h2
              className="font-display font-bold text-white leading-[1.1] tracking-[-0.02em] text-center mb-1 sm:mb-2 drop-shadow-2xl"
              style={{ fontSize: "clamp(1.4rem, 4vw, 3rem)" }}
            >
              Ready to Build Something
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #D4AF37 0%, #f5d87a 50%, #D4AF37 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Extraordinary?
              </span>
            </h2>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-center justify-center">
              <div
                className="relative inline-flex flex-col items-center"
                onMouseEnter={() => setIsQuoteHovered(true)}
                onMouseLeave={() => setIsQuoteHovered(false)}
              >
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
                  className="group inline-flex items-center gap-2.5 bg-[#D4AF37] hover:bg-[#c9a430] text-black font-heading font-bold text-xs sm:text-sm tracking-widest uppercase px-5 sm:px-7 py-3 sm:py-4 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_55px_rgba(212,175,55,0.65)] transition-all duration-300 hover:-translate-y-0.5"
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
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-200 group"
              >
                View Our Services
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}