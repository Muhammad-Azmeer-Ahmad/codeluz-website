"use client";

import { useRef, useState, ReactNode, MouseEvent } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function MagneticButton({ children, className = "", onClick, href }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    // Calculate distance from center of button
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (clientX - centerX) * 0.3; // 30% pull strength
    const y = (clientY - centerY) * 0.3;

    gsap.to(buttonRef.current, {
      x,
      y,
      duration: 1,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <div
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {href ? (
        <a
          ref={buttonRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          className={`relative z-10 ${className}`}
        >
          {children}
        </a>
      ) : (
        <button
          ref={buttonRef as React.RefObject<HTMLButtonElement>}
          onClick={onClick}
          className={`relative z-10 ${className}`}
        >
          {children}
        </button>
      )}
      
      {/* Subtle border tracing glow that follows the button when hovered */}
      {isHovered && (
        <div className="absolute inset-0 z-0 bg-[#D4AF37]/20 blur-xl rounded-full scale-110 pointer-events-none animate-pulse" />
      )}
    </div>
  );
}
