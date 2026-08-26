"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Smartphone, Sparkles } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Launch",
    priceUSD: "$80",
    pricePKR: "PKR 25,000",
    tagline: "For businesses that just need to get online.",
    features: [
      "1-page responsive website",
      "Contact form with email delivery",
      "WhatsApp click-to-chat button",
      "Google Maps integration",
      "Basic on-page SEO",
      "Speed-optimized build",
      "2 rounds of revisions",
    ],
  },
  {
    name: "Business",
    priceUSD: "$150",
    pricePKR: "PKR 45,000",
    tagline: "For businesses that need real lead capture.",
    features: [
      "5-page custom website",
      "Booking / appointment form",
      "Google Maps integration",
      "SEO-optimized structure",
      "Hosting setup included",
      "3 rounds of revisions",
      "Everything in Launch",
    ],
  },
  {
    name: "Enterprise",
    priceUSD: "$300",
    pricePKR: "PKR 85,000",
    tagline: "For businesses that run bookings & payments online.",
    features: [
      "10-page custom website",
      "Full booking system",
      "Admin dashboard",
      "Payment integration",
      "Hosting setup included",
      "5 rounds of revisions",
      "Everything in Business",
    ],
  },
];

import { useState } from "react";

export default function PricingPage() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  return (
    <div className="min-h-screen pt-32 pb-20 relative px-8 lg:px-12">
      <section className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[0.8rem] font-bold uppercase tracking-[0.18em] text-[#D4AF37] mb-3 block">
            PRICING
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-muted text-lg max-w-[700px] mx-auto font-body">
            Every project starts with a free consultation — no pressure, no surprise costs. These are our standard packages; custom projects are quoted individually.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, i) => {
            const isHighlighted = hoveredPlan === plan.name;
            return (
            <motion.div
              key={plan.name}
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className={`rounded-2xl p-8 flex flex-col transition-all duration-300 ${
                isHighlighted
                  ? "bg-card border-2 border-[#D4AF37] shadow-[0_0_40px_-10px_rgba(212,175,55,0.3)] scale-105 z-10"
                  : "bg-card-alt border border-border opacity-70 scale-100"
              }`}
            >
              {isHighlighted && (
                <span className="text-[0.7rem] font-bold uppercase tracking-widest text-[#D4AF37] mb-3">
                  Selected Plan
                </span>
              )}
              <h3 className="text-2xl font-heading font-bold text-foreground mb-1">{plan.name}</h3>
              <p className="text-muted text-sm mb-6 font-body">{plan.tagline}</p>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-heading font-extrabold text-foreground">{plan.priceUSD}</span>
                  <span className="text-muted text-sm">starting</span>
                </div>
                <div className="text-[#D4AF37] text-sm font-semibold mt-1">{plan.pricePKR} (approx.)</div>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-muted font-medium text-sm font-body">
                    <Check size={16} className="text-[#D4AF37] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?plan=${plan.name.toLowerCase()}`}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-heading font-bold text-sm tracking-widest uppercase transition-all ${
                  isHighlighted
                    ? "bg-[#D4AF37] hover:bg-[#c9a430] text-black shadow-[0_0_25px_rgba(212,175,55,0.35)]"
                    : "bg-border hover:bg-black/10 dark:hover:bg-white/20 text-foreground"
                }`}
              >
                Get Started <ArrowRight size={16} />
              </Link>
            </motion.div>
          )})}
        </div>

        {/* Custom Requirements + Mobile App Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border rounded-2xl p-8 flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-5">
              <Sparkles size={22} />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-3">
              Need Something Custom?
            </h3>
            <p className="text-muted text-sm leading-relaxed font-body mb-6 flex-1">
              Larger scope, unique features, or a project that doesn&apos;t fit neatly into a package? Tell us what you need and we&apos;ll put together a tailored quote — no obligation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[#D4AF37] font-semibold text-sm hover:underline"
            >
              Request a Custom Quote <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-8 flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-5">
              <Smartphone size={22} />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-3">
              Mobile Apps & Other Services
            </h3>
            <p className="text-muted text-sm leading-relaxed font-body mb-6 flex-1">
              Need a mobile app, automation, or something outside standard web development? Reach out and we&apos;ll discuss whether it&apos;s a fit and what it would take.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[#D4AF37] font-semibold text-sm hover:underline"
            >
              Tell Us What You Need <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        <p className="text-center text-muted/70 text-xs mt-10">
          PKR prices are approximate and may vary with exchange rates. Final pricing confirmed at consultation.
        </p>
      </section>
    </div>
  );
}