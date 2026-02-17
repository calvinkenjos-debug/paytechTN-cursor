import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

const MotionDiv = motion.div as any;

const EventsSection: React.FC = () => {
  return (
    <section id="events" className="py-32 px-6 bg-surface border-y border-white/5 relative">
      <div className="max-w-3xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
            <h2 className="font-bold text-4xl md:text-5xl text-primary mb-6">Upcoming Events</h2>
            <p className="text-secondary text-lg">Join us to learn, network, and build the future of fintech.</p>
        </div>

        {/* Upcoming List */}
        <div className="border border-white/10 rounded-2xl p-8 bg-white/5 relative">
            <h3 className="font-bold text-2xl text-white mb-8">Session Schedule</h3>
            <div className="space-y-10 relative">
                <div className="absolute top-2 left-[3px] bottom-2 w-px bg-white/10" />
                
                {[
                    { date: 'Jan 15', title: 'Self-Healing Tests', type: 'Virtual' },
                    { date: 'Feb 5', title: 'Zero-Downtime Payments', type: 'Virtual' },
                    { date: 'Feb 20', title: 'In-Person Networking Mixer', type: 'Chennai' },
                ].map((evt, i) => (
                    <div key={i} className="relative pl-8 group">
                        <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-accent box-content border-4 border-surface group-hover:bg-white transition-colors" />
                        <div className="font-code text-xs text-accent tracking-wide mb-1">{evt.date}</div>
                        <div className="font-bold text-xl text-primary mb-1 group-hover:text-accent transition-colors cursor-pointer">{evt.title}</div>
                        <div className="font-body text-sm text-tertiary uppercase tracking-wider">{evt.type}</div>
                    </div>
                ))}
            </div>
            
            <div className="mt-12 text-center">
                 <a href="#" className="inline-flex items-center gap-2 font-code text-sm text-accent hover:text-white transition-colors decoration-accent underline-offset-4">See Full Calendar &rarr;</a>
            </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;