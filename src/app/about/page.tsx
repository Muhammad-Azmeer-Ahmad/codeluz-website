"use client";

import { motion } from "framer-motion";
import { Code2, ShieldCheck, HeartHandshake, CalendarCheck, ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { AboutMeSection } from "@/components/home/AboutMeSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">

      {/* Hero Section */}
      <section className="relative px-8 lg:px-12 max-w-[1300px] mx-auto mb-32 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A855F7]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

        {/* Left text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#00FF88]/10 border border-[#00FF88]/30 px-4 py-2 rounded-full mb-6 shadow-[0_0_15px_rgba(0,255,136,0.15)]">
            <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            <span className="text-[#00FF88] text-[0.75rem] font-bold tracking-widest uppercase">Available for new projects</span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-extrabold text-foreground leading-tight mb-4">
            Websites Built <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#00F0FF]">For Your Business</span>
          </h1>

          <p className="text-[#D4AF37] font-heading font-semibold text-xl mb-6">
            Codeluz &mdash; Custom Web Development
          </p>

          <p className="text-muted text-lg leading-relaxed mb-8 font-body max-w-[600px]">
            We build custom, professional websites for growing businesses — designed around how you actually operate, not a generic template. Every project is built with care, from first conversation to launch, by the same two people you talk to.
          </p>

          {/* Role Badges */}
          <div className="flex flex-wrap gap-3 mb-10">
            <span className="bg-black/5 dark:bg-white/5 border border-border px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 text-muted"><Code2 size={16} className="text-[#00F0FF]"/> Custom-Built</span>
            <span className="bg-black/5 dark:bg-white/5 border border-border px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 text-muted"><ShieldCheck size={16} className="text-[#A855F7]"/> Security-Conscious</span>
            <span className="bg-black/5 dark:bg-white/5 border border-border px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 text-muted"><HeartHandshake size={16} className="text-[#00FF88]"/> Direct Support</span>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-lime-pill">
              <CalendarCheck size={16} /> Book a Call
            </Link>
            <Link href="/services" className="btn-green-outline">
              View Services <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

        {/* Right Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative perspective-1000"
        >
          <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center justify-center text-center">
            {/* Top sweep glow */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-50" />

            <div className="w-32 h-32 rounded-full border border-[#00F0FF]/30 flex items-center justify-center bg-[#00F0FF]/5 mb-6 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
              <Users size={48} className="text-[#00F0FF]" />
            </div>

            <h3 className="text-2xl font-heading font-bold text-foreground mb-2">Codeluz</h3>
            <p className="text-muted mb-8 font-body">Web Development Team</p>

            <div className="w-full grid grid-cols-3 gap-4 border-t border-border pt-8">
              <div>
                <div className="text-2xl font-display font-black text-[#A855F7]">Custom</div>
                <div className="text-[0.65rem] font-bold text-muted tracking-widest uppercase mt-1">Built From Scratch</div>
              </div>
              <div className="border-l border-border">
                <div className="text-2xl font-display font-black text-[#00FF88]">Direct</div>
                <div className="text-[0.65rem] font-bold text-muted tracking-widest uppercase mt-1">No Middlemen</div>
              </div>
              <div className="border-l border-border">
                <div className="text-2xl font-display font-black text-[#00F0FF]">Secure</div>
                <div className="text-[0.65rem] font-bold text-muted tracking-widest uppercase mt-1">By Design</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <AboutMeSection />

      {/* Our Approach Section */}
      <section className="bg-card text-foreground py-24 px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-[0.8rem] font-bold uppercase tracking-[0.18em] text-[#A855F7] mb-3 block">OUR APPROACH</span>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground mb-6">
              How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#ec4899]">Work</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Built, Not Templated",
                desc: "Every site is built from scratch around your business, not assembled from a generic template. What you get is shaped by what you actually need.",
                color: "#A855F7"
              },
              {
                title: "Your Customers First",
                desc: "We design with your visitors in mind — fast to load, easy to navigate, and clear about how to reach you or book with you.",
                color: "#00F0FF"
              },
              {
                title: "Security From The Start",
                desc: "We build with security in mind from the first line of code, not as an afterthought — helping protect your site and your customers' information.",
                color: "#D4AF37"
              }
            ].map((phil, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background border border-border p-8 rounded-2xl hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 rounded-full mb-6 flex items-center justify-center text-white" style={{ backgroundColor: phil.color }}>
                  <Code2 size={20} />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">{phil.title}</h3>
                <p className="text-muted leading-relaxed font-body">{phil.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}