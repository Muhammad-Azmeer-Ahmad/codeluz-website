"use client";

import { motion } from "framer-motion";
import { ArrowRight, Loader2, Code2, ShoppingBag, Layout, Cpu, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const PROJECT_TYPES = [
  { id: "corporate", label: "Corporate Website", icon: Layout },
  { id: "ecommerce", label: "E-Commerce Store", icon: ShoppingBag },
  { id: "portfolio", label: "Creative Portfolio", icon: Code2 },
  { id: "custom", label: "Custom App / SaaS", icon: Cpu },
];

export function BudgetEstimator() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [selectedType, setSelectedType] = useState("corporate");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    formData.set("projectType", selectedType);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#0D0E15] py-[120px] px-6 md:px-12 relative border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F0FF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[900px] mx-auto text-center mb-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[0.8rem] font-bold uppercase tracking-[0.25em] text-[#D4AF37] mb-3 inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20">
            START YOUR PROJECT
          </span>
          <h2 className="font-heading text-4xl md:text-[3rem] font-extrabold text-white mb-4 tracking-tight">
            Tell Us Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#00A3FF]">Requirements</span>
          </h2>
          <p className="text-slate-400 text-[1.1rem] leading-[1.8] max-w-[700px] mx-auto font-body">
            Planning a new digital product or site rebuild? Select your project scope below so our team can analyze your specifications and build a tailored technical plan.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-[#13141F]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 max-w-[900px] mx-auto shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] relative z-10"
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label className="text-slate-300 text-sm font-semibold tracking-wide block mb-4">
              Select Project Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PROJECT_TYPES.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 relative group ${
                      isSelected
                        ? "bg-[#00F0FF]/10 border-[#00F0FF] text-white shadow-[0_0_20px_rgba(0,240,255,0.2)] scale-[1.02]"
                        : "bg-black/30 border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <Icon className={`w-7 h-7 mb-3 transition-transform duration-300 group-hover:scale-110 ${isSelected ? "text-[#00F0FF]" : "text-slate-400"}`} />
                    <span className="text-xs font-bold tracking-wider uppercase text-center">{type.label}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-[#00F0FF] absolute top-2 right-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Full Name</label>
              <input
                name="name"
                type="text"
                className="bg-black/40 border border-white/10 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all duration-300"
                placeholder="e.g. John Doe"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Work Email</label>
              <input
                name="email"
                type="email"
                className="bg-black/40 border border-white/10 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all duration-300"
                placeholder="name@company.com"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">Phone Number</label>
              <input
                name="phone"
                type="tel"
                className="bg-black/40 border border-white/10 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all duration-300"
                placeholder="+1 234 567 8900"
                required
                pattern="^\+?[0-9\s\-\(\)]{7,20}$"
                title="Enter a valid phone number"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <label className="text-slate-400 text-xs font-bold uppercase tracking-wider">
              Project Requirements & Key Features
            </label>
            <textarea
              name="details"
              rows={4}
              className="bg-black/40 border border-white/10 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all duration-300 resize-none"
              placeholder="Tell us about desired features, target audience, timeline preferences, or link to reference websites..."
              required
            ></textarea>
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-3 bg-[#D4AF37] hover:bg-[#c9a430] text-black font-heading font-extrabold text-sm tracking-widest uppercase px-10 py-4 rounded-full shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all duration-300 w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> SUBMITTING...
                </>
              ) : (
                <>
                  SUBMIT REQUIREMENTS <ArrowRight size={18} />
                </>
              )}
            </motion.button>

            {status === "success" && (
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[#00FF88] mt-5 font-semibold text-sm">
                Requirements received! Our team will review your scope and get in touch within 24 hours.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[#00FF88] mt-5 font-semibold text-sm">
                Something went wrong submitting your request. Please try againor contact us directly.
              </motion.p>
            )}
          </div>
        </form>
      </motion.div>
    </section>
  );
}