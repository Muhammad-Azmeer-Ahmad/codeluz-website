"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import "./targo.css";
import { Quantico } from "next/font/google";

const quantico = Quantico({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const HERO_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260823_050407_500d0339-ab28-41c1-9688-132a74a3b5aa.mp4";
const ABOUT_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260823_063501_2e2c8971-de1e-473a-8611-a0c9ae7ee186.mp4";

const ensureVideoPlays = (videoElement: HTMLVideoElement | null) => {
  if (!videoElement) return;
  videoElement.muted = true;
  videoElement.play().catch(() => {});
};

export const TargoHeroSection = () => {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideos = () => {
      ensureVideoPlays(heroVideoRef.current);
    };

    playVideos();
    const interval = setInterval(playVideos, 1000);

    const handleUserInteraction = () => {
      playVideos();
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    return () => {
      clearInterval(interval);
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  return (
    <div className={`targo-wrapper ${quantico.className}`}>
      {/* Section 1 — Hero */}
      <section className="targo-hero">
        <video
          ref={heroVideoRef}
          className="targo-hero-video"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="targo-scrim" />

        <div className="targo-hero-content">
          <h1 className="targo-h1">
            <span className="targo-h1-line">Scaling</span>
            <span className="targo-h1-line">The</span>
            <span className="targo-h1-line">Platform</span>
            <span className="targo-h1-indent">For</span>
            <span className="targo-h1-indent">Your</span>
            <span className="targo-h1-indent targo-h1-accent">Business</span>
          </h1>

          <div className="targo-cta-wrapper">
            <Link href="/services" className="targo-cta no-underline">
              Get Started
              <div className="targo-cta-line" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
