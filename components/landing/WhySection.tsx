import React from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, Zap } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionH3 = motion.h3 as any;

const WhySection: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6 bg-background relative overflow-hidden tech-grid">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brandAmber/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Practitioners Highlight */}
        <div className="mb-24 flex justify-center">
            <MotionDiv
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.7 }}
                 className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 hover:border-brandAmber/30 transition-colors max-w-4xl w-full text-center"
            >
                <h3 className="font-bold text-3xl md:text-4xl text-primary mb-6 tracking-tight">Real Conversations. Real Solutions.</h3>
                <p className="font-body text-secondary mb-10 text-xl leading-relaxed">
                    We bring together engineers, architects, product leads, and founders working on payments and fintech infrastructure.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center gap-3">
                        <div className="p-3 rounded-full bg-brandAmber/10 text-brandAmber"><Users size={24} /></div>
                        <span className="text-lg text-secondary">Practitioners share what actually works.</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="p-3 rounded-full bg-brandAmber/10 text-brandAmber"><Lightbulb size={24} /></div>
                        <span className="text-lg text-secondary">Deep dives into real implementations.</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="p-3 rounded-full bg-brandAmber/10 text-brandAmber"><Zap size={24} /></div>
                        <span className="text-lg text-secondary">Meet people solving your exact problems.</span>
                    </div>
                </div>
            </MotionDiv>
        </div>

        {/* Voices Grid */}
        <div className="mt-32">
            <MotionH3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-bold text-3xl md:text-4xl text-primary text-center mb-16 tracking-tight"
            >
                The Voices You'll Hear
            </MotionH3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    {
                        role: "QA Engineers",
                        quote: "Flaky tests slow everything down. Here's how we fixed it.",
                        desc: "Optimizing Test Suites"
                    },
                    {
                        role: "Backend Architects",
                        quote: "Zero-downtime deployments aren't just theory. Here's the framework.",
                        desc: "Building Payment Rails"
                    },
                    {
                        role: "Product Leads",
                        quote: "AI in testing isn't magic. Here's the ROI calculation.",
                        desc: "Making Fintech Decisions"
                    },
                    {
                        role: "Founders",
                        quote: "Payment infrastructure is the moat. Here's how we chose our tech stack.",
                        desc: "Building Fintech Companies"
                    }
                ].map((item, idx) => (
                    <MotionDiv 
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-8 rounded-2xl bg-surface border border-white/5 hover:border-brandAmber/50 transition-all duration-300 group relative overflow-hidden shadow-lg hover:shadow-brandAmber/5"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-brandAmber opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="font-code text-xs text-brandAmber tracking-widest uppercase mb-4 opacity-80 group-hover:opacity-100 font-bold">
                            {item.role}
                        </div>
                        <h4 className="font-semibold text-xl text-primary mb-3 leading-snug">"{item.quote}"</h4>
                        <p className="font-body text-sm text-tertiary group-hover:text-secondary transition-colors">{item.desc}</p>
                    </MotionDiv>
                ))}
            </div>
            
            <div className="mt-16 text-center border-t border-white/5 pt-8">
                 <p className="font-body text-secondary text-lg">
                    And leaders from <span className="text-white font-bold">Philips, Venzo, Keploy, Finzly, StartupTN</span> who've built this at scale.
                 </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;