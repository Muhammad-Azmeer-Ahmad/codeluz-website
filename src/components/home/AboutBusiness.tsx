"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";

export function AboutBusiness() {
  return (
    <section className="bg-white py-[100px] px-12 relative">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-center">
        
        {/* Content Column */}
{/* Trust Signal Card (standalone, no image) */}
<motion.div 
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="relative flex items-center justify-center"
>
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.35)] max-w-[380px] w-full"
  >
    <div className="flex items-center gap-3 mb-5 border-b border-slate-700/60 pb-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="w-11 h-11 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]"
      >
        <Users size={20} />
      </motion.div>
      <div>
        <div className="font-heading font-extrabold text-white leading-none text-lg">Codeluz</div>
        <div className="text-xs text-slate-400 font-medium mt-1">Web Development Team</div>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-2 text-center">
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
          className={i === 1 ? "border-x border-slate-700/60 px-1" : ""}
        >
          <div className="font-bold text-sm text-white">{item.label}</div>
          <div className="text-[0.72rem] text-slate-400 font-medium">{item.sub}</div>
        </motion.div>
      ))}
    </div>
  </motion.div>
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