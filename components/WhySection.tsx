import React from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, MessageSquare, Zap } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionH3 = motion.h3 as any;

const WhySection: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* The Gap Header */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <MotionDiv
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                <h2 className="font-display font-semibold text-4xl md:text-5xl text-primary mb-6 tracking-tight">
                    The Gap <span className="text-secondary opacity-60">Everyone's Feeling.</span>
                </h2>
                <p className="font-body text-xl text-secondary leading-relaxed">
                    Payments professionals are scattered. Your best ideas stay in Slack. 
                    Your hardest problems get solved alone. Opportunities hide in silos.
                </p>
                <div className="h-1 w-24 bg-accent mt-8" />
            </MotionDiv>
            
            <MotionDiv
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.7, delay: 0.2 }}
                 className="glass-card p-8 md:p-12 rounded-lg border-l-4 border-accent"
            >
                <h3 className="font-display font-medium text-3xl text-primary mb-4">PayTechTN Changes That.</h3>
                <p className="font-body text-secondary mb-6">
                    Real Conversations. Real Solutions. We bring together engineers, architects, product leads, and founders working on payments and fintech infrastructure.
                </p>
                <ul className="space-y-4 font-body text-secondary">
                    <li className="flex gap-3">
                        <Users className="text-accent shrink-0" />
                        <span>Practitioners share what actually works.</span>
                    </li>
                    <li className="flex gap-3">
                        <Lightbulb className="text-accent shrink-0" />
                        <span>Deep dives into real implementations.</span>
                    </li>
                    <li className="flex gap-3">
                        <Zap className="text-accent shrink-0" />
                        <span>Meet the people solving your exact problems.</span>
                    </li>
                </ul>
            </MotionDiv>
        </div>

        {/* Voices Grid */}
        <div className="mt-32">
            <MotionH3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display font-semibold text-3xl md:text-4xl text-primary text-center mb-16"
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
                        className="p-8 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 transition-colors group"
                    >
                        <div className="font-code text-xs text-accent tracking-widest uppercase mb-4 opacity-80 group-hover:opacity-100">
                            {item.role}
                        </div>
                        <h4 className="font-display text-xl text-primary mb-3">"{item.quote}"</h4>
                        <p className="font-body text-sm text-tertiary">{item.desc}</p>
                    </MotionDiv>
                ))}
            </div>
            
            <div className="mt-12 text-center">
                 <p className="font-body text-secondary">
                    And leaders from <span className="text-primary font-semibold">Philips, Venzo, Keploy, Finzly, StartupTN</span> who've built this at scale.
                 </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;