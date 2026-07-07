import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatedShinyText } from './animated-shiny-text';

/**
 * Inline announcement pill for the hero. Rendered between the floating nav and
 * the H1, over the video background — glass surface (matches the nav) so it
 * reads cleanly on the moving backdrop instead of a solid black bar. Clicking
 * smooth-scrolls to the upcoming event section.
 */
export const AnnouncementBanner: React.FC = () => {
  const scrollToEvent = () => {
    const el = document.getElementById('upcoming-event');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToEvent}
      className="group inline-flex"
      aria-label="Rise of AI in Payments, August 7 — jump to event details"
    >
      <div className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] transition-colors duration-200 hover:bg-white/[0.1] hover:border-white/25">
        <AnimatedShinyText
          shimmerWidth={220}
          className="inline-flex items-center justify-center gap-2 px-4 py-1.5 text-sm"
        >
          <span
            className="inline-block w-2 h-2 rounded-full animate-pulse flex-shrink-0"
            style={{ background: '#ff5533' }}
          />
          <span className="font-medium text-white/80">
            Next event:{' '}
            <span className="text-white font-semibold">Rise of AI in Payments</span>
            <span className="hidden sm:inline text-white/30 mx-2">·</span>
            <span
              className="hidden sm:inline font-code text-xs tracking-wide"
              style={{ color: '#ff5533' }}
            >
              Aug 7 · 5:30 PM IST
            </span>
          </span>
          <ArrowRight
            size={13}
            className="text-white/50 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 flex-shrink-0"
          />
        </AnimatedShinyText>
      </div>
    </button>
  );
};