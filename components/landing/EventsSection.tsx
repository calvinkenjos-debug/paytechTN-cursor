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
    <section id="events" className="py-32 px-6 bg-surface border-y border-white/5 relative overflow-hidden">

      {/* Ambient glow behind card */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-accent/8 blur-[140px]" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Section label */}
        <div className="text-center mb-14">
          <span className="inline-block font-code text-xs tracking-widest text-accent uppercase mb-5 px-3 py-1 border border-accent/30 rounded-full bg-accent/5">
            Upcoming Event
          </span>
          <h2 className="font-bold text-4xl md:text-5xl text-primary">
            Upcoming Events
          </h2>
        </div>

        {/* Main Event Card */}
        <MotionDiv
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative rounded-3xl border border-white/10 bg-[#0a1120] overflow-hidden shadow-2xl shadow-black/60"
        >
          {/* Top gradient accent line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent to-transparent" />

          <div className="grid md:grid-cols-[1fr_420px]">

            {/* ── LEFT: Info Panel ── */}
            <div className="flex flex-col justify-between gap-8 p-8 md:p-12">

              {/* Event type badge */}
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Panel + Mixer
                </span>
                <span className="text-[11px] text-white/30 uppercase tracking-widest">In-Person · Chennai</span>
              </div>

              {/* Title */}
              <div>
                <h3 className="font-bold text-3xl md:text-4xl text-white leading-tight mb-3">
                  Instant Cross-Border<br />
                  <span className="text-accent">Payments</span>
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                  Join Chennai's payments community for an evening of practical insights and networking with cross-border payments professionals.
                </p>
              </div>

              {/* ── KEY INFO: Date / Time / Location ── */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Date */}
                <div className="rounded-2xl bg-white/[0.04] border border-white/8 p-4 flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">Date</span>
                  <span className="text-2xl font-bold text-white leading-none">March 27</span>
                  <span className="text-xs text-white/40">Friday, 2026</span>
                </div>
                {/* Time */}
                <div className="rounded-2xl bg-white/[0.04] border border-white/8 p-4 flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold flex items-center gap-1"><Clock size={10} /> Time</span>
                  <span className="text-2xl font-bold text-white leading-none">5:00 PM</span>
                  <span className="text-xs text-white/40">IST onwards</span>
                </div>
                {/* Location */}
                <div className="rounded-2xl bg-accent/10 border border-accent/20 p-4 flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-accent/70 font-semibold flex items-center gap-1"><MapPin size={10} /> Location</span>
                  <span className="text-lg font-bold text-white leading-tight">StartupTN</span>
                  <span className="text-xs text-white/40">Chennai, Tamil Nadu</span>
                </div>
              </div>

              {/* Topics */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-3">What we'll discuss</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {topics.map((topic) => (
                    <div key={topic} className="flex items-start gap-2.5 text-sm text-white/65">
                      <span className="mt-[5px] flex-shrink-0 w-3 h-3 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center">
                        <span className="w-1 h-1 rounded-full bg-accent" />
                      </span>
                      {topic}
                    </div>
                  ))}
                </div>
              </div>

              {/* Format row + CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="flex gap-5">
                  <span className="flex items-center gap-1.5 text-xs text-white/40">
                    <Mic size={12} className="text-accent/60" /> Expert Panel
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-white/40">
                    <Coffee size={12} className="text-accent/60" /> Networking High-Tea
                  </span>
                </div>
                <a
                  href="https://luma.com/dalvho7w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-accent hover:bg-orange-500 text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 shadow-[0_4px_24px_rgba(255,85,51,0.35)] hover:shadow-[0_4px_32px_rgba(255,85,51,0.55)] active:scale-[0.97]"
                >
                  Register on Luma
                  <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

            </div>

            {/* ── RIGHT: Event Image ── */}
            <div className="relative hidden md:block border-l border-white/8">
              <img
                src="/event-cross-border.png"
                alt="Instant Cross-Border Payments — PayTechTN Panel + Mixer, March 27 2026, Chennai"
                className="w-full h-full object-cover object-center"
                style={{ minHeight: '480px' }}
              />
              {/* Subtle left fade so image blends into card */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a1120] to-transparent pointer-events-none" />
            </div>

          </div>
        </MotionDiv>

      </div>
    </section>
  );
};

export default EventsSection;
