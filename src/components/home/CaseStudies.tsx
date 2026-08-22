"use client";

import { motion } from "framer-motion";
import { Cpu, FolderOpen } from "lucide-react";
import Link from "next/link";

export function CaseStudies() {
  return (
    <section className="bg-[#080911] py-[100px] px-12 border-t border-[#A855F7]/20 relative">
      <div className="max-w-[1200px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <span className="text-[0.8rem] font-bold uppercase tracking-[0.18em] text-[#00F0FF] mb-3 block">SELECTED CASE STUDIES</span>
          <h2 className="font-heading text-4xl md:text-[2.5rem] font-bold text-white">
            A Look at How We Solve Real Problems
          </h2>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button className="bg-[#A855F7] text-white px-5 py-2 rounded-full font-bold text-sm tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.4)]">Book of Tomorrow</button>
          <button className="bg-transparent text-slate-400 border border-slate-700 px-5 py-2 rounded-full font-bold text-sm tracking-wider hover:text-white hover:border-[#A855F7] transition-colors">Smart AI Engine</button>
          <button className="bg-transparent text-slate-400 border border-slate-700 px-5 py-2 rounded-full font-bold text-sm tracking-wider hover:text-white hover:border-[#A855F7] transition-colors">TaskFlow Commerce</button>
        </motion.div>

        {/* Case Study Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-[#0d0f1a]/90 border border-[#A855F7]/30 rounded-3xl p-10 flex flex-col lg:flex-row gap-12 items-center"
        >
          {/* Left: Product Card Mockup */}
          <div className="flex-1 bg-white rounded-2xl p-10 shadow-[0_0_40px_rgba(168,85,247,0.15)] relative overflow-hidden">
            <div className="text-[0.75rem] font-extrabold uppercase text-[#A855F7] mb-3 flex items-center gap-2">
              <Cpu size={14} /> Physical AI & Robotics Platform
            </div>
            <h4 className="text-[1.8rem] text-slate-900 font-black mb-4 leading-tight font-display">
              PHYSICAL AI &<br/>HUMANOID ROBOTICS
            </h4>
            <p className="text-[0.9rem] text-slate-500 leading-relaxed mb-6">
              Comprehensive architectural guide & real-time telemetry dashboard built for advanced ROS2 and GPU simulation pipelines.
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="bg-slate-900 text-white text-[0.75rem] font-bold px-4 py-2 rounded-full">START READING &gt;</span>
              <span className="bg-slate-100 text-slate-900 text-[0.75rem] font-bold px-4 py-2 rounded-full">Explore Modules</span>
            </div>
            {/* Decorative blob inside card */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#A855F7]/10 rounded-full blur-3xl"></div>
          </div>

          {/* Right: Info */}
          <div className="flex-1">
            <span className="inline-block bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-[0.7rem] font-bold px-3 py-1 rounded-full tracking-widest mb-4">EDTECH • AI PLATFORM</span>
            <h3 className="font-heading text-3xl font-bold text-white mb-4 leading-tight">The Book of Tomorrow — Adaptive Educational Platform</h3>
            <p className="text-slate-400 leading-relaxed mb-8 font-body text-[1.05rem]">
              A next-generation educational platform for robotics engineering that adapts to every reader's skill level, offering one-click translations and interactive AI Q&A grounded in custom content.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                <h5 className="text-[#A855F7] text-[0.8rem] font-bold tracking-widest mb-2">CHALLENGE</h5>
                <p className="text-slate-300 text-sm leading-relaxed">Static content failing to match different reader skill levels, language barriers, and lack of real-time Q&A support.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                <h5 className="text-[#00F0FF] text-[0.8rem] font-bold tracking-widest mb-2">SOLUTION</h5>
                <p className="text-slate-300 text-sm leading-relaxed">Adaptive difficulty levels, instant multi-lingual translation, and a grounded RAG assistant engine.</p>
              </div>
            </div>

            <Link href="/services" className="inline-flex items-center gap-2 bg-[#A855F7] text-white font-bold text-sm tracking-widest px-6 py-3 rounded-full hover:bg-[#9333ea] transition-colors shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <FolderOpen size={16} /> View Full Case Study
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
