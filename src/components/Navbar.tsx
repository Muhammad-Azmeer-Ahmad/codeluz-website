"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setIsSearchOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-8 md:left-10 w-[calc(100%-2rem)] md:w-[calc(100%-2.5rem)] z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/85 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_1px_0_rgba(255,255,255,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="w-full px-6 lg:px-12 h-24 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group no-underline">
            <span className="text-white font-heading font-bold text-2xl tracking-wide">
              Codeluz
            </span>
          </Link>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-full px-2 py-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-1.5 rounded-full text-[0.83rem] font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? "text-black bg-[#D4AF37] shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/[0.06]"
            >
              <Search size={16} />
            </button>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#c9a430] text-black font-heading font-bold text-[0.78rem] tracking-widest uppercase px-5 py-2 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] transition-all duration-300"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-start justify-center pt-[15vh] px-5"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.97, y: -10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.97, y: -10, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[560px] bg-[#0d0e18] border border-white/[0.12] rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.08]">
                <Search size={16} className="text-slate-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search services, portfolio, or articles..."
                  className="flex-1 bg-transparent border-none outline-none text-white font-body text-[0.95rem] placeholder:text-slate-600"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="px-5 py-3">
                <p className="text-slate-600 text-[0.78rem] tracking-wide">Quick links</p>
                <div className="mt-2 flex flex-col">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.05] text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      <span className="text-slate-600">→</span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}