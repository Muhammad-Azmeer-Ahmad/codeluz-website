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
    href: "/demo-clinic",
    previewUrl: "/demo-healthcare/index.html",
  },
  {
    id: "gym",
    title: "Gym Website",
    desc: "A gym website with class schedules, trainer bios, and membership tiers — built to get visitors to join.",
    icon: <Dumbbell size={26} />,
    color: "#D4AF37",
    href: "/demo-gym",
    previewUrl: "/demo-gym/index.html",
  },
  {
    id: "salon",
    title: "Salon Website",
    desc: "An elegant spa and salon website with a beautiful service menu and integrated booking platform.",
    icon: <Scissors size={26} />,
    color: "#C084FC",
    href: "/demo-salon", // This one doesn't exist yet, so we'll keep the Next.js placeholder route
    previewUrl: "",
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
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            See What We Build
          </h1>
          <p className="text-muted text-lg max-w-[700px] mx-auto font-body">
            These are demo websites built to show what a real project could look like for your business.
            Explore one that fits your industry.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-[1100px] mx-auto">
          {demos.map((demo, i) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="group relative"
            >
              <Link href={demo.href} className="block h-full">
                <div className="bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col shadow-lg transition-all duration-300 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group-hover:border-white/20">
                  <div className="relative aspect-[16/10] bg-muted/10 border-b border-border overflow-hidden">
                    {/* Live Preview Iframe */}
                    {demo.previewUrl ? (
                      <div className="absolute inset-0 w-full h-full">
                        {/* We make the iframe 4x larger and scale it down to 25% so it renders as a desktop thumbnail */}
                        <iframe
                          src={demo.previewUrl}
                          className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none border-0"
                          tabIndex={-1}
                          aria-hidden="true"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-muted/50 gap-4">
                        <div className="p-4 rounded-full bg-background/50 border border-border">
                          {demo.icon}
                        </div>
                        <span className="font-heading text-sm uppercase tracking-widest font-semibold">Coming Soon</span>
                      </div>
                    )}
                    {/* Glass Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <div
                        className="px-6 py-3 rounded-full text-black font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2"
                        style={{ backgroundColor: demo.color }}
                      >
                        View Demo Site <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${demo.color}1A`,
                          color: demo.color,
                          border: `1px solid ${demo.color}33`,
                        }}
                      >
                        {demo.icon}
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-foreground">
                        {demo.title}
                      </h3>
                    </div>
                    <p className="text-muted leading-relaxed font-body text-[0.95rem] flex-1">
                      {demo.desc}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-muted text-sm">
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