import React from 'react';
import { ArrowRight, X } from 'lucide-react';
import { AnimatedShinyText } from './animated-shiny-text';
import { cn } from '../../lib/utils';

interface AnnouncementBannerProps {
  onDismiss: () => void;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ onDismiss }) => {
  const scrollToEvents = () => {
    const el = document.getElementById('events');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative z-50 w-full bg-black border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3">

        {/* Clickable announcement pill */}
        <button
          onClick={scrollToEvents}
          className={cn(
            "group flex-1 flex justify-center",
          )}
        >
          <div
            className={cn(
              "group rounded-full border border-white/10 bg-neutral-900 hover:bg-neutral-800 transition-all ease-in hover:cursor-pointer",
            )}
          >
            <AnimatedShinyText
              shimmerWidth={200}
              className="inline-flex items-center justify-center gap-2 px-4 py-1.5 text-sm transition ease-out hover:text-white hover:duration-300"
            >
              <span
                className="inline-block w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                style={{ background: '#ff5533' }}
              />
              <span className="font-medium text-white/80">
                🎤 Next Event: <span className="text-white font-semibold">Instant Cross-Border Payments</span>
                <span className="text-white/40 mx-2">·</span>
                <span className="font-code text-xs tracking-wide" style={{ color: '#ff5533' }}>Mar 27 · 5 PM · Chennai</span>
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
          className="absolute right-4 p-1 text-white/20 hover:text-white/60 transition-colors flex-shrink-0"
          aria-label="Dismiss announcement"
        >
          <X size={14} />
        </button>

      </div>
    </div>
  );
};
