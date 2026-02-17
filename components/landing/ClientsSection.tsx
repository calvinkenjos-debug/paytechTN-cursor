import React from 'react';
import { cn } from '../../lib/utils';
import { InfiniteSlider } from '../ui/infinite-slider';

// Import logos directly - Vite handles these correctly
import prodocLogo from '../../assets/logos/prodoc.png';
import venzoLogo from '../../assets/logos/venzo.png';
import yethiLogo from '../../assets/logos/yethi.png';
import candescentLogo from '../../assets/logos/candescent.png';
import keployLogo from '../../assets/logos/keploy.png';
import philipsLogo from '../../assets/logos/philips.png';

type Company = {
  name: string;
  logo: string;
  invertColors?: boolean; // For logos with dark text that need to be white
};

const companies: Company[] = [
  { name: "Prodoc", logo: prodocLogo },
  { name: "Venzo", logo: venzoLogo, invertColors: true }, // Dark text → White
  { name: "Yethi", logo: yethiLogo, invertColors: true }, // Dark text → White
  { name: "Candescent", logo: candescentLogo },
  { name: "Keploy", logo: keployLogo },
  { name: "Philips", logo: philipsLogo },
];

const ClientsSection: React.FC = () => {
  return (
    <section className="py-16 bg-black relative overflow-hidden">
      {/* Background glow effect */}
      <div
        aria-hidden="true"
        className={cn(
          "-z-10 -top-1/2 -translate-x-1/2 pointer-events-none absolute left-1/2 h-[60vmin] w-[60vmin] rounded-full",
          "bg-[radial-gradient(ellipse_at_center,rgba(255,85,51,0.08),transparent_50%)]",
          "blur-[30px]"
        )}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Heading */}
        <h2 className="mb-6 text-center font-medium text-xl md:text-2xl tracking-tight">
          <span className="text-white/60">Trusted by experts at</span>
        </h2>

        {/* Top divider */}
        <div className="mx-auto mb-8 h-px max-w-sm bg-white/10 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />

        {/* Logo Carousel */}
        <div className="overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <InfiniteSlider gap={70} reverse duration={35} durationOnHover={60}>
            {companies.map((company) => (
              <div 
                key={company.name}
                className="flex items-center justify-center w-[120px] md:w-[140px] h-10 md:h-12"
              >
                <img
                  alt={company.name}
                  src={company.logo}
                  className={cn(
                    "h-8 md:h-10 w-auto max-w-[120px] md:max-w-[140px] object-contain select-none pointer-events-none",
                    company.invertColors && "invert brightness-100"
                  )}
                />
              </div>
            ))}
          </InfiniteSlider>
        </div>

        {/* Bottom divider */}
        <div className="mt-8 h-px bg-white/10 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
      </div>
    </section>
  );
};

export default ClientsSection;
