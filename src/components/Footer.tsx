"use client";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-12 md:pt-20 pb-10 px-6 md:px-12 mt-auto">

      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Col */}
        <div className="flex flex-col">
          <Link href="/" className="flex items-center gap-3 mb-4 no-underline">
            <span className="text-white font-heading font-bold text-2xl tracking-wide">
              Codeluz
            </span>
          </Link>
          <p className="text-slate-400 text-sm max-w-[320px] leading-relaxed">
            Custom-built, security-conscious websites designed to help your business look professional
            and make it easy for customers to reach you.
          </p>
        </div>
        {/* Navigation Col */}
        <div className="flex flex-col">
          <h4 className="text-white text-sm tracking-wider font-semibold mb-5">NAVIGATION</h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="/" className="text-slate-400 hover:text-[#00FF88] transition-colors text-sm">Home</Link></li>
            <li><Link href="/about" className="text-slate-400 hover:text-[#00FF88] transition-colors text-sm">About Us</Link></li>
            <li><Link href="/services" className="text-slate-400 hover:text-[#00FF88] transition-colors text-sm">Services</Link></li>
            <li><Link href="/pricing" className="text-slate-400 hover:text-[#00FF88] transition-colors text-sm">Pricing</Link></li>
            <li><Link href="/contact" className="text-slate-400 hover:text-[#00FF88] transition-colors text-sm">Contact Us</Link></li>
          </ul>
        </div>
        {/* Demos Col */}
        <div className="flex flex-col">
          <h4 className="text-white text-sm tracking-wider font-semibold mb-5">DEMOS</h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="/demo-clinic" className="text-slate-400 hover:text-[#00FF88] transition-colors text-sm">Clinic Website</Link></li>
            <li><Link href="/demo-gym" className="text-slate-400 hover:text-[#00FF88] transition-colors text-sm">Gym Website</Link></li>
          </ul>
        </div>
        {/* Contact Col */}
        <div className="flex flex-col">
          <h4 className="text-white text-sm tracking-wider font-semibold mb-5">CONTACT INFO</h4>
          <div className="flex flex-col gap-3 text-slate-400 text-sm">
            <div className="flex items-center gap-3"><MapPin size={16} className="text-[#00FF88]" /> Lahore, Pakistan</div>
            <div className="flex items-center gap-3"><Phone size={16} className="text-[#00FF88]" /> +92 327 4644729</div>
            <a href="mailto:contact@codeluz.com" className="flex items-center gap-3 hover:text-[#00FF88] transition-colors w-fit">
              <Mail size={16} className="text-[#00FF88]" /> contact@codeluz.com
            </a>
            <a href="https://www.facebook.com/CodeluzStudio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#00FF88] transition-colors w-fit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#00FF88]">
                <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.457h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
              </svg>
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto pt-7 border-t border-white/10 flex flex-wrap items-center justify-between gap-5 text-sm text-slate-400">
        <div>© {new Date().getFullYear()} Codeluz. All Rights Reserved.</div>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="hover:text-[#00FF88] transition-colors">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-[#00FF88] transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}