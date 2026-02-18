import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '20+',
    label: 'Industry Leaders',
    color: '#ff5533',
  },
  {
    icon: Calendar,
    value: '5',
    label: 'Events',
    color: '#ff5533',
  },
  {
    icon: TrendingUp,
    value: '500+',
    label: 'Professionals Attended',
    color: '#ff5533',
  },
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background glow effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto h-[60vmin] w-[60vmin] rounded-full bg-[#ff5533]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#ff5533]/30 hover:bg-white/10">
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ff5533]/0 to-[#ff5533]/0 opacity-0 transition-opacity duration-300 group-hover:from-[#ff5533]/10 group-hover:to-transparent group-hover:opacity-100" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div
                    className="mb-4 rounded-full p-3 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                      border: `1px solid ${stat.color}30`,
                    }}
                  >
                    <stat.icon
                      size={24}
                      style={{ color: stat.color }}
                      className="transition-colors"
                    />
                  </div>

                  {/* Value */}
                  <div
                    className="mb-2 text-4xl md:text-5xl font-bold tracking-tight transition-colors duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${stat.color}, ${stat.color}CC)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </div>

                  {/* Label */}
                  <div className="text-sm md:text-base font-medium text-white/70 transition-colors duration-300 group-hover:text-white/90">
                    {stat.label}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full transition-all duration-300 group-hover:w-3/4"
                  style={{ backgroundColor: stat.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
