import React from 'react';
import ShaderShowcase from '../ui/hero';

interface HeroSectionProps {
    onOpenModal: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
  return (
    <section>
        <ShaderShowcase onOpenModal={onOpenModal} />
    </section>
  );
};

export default HeroSection;