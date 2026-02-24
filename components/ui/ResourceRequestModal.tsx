import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface ResourceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
  sessionTitle: string;
}

export function ResourceRequestModal({ 
  isOpen, 
  onClose, 
  sessionId, 
  sessionTitle 
}: ResourceRequestModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const createResourceRequest = useMutation(api.resourceRequests.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      await createResourceRequest({
        email,
        sessionId,
        sessionTitle,
      });
      setIsSuccess(true);
      setTimeout(() => {
        setEmail("");
        setIsSuccess(false);
        onClose();
      }, 2500);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
          />

          {/* Modal - Properly centered for all screen sizes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-[#0f1a24] to-[#0a0f1a] border border-white/10 shadow-2xl overflow-hidden">
              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#ff5533]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#0f2a30]/40 rounded-full blur-3xl pointer-events-none" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="relative p-6">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <CheckCircle className="text-emerald-400" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Request Sent!</h3>
                    <p className="text-white/60 text-sm">
                      We'll send you the resources shortly.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#ff5533]/20 flex items-center justify-center">
                        <Sparkles className="text-[#ff5533]" size={24} />
                      </div>
                      <h2 className="text-xl font-bold text-white mb-2">
                        Access Resources
                      </h2>
                      <p className="text-sm text-white/60 leading-relaxed">
                        Get exclusive materials from
                      </p>
                      <p className="text-sm font-medium text-[#ff5533] mt-1">
                        "{sessionTitle}"
                      </p>
                    </div>

                    {/* Error */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
                      >
                        {error}
                      </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                        <input
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                          }}
                          placeholder="Enter your email"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#ff5533]/50 focus:ring-1 focus:ring-[#ff5533]/30 transition-all"
                          autoComplete="email"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded-xl bg-[#ff5533] text-white font-semibold hover:bg-[#ff6b4a] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Get Resources"
                        )}
                      </button>
                    </form>

                    {/* Footer note */}
                    <p className="mt-4 text-xs text-white/40 text-center">
                      We'll email you the session materials. No spam, ever.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
