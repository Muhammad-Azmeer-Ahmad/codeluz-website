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
          <h1>
  <span>Scaling</span>{" "}
  <span>The</span>{" "}
  <span>Platform</span>{" "}
  For Your <span className="text-orange-500">Business</span>
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
