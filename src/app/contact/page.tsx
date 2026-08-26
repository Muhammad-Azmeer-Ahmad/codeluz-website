"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Loader2, Send } from "lucide-react";
import { useState, useEffect } from "react";

const fieldVariants = {
  rest: { scale: 1 },
  focus: { scale: 1.01 },
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [selectedPlan, setSelectedPlan] = useState("custom");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    if (plan && ["launch", "business", "enterprise"].includes(plan.toLowerCase())) {
      setSelectedPlan(plan.toLowerCase());
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
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
    <div className="min-h-screen pt-32 pb-20 relative">
      <section className="px-8 lg:px-12 max-w-[1300px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-[0.8rem] font-bold uppercase tracking-[0.18em] text-[#A855F7] mb-3 block">GET IN TOUCH</span>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            Let's Talk About Your Website.
          </h1>
          <p className="text-muted text-lg max-w-[700px] mx-auto font-body">
            Tell us a bit about your business and what you need — we'll get back to you to book a quick call and figure out the best fit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12">

          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-10"
          >
            <div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-6">Reach Us Directly</h3>

              <div className="flex flex-col gap-6">
                {[
                  { icon: <Phone size={20} />, label: "WhatsApp", value: "+92 327 4644729", color: "#00F0FF" },
                  { icon: <Mail size={20} />, label: "Email", value: "contact@codeluz.com", color: "#A855F7" },
                  { icon: <MapPin size={20} />, label: "Based In", value: "Lahore, Pakistan", color: "#D4AF37" },
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 + idx * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${item.color}1A`,
                        border: `1px solid ${item.color}4D`,
                        color: item.color,
                      }}
                      whileHover={{ scale: 1.12, rotate: -6 }}
                      transition={{ type: "spring", stiffness: 320, damping: 14 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <strong className="block text-foreground font-heading tracking-wide">{item.label}</strong>
                      <span className="text-muted font-body">{item.value}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="bg-card border border-border rounded-2xl p-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ borderColor: "rgba(168,85,247,0.4)", boxShadow: "0 0 30px -10px rgba(168,85,247,0.35)" }}
            >
              <p className="text-muted text-sm font-body leading-relaxed">
                Prefer to talk it through first? Message us on WhatsApp or email and we'll set up a quick call — no pressure, just a conversation about what you need.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card border border-border rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            <motion.h3
              className="text-2xl font-heading font-bold text-foreground mb-8"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Book a Call
            </motion.h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div className="flex flex-col gap-2" variants={fieldVariants} whileFocus="focus" whileHover="focus" initial="rest">
                  <label className="text-muted text-sm font-semibold tracking-wide">Full Name</label>
                  <motion.input
                    type="text" name="name" required
                    whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(168,85,247,0.25)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-background border border-border text-foreground rounded-lg px-5 py-3.5 focus:outline-none focus:border-[#A855F7] transition-colors"
                    placeholder="Enter your full name"
                  />
                </motion.div>
                <motion.div className="flex flex-col gap-2">
                  <label className="text-muted text-sm font-semibold tracking-wide">Email Address</label>
                  <motion.input
                    type="email" name="email" required
                    whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(168,85,247,0.25)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-background border border-border text-foreground rounded-lg px-5 py-3.5 focus:outline-none focus:border-[#A855F7] transition-colors"
                    placeholder="name@company.com"
                  />
                </motion.div>
                <motion.div className="flex flex-col gap-2">
                  <label className="text-muted text-sm font-semibold tracking-wide">Phone / WhatsApp</label>
                  <motion.input
                    type="tel" name="phone" required
                    pattern="^\+?[0-9\s\-\(\)]{7,20}$"
                    title="Enter a valid phone number"
                    whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(168,85,247,0.25)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-background border border-border text-foreground rounded-lg px-5 py-3.5 focus:outline-none focus:border-[#A855F7] transition-colors"
                    placeholder="+92 300 1234567"
                  />
                </motion.div>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label className="text-muted text-sm font-semibold tracking-wide flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  Selected Plan
                </label>
                <div className="relative">
                  <motion.select
                    name="plan" required
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(212,175,55,0.25)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full bg-background hover:bg-black/5 dark:hover:bg-white/[0.05] border border-border text-foreground rounded-lg px-5 py-4 focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none cursor-pointer text-base"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23D4AF37'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1.2rem center",
                      backgroundSize: "1.2rem",
                    }}
                  >
                    <option value="custom" className="bg-card">Custom / Not Sure</option>
                    <option value="launch" className="bg-card">Launch ($80)</option>
                    <option value="business" className="bg-card">Business ($150)</option>
                    <option value="enterprise" className="bg-card">Enterprise ($300)</option>
                  </motion.select>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label className="text-muted text-sm font-semibold tracking-wide flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#A855F7]" />
                  What Do You Need?
                </label>
                <div className="relative">
                  <motion.select
                    name="serviceType" required
                    whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(168,85,247,0.25)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full bg-background hover:bg-black/5 dark:hover:bg-white/[0.05] border border-border text-foreground rounded-lg px-5 py-4 focus:outline-none focus:border-[#A855F7] transition-colors appearance-none cursor-pointer text-base"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23A855F7'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1.2rem center",
                      backgroundSize: "1.2rem",
                    }}
                  >
                    <option value="landing" className="bg-card">Landing Page</option>
                    <option value="business" className="bg-card">Business Website</option>
                    <option value="booking" className="bg-card">Booking-Enabled Website</option>
                    <option value="speed" className="bg-card">Speed Optimization</option>
                    <option value="not-sure" className="bg-card">Not Sure Yet</option>
                  </motion.select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-muted text-sm font-semibold tracking-wide">Tell Us About Your Business</label>
                <motion.textarea
                  name="details" required rows={4}
                  whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(168,85,247,0.25)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-background border border-border text-foreground rounded-lg px-5 py-3.5 focus:outline-none focus:border-[#A855F7] transition-colors resize-none"
                  placeholder="What does your business do, and what do you need help with?"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(168,85,247,0.5)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="bg-gradient-to-r from-[#A855F7] to-[#ec4899] text-white font-heading font-bold tracking-widest text-sm uppercase px-8 py-4 rounded-full mt-4 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> SENDING...</> : <><Send size={18} /> BOOK A CALL</>}
              </motion.button>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#00FF88] text-center mt-2 font-semibold text-sm"
                >
                  Thanks! We'll reach out to schedule a call soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#FF2A5F] text-center mt-2 font-semibold text-sm"
                >
                  Something went wrong. Please try again or message us on WhatsApp.
                </motion.p>
              )}
            </form>
          </motion.div>

        </div>
      </section>
    </div>
  );
}