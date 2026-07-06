import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Video, Calendar, ArrowUpRight } from 'lucide-react';

const MotionDiv = motion.div as any;

/**
 * Luma registration embed.
 *
 * Once the Luma event page is live, set LUMA_EVENT_ID to its API id
 * (found in Luma → Event → Settings → "Embed", it looks like `evt-xxxxxxxx`).
 * While it's empty the section renders a "registration opening soon" state
 * instead of a broken iframe, so this is safe to ship before the page exists.
 */
const LUMA_EVENT_ID = 'evt-Uu241H0X6C9cLV2';

const highlights = [
  'Real Agentic AI use cases in payments — from investigations and exception handling to embedded payments.',
  'Practitioners from banking and fintech, grounded in what they have actually shipped.',
  'No hype, no slideware about the future. Just what is working today.',
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

            <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-5 shadow-[0_32px_80px_rgba(0,0,0,0.7)]">
              <div className="flex items-center gap-2 mb-4 px-1">
                <Calendar size={13} className="text-accent" />
                <span className="font-code text-[11px] tracking-widest uppercase text-white/50">
                  Register — free seats are limited
                </span>
              </div>

              {LUMA_EVENT_ID ? (
                <iframe
                  title="Register for Rise of AI in Payments on Luma"
                  src={`https://luma.com/embed/event/${LUMA_EVENT_ID}/simple`}
                  width="100%"
                  height="520"
                  frameBorder="0"
                  style={{ border: 'none', borderRadius: '12px' }}
                  allow="fullscreen; payment"
                  aria-hidden="false"
                  tabIndex={0}
                  className="w-full rounded-xl bg-white"
                />
              ) : (
                /* Fallback shown until the Luma event id is set */
                <div className="flex flex-col items-center justify-center text-center gap-4 rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 border border-accent/20">
                    <Calendar size={20} className="text-accent" />
                  </span>
                  <div>
                    <p className="font-bold text-white text-lg">Registration opening soon</p>
                    <p className="text-secondary text-sm mt-1 max-w-xs">
                      The Luma registration form will appear here. Join the community
                      below and we'll send you the link the moment it's live.
                    </p>
                  </div>
                  <a
                    href="https://luma.com/event/evt-Uu241H0X6C9cLV2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-bold text-sm text-white px-6 py-3 rounded-full bg-accent transition-all duration-200 active:scale-[0.97]"
                    style={{ boxShadow: '0 0 28px rgba(255,87,51,0.3)' }}
                  >
                    View on Luma
                    <ArrowUpRight
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                    />
                  </a>
                </div>
              )}
            </div>

            <p className="text-center text-xs text-white/30 mt-4">
              Can't get a Zoom seat? We go live on{' '}
              <span className="text-white/50">LinkedIn</span> — open to everyone.
            </p>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventSection;