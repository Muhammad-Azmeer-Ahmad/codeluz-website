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
    highlight: false,
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
    highlight: true,
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
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#050608] px-8 lg:px-12">
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
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-slate-400 text-lg max-w-[700px] mx-auto font-body">
            Every project starts with a free consultation — no pressure, no surprise costs. These are our standard packages; custom projects are quoted individually.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className={`rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? "bg-[#13141F] border-2 border-[#D4AF37] shadow-[0_0_40px_-10px_rgba(212,175,55,0.3)]"
                  : "bg-[#0c0e14] border border-white/10"
              }`}
            >
              {plan.highlight && (
                <span className="text-[0.7rem] font-bold uppercase tracking-widest text-[#D4AF37] mb-3">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-heading font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-6 font-body">{plan.tagline}</p>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-heading font-extrabold text-white">{plan.priceUSD}</span>
                  <span className="text-slate-400 text-sm">starting</span>
                </div>
                <div className="text-[#D4AF37] text-sm font-semibold mt-1">{plan.pricePKR} (approx.)</div>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-slate-300 text-sm font-body">
                    <Check size={16} className="text-[#D4AF37] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-heading font-bold text-sm tracking-widest uppercase transition-all ${
                  plan.highlight
                    ? "bg-[#D4AF37] hover:bg-[#c9a430] text-black shadow-[0_0_25px_rgba(212,175,55,0.35)]"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                Get Started <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Custom Requirements + Mobile App Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="bg-[#0c0e14] border border-white/10 rounded-2xl p-8 flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-5">
              <Sparkles size={22} />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-3">
              Need Something Custom?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed font-body mb-6 flex-1">
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
            className="bg-[#0c0e14] border border-white/10 rounded-2xl p-8 flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-5">
              <Smartphone size={22} />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-3">
              Mobile Apps & Other Services
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed font-body mb-6 flex-1">
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

        <p className="text-center text-slate-600 text-xs mt-10">
          PKR prices are approximate and may vary with exchange rates. Final pricing confirmed at consultation.
        </p>
      </section>
    </div>
  );
}