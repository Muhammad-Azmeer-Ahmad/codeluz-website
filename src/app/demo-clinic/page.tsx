"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Monitor, Smartphone } from "lucide-react";
import { useState } from "react";

export default function DemoClinicPage() {
  const [view, setView] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Clinic Website <span className="text-[#00F0FF]">Demo</span>
            </h1>
            <p className="text-muted max-w-xl font-body text-lg">
              Preview our booking-ready medical clinic template. Designed for trust and ease of use with integrated service and appointment sections.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center bg-card border border-border rounded-lg p-1">
              <button
                onClick={() => setView("desktop")}
                className={`p-2 rounded-md transition-colors ${view === "desktop" ? "bg-[#00F0FF]/20 text-[#00F0FF]" : "text-muted hover:text-foreground"}`}
                title="Desktop View"
              >
                <Monitor size={20} />
              </button>
              <button
                onClick={() => setView("mobile")}
                className={`p-2 rounded-md transition-colors ${view === "mobile" ? "bg-[#00F0FF]/20 text-[#00F0FF]" : "text-muted hover:text-foreground"}`}
                title="Mobile View"
              >
                <Smartphone size={20} />
              </button>
            </div>
            <a
              href="/demo-healthcare/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#00F0FF] hover:bg-[#00F0FF]/90 text-black font-semibold py-3 px-6 rounded-lg transition-all hover:-translate-y-1"
            >
              View Full Site <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mx-auto transition-all duration-500 ease-in-out ${view === "mobile" ? "max-w-[375px]" : "max-w-full"}`}
        >
          <div className="bg-card border border-border rounded-t-xl p-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <div className="mx-auto bg-background/50 text-muted text-xs py-1 px-4 rounded-full border border-border flex-1 max-w-sm text-center truncate">
              clinic-demo.codeluz.com
            </div>
          </div>
          <div className={`bg-background border-x border-b border-border rounded-b-xl overflow-hidden shadow-2xl relative ${view === "mobile" ? "h-[800px]" : "h-[70vh] min-h-[600px]"}`}>
            <iframe
              src="/demo-healthcare/index.html"
              className="w-full h-full border-none"
              title="Clinic Demo Website"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
