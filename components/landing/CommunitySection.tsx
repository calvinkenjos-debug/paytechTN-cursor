import React from 'react';
import { LogoCloud } from '../ui/logo-cloud-paytechtn';

const paytechtNLogos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Philips_Logo.svg",
    alt: "Philips",
    width: 120,
    height: 40,
  },
  {
    src: "https://venzo.com/wp-content/uploads/2021/10/venzo-logo.svg",
    alt: "Venzo",
    width: 120,
    height: 40,
  },
  {
    src: "https://avatars.githubusercontent.com/u/90928069?s=200&v=4",
    alt: "Keploy",
    width: 120,
    height: 40,
  },
  {
    src: "/logos/yethi.png",
    alt: "Yethi",
    width: 120,
    height: 40,
  },
  {
    src: "/logos/prodoc.png",
    alt: "Prodoc",
    width: 120,
    height: 40,
  },
];

export default function LogoCloudSection() {
  return (
    <section className="relative py-12 bg-[#0F172A] border-t border-white/5">
      {/* Background blur effect (optional) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -top-1/2 -translate-x-1/2 pointer-events-none left-1/2 h-[120vmin] w-[120vmin] rounded-b-full bg-[radial-gradient(ellipse_at_center,#6366F1_0%,transparent_50%)] blur-[30px] opacity-20"
      />

      <div className="relative mx-auto max-w-5xl px-4 text-center">
        {/* Logo Carousel */}
        <LogoCloud logos={paytechtNLogos} />
      </div>
    </section>
  );
}