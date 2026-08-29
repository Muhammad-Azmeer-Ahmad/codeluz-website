"use client";

import Link from "next/link";
import { Search, X, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

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
  const [heroHeight, setHeroHeight] = useState(500);

  useEffect(() => {
    setHeroHeight(window.innerHeight * 0.9);
    const handleResize = () => setHeroHeight(window.innerHeight * 0.9);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    if (latest > previous + 10 && latest > 150) {
      setHidden(true);
    } else if (latest < previous - 10) {
      setHidden(false);
    } else if (latest <= 150) {
      setHidden(false);
    }
    
    if (pathname === "/") {
      setScrolled(latest > heroHeight);
    } else {
      setScrolled(latest > 30);
    }
  });

  useEffect(() => {
    if (pathname === "/") {
      setScrolled(window.scrollY > heroHeight);
    } else {
      setScrolled(window.scrollY > 30);
    }
  }, [pathname, heroHeight]);

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Remove isLightMode false as we will use tailwind dark mode classes
  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-10 md:left-24 w-[calc(100%_-_2.5rem)] md:w-[calc(100%_-_6rem)] z-50 transition-all duration-300 ${
          scrolled || isMobileMenuOpen
            ? "bg-white border-b border-black/10 shadow-md dark:bg-[#050B14] dark:border-white/5"
            : "bg-white border-b border-transparent dark:bg-[#050B14] dark:border-transparent"
        }`}
      >
        <div className="w-full px-6 lg:px-12 h-24 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-1 flex items-center justify-start">
            <Link href="/" className="flex items-center gap-2.5 group no-underline z-50">
              <span className="text-black dark:text-foreground font-heading font-bold text-2xl tracking-wide">
                Codeluz
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav 
            className="hidden lg:flex items-center gap-1 border rounded-full px-2 py-1.5 bg-black/5 border-black/10 dark:bg-white/[0.04] dark:border-border"
            onMouseLeave={() => setHoveredPath(null)}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isHovered = hoveredPath === link.href;
              
              // The text should be bright when hovered or active
              const isHighlighted = isHovered || (isActive && hoveredPath === null);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  className={`relative px-4 py-1.5 rounded-full text-[0.83rem] font-medium tracking-wide transition-colors duration-200 z-10 ${
                    isHighlighted
                      ? "text-black dark:text-foreground"
                      : "text-black/60 hover:text-black dark:text-muted dark:hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {(isActive || isHovered) && (
                    <motion.div
                      layoutId="nav-pill"
                      className={`absolute inset-0 rounded-full z-[-1] border ${
                        isHovered 
                          ? "bg-black/10 border-black/10 dark:bg-white/[0.12] dark:border-border" 
                          : "bg-black/5 border-transparent dark:bg-white/[0.08] dark:border-border"
                      }`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-3 z-50">
            <div className="dark:opacity-100 opacity-70 hover:opacity-100 transition-opacity">
              <ThemeToggle />
            </div>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 flex items-center justify-center transition-colors rounded-full text-black/70 hover:text-black hover:bg-black/10 dark:text-muted dark:hover:text-foreground dark:hover:bg-white/[0.06]"
            >
              <Search size={18} />
            </button>
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-1.5 font-heading font-bold text-[0.78rem] tracking-widest uppercase px-6 py-2.5 rounded-full transition-all duration-300 bg-black text-white hover:bg-black/80 shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 dark:bg-white dark:text-black dark:hover:bg-slate-100 dark:shadow-[0_0_20px_rgba(255,255,255,0.15)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              Get a Quote
            </Link>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center transition-colors rounded-full text-black/70 hover:text-black hover:bg-black/10 dark:text-muted dark:hover:text-foreground dark:hover:bg-white/[0.06]"
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
            className="fixed inset-0 top-0 left-10 md:left-24 w-[calc(100%_-_2.5rem)] md:w-[calc(100%_-_6rem)] bg-background/95 backdrop-blur-3xl z-40 pt-28 px-6 pb-6 flex flex-col"
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
                        isActive ? "text-[#D4AF37]" : "text-muted hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="mt-auto pt-8 border-t border-border flex flex-col gap-4">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-1.5 bg-black text-white hover:bg-black/80 dark:bg-white dark:hover:bg-slate-100 dark:text-black font-heading font-bold text-sm tracking-widest uppercase px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.15)] dark:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all"
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
              className="w-full max-w-[560px] bg-card border border-border rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <Search size={16} className="text-muted flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search services, portfolio, or articles..."
                  className="flex-1 bg-transparent border-none outline-none text-foreground font-body text-[0.95rem] placeholder:text-muted"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="px-5 py-3">
                <p className="text-muted text-[0.78rem] tracking-wide">Quick links</p>
                <div className="mt-2 flex flex-col">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/[0.05] text-muted hover:text-foreground transition-colors text-sm"
                    >
                      <span className="text-muted/60">→</span>
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