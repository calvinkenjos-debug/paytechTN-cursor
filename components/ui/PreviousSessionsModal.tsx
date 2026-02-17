import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, History } from "lucide-react";
import { CardStack, CardStackItem } from "./card-stack";
import { ResourceRequestModal } from "./ResourceRequestModal";
import { pastSessions } from "../../data/pastSessions";

type PreviousSessionsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function PreviousSessionsModal({ isOpen, onClose }: PreviousSessionsModalProps) {
  const [resourceModalOpen, setResourceModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<CardStackItem | null>(null);

  const handleAccessResources = (item: CardStackItem) => {
    setSelectedSession(item);
    setResourceModalOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Container - Centered */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-6xl">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute -top-2 right-0 md:top-0 md:-right-12 z-[60] p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-4"
                  >
                    <History size={16} className="text-[#ff5533]" />
                    <span className="text-sm font-medium text-white/80">Past Sessions</span>
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-2xl md:text-3xl font-bold text-white mb-2"
                  >
                    Explore Our Sessions
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/60 text-sm md:text-base max-w-xl mx-auto"
                  >
                    Deep dives from practitioners who've shipped real payment and QA systems. 
                    Swipe or click to explore.
                  </motion.p>
                </div>

                {/* Card Stack */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <CardStack
                    items={pastSessions}
                    initialIndex={0}
                    autoAdvance={false}
                    pauseOnHover
                    showDots
                    cardWidth={480}
                    cardHeight={300}
                    loop
                    onAccessResources={handleAccessResources}
                  />
                </motion.div>

                {/* Footer hint */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-white/40 text-xs mt-6"
                >
                  Use arrow keys or drag to navigate • Click a card to focus
                </motion.p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Resource Request Modal */}
      <ResourceRequestModal
        isOpen={resourceModalOpen}
        onClose={() => setResourceModalOpen(false)}
        sessionId={selectedSession?.id?.toString() || ""}
        sessionTitle={selectedSession?.title || ""}
      />
    </>
  );
}
