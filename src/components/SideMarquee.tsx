"use client";

import { motion } from "framer-motion";

export function SideMarquee() {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-8 md:w-10 z-[60] pointer-events-none flex flex-col justify-start overflow-hidden mix-blend-difference">
      {/* 
        A subtle border to separate it from the content. 
        mix-blend-difference makes it highly visible on both dark and light backgrounds without needing a solid background color.
      */}
      <div className="absolute inset-y-0 right-0 w-[1px] bg-white/20" />
      
      <motion.div
        className="flex flex-col whitespace-nowrap"
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 15,
        }}
      >
        <div className="flex flex-col gap-8 py-4">
          <span 
            className="text-[0.65rem] font-bold tracking-[0.3em] text-white uppercase" 
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            CODELUZ CAN BUILD WHAT YOU WANT • CODELUZ CAN BUILD WHAT YOU WANT • CODELUZ CAN BUILD WHAT YOU WANT • CODELUZ CAN BUILD WHAT YOU WANT • 
          </span>
          <span 
            className="text-[0.65rem] font-bold tracking-[0.3em] text-white uppercase" 
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            CODELUZ CAN BUILD WHAT YOU WANT • CODELUZ CAN BUILD WHAT YOU WANT • CODELUZ CAN BUILD WHAT YOU WANT • CODELUZ CAN BUILD WHAT YOU WANT • 
          </span>
        </div>
      </motion.div>
    </div>
  );
}
