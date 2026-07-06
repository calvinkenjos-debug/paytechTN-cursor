import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Video, Calendar, ArrowUpRight, Check } from 'lucide-react';

const MotionDiv = motion.div as any;

/**
 * Luma registration.
 *
 * Once the Luma event page is live, set LUMA_EVENT_ID to its API id
 * (found in Luma → Event → Settings → "Embed", it looks like `evt-xxxxxxxx`).
 * While it's empty the section renders a "registration opening soon" state.
 *
 * Uses Luma's checkout-button overlay (script loaded in index.html) rather
 * than the boxed "simple" iframe: the iframe's registration page (8 custom
 * questions) renders taller than any fixed height, forcing an ugly nested
 * scrollbar. The overlay button has no height to guess and opens Luma's own
 * checkout as a full modal instead.
 */
const LUMA_EVENT_ID = 'evt-Uu241H0X6C9cLV2';
const LUMA_EVENT_URL = `https://luma.com/event/${LUMA_EVENT_ID}`;

const highlights = [
  'Real Agentic AI use cases in payments — from investigations and exception handling to embedded payments.',
  'Practitioners from banking and fintech, grounded in what they have actually shipped.',
  'No hype, no slideware about the future. Just what is working today.',
];

const included = [
  'Free to attend',
  'Zoom link + calendar invite by email',
  'Zoom capacity 75–100 — register early',
];

const UpcomingEventSection: React.FC = () => {
  return (
    <section
      id="upcoming-event"
      className="py-28 px-6 bg-background border-y border-white/5 relative overflow-hidden"
    >
      {/* Ambient orange glow */}
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[80%] bg-accent/[0.06] blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute right-[10%] top-1/3 w-[30%] h-[50%] bg-orange-400/[0.04] blur-[90px] rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section heading */}
        <div className="flex items-center gap-6 mb-14">
          <h2 className="font-bold text-4xl md:text-5xl text-white whitespace-nowrap">
            Upcoming Event
          </h2>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ── LEFT: Event details ── */}
          <MotionDiv
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col gap-8"
          >
            {/* Format badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 font-code text-[11px] tracking-widest uppercase text-accent border border-accent/25 bg-accent/[0.08] rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Virtual Session
              </span>
              <span className="font-code text-[11px] tracking-widest uppercase text-white/25">
                · Free · 60 min
              </span>
            </div>

            {/* Title + tagline */}
            <div>
              <h3 className="font-bold text-4xl lg:text-5xl text-white leading-[1.1] tracking-tight">
                Rise of AI in
                <br />
                <span className="text-accent">Payments</span>
              </h3>
              <p className="mt-4 text-secondary text-base leading-relaxed max-w-md">
                Payments is one of the most process-heavy, rule-driven industries
                in the world. That is exactly what makes it ready for Agentic AI.
              </p>
            </div>

            {/* ── Date / Time / Format ── */}
            <div className="border-y border-white/5 py-6 space-y-5">
              {/* Date — editorial big number */}
              <div className="flex items-baseline gap-4">
                <span
                  className="font-bold text-[80px] leading-none text-white tracking-tighter select-none"
                  style={{ lineHeight: 1 }}
                >
                  07
                </span>
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-white">August 2026</span>
                  <span className="font-code text-xs text-white/30 tracking-widest uppercase">
                    Friday
                  </span>
                </div>
              </div>

              {/* Time + Format row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/[0.03] border border-white/8 p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Clock size={11} className="text-white/30" />
                    <span className="font-code text-[10px] tracking-widest uppercase text-white/30">
                      Time
                    </span>
                  </div>
                  <div className="font-bold text-xl text-white leading-none">
                    5:30–6:30 PM
                  </div>
                  <div className="text-xs text-white/30 mt-1">IST · 12:00 PM UTC</div>
                </div>

                <div
                  className="rounded-xl border p-4"
                  style={{
                    background: 'rgba(255,87,51,0.07)',
                    borderColor: 'rgba(255,87,51,0.2)',
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Video size={11} className="text-accent" />
                    <span className="font-code text-[10px] tracking-widest uppercase text-accent/70">
                      Where
                    </span>
                  </div>
                  <div className="font-bold text-lg text-white leading-tight">Zoom</div>
                  <div className="text-xs text-white/40 mt-1">+ LinkedIn Live</div>
                </div>
              </div>
            </div>

            {/* What you'll hear */}
            <div>
              <p className="font-code text-[10px] tracking-[0.18em] uppercase text-white/25 mb-3">
                What you'll hear
              </p>
              <div className="space-y-3">
                {highlights.map((point) => (
                  <div key={point} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
                    <span className="flex-shrink-0 mt-[7px] w-[5px] h-[5px] rounded-full bg-accent" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </MotionDiv>

          {/* ── RIGHT: Registration ── */}
          <MotionDiv
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="relative"
          >
            {/* Glow behind the card */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/20 via-orange-400/10 to-transparent blur-2xl opacity-60" />

            <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-7 lg:p-8 shadow-[0_32px_80px_rgba(0,0,0,0.7)]">
              <div className="flex items-center gap-2 mb-6">
                <Calendar size={13} className="text-accent" />
                <span className="font-code text-[11px] tracking-widest uppercase text-white/50">
                  Save your seat
                </span>
              </div>

              <p className="text-white text-lg font-bold leading-snug">
                Takes less than a minute.
              </p>
              <p className="text-secondary text-sm mt-2 leading-relaxed">
                You'll get a confirmation email with the Zoom link. Miss it and
                you can still catch the whole session live on LinkedIn.
              </p>

              <div className="mt-7 space-y-3">
                {included.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-white/60">
                    <Check size={14} className="flex-shrink-0 text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {LUMA_EVENT_ID ? (
                <motion.a
                  href={LUMA_EVENT_URL}
                  data-luma-action="checkout"
                  data-luma-event-id={LUMA_EVENT_ID}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.97 }}
                  className="group mt-7 flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-4 font-bold text-sm text-white transition-shadow duration-200"
                  style={{ boxShadow: '0 0 32px rgba(255,87,51,0.35)' }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
                    (e.currentTarget.style.boxShadow = '0 0 48px rgba(255,87,51,0.55)')
                  }
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
                    (e.currentTarget.style.boxShadow = '0 0 32px rgba(255,87,51,0.35)')
                  }
                >
                  Reserve My Seat
                  <ArrowUpRight
                    size={15}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                  />
                </motion.a>
              ) : (
                /* Fallback shown until the Luma event id is set */
                <div className="mt-7 flex flex-col items-center text-center gap-3 rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-8">
                  <p className="font-bold text-white text-sm">Registration opening soon</p>
                  <p className="text-secondary text-xs max-w-xs">
                    Check back shortly, or watch this space — we'll post the link here first.
                  </p>
                </div>
              )}
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventSection;