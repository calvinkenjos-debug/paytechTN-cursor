import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Users, Heart, AlertTriangle, MessageCircle } from "lucide-react";

type CodeOfConductModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CodeOfConductModal({ isOpen, onClose }: CodeOfConductModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-auto md:w-full md:max-w-2xl md:max-h-[85vh] rounded-2xl bg-[#0a0f1a] border border-white/10 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[#ff5533]/20">
                  <Shield className="text-[#ff5533]" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Code of Conduct</h2>
                  <p className="text-xs text-slate-400">PayTechTN Community Guidelines</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Intro */}
              <div className="text-sm text-slate-300 leading-relaxed">
                <p>
                  PayTechTN is dedicated to providing a welcoming, inclusive, and harassment-free experience 
                  for everyone in our community—regardless of gender, gender identity, sexual orientation, 
                  disability, physical appearance, body size, race, ethnicity, age, religion, or technology choices.
                </p>
              </div>

              {/* Our Pledge */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Heart className="text-pink-400" size={18} />
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Our Pledge</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-300 pl-6">
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Be respectful and considerate in all interactions</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Welcome newcomers and help them feel included</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Share knowledge generously without gatekeeping</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Give and receive constructive feedback gracefully</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>Focus on what's best for the community</span>
                  </li>
                </ul>
              </div>

              {/* Expected Behavior */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="text-blue-400" size={18} />
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Expected Behavior</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-300 pl-6">
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Use welcoming and inclusive language</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Respect differing viewpoints and experiences</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Accept responsibility and apologize when mistakes are made</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Keep discussions professional and on-topic</span>
                  </li>
                </ul>
              </div>

              {/* Unacceptable Behavior */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="text-red-400" size={18} />
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Unacceptable Behavior</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-300 pl-6">
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Harassment, discrimination, or intimidation in any form</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Trolling, insulting comments, or personal attacks</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Sharing others' private information without consent</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Spam, unsolicited promotions, or recruitment pitches</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Any conduct that could reasonably be considered inappropriate</span>
                  </li>
                </ul>
              </div>

              {/* Reporting */}
              <div className="rounded-xl border border-[#ff5533]/30 bg-[#ff5533]/10 px-5 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="text-[#ff5533]" size={18} />
                  <h3 className="text-sm font-semibold text-white">Report an Issue</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  If you experience or witness any behavior that violates this code of conduct, 
                  please report it immediately to{" "}
                  <a href="mailto:paytechtn@gmail.com" className="text-[#ff5533] hover:underline font-medium">
                    paytechtn@gmail.com
                  </a>
                  . All reports will be handled confidentially.
                </p>
              </div>

              {/* Footer note */}
              <p className="text-xs text-slate-500 text-center pt-2">
                This Code of Conduct is adapted from the Contributor Covenant and applies to all 
                PayTechTN events, online spaces, and community interactions.
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition-colors"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
