import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const data = [
  { name: 'Engineers & Architects', value: 64, color: '#22D3EE' }, // Accent
  { name: 'Product & Finance', value: 23, color: '#818CF8' }, // Indigo
  { name: 'Founders', value: 13, color: '#F472B6' }, // Pink
];

const CommunityStats: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <MotionDiv
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
        >
            <h2 className="font-display font-semibold text-4xl text-primary mb-6">Who's In the Room?</h2>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <span className="font-display text-5xl font-bold text-accent">64%</span>
                    <span className="font-body text-lg text-secondary">Engineers & Architects</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="font-display text-4xl font-bold text-indigo-400">23%</span>
                    <span className="font-body text-lg text-secondary">Product & Finance Leaders</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="font-display text-3xl font-bold text-pink-400">13%</span>
                    <span className="font-body text-lg text-secondary">Founders & Decision-Makers</span>
                </div>
            </div>
            
            <p className="mt-12 font-body text-xl text-primary">
                Real companies. Real problems. Real networking.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Logo Placeholders using text for simplicity as no images provided */}
                {['Philips', 'Venzo', 'Keploy', 'Finzly', 'StartupTN'].map(brand => (
                    <span key={brand} className="text-xl font-display font-bold text-white/40">{brand}</span>
                ))}
            </div>
        </MotionDiv>

        <div className="h-[400px] w-full relative">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', color: '#F8FAFC' }}
                    itemStyle={{ color: '#F8FAFC' }}
                  />
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="text-center">
                     <span className="block font-display text-3xl text-white font-bold">100%</span>
                     <span className="text-xs text-secondary uppercase tracking-widest">Practitioners</span>
                 </div>
             </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityStats;