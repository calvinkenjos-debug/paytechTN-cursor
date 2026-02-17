import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { Button } from './ui/Button';

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-20 pb-32 border-b border-white/5 overflow-hidden">
      
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-40 mix-blend-screen"
        >
          {/* Using a stock video that matches the 'speed lights' aesthetic from the prompt images */}
          <source src="https://cdn.pixabay.com/video/2021/11/14/95679-646756627_large.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-background/90" />
        
        {/* Gradient Overlay for seamless blending with next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Ambient Light Orbs - Kept for brand consistency (Cyan/Indigo) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[128px] pointer-events-none z-0 mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[128px] pointer-events-none z-0 mix-blend-screen" />

      <div className="max-w-4xl w-full mx-auto text-center relative z-10">
        
        {/* Intro Tag */}
        <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
            <Terminal size={14} className="text-accent" />
            <span className="font-code text-xs text-accent tracking-widest uppercase">The Winning Combo</span>
        </MotionDiv>

        {/* Main Headline */}
        <MotionH1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight text-primary mb-8"
        >
          Where Payments <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-indigo-400">
            Industry Leaders
          </span> <br />
          Connect.
        </MotionH1>

        {/* Subhead */}
        <MotionP 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          The community for engineers, architects, and innovators shaping fintech in India. 
          Learn from peers. Build relationships. Move your career forward.
        </MotionP>

        {/* CTAs */}
        <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
            <Button variant="primary">
                Join the Conversation <ArrowRight size={18} />
            </Button>
            <Button variant="secondary">
                Explore Events
            </Button>
        </MotionDiv>

        {/* Floating Code decoration (Abstract) */}
        <MotionDiv 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="absolute -right-12 md:-right-32 top-1/2 -translate-y-1/2 hidden lg:block opacity-30 pointer-events-none"
        >
             <pre className="font-code text-xs text-accent text-left bg-black/40 p-6 rounded border border-white/10 backdrop-blur-sm">
{`const PaymentGateway = {
  status: 'active',
  latency: '12ms',
  encryption: 'AES-256',
  connect: async () => {
    await bridge.init();
  }
};`}
             </pre>
        </MotionDiv>
      </div>
    </section>
  );
};

export default Hero;