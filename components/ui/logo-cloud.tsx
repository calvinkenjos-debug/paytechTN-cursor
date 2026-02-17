"use client";
import React from "react";
import { InfiniteSlider } from "./infinite-slider";
import { cn } from "../../lib/utils";

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
        "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={80} reverse duration={35} durationOnHover={60}>
        {logos.map((logo) => (
          <div 
            key={`logo-${logo.alt}`}
            className="flex items-center justify-center min-w-[120px]"
          >
            <img
              alt={logo.alt}
              className="pointer-events-none h-10 md:h-12 select-none object-contain max-w-[150px]"
              height={logo.height || 48}
              loading="lazy"
              src={logo.src}
              width={logo.width || "auto"}
              onError={(e) => {
                console.log(`Failed to load: ${logo.src}`);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}
