import React from 'react';
import { motion } from 'framer-motion';

const MotionButton = motion.button as any;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "font-body text-sm font-medium px-8 py-3 transition-all duration-300 relative overflow-hidden group rounded-full flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-white text-slate-900 hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]",
    secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/10",
    outline: "border border-white/20 text-white hover:bg-white/10",
    glass: "bg-white/5 text-white hover:bg-white/10 backdrop-blur-md border border-white/10 shadow-sm"
  };

  return (
    <MotionButton 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
      )}
    </MotionButton>
  );
};