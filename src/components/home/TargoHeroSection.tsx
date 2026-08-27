"use client";

import React from "react";
import Link from "next/link";
import "./targo.css";
import { Quantico } from "next/font/google";

const quantico = Quantico({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const TargoHeroSection = () => {
  return (
    <div className={`targo-wrapper ${quantico.className}`}>
      {/* Section 1 — Hero */}
      <section className="targo-hero">

        <div className="targo-hero-content">
          <h1 className="targo-h1">
            <span className="targo-h1-line">Scaling</span>{" "}
            <span className="targo-h1-line">The</span>{" "}
            <span className="targo-h1-line">Platform</span>{" "}
            <span className="targo-h1-indent">For</span>{" "}
            <span className="targo-h1-indent">Your</span>{" "}
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