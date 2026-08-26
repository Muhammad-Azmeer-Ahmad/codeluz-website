"use client";

import { motion } from "framer-motion";

export function SideMarquee() {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-20 md:w-24 z-[60] pointer-events-none flex flex-col justify-start overflow-hidden bg-black/40 backdrop-blur-sm border-r border-white/10">
      
      <motion.div
        className="flex flex-col whitespace-nowrap h-full items-center"
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 8, // Faster running animation
        }}
      >
        <div className="flex flex-col gap-16 py-4 items-center">
          {/* Duplicate the text enough times to ensure seamless infinite looping */}
          {[...Array(10)].map((_, i) => (
            <span 
              key={i}
              className="text-2xl font-bold tracking-[0.6em] text-white uppercase" 
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              CODELUZ CAN BUILD WHAT YOU WANT • 
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
