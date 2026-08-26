"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const process = [
  {
    step: "01",
    title: "Discovery Call",
    desc: "We learn about your business, your goals, and what you need your website to accomplish.",
  },
  {
    step: "02",
    title: "Design & Planning",
    desc: "We plan the structure and design around your business before development begins, so you know what we're building.",
  },
  {
    step: "03",
    title: "Development",
    desc: "We build your website with regular communication along the way, keeping you informed as the project takes shape.",
  },
  {
    step: "04",
    title: "Launch & Support",
    desc: "Once everything is ready, we launch your website and remain available for updates, improvements, and ongoing support.",
  },
];

export function SocialProof() {
  return (
    <>
      {/* ── Process Section ── */}
      <section className="bg-[#080810] py-20 md:py-32 px-6 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-[#D4AF37] text-[0.75rem] font-bold tracking-[0.2em] uppercase mb-4">
              How We Work
            </p>

            <h2 className="font-display text-4xl md:text-[2.75rem] font-bold text-white leading-tight tracking-tight">
              A simple process from{" "}
              <span style={{ color: "#D4AF37" }}>idea to launch</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                {/* Connector line */}
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(100%_-_12px)] w-full h-px bg-gradient-to-r from-white/20 to-transparent -z-0" />
                )}

                <div className="font-display text-[3.5rem] font-black text-white/[0.05] leading-none mb-4 select-none">
                  {item.step}
                </div>

                <h4 className="text-white font-heading font-semibold text-lg mb-2">
                  {item.title}
                </h4>

                <p className="text-slate-500 text-[0.9rem] leading-relaxed font-body">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-[#06070d] py-16 md:py-24 px-6 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-[900px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            {/* Glowing badge */}
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-4 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />

              <span className="text-[#D4AF37] text-[0.75rem] font-bold tracking-widest uppercase">
                Let's Build Your Website
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-[3.5rem] font-bold text-white leading-tight tracking-[-0.02em] mb-6">
              Ready to build a website{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #D4AF37, #f5d87a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                for your business?
              </span>
            </h2>

            <p className="text-slate-400 text-lg font-body mb-10 max-w-[580px] mx-auto leading-relaxed">
              Tell us what you need, and we'll discuss your goals, recommend
              the right approach, and provide a clear quote for your project.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-[#D4AF37] hover:bg-[#c9a430] text-black font-heading font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.55)] transition-all duration-300 hover:-translate-y-0.5 group"
              >
                Get a Quote
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white text-sm font-semibold tracking-wide px-8 py-4 rounded-full transition-all duration-300"
              >
                View Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}