import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Briefcase, User, Link, CheckCircle, Loader2 } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsappNumber: '',
    linkedinUrl: '',
    role: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Convex mutation to create a signup
  const createSignup = useMutation(api.signups.create);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate all fields
    if (!formData.fullName || !formData.email || !formData.whatsappNumber || !formData.linkedinUrl || !formData.role) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await createSignup({
        fullName: formData.fullName,
        email: formData.email,
        whatsappNumber: formData.whatsappNumber,
        linkedinUrl: formData.linkedinUrl,
        role: formData.role,
      });
      setIsSuccess(true);
      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setFormData({ fullName: '', email: '', whatsappNumber: '', linkedinUrl: '', role: '' });
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="w-full max-w-md bg-[#0F172A] border border-white/10 rounded-3xl p-8 pointer-events-auto relative shadow-2xl shadow-black/50 overflow-hidden"
            >
              {/* Background Glow Effects */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-secondary hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              {/* Success State */}
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle className="text-green-500 mb-4" size={64} />
                  <h2 className="font-display text-2xl font-bold text-white mb-2">
                    Welcome to PayTechTN!
                  </h2>
                  <p className="text-secondary text-sm">
                    You've successfully joined the community. We'll be in touch soon!
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Heading */}
                  <h2 className="font-display text-3xl font-bold text-white mb-8 mt-4">
                    Join the Community
                  </h2>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Form */}
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <label className="text-xs text-secondary font-medium ml-1">Full Name <span className="text-accent">*</span></label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all hover:border-white/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-secondary font-medium ml-1">Email <span className="text-accent">*</span></label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all hover:border-white/20"
                        />
                      </div>
                      <p className="text-[10px] text-tertiary ml-1">Gets workshop updates</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-secondary font-medium ml-1">WhatsApp Number <span className="text-accent">*</span></label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input
                          type="tel"
                          name="whatsappNumber"
                          value={formData.whatsappNumber}
                          onChange={handleChange}
                          placeholder="+91 99999 99999"
                          className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all hover:border-white/20"
                        />
                      </div>
                      <p className="text-[10px] text-tertiary ml-1">Your main channel</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-secondary font-medium ml-1">LinkedIn Profile URL <span className="text-accent">*</span></label>
                      <div className="relative">
                        <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input
                          type="url"
                          name="linkedinUrl"
                          value={formData.linkedinUrl}
                          onChange={handleChange}
                          placeholder="https://linkedin.com/in/username"
                          className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all hover:border-white/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-secondary font-medium ml-1">Role <span className="text-accent">*</span></label>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input
                          type="text"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          placeholder="e.g. Senior QA Engineer"
                          className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all hover:border-white/20"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-slate-900 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors mt-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98] duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Joining...
                        </>
                      ) : (
                        'Join Community'
                      )}
                    </button>
                  </form>

                  <div className="mt-8 text-center">
                    <p className="text-xs text-tertiary max-w-[280px] mx-auto leading-relaxed">
                      By clicking continue, you agree to our <a href="#" className="text-secondary hover:text-white underline decoration-secondary">Terms of Service</a> and <a href="#" className="text-secondary hover:text-white underline decoration-secondary">Privacy Policy</a>.
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};