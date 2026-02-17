"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../lib/utils";

export const FloatingNav = ({
  navItems,
  className,
  onJoinClick,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
  onJoinClick?: () => void;
}) => {
  // changed from scrollYProgress to scrollY for pixel-perfect control
  const { scrollY } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const previous = scrollY.getPrevious() ?? 0;
      const direction = current - previous;

      // If we are at the very top of the page (within 100px), ALWAYS show the nav
      if (current < 100) {
        setVisible(true);
      } else {
        // Otherwise, show if scrolling UP, hide if scrolling DOWN
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          // GLASSMORPHISM UPDATE:
          // - bg-white/[0.06]: Adds a light tint (frosted glass) instead of darkening it
          // - backdrop-blur-xl: Standard strong blur
          // - border-white/[0.15]: Slightly more visible border for the 'cut glass' look
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-white/[0.15] rounded-full bg-white/[0.06] backdrop-blur-xl shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.5)] z-[5000] px-6 py-3 items-center justify-center space-x-4",
          className
        )}
      >
        {/* LOGO */}
        <div className="flex items-center gap-0.5 font-display font-bold text-lg tracking-tighter text-white mr-2">
            PAYTECH<span className="text-accent">TN</span>
        </div>

        {navItems.map((navItem: any, idx: number) => (
          <a
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative text-neutral-200 items-center flex space-x-1 hover:text-white transition-colors font-body text-sm font-medium tracking-tight"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block">{navItem.name}</span>
          </a>
        ))}
        <button 
            onClick={onJoinClick}
            className="border text-xs font-semibold relative border-white/20 text-white px-5 py-2 rounded-full font-body overflow-hidden group bg-[#ff542e] hover:bg-[#ff542e]/90 transition-all shadow-[0_0_20px_-5px_rgba(255,84,46,0.5)]"
        >
          <span className="relative z-10">Join Now</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-white/50 to-transparent h-px" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};