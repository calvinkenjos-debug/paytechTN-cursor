import React, { useState } from 'react';
import HeroSection from '../components/landing/HeroSection';
import EventsSection from '../components/landing/EventsSection';
// import ClientsSection from '../components/landing/ClientsSection'; // Temporarily hidden - will re-enable when we have logo permissions
import StatsSection from '../components/landing/StatsSection';
import JourneySection from '../components/landing/JourneySection';
import FinzlySection from '../components/landing/FinzlySection';
import FinalCTASection from '../components/landing/FinalCTASection';
import Footer from '../components/landing/Footer';
import { SignUpModal } from '../components/ui/SignUpModal';
import { PreviousSessionsModal } from '../components/ui/PreviousSessionsModal';
import { CodeOfConductModal } from '../components/ui/CodeOfConductModal';
import { FloatingNav } from '../components/ui/floating-navbar';
import { User, Calendar } from 'lucide-react';

const Index: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPastSessionsOpen, setIsPastSessionsOpen] = useState(false);
  const [isCodeOfConductOpen, setIsCodeOfConductOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const openPastSessions = () => setIsPastSessionsOpen(true);
  const openCodeOfConduct = () => setIsCodeOfConductOpen(true);

  const navItems = [
    {
      name: "About",
      link: "#about",
      icon: <User className="h-4 w-4" />,
    },
    {
      name: "Events",
      link: "#events",
      icon: <Calendar className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent selection:text-background tech-grid overflow-hidden">
        <FloatingNav navItems={navItems} onJoinClick={openModal} />

        <main>
            <HeroSection onOpenModal={openModal} />
            <EventsSection />
            <StatsSection />
            {/* <ClientsSection /> */}
            <JourneySection />
            <FinzlySection />
            <FinalCTASection onOpenModal={openModal} onOpenPastSessions={openPastSessions} />
        </main>
        
        <Footer onCodeOfConductClick={openCodeOfConduct} />
        
        {/* Modals */}
        <SignUpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <PreviousSessionsModal isOpen={isPastSessionsOpen} onClose={() => setIsPastSessionsOpen(false)} />
        <CodeOfConductModal isOpen={isCodeOfConductOpen} onClose={() => setIsCodeOfConductOpen(false)} />
    </div>
  );
};

export default Index;