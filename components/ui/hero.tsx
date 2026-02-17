"use client"
import React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { AvatarCircles } from "./avatar-circles"
import { cn } from "../../lib/utils"
import { ShaderGradientBackground } from "./shader-gradient-background"

interface ShaderShowcaseProps {
  onOpenModal?: () => void;
}

const avatarUrls = [
  { imageUrl: "https://avatars.githubusercontent.com/u/16860528", profileUrl: "#" },
  { imageUrl: "https://avatars.githubusercontent.com/u/20110627", profileUrl: "#" },
  { imageUrl: "https://avatars.githubusercontent.com/u/106103625", profileUrl: "#" },
  { imageUrl: "https://avatars.githubusercontent.com/u/59228569", profileUrl: "#" },
];

export default function ShaderShowcase({ onOpenModal }: ShaderShowcaseProps) {
  return (
    <ShaderGradientBackground className="min-h-[100vh] bg-black flex items-center justify-center">
      {/* Background Layer: Animated Gradient Orbs (on top of shader for extra depth) */}
      <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
        {/* Orange/Coral Orb - Brand Color #ff5533 */}
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.35, 0.2],
                x: [0, 50, 0],
                y: [0, -50, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[20%] -right-[10%] w-[90%] h-[90%] rounded-full bg-[#ff5533] blur-[150px] opacity-20 mix-blend-screen" 
        />
        
        {/* Teal Orb */}
        <motion.div 
            animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
                x: [0, -30, 0],
                y: [0, 30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-[20%] -left-[10%] w-[90%] h-[90%] rounded-full bg-[#0f2a30] blur-[150px] opacity-20 mix-blend-screen" 
        />
      </div>

      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 z-[6] opacity-15 pointer-events-none tech-grid" />

      <main className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-16 sm:pt-20 pb-8 sm:pb-0">
        <div className="text-left max-w-4xl">
          <motion.div
            className="flex items-center justify-start mb-4 sm:mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className={cn(
                "rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-1.5 shadow-sm"
              )}
            >
              <span className="text-white font-medium flex items-center gap-2 text-sm sm:text-base">
                ✨ The Winning Combo
              </span>
            </div>
          </motion.div>

          {/* HEADLINE: Optimized typography following UI/UX best practices */}
          <div className="mb-5 md:mb-6 text-white">
            <motion.h1
              className="font-sans font-light leading-[1.15] text-[2rem] sm:text-[2.5rem] md:text-5xl lg:text-6xl tracking-tight text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="whitespace-nowrap">Where Payments & Banking</span>
              <br />
              <span className="whitespace-nowrap">Leaders Connect.</span>
            </motion.h1>
          </div>

          <motion.p
            className="text-base sm:text-lg md:text-xl font-normal text-white/80 mb-6 sm:mb-8 leading-relaxed max-w-2xl font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            The community for engineers, architects, and innovators shaping fintech in India. Learn from peers. Build relationships. Move your career forward.
          </motion.p>

          {/* AVATAR CIRCLES */}
          <motion.div
            className="mb-6 sm:mb-8 md:mb-10 flex items-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
             <AvatarCircles numPeople={50} avatarUrls={avatarUrls} />
             <span className="text-xs sm:text-sm text-white/60 font-medium">Join 50+ Peers</span>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <motion.button
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-[#ff5533] text-white font-bold text-sm sm:text-base transition-all duration-300 hover:bg-[#ff6b4a] shadow-[0_0_30px_rgba(255,83,51,0.4)] font-body flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenModal}
            >
              Join the Conversation <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-transparent border border-white/30 text-white font-medium text-sm sm:text-base transition-all duration-300 hover:bg-white/10 hover:border-white/50 cursor-pointer backdrop-blur-sm font-body"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const eventsSection = document.getElementById('events');
                if (eventsSection) {
                  eventsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Explore Events
            </motion.button>
          </motion.div>
        </div>
      </main>

      {/* Decorative Rotating Build/Innovate Circle */}
      <div className="absolute bottom-12 right-12 z-30 hidden lg:block">
        <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-[#ff5533]/30 animate-[ping_3s_ease-in-out_infinite]" />
            <div className="absolute inset-2 rounded-full border border-white/10" />
            
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transform: "scale(1.6)" }}
          >
            <defs>
              <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
            </defs>
            <text className="text-[10px] fill-white/60 font-medium font-code tracking-widest uppercase">
              <textPath href="#circle" startOffset="0%">
                Build • Innovate • Connect •
              </textPath>
            </text>
          </motion.svg>
        </div>
      </div>
    </ShaderGradientBackground>
  )
}