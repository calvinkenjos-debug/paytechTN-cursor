import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowUpRight, Mic, Coffee } from 'lucide-react';

const MotionDiv = motion.div as any;

const topics = [
  'SWIFT GPI and emerging payment rails',
  'Real-time settlement realities',
  'FX liquidity challenges',
  'Bank implementation strategies',
];

const EventsSection: React.FC = () => {
  return (
    <section id="events" className="py-28 px-6 bg-background border-y border-white/5 relative overflow-hidden">

      {/* Ambient glow — orange bleeds from where the image will sit */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[55%] h-[80%] bg-[#ff5533]/6 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute left-[10%] top-1/2 -translate-y-1/2 w-[30%] h-[60%] bg-orange-400/4 blur-[80px] rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section eyebrow */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-code text-[11px] tracking-[0.2em] text-accent uppercase">Upcoming Event</span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── LEFT: Event Creative — fully visible square ── */}
          <MotionDiv
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative group"
          >
            {/* Glow ring behind image */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#ff5533]/20 via-orange-400/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Square image container — aspect-square preserves full image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/8 shadow-[0_32px_80px_rgba(0,0,0,0.7)]">
              <img
                src="/event-cross-border.png"
                alt="Instant Cross-Border Payments — PayTechTN, March 27 2026, Chennai"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              {/* Very subtle vignette at bottom so text below reads cleanly */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
          </MotionDiv>

          {/* ── RIGHT: Editorial Info Panel ── */}
          <MotionDiv
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col gap-8"
          >
            {/* Format badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 font-code text-[11px] tracking-widest uppercase text-accent border border-accent/25 bg-accent/8 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Panel + Mixer
              </span>
              <span className="font-code text-[11px] tracking-widest uppercase text-white/20">· In-Person</span>
            </div>

            {/* Title */}
            <div>
              <h2 className="font-bold text-3xl lg:text-4xl text-white leading-[1.15] tracking-tight">
                Instant Cross-Border<br />
                <span style={{ color: '#ff5533' }}>Payments</span>
              </h2>
              <p className="mt-3 text-secondary text-sm leading-relaxed max-w-sm">
                An evening of practical insights and peer networking with cross-border payments professionals from banks, fintechs, and payment technology leaders.
              </p>
            </div>

            {/* ── KEY INFO: Date / Time / Location — Editorial & Prominent ── */}
            <div className="border-y border-white/5 py-6 space-y-5">

              {/* Date — massive editorial number */}
              <div className="flex items-baseline gap-4">
                <span className="font-bold text-[80px] leading-none text-white tracking-tighter select-none" style={{ lineHeight: 1 }}>27</span>
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-white">March 2026</span>
                  <span className="font-code text-xs text-white/30 tracking-widest uppercase">Friday</span>
                </div>
              </div>

              {/* Time + Location row */}
              <div className="grid grid-cols-2 gap-3">

                {/* Time */}
                <div className="rounded-xl bg-white/[0.03] border border-white/8 p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Clock size={11} className="text-white/30" />
                    <span className="font-code text-[10px] tracking-widest uppercase text-white/30">Time</span>
                  </div>
                  <div className="font-bold text-2xl text-white leading-none">5:00 PM</div>
                  <div className="text-xs text-white/30 mt-1">IST onwards</div>
                </div>

                {/* Location — orange highlighted to pop */}
                <div className="rounded-xl border p-4" style={{ background: 'rgba(255,87,51,0.07)', borderColor: 'rgba(255,87,51,0.2)' }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin size={11} style={{ color: '#ff5533' }} />
                    <span className="font-code text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,87,51,0.6)' }}>Location</span>
                  </div>
                  <div className="font-bold text-lg text-white leading-tight">StartupTN</div>
                  <div className="text-xs text-white/40 mt-1">Chennai, Tamil Nadu</div>
                </div>

              </div>
            </div>

            {/* Topics */}
            <div>
              <p className="font-code text-[10px] tracking-[0.18em] uppercase text-white/25 mb-3">What we'll discuss</p>
              <div className="space-y-2.5">
                {topics.map((topic) => (
                  <div key={topic} className="flex items-center gap-3 text-sm text-white/60">
                    <span className="flex-shrink-0 w-[5px] h-[5px] rounded-full" style={{ background: '#ff5533' }} />
                    {topic}
                  </div>
                ))}
              </div>
            </div>

            {/* Format tags + CTA */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-5">
                <span className="flex items-center gap-1.5 text-xs text-white/30">
                  <Mic size={12} className="text-white/20" /> Expert Panel Discussion
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/30">
                  <Coffee size={12} className="text-white/20" /> Networking High-Tea
                </span>
              </div>

              <div className="flex justify-center">
                <a
                  href="https://luma.com/dalvho7w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 font-bold text-sm text-white px-10 py-4 rounded-full transition-all duration-200 active:scale-[0.97]"
                  style={{
                    background: '#ff5533',
                    boxShadow: '0 0 32px rgba(255,87,51,0.35)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 48px rgba(255,87,51,0.55)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 32px rgba(255,87,51,0.35)')}
                >
                  Register on Luma
                  <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </a>
              </div>
            </div>

          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
