"use client";

import Link from "next/link";
import { Search, X, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

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
  const [hidden, setHidden] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    if (latest > 100 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    setScrolled(latest > 30);
  });

  // Close modals on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { 
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen, isSearchOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-20 md:left-24 w-[calc(100%-5rem)] md:w-[calc(100%-6rem)] z-50 transition-colors duration-500 ${
          scrolled || isMobileMenuOpen
            ? "bg-black/85 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_1px_0_rgba(255,255,255,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="w-full px-6 lg:px-12 h-24 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group no-underline z-50">
            <span className="text-white font-heading font-bold text-2xl tracking-wide">
              Codeluz
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav 
            className="hidden lg:flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-full px-2 py-1.5"
            onMouseLeave={() => setHoveredPath(null)}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isHovered = hoveredPath === link.href;
              
              // The text should be bright white when hovered or active
              const isHighlighted = isHovered || (isActive && hoveredPath === null);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  className={`relative px-4 py-1.5 rounded-full text-[0.83rem] font-medium tracking-wide transition-colors duration-200 z-10 ${
                    isHighlighted ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  {(isActive || isHovered) && (
                    <motion.div
                      layoutId="nav-pill"
                      className={`absolute inset-0 rounded-full z-[-1] border border-white/10 ${
                        isHovered ? "bg-white/[0.12]" : "bg-white/[0.08]"
                      }`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-3 z-50">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/[0.06]"
            >
              <Search size={18} />
            </button>
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#c9a430] text-black font-heading font-bold text-[0.78rem] tracking-widest uppercase px-6 py-2.5 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Get a Quote
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/[0.06]"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 left-20 md:left-24 w-[calc(100%-5rem)] md:w-[calc(100%-6rem)] bg-black/95 backdrop-blur-3xl z-40 pt-28 px-6 pb-6 flex flex-col"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={`block text-2xl font-heading font-bold ${
                        isActive ? "text-[#D4AF37]" : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-1.5 bg-[#D4AF37] text-black font-heading font-bold text-sm tracking-widest uppercase px-6 py-4 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.25)]"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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