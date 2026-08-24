"use client";
import Link from "next/link";
import { MapPin, Phone, Mail, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer id="our-story" className="bg-black border-t border-white/10 pt-20 pb-10 px-12 mt-auto">

      {/* Our Story Section */}
      <div className="max-w-[900px] mx-auto mb-20 text-center">
        <span className="text-[0.8rem] font-bold uppercase tracking-[0.18em] text-[#00FF88] mb-3 block">OUR STORY</span>
        <h3 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-6">
          Why We Started Codeluz
        </h3>
        <p className="text-slate-400 text-[1.05rem] leading-relaxed max-w-[720px] mx-auto">
          Codeluz started with a simple observation: most small businesses either have no website at all,
          or one that was thrown together from a template and never touched again. We wanted to do it
          differently — build every site by hand, with real attention to how it actually gets used.
        </p>
        <p className="text-slate-400 text-[1.05rem] leading-relaxed max-w-[720px] mx-auto mt-4">
          Our background isn&apos;t just design — it&apos;s hands-on software development and security research,
          including ongoing work in penetration testing and studying how systems actually get attacked
          so we can build sites that hold up. That same care carries into every project: code written
          properly, checked carefully, and built to last past launch day.
        </p>
        <p className="text-slate-400 text-[1.05rem] leading-relaxed max-w-[720px] mx-auto mt-4">
          We&apos;re still early — every client we take on gets our full attention, not a fraction of it
          split across a big team. That&apos;s the trade we&apos;re making, and we think it shows in the work.
        </p>
      </div>

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
            <li><Link href="/contact" className="text-slate-400 hover:text-[#00FF88] transition-colors text-sm">Contact Us</Link></li>
            <li><Link href="#our-story" className="text-slate-400 hover:text-[#00FF88] transition-colors text-sm">Our Story</Link></li>
          </ul>
        </div>
        {/* Demos Col */}
        <div className="flex flex-col">
          <h4 className="text-white text-sm tracking-wider font-semibold mb-5">DEMOS</h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="/demo-clinic" className="text-slate-400 hover:text-[#00FF88] transition-colors text-sm">Clinic Website</Link></li>
            <li><Link href="/demo-gym" className="text-slate-400 hover:text-[#00FF88] transition-colors text-sm">Gym Website</Link></li>
            <li><Link href="/demo-salon" className="text-slate-400 hover:text-[#00FF88] transition-colors text-sm">Salon Website</Link></li>
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
            <a
              href="https://www.facebook.com/CodeluzStudio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-[#00FF88] transition-colors w-fit"
            >
              <Facebook size={16} className="text-[#00FF88]" /> Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto pt-7 border-t border-white/10 flex flex-wrap items-center justify-between gap-5 text-sm text-slate-400">
        <div>© {new Date().getFullYear()} Codeluz. All Rights Reserved.</div>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-[#00FF88] transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-[#00FF88] transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}