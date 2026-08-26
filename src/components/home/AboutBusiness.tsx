"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";

export function AboutBusiness() {
  return (
    <section className="bg-background py-[120px] px-12 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-20 items-center">
        
        {/* Content Column */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-[#D4AF37] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            AVAILABLE FOR NEW PROJECTS
          </div>

          <h2 className="font-heading text-4xl md:text-[3rem] font-extrabold text-foreground mb-3 leading-tight">
            Websites Built For <span className="text-[#D4AF37]">Your Business</span>
          </h2>

          <p className="text-muted font-semibold text-[1rem] mb-6">
            Codeluz — Custom Web Development
          </p>

          <p className="text-muted text-[1.15rem] leading-[1.85] mb-9 font-body max-w-[540px]">
            We build custom, professional websites for growing businesses — designed around how you actually operate, not a generic template. Every project is built with care, from first conversation to launch.
          </p>

          {/* Tag Pills */}
          <div className="flex flex-wrap gap-2.5 mb-9">
            <span className="px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 text-foreground text-xs font-semibold tracking-wide border border-black/10 dark:border-white/10">
              Custom-Built
            </span>
            <span className="px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 text-foreground text-xs font-semibold tracking-wide border border-black/10 dark:border-white/10">
              Security-Conscious
            </span>
            <span className="px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 text-foreground text-xs font-semibold tracking-wide border border-black/10 dark:border-white/10">
              Direct Support
            </span>
          </div>

          <Link href="/about" className="btn-gold-pill inline-flex items-center gap-2">
            Discover Our Story <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Dark Feature Card Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          {/* Ambient glow behind card, matches hero */}
          <div className="absolute -inset-6 bg-[#D4AF37]/10 blur-[80px] rounded-full pointer-events-none" />

          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-card-alt p-10 rounded-3xl border border-border shadow-[0_30px_70px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center gap-4 mb-8 border-b border-border pb-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="w-14 h-14 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] shrink-0"
              >
                <Users size={26} />
              </motion.div>
              <div>
                <div className="font-heading font-extrabold text-foreground leading-none text-2xl mb-1.5">Codeluz</div>
                <div className="text-sm text-muted font-medium">Web Development Team</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center mb-8">
              {[
                { label: "Custom", sub: "From Scratch" },
                { label: "Direct", sub: "No Middlemen" },
                { label: "Secure", sub: "By Design" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                  className={`py-2 ${i === 1 ? "border-x border-border" : ""}`}
                >
                  <div className="font-bold text-base text-foreground mb-1">{item.label}</div>
                  <div className="text-[0.78rem] text-muted font-medium">{item.sub}</div>
                </motion.div>
              ))}
            </div>

            <p className="text-muted text-sm leading-relaxed border-t border-border pt-6">
              Every project is handled directly by the people building it — no account managers, no outsourcing, just two people who care about the outcome.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}