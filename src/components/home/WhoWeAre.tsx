"use client";

import { motion } from "framer-motion";

export function WhoWeAre() {
  return (
    <section className="bg-white/90 backdrop-blur-md text-slate-900 py-[100px] px-12">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-16 items-center"
      >
        <div className="flex flex-col">
          <span className="text-[0.8rem] font-bold uppercase tracking-[0.18em] text-[#A855F7] mb-3 block">WHO WE ARE</span>
          <h2 className="font-heading text-4xl md:text-[2.5rem] font-bold mb-4 text-[#0f172a] leading-tight">
            Drive Unstoppable Business <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-[length:100%_100%] [transform:translate3d(0,0,0)]">Success Through Engineering</span>
          </h2>
          <p className="text-slate-600 text-[1.05rem] leading-relaxed mb-4">
            Vtechcodelabs is an engineering-first software studio passionate about solving complex digital problems. We combine deep expertise in modern web frameworks, cloud infrastructure, and custom AI integrations to deliver measurable business outcomes.
          </p>
          <p className="text-slate-600 text-[1.05rem] leading-relaxed mb-6">
            Whether you are a growing enterprise or an ambitious startup, we bring the same level of precision, care, and architectural rigor to every single project we engineer.
          </p>
          <div>
            <a href="/contact" className="btn-lime-pill inline-flex">
              Get a Free Quote
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-[#f8fafc] border border-slate-200 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
            <div className="font-display text-[2.5rem] font-black text-[#A855F7] leading-none mb-2">100%</div>
            <div className="font-heading text-[0.85rem] font-bold text-slate-700 uppercase tracking-wide">Client Satisfaction</div>
          </div>
          <div className="bg-[#f8fafc] border border-slate-200 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
            <div className="font-display text-[2.5rem] font-black text-[#A855F7] leading-none mb-2">10+</div>
            <div className="font-heading text-[0.85rem] font-bold text-slate-700 uppercase tracking-wide">Expert Team Members</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
