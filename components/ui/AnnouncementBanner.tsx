import React from 'react';
import { ArrowRight, X } from 'lucide-react';
import { AnimatedShinyText } from './animated-shiny-text';

interface AnnouncementBannerProps {
  onDismiss: () => void;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ onDismiss }) => {
  const scrollToEvent = () => {
    const el = document.getElementById('upcoming-event');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed top-0 inset-x-0 z-[6000] w-full bg-black/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center">
        {/* Clickable shiny announcement pill */}
        <button
          onClick={scrollToEvent}
          className="group flex justify-center"
          aria-label="Rise of AI in Payments — August 7. Jump to event details."
        >
          <div className="group inline-flex items-center rounded-full border border-white/10 bg-neutral-900/80 hover:bg-neutral-800 transition-colors duration-200">
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
                  Aug 7 · 5:30 PM IST · Virtual
                </span>
              </span>
              <ArrowRight
                size={13}
                className="text-white/40 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 flex-shrink-0"
              />
            </AnimatedShinyText>
          </div>
        </button>

        {/* Dismiss button */}
        <button
          onClick={onDismiss}
          className="absolute right-4 p-1 text-white/25 hover:text-white/60 transition-colors flex-shrink-0"
          aria-label="Dismiss announcement"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
