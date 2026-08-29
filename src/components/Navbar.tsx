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

  // 1. Handle Scroll Logic (Hide on scroll down, Crystal effect on scroll)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Header Visibility logic
    if (latest > previous + 10 && latest > 150) {
      setHidden(true);
    } else if (latest < previous - 10 || latest <= 150) {
      setHidden(false);
    }

    // Crystal Background threshold logic
    const threshold = pathname === "/" ? 50 : 20;
    if (latest > threshold && !scrolled) {
      setScrolled(true);
    } else if (latest <= threshold && scrolled) {
      setScrolled(false);
    }
  });

  // 2. Sync state on route changes
  useEffect(() => {
    // Reset states on navigation
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setHidden(false);

    // Check initial scroll position on new page
    const currentScroll = scrollY.get();
    const threshold = pathname === "/" ? 50 : 20;
    setScrolled(currentScroll > threshold);
  }, [pathname, scrollY]);

  // 3. Keyboard and Body Scroll Lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 md:px-10 pointer-events-none"
      >
        <div
          className={`
            w-full max-w-7xl h-20 px-6 md:px-10 flex items-center justify-between rounded-full 
            transition-all duration-500 pointer-events-auto
            ${
              scrolled || isMobileMenuOpen
                ? "bg-white/10 dark:bg-white/[0.03] backdrop-blur-2xl backdrop-saturate-[1.8] border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
                : "bg-transparent border border-transparent"
            }
          `}
        >
          {/* Logo */}
          <div className="flex-1 flex items-center justify-start">
            <Link href="/" className="flex items-center gap-2.5 group no-underline">
              <span className="text-black dark:text-white font-heading font-bold text-2xl tracking-tight">
                Codeluz<span className="text-blue-500">.</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav - Crystal Pill */}
          <nav
            className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-white/5 dark:bg-black/20 border border-white/10 backdrop-blur-md"
            onMouseLeave={() => setHoveredPath(null)}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isHovered = hoveredPath === link.href;
              const isHighlighted = isHovered || (isActive && hoveredPath === null);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  className={`relative px-5 py-2 rounded-full text-[0.85rem] font-medium transition-colors duration-300 z-10 ${
                    isHighlighted
                      ? "text-black dark:text-white"
                      : "text-black/50 dark:text-white/40 hover:text-black/80 dark:hover:text-white/80"
                  }`}
                >
                  {link.label}
                  {isHighlighted && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full z-[-1] bg-white/40 dark:bg-white/10 shadow-sm border border-white/20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 flex items-center justify-center transition-all rounded-full text-black/60 dark:text-white/60 hover:bg-white/20 hover:text-black dark:hover:text-white border border-transparent hover:border-white/20"
            >
              <Search size={18} />
            </button>

            <Link
              href="/contact"
              className="hidden md:inline-flex items-center font-heading font-bold text-[0.7rem] tracking-widest uppercase px-7 py-3 rounded-full transition-all duration-300 bg-black text-white hover:scale-105 dark:bg-white dark:text-black shadow-xl"
            >
              Get a Quote
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-black/60 dark:text-white/60 hover:bg-white/20"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu - Full Screen Crystal Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/40 dark:bg-black/60 backdrop-blur-[40px] z-40 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`text-4xl font-heading font-bold ${
                      pathname === link.href ? "text-blue-500" : "text-black/80 dark:text-white/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal - Crystal Card */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[100] flex items-start justify-center pt-[15vh] px-5"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[560px] bg-white/10 dark:bg-black/20 border border-white/20 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl"
            >
              <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
                <Search size={20} className="text-white/50" />
                <input
                  type="text"
                  placeholder="Search everything..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-white/30"
                  autoFocus
                />
                <button onClick={() => setIsSearchOpen(false)}>
                  <X size={20} className="text-white/50 hover:text-white" />
                </button>
              </div>
              <div className="p-6">
                <p className="text-white/40 text-[0.7rem] uppercase tracking-widest mb-4">
                  Quick Navigation
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsSearchOpen(false)}
                      className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white/70 transition-all text-sm"
                    >
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