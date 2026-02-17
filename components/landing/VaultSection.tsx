import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, FileText, Code, Database, ArrowUpRight } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionH2 = motion.h2 as any;

const VaultSection: React.FC = () => {
  return (
    <section id="vault" className="py-32 px-6 bg-background border-t border-white/5 relative overflow-hidden">
        {/* Subtle red ambient light */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-highlight/5 rounded-full blur-[150px] pointer-events-none translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative z-10">
        
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
                className="font-bold text-4xl md:text-5xl text-primary mb-8"
            >
                The Vault: Recorded Sessions from Real Practitioners
            </MotionH2>
            <p className="font-body text-lg text-secondary mb-12 max-w-xl">
                Every workshop. Every conference. Every insight shared.
                This is what we've learned. This is what works.
            </p>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {[
                    { icon: PlayCircle, text: "Workshop recordings" },
                    { icon: FileText, text: "Speaker slides & decks" },
                    { icon: Code, text: "Code examples & repos" },
                    { icon: Database, text: "Case studies & guides" },
                ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-secondary font-body group">
                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-accent/10 transition-colors">
                            <item.icon className="text-white group-hover:text-accent w-5 h-5 transition-colors" />
                        </div>
                        <span className="group-hover:text-white transition-colors">{item.text}</span>
                    </li>
                ))}
            </ul>
        </div>

        {/* Right Featured Card */}
        <div className="flex-1 flex items-center justify-center lg:justify-end">
            <MotionDiv 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full max-w-md bg-surface border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-accent/30 transition-colors duration-500"
            >
                <div className="absolute top-0 right-0 p-4 opacity-50">
                    <Database className="w-24 h-24 text-white/5 rotate-12" />
                </div>
                
                <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-xs font-code font-bold rounded mb-6 border border-accent/20">FEATURED RESOURCE</span>
                    <h3 className="font-bold text-2xl text-primary mb-2">AI-Powered QA: From Theory to Production</h3>
                    <p className="text-tertiary text-sm mb-6">Nov 2025 • Philips, Venzo, Keploy</p>
                    
                    <div className="space-y-3 mb-8 border-t border-white/10 pt-6">
                        <p className="text-secondary text-sm flex gap-2"><ArrowUpRight size={16} className="text-accent" /> Self-healing test frameworks</p>
                        <p className="text-secondary text-sm flex gap-2"><ArrowUpRight size={16} className="text-accent" /> ML-powered test prioritization</p>
                        <p className="text-secondary text-sm flex gap-2"><ArrowUpRight size={16} className="text-accent" /> Measuring ROI from day one</p>
                    </div>

                    <div className="bg-gradient-to-r from-accent/10 to-transparent border-l-2 border-accent p-4 mb-6">
                        <p className="text-white font-bold text-lg">Result: 72% Reduction in Testing Time</p>
                    </div>

                    <button className="w-full py-3 bg-white text-black font-bold font-body rounded-full hover:bg-gray-200 transition-colors">
                        Access Resource
                    </button>
                </div>
            </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default VaultSection;