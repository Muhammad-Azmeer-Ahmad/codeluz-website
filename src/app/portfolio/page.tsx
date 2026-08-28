"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Stethoscope, Dumbbell, Scissors } from "lucide-react";
import Link from "next/link";

const demos = [
  {
    id: "clinic",
    title: "Clinic Website",
    desc: "A booking-ready website for a medical clinic — services, doctor bios, and an appointment form built in.",
    icon: <Stethoscope size={26} />,
    color: "#00F0FF",
    href: "/demo-healthcare/index.html",
  },
  {
    id: "gym",
    title: "Gym Website",
    desc: "A gym website with class schedules, trainer bios, and membership tiers — built to get visitors to join.",
    icon: <Dumbbell size={26} />,
    color: "#D4AF37",
    href: "/demo-gym/index.html",
  },
  {
    id: "salon",
    title: "Salon Website",
    desc: "An elegant spa and salon website with a beautiful service menu and integrated booking platform.",
    icon: <Scissors size={26} />,
    color: "#C084FC",
    href: "/demo-salon", // This one doesn't exist yet, so we'll keep the Next.js placeholder route
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 relative">
      <section className="px-8 lg:px-12 max-w-[1300px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[0.8rem] font-bold uppercase tracking-[0.18em] text-[#D4AF37] mb-3 block">
            PORTFOLIO
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-6">
            See What We Build
          </h1>
          <p className="text-slate-400 text-lg max-w-[700px] mx-auto font-body">
            These are demo websites built to show what a real project could look like for your business.
            Explore one that fits your industry.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mx-auto">
          {demos.map((demo, i) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="bg-[#0c0e14] border border-white/10 rounded-2xl overflow-hidden group"
            >
              <a href={demo.href} className="block p-8">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    backgroundColor: `${demo.color}1A`,
                    color: demo.color,
                    border: `1px solid ${demo.color}33`,
                  }}
                >
                  {demo.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3 flex items-center gap-2">
                  {demo.title}
                  <ArrowUpRight
                    size={18}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: demo.color }}
                  />
                </h3>
                <p className="text-slate-400 leading-relaxed font-body text-[0.9rem]">
                  {demo.desc}
                </p>
              </a>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm">
            Want something built for your specific business?{" "}
            <Link href="/contact" className="text-[#D4AF37] hover:underline">
              Let&apos;s talk
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}