import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const Journey: React.FC = () => {
  const steps = [
    { title: "Join", desc: "Access past sessions, resources, and the member network." },
    { title: "Attend Events", desc: "Learn from practitioners. Network with peers. Ask hard questions." },
    { title: "Collaborate", desc: "Implement frameworks. Solve problems together. Level up." },
    { title: "Share (Optional)", desc: "Speak at an event. Mentor others. Become a thought leader." },
  ];

  return (
    <section className="py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
            <h2 className="font-display font-bold text-4xl text-primary mb-4">Your Path in the Community</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
                <MotionDiv
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="relative p-6 border-t border-white/10 hover:border-accent transition-colors group"
                >
                    <div className="font-display text-6xl font-bold text-white/5 absolute top-0 right-4 group-hover:text-accent/10 transition-colors">
                        0{i + 1}
                    </div>
                    <h3 className="font-display font-semibold text-2xl text-primary mb-4 mt-8">{step.title}</h3>
                    <p className="font-body text-secondary leading-relaxed">{step.desc}</p>
                </MotionDiv>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;