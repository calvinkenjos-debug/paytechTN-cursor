import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, FileText, Code, Database, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/Button';

const MotionDiv = motion.div as any;
const MotionH2 = motion.h2 as any;

const Vault: React.FC = () => {
  return (
    <section id="vault" className="py-32 px-6 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Left Content */}
        <div className="flex-1">
            <MotionDiv
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-code text-xs text-accent tracking-widest uppercase mb-4"
            >
                Knowledge Base
            </MotionDiv>
            <MotionH2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display font-bold text-4xl md:text-5xl text-primary mb-8"
            >
                The Vault: Recorded Sessions from Real Practitioners
            </MotionH2>
            <p className="font-body text-lg text-secondary mb-12 max-w-xl">
                Every workshop. Every conference. Every insight shared.
                This is what we've learned. This is what works.
            </p>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {[
                    { icon: PlayCircle, text: "Workshop recordings (60-90 mins)" },
                    { icon: FileText, text: "Speaker slides & decks" },
                    { icon: Code, text: "Code examples & repos" },
                    { icon: Database, text: "Case studies & guides" },
                ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-secondary font-body">
                        <item.icon className="text-accent w-5 h-5" />
                        <span>{item.text}</span>
                    </li>
                ))}
            </ul>

            <Button variant="outline">Unlock Full Vault</Button>
        </div>

        {/* Right Featured Card */}
        <div className="flex-1 flex items-center justify-center lg:justify-end">
            <MotionDiv 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full max-w-md bg-slate-800/50 border border-white/10 rounded-2xl p-8 relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 p-4 opacity-50">
                    <Database className="w-24 h-24 text-white/5 rotate-12" />
                </div>
                
                <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-code rounded mb-6">FEATURED RESOURCE</span>
                    <h3 className="font-display text-2xl text-primary mb-2">AI-Powered QA: From Theory to Production</h3>
                    <p className="text-tertiary text-sm mb-6">Nov 2025 • Philips, Venzo, Keploy</p>
                    
                    <div className="space-y-3 mb-8 border-t border-white/10 pt-6">
                        <p className="text-secondary text-sm flex gap-2"><ArrowUpRight size={16} className="text-accent" /> Self-healing test frameworks</p>
                        <p className="text-secondary text-sm flex gap-2"><ArrowUpRight size={16} className="text-accent" /> ML-powered test prioritization</p>
                        <p className="text-secondary text-sm flex gap-2"><ArrowUpRight size={16} className="text-accent" /> Measuring ROI from day one</p>
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded mb-6">
                        <p className="text-emerald-400 font-bold font-display text-lg">Result: 72% Reduction in Testing Time</p>
                    </div>

                    <button className="w-full py-3 bg-white text-slate-900 font-bold font-body rounded hover:bg-gray-200 transition-colors">
                        Access Resource
                    </button>
                </div>
            </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default Vault;