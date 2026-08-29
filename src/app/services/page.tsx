"use client";

import { motion } from "framer-motion";
import { Layout, Calendar, Globe, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const services = [
  {
    id: "landing",
    icon: <Layout size={26} />,
    title: "Landing Page",
    desc: "A focused single-page website built to introduce your business and turn visitors into inquiries — fast to launch, clean to look at.",
    color: "#00F0FF",
    highlights: [
      "New businesses, quick launches",
      "Contact form built in",
      "Mobile-friendly layout",
    ]
  },
  {
    id: "business",
    icon: <Globe size={26} />,
    title: "Business Website",
    desc: "A complete multi-page website covering everything customers need to know — who you are, what you offer, and how to reach you.",
    color: "#D4AF37",
    highlights: [
      "Full multi-page presence",
      "Home, About, Services, Contact",
      "Built to grow with your business",
    ]
  },
  {
    id: "booking",
    icon: <Calendar size={26} />,
    title: "Booking-Enabled Website",
    desc: "Everything in a business website, plus a built-in appointment or booking system — so customers can book directly, no back-and-forth needed.",
    color: "#A855F7",
    highlights: [
      "Ideal for clinics, salons, gyms",
      "Appointment form built in",
      "Simple booking management",
    ]
  },
  {
    id: "speed",
    icon: <Zap size={26} />,
    title: "Speed Optimization",
    desc: "Already have a website that loads slow or feels clunky? We audit and fix it so it loads faster and keeps visitors from leaving early.",
    color: "#00FF88",
    highlights: [
      "Full speed audit",
      "Real performance fixes",
      "Before/after comparison",
    ]
  },
];

export default function ServicesPage() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <section className="px-8 lg:px-12 max-w-[1300px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[0.8rem] font-bold uppercase tracking-[0.18em] text-[#00F0FF] mb-3 block">
            WHAT WE DELIVER
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            What We Can Do for You.
          </h1>
          <p className="text-muted text-lg max-w-[700px] mx-auto font-body">
            Practical websites built around what your business actually needs — no templates, no unnecessary extras.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHovered(service.id)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ y: -8 }}
              className="relative bg-card border border-border rounded-2xl overflow-hidden flex flex-col h-full group cursor-default"
              style={{
                boxShadow: hovered === service.id ? `0 20px 60px -20px ${service.color}55` : "none",
                borderColor: hovered === service.id ? `${service.color}66` : undefined,
                transition: "box-shadow 0.35s ease, border-color 0.35s ease",
              }}
            >
              {/* Animated glow blob on hover */}
              <motion.div
                aria-hidden
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: service.color }}
                animate={{ opacity: hovered === service.id ? 0.25 : 0 }}
                transition={{ duration: 0.4 }}
              />

              {/* Top accent line that fills on hover */}
              <div className="h-[3px] w-full bg-black/5 dark:bg-white/5 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{ backgroundColor: service.color }}
                  initial={{ width: "0%" }}
                  animate={{ width: hovered === service.id ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>

              <div className="p-7 flex-1 relative z-10">
                <motion.div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg mb-6"
                  style={{
                    backgroundColor: `${service.color}1A`,
                    color: service.color,
                    border: `1px solid ${service.color}33`,
                  }}
                  animate={{
                    scale: hovered === service.id ? 1.1 : 1,
                    rotate: hovered === service.id ? -6 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {service.icon}
                </motion.div>

                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted leading-relaxed font-body text-[0.9rem] mb-5">
                  {service.desc}
                </p>

                {/* Highlights list — reveals with stagger on hover */}
                <ul className="space-y-2">
                  {service.highlights.map((h, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-2 text-[0.82rem] text-muted"
                      initial={{ opacity: 0.6, x: 0 }}
                      animate={{
                        opacity: hovered === service.id ? 1 : 0.6,
                        x: hovered === service.id ? 2 : 0,
                      }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                      <CheckCircle2
                        size={15}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: service.color }}
                      />
                      <span>{h}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Bottom CTA row */}
              <div className="border-t border-border p-5 relative z-10">
                <Link
                  href="/contact"
                  className="flex items-center justify-between text-sm font-bold tracking-wide text-muted group-hover:text-foreground transition-colors"
                >
                  Get a Quote
                  <motion.span
                    animate={{ x: hovered === service.id ? 4 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ color: service.color }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 text-center"
        >
          <Link href="/contact" className="btn-gold-pill inline-flex">
            Get a Quote <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}