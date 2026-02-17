import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { Button } from './ui/Button';

const MotionDiv = motion.div as any;

const FinzlyIntegration: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-slate-900 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div>
                     <div className="flex items-center gap-2 mb-6">
                        <ShieldCheck className="text-accent" size={24} />
                        <span className="font-code text-sm text-accent tracking-widest uppercase">Powered by Finzly</span>
                     </div>
                     <h2 className="font-display font-bold text-4xl lg:text-5xl text-primary mb-6">
                        Built for You.
                     </h2>
                     <p className="font-body text-xl text-secondary mb-8 leading-relaxed">
                        PayTechTN is organized by Finzly—the fintech infrastructure company trusted by banks and payments companies across ACH, Wire Transfers, RTP, FedNow, and FX.
                     </p>
                     
                     <div className="space-y-6 mb-10">
                         <div className="pl-6 border-l-2 border-accent">
                             <h4 className="font-display text-primary font-semibold text-lg mb-1">Real Product Experience</h4>
                             <p className="text-tertiary text-sm">Every speaker brings experience, not theory.</p>
                         </div>
                         <div className="pl-6 border-l-2 border-white/10 hover:border-accent transition-colors">
                             <h4 className="font-display text-primary font-semibold text-lg mb-1">Battle-Tested at Scale</h4>
                             <p className="text-tertiary text-sm">Strategies tested on billions in transactions.</p>
                         </div>
                         <div className="pl-6 border-l-2 border-white/10 hover:border-accent transition-colors">
                             <h4 className="font-display text-primary font-semibold text-lg mb-1">Backbone of Fintech</h4>
                             <p className="text-tertiary text-sm">Insights from practitioners building the core.</p>
                         </div>
                     </div>

                     <Button variant="outline">Learn About Finzly</Button>
                </div>

                <div className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-2xl">
                    <div className="bg-slate-950 p-8 rounded-xl">
                        <h3 className="font-display text-2xl text-primary mb-4">The Enabler, Not The Boss.</h3>
                        <p className="font-body text-secondary mb-6 leading-relaxed">
                            Finzly isn't running the community—we're enabling it. 
                            You own the conversation. You own the relationships. 
                            Finzly just makes sure what we share is the truth.
                        </p>
                        <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center border border-white/5">
                            {/* Abstract Graphic representing infrastructure */}
                            <div className="flex gap-1 items-end h-24">
                                <MotionDiv animate={{ height: [40, 80, 40] }} transition={{ repeat: Infinity, duration: 2 }} className="w-4 bg-accent/20 rounded-t" />
                                <MotionDiv animate={{ height: [60, 30, 60] }} transition={{ repeat: Infinity, duration: 2.5 }} className="w-4 bg-accent/40 rounded-t" />
                                <MotionDiv animate={{ height: [20, 90, 20] }} transition={{ repeat: Infinity, duration: 1.8 }} className="w-4 bg-accent rounded-t" />
                                <MotionDiv animate={{ height: [50, 40, 50] }} transition={{ repeat: Infinity, duration: 3 }} className="w-4 bg-accent/30 rounded-t" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default FinzlyIntegration;