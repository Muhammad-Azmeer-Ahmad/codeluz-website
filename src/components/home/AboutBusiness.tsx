"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";

export function AboutBusiness() {
  return (
    <section className="bg-white py-[100px] px-12 relative">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-center">
        
        {/* Content Column */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-[#D4AF37] mb-3">
            <span>AVAILABLE FOR NEW PROJECTS</span>
          </div>

          <h2 className="font-heading text-4xl md:text-[2.8rem] font-extrabold text-slate-900 mb-2 leading-tight">
            Websites Built For <span className="text-[#D4AF37]">Your Business</span>
          </h2>

          <p className="text-slate-500 font-semibold text-[0.95rem] mb-6">
            Codeluz — Custom Web Development
          </p>

          <p className="text-slate-600 text-[1.1rem] leading-[1.8] mb-8 font-body">
            We build custom, professional websites for growing businesses — designed around how you actually operate, not a generic template. Every project is built with care, from first conversation to launch.
          </p>

          {/* Tag Pills */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold tracking-wide border border-slate-200">
              Custom-Built
            </span>
            <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold tracking-wide border border-slate-200">
              Security-Conscious
            </span>
            <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold tracking-wide border border-slate-200">
              Direct Support
            </span>
          </div>

          <Link href="/about" className="btn-gold-pill inline-flex items-center gap-2">
            Discover Our Story <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Trust Signal Card (standalone, no image) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] max-w-[380px] w-full">
            <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-4">
              <div className="w-11 h-11 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <Users size={20} />
              </div>
              <div>
                <div className="font-heading font-extrabold text-slate-900 leading-none text-lg">Codeluz</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Web Development Team</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="font-bold text-sm text-slate-900">Custom</div>
                <div className="text-[0.72rem] text-slate-500 font-medium">From Scratch</div>
              </div>
              <div className="border-x border-slate-100 px-1">
                <div className="font-bold text-sm text-slate-900">Direct</div>
                <div className="text-[0.72rem] text-slate-500 font-medium">No Middlemen</div>
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900">Secure</div>
                <div className="text-[0.72rem] text-slate-500 font-medium">By Design</div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}