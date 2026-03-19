import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Users, Mic, Coffee, ArrowUpRight } from 'lucide-react';

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

      {/* Background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-code text-xs tracking-widest text-accent uppercase mb-4 px-3 py-1 border border-accent/30 rounded-full bg-accent/5">
            Upcoming Event
          </span>
          <h2 className="font-bold text-4xl md:text-5xl text-primary mb-4">
            Instant Cross-Border Payments
          </h2>
          <p className="text-secondary text-lg max-w-xl mx-auto">
            Panel Discussion + Networking Mixer — Chennai's payments community comes together.
          </p>
        </div>

        {/* Event Card */}
        <MotionDiv
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden"
        >
          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-accent via-orange-400 to-yellow-500" />

          <div className="grid md:grid-cols-2 gap-0">

            {/* Left — Details */}
            <div className="p-8 md:p-12 flex flex-col justify-between gap-8 border-b md:border-b-0 md:border-r border-white/10">

              {/* Meta pills */}
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 text-xs font-medium text-white/70 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                  <Calendar size={12} className="text-accent" /> Friday, March 27, 2026
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-white/70 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                  <Clock size={12} className="text-accent" /> 5:00 PM IST onwards
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-white/70 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                  <MapPin size={12} className="text-accent" /> StartupTN Office, Chennai
                </span>
              </div>

              {/* Description */}
              <p className="text-secondary text-sm leading-relaxed">
                Join Chennai's payments community for an evening of practical insights and networking with cross-border payments professionals from banks, fintechs, and payment technology leaders.
              </p>

              {/* Topics */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">What we'll discuss</p>
                <ul className="space-y-3">
                  {topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-3 text-sm text-white/80">
                      <span className="mt-[3px] flex-shrink-0 w-4 h-4 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      </span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Format */}
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Mic size={13} className="text-accent/70" /> Expert Panel Discussion
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Coffee size={13} className="text-accent/70" /> Networking High-Tea
                </div>
              </div>

              {/* CTA */}
              <a
                href="https://luma.com/dalvho7w"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full md:w-auto bg-accent hover:bg-accent/90 text-white font-semibold text-sm px-8 py-4 rounded-2xl transition-all duration-200 shadow-[0_0_30px_rgba(255,85,51,0.25)] hover:shadow-[0_0_40px_rgba(255,85,51,0.4)] active:scale-[0.98] group"
              >
                Register on Luma
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Right — Visual */}
            <div className="relative min-h-[320px] md:min-h-0 flex flex-col items-center justify-center p-8 md:p-12 bg-gradient-to-br from-accent/10 via-orange-500/5 to-transparent">

              {/* Decorative circles */}
              <div className="absolute top-8 right-8 w-32 h-32 rounded-full border border-accent/10" />
              <div className="absolute top-12 right-12 w-20 h-20 rounded-full border border-accent/15" />
              <div className="absolute bottom-8 left-8 w-24 h-24 rounded-full border border-white/5" />

              <div className="relative z-10 text-center space-y-6">
                {/* Big date display */}
                <div>
                  <p className="font-code text-xs tracking-widest text-accent/70 uppercase mb-2">Save the date</p>
                  <div className="font-bold text-7xl md:text-8xl text-white/10 leading-none select-none">27</div>
                  <div className="font-bold text-2xl text-white mt-1">March 2026</div>
                </div>

                <div className="w-12 h-px bg-accent/30 mx-auto" />

                {/* For whom */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">Perfect for</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Payments PMs', 'Treasury Heads', 'Fintech Leaders', 'Bank Ops'].map((tag) => (
                      <span key={tag} className="text-xs text-white/60 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-white/40">
                  <Users size={13} />
                  In-Person · Chennai
                </div>
              </div>
            </div>

          </div>
        </MotionDiv>

      </div>
    </section>
  );
};

export default EventsSection;
