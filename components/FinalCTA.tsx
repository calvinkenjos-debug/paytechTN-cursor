import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

const MotionDiv = motion.div as any;
const MotionH2 = motion.h2 as any;
const MotionP = motion.p as any;

const FinalCTA: React.FC = () => {
  return (
    <section id="join" className="py-40 px-6 bg-slate-950 flex flex-col items-center text-center relative overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
            <MotionH2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display font-bold text-5xl md:text-6xl text-primary mb-8"
            >
                Ready to Build Your <br /> <span className="text-accent">Fintech Network?</span>
            </MotionH2>

            <MotionP 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="font-body text-xl text-secondary mb-12"
            >
                Join 200+ engineers, architects, and founders transforming payments and fintech infrastructure in India.
            </MotionP>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-2xl mx-auto">
                <div>
                    <div className="font-display text-2xl font-bold text-white mb-1">New Workshop</div>
                    <div className="text-tertiary text-sm font-code uppercase tracking-wider">Every Month</div>
                </div>
                <div>
                    <div className="font-display text-2xl font-bold text-white mb-1">New Faces</div>
                    <div className="text-tertiary text-sm font-code uppercase tracking-wider">Every Event</div>
                </div>
                <div>
                    <div className="font-display text-2xl font-bold text-white mb-1">New Opps</div>
                    <div className="text-tertiary text-sm font-code uppercase tracking-wider">Every Connection</div>
                </div>
            </div>

            <MotionDiv 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
            >
                <Button variant="primary">Join the Community</Button>
                <Button variant="secondary">Explore Past Sessions</Button>
            </MotionDiv>
        </div>
    </section>
  );
};

export default FinalCTA;