import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';

const MotionDiv = motion.div as any;

const Events: React.FC = () => {
  return (
    <section id="events" className="py-32 px-6 bg-slate-900 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Featured Event */}
            <div className="lg:col-span-2">
                <MotionDiv 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="font-code text-xs text-accent tracking-widest uppercase mb-4"
                >
                    Next Workshop: Secure Your Spot
                </MotionDiv>
                
                <h2 className="font-display font-bold text-4xl md:text-5xl text-primary mb-6">
                    Self-Healing Test Frameworks in Production
                </h2>
                
                <div className="flex flex-wrap gap-6 mb-12 text-secondary font-body">
                    <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-accent" /> January 15, 2025 | 7 PM IST
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-accent" /> Virtual (Zoom)
                    </div>
                    <div className="flex items-center gap-2">
                        <Users size={18} className="text-accent" /> Capacity: 100 members
                    </div>
                </div>

                <div className="bg-slate-950 border border-white/10 p-8 rounded-xl mb-8">
                    <h3 className="font-display text-xl text-primary mb-4">What You'll Learn & Who You'll Meet:</h3>
                    <ul className="space-y-3">
                        {['Build self-healing test scripts', 'Real-world debugging with ML', 'CI/CD Pipeline integration', 'Engineers, architects, and innovators solving this right now'].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-secondary">
                                <CheckCircle size={18} className="text-accent mt-1 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 items-center justify-between border-t border-white/10 pt-8">
                    <div className="text-secondary text-sm">
                        <span className="block text-tertiary uppercase text-xs tracking-widest mb-1">Speaker</span>
                        <strong className="text-primary font-display text-lg">Shreeyash Pawar</strong> <span className="text-tertiary">(Applied Scientist, Philips)</span>
                    </div>
                    <Button>Register Now</Button>
                </div>
            </div>

            {/* Upcoming List */}
            <div className="lg:col-span-1 border-l border-white/10 lg:pl-16">
                <h3 className="font-display font-semibold text-2xl text-primary mb-8">Upcoming Events</h3>
                <div className="space-y-8 relative">
                    <div className="absolute top-2 left-[3px] bottom-2 w-px bg-white/10" />
                    
                    {[
                        { date: 'Jan 15', title: 'Self-Healing Tests', type: 'Virtual' },
                        { date: 'Feb 5', title: 'Zero-Downtime Payments', type: 'Virtual' },
                        { date: 'Feb 20', title: 'In-Person Networking Mixer', type: 'Chennai' },
                    ].map((evt, i) => (
                        <div key={i} className="relative pl-6">
                            <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-accent box-content border-4 border-slate-900" />
                            <div className="font-code text-xs text-accent tracking-wide mb-1">{evt.date}</div>
                            <div className="font-display text-lg text-primary mb-1">{evt.title}</div>
                            <div className="font-body text-xs text-tertiary uppercase tracking-wider">{evt.type}</div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-12">
                     <a href="#" className="font-code text-sm text-accent hover:underline decoration-accent underline-offset-4">See Full Calendar &rarr;</a>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Events;