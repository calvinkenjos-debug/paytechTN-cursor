import React from 'react';
import { cn } from '../../lib/utils';
import { InfiniteSlider } from "./infinite-slider";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]",
        className
      )}
    >
      <InfiniteSlider 
        gap={60} 
        reverse={false} 
        duration={20}
        children={logos.map((logo) => (
          <div key={`logo-${logo.alt}`} className="flex-shrink-0">
            <img
              alt={logo.alt}
              src={logo.src}
              width={logo.width || 120}
              height={logo.height || 50}
              className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      />
    </div>
  );
}