"use client";

import React, { useEffect, useRef, useState } from "react";
import "./xero-hero.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const XeroHeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const pipelineRef = useRef<HTMLDivElement>(null);
  const nodeStackRef = useRef<HTMLDivElement>(null);
  const nodeXRef = useRef<HTMLDivElement>(null);
  const nodeShieldRef = useRef<HTMLDivElement>(null);
  const beamPathGlowRef = useRef<SVGPathElement>(null);
  const beamPathCoreRef = useRef<SVGPathElement>(null);
  const beamGradientRef = useRef<SVGLinearGradientElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const updatePath = () => {
      if (
        !pipelineRef.current ||
        !nodeStackRef.current ||
        !nodeXRef.current ||
        !nodeShieldRef.current ||
        !beamPathGlowRef.current ||
        !beamPathCoreRef.current
      ) return;

      const pRect = pipelineRef.current.getBoundingClientRect();
      const sRect = nodeStackRef.current.getBoundingClientRect();
      const xRect = nodeXRef.current.getBoundingClientRect();
      const shRect = nodeShieldRef.current.getBoundingClientRect();

      const startX = sRect.left + sRect.width / 2 - pRect.left;
      const startY = sRect.top + sRect.height / 2 - pRect.top;
      const midX = xRect.left + xRect.width / 2 - pRect.left;
      const midY = xRect.top + xRect.height / 2 - pRect.top;
      const endX = shRect.left + shRect.width / 2 - pRect.left;
      const endY = shRect.top + shRect.height / 2 - pRect.top;

      const d = `M ${startX},${startY} L ${midX},${midY} L ${endX},${endY}`;
      beamPathGlowRef.current.setAttribute("d", d);
      beamPathCoreRef.current.setAttribute("d", d);
    };

    updatePath();
    window.addEventListener("resize", updatePath);

    let animationFrameId: number;
    let state = "p1";
    let lastStateChange = performance.now();

    const loop = (time: number) => {
      const elapsed = time - lastStateChange;

      if (!beamGradientRef.current || !beamPathGlowRef.current || !beamPathCoreRef.current || !splashRef.current || !nodeStackRef.current || !nodeShieldRef.current) {
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      if (state === "p1") {
        const duration = 800;
        const progress = Math.min(elapsed / duration, 1);
        const percentage = progress * 0.5;
        const center = percentage * 100;

        beamGradientRef.current.setAttribute("x1", `${center - 5}%`);
        beamGradientRef.current.setAttribute("x2", `${center + 5}%`);
        beamGradientRef.current.setAttribute("y1", `0%`);
        beamGradientRef.current.setAttribute("y2", `0%`);

        if (progress < 0.4) {
          nodeStackRef.current.classList.add("active");
        } else {
          nodeStackRef.current.classList.remove("active");
        }

        if (progress >= 1) {
          state = "splash";
          lastStateChange = time;
          beamPathGlowRef.current.style.opacity = "0";
          beamPathCoreRef.current.style.opacity = "0";
          splashRef.current.classList.add("animate");
        }
      } else if (state === "splash") {
        if (elapsed >= 800) {
          state = "p2";
          lastStateChange = time;
          splashRef.current.classList.remove("animate");
          beamPathGlowRef.current.style.opacity = "0.6";
          beamPathCoreRef.current.style.opacity = "1";
        }
      } else if (state === "p2") {
        const duration = 800;
        const progress = Math.min(elapsed / duration, 1);
        const percentage = 0.5 + progress * 0.5;
        const center = percentage * 100;

        beamGradientRef.current.setAttribute("x1", `${center - 5}%`);
        beamGradientRef.current.setAttribute("x2", `${center + 5}%`);

        if (progress > 0.6) {
          nodeShieldRef.current.classList.add("active");
        } else {
          nodeShieldRef.current.classList.remove("active");
        }

        if (progress >= 1) {
          state = "idle";
          lastStateChange = time;
          nodeShieldRef.current.classList.remove("active");
        }
      } else if (state === "idle") {
        if (elapsed >= 1000) {
          state = "p1";
          lastStateChange = time;
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", updatePath);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`xero-hero-container ${inter.className}`}>
      {/* NAVBAR */}
      <nav className="x-nav">
        <span className="nav-logo">Xero</span>
        <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <ul className="nav-links">
            {/* Nav links removed as requested */}
          </ul>
          <div className="nav-actions">
            {/* Actions removed as requested */}
          </div>
        </div>
        <button
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </nav>

      {/* HERO CARD */}
      <section className="hero-card">
        <div className="hero-grid" />

        {/* ICON PIPELINE */}
        <div className="icon-pipeline" ref={pipelineRef}>
          <svg className="beam-svg">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="beam-gradient" gradientUnits="userSpaceOnUse" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#b04090" stopOpacity="0" />
                <stop offset="20%" stopColor="#b04090" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#fff" stopOpacity="1" />
                <stop offset="80%" stopColor="#c8a0e0" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#c8a0e0" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path ref={beamPathGlowRef} stroke="url(#beam-gradient)" strokeWidth="2" filter="url(#glow)" opacity="0.6" fill="none" />
            <path ref={beamPathCoreRef} stroke="url(#beam-gradient)" strokeWidth="0.8" fill="none" />
          </svg>

          <div className="icon-node node-light-right" ref={nodeStackRef} id="node-stack">
            <svg viewBox="0 0 24 24">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>

          <div className="pipeline-line" />

          <div style={{ position: "relative" }}>
            <div className="splash" ref={splashRef} />
            <div className="icon-node-center" ref={nodeXRef} id="node-x">
              <svg viewBox="0 0 40 40">
                <path d="M12 12 L28 28 M28 12 L12 28" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="pipeline-line right" />

          <div className="icon-node node-light-left" ref={nodeShieldRef} id="node-shield">
            <svg viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
        </div>

        {/* HERO TEXT */}
        <div className="hero-content">
          <h1 className="hero-heading">
            The simple way
            <strong>encryption your data</strong>
          </h1>
          <p className="hero-sub">
            Fully managed data encrypting service and annotation<br />
            platform for teams of all industries.
          </p>
          <a href="#" className="btn-cta">Get Started</a>
        </div>
      </section>

      {/* BRANDS ROW */}
      <div className="brands">
        <div className="brand-item">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="currentColor" />
            <path fill="var(--bg)" d="M8 9h8v2H8zm0 4h6v2H8z" />
          </svg>
          Expedia
        </div>
        <div className="brand-item">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="7" r="4" fill="currentColor" />
            <circle cx="5" cy="16" r="3.5" fill="currentColor" />
            <circle cx="19" cy="16" r="3.5" fill="currentColor" />
          </svg>
          asana
        </div>
        <div className="brand-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="4 8 20 8" />
            <polyline points="8 12 16 12" />
            <polyline points="4 16 20 16" />
          </svg>
          zenefits
        </div>
        <div className="brand-item">
          <svg viewBox="0 0 24 24">
            <circle cx="15.5" cy="8.5" r="2.5" fill="currentColor" />
            <circle cx="8.5" cy="8.5" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 8.5 L 13.5 8.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          HubSp<span className="hubspot-dot" />t
        </div>
        <div className="brand-item">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 3 v 18 M3 12 h 18 M6 6 l 12 12 M6 18 l 12 -12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          loom
        </div>
      </div>
    </div>
  );
};
