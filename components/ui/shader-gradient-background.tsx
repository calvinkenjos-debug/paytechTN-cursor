"use client"

import type React from "react"
import { useRef } from "react"

interface ShaderGradientBackgroundProps {
  children: React.ReactNode
  className?: string
}

/**
 * PayTechTN Video Background with Brand Color Fusion
 * Colors:
 * - #ff5533 (Brand Orange/Coral)
 * - #7a121d (Dark Red/Maroon)  
 * - #0f2a30 (Dark Teal/Navy)
 * 
 * Video URL (keyword: PAYTECHTN_SPEED_VIDEO):
 * https://cdn.pixabay.com/video/2021/11/14/95679-646756627_large.mp4
 */
export function ShaderGradientBackground({ children, className = "" }: ShaderGradientBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Base dark teal background */}
      <div className="absolute inset-0 bg-[#0f2a30]" />

      {/* Video Background */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-70 mix-blend-screen"
        >
          <source src="/hero-bg-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Color Fusion Gradient Overlay - Brand Orange to Maroon */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff5533]/35 via-[#7a121d]/25 to-transparent mix-blend-overlay pointer-events-none" />
      
      {/* Secondary gradient - Maroon to Dark Teal */}
      <div className="absolute inset-0 bg-gradient-to-tl from-[#0f2a30]/50 via-[#7a121d]/20 to-transparent mix-blend-multiply pointer-events-none" />
      
      {/* Accent glow - Brand Orange highlight in top area */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ff5533]/20 via-transparent to-transparent mix-blend-screen pointer-events-none" />
      
      {/* Dark teal base tint for cohesion */}
      <div className="absolute inset-0 bg-[#0f2a30]/30 mix-blend-multiply pointer-events-none" />
      
      {/* Bottom fade for smooth section transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none" />

      {/* Content */}
      {children}
    </div>
  )
}

export default ShaderGradientBackground
