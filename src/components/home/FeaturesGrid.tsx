"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  CalendarCheck,
  HeadphonesIcon,
  LayoutTemplate,
} from "lucide-react";

const features = [
  {
    icon: <LayoutTemplate size={20} />,
    title: "Custom-Built Websites",
    desc: "Every website is designed around your business, giving you a professional online presence without relying on a generic template.",
    color: "#D4AF37",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Security-Conscious",
    desc: "Security is considered throughout the development process, helping protect your website and giving your customers a safer experience.",
    color: "#10b981",
  },
  {
    icon: <CalendarCheck size={20} />,
    title: "Business-Ready Functionality",
    desc: "From appointment bookings to contact forms, we build useful features that support the way your business actually operates.",
    color: "#f59e0b",
  },
  {
    icon: <HeadphonesIcon size={20} />,
    title: "Direct Support",
    desc: "You work directly with the people building your website, with help available for updates, improvements, and ongoing needs.",
    color: "#00c2ff",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [
        number,
        number,
        number,
        number
      ],
    },
  }),
};

export function FeaturesGrid() {
  return (
    <section className="bg-card py-20 md:py-32 px-6 relative">


      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[#D4AF37] text-[0.75rem] font-bold tracking-[0.2em] uppercase mb-4">
            Why Work With Us
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-4xl md:text-[2.75rem] font-bold text-foreground leading-tight tracking-tight max-w-[520px]">
              Built around your{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #D4AF37, #f5d87a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                business
              </span>
            </h2>

            <p className="text-muted text-[1rem] leading-relaxed max-w-[360px] md:text-right font-body">
              We create practical websites that look professional, work
              properly, and make it easier for customers to connect with your
              business.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {features.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="bg-card p-8 group cursor-default transition-colors hover:bg-black/5 dark:hover:bg-white/[0.03]"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 transition-transform duration-300 group-hover:-translate-y-0.5"
                style={{
                  backgroundColor: `${item.color}15`,
                  color: item.color,
                  border: `1px solid ${item.color}30`,
                }}
              >
                {item.icon}
              </div>

              <h4 className="text-foreground font-heading font-semibold text-[1.05rem] mb-2.5">
                {item.title}
              </h4>

              <p className="text-muted text-[0.9rem] leading-relaxed font-body">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}