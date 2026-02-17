import React from 'react';
import { Button } from '../ui/Button';

interface NavbarProps {
    onOpenModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3">
            <div className="font-display font-bold text-xl tracking-tighter text-white">
                PAYTECH<span className="text-accent">TN</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
                <div className="flex gap-6 text-sm font-medium text-slate-300">
                    <a href="#about" className="hover:text-white transition-colors">About</a>
                    <a href="#events" className="hover:text-white transition-colors">Events</a>
                    <a href="#vault" className="hover:text-white transition-colors">Vault</a>
                </div>
                <Button variant="glass" className="px-6 py-2 text-xs" onClick={onOpenModal}>
                    JOIN NOW
                </Button>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;