import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const MotionDiv = motion.div as any;

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      text: "Attended a workshop and found the CTO I was looking for. Best professional move I made this year.",
      author: "Arjun K.",
      role: "QA Lead, TechStartup"
    },
    {
      text: "Connected with architects facing the same zero-downtime challenges. We're now collaborating on a solution.",
      author: "Priya S.",
      role: "VP Engineering, FinBank"
    },
    {
      text: "The community helped me position AI testing correctly to my board. Changed how we budget for tooling.",
      author: "Vikram R.",
      role: "Eng. Manager, PayCorp"
    }
  ];

  return (
    <section className="py-32 px-6 bg-background relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <MotionDiv
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/5 p-8 rounded-lg relative border border-white/5 hover:border-accent/20 transition-all duration-300"
            >
                <Quote className="text-accent mb-6 w-8 h-8 opacity-50" />
                <p className="font-body text-lg text-secondary mb-8 leading-relaxed">
                    "{t.text}"
                </p>
                <div>
                    <div className="font-display font-bold text-primary">{t.author}</div>
                    <div className="font-code text-xs text-tertiary mt-1">{t.role}</div>
                </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;