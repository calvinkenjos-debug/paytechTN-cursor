import React from 'react';

interface FooterProps {
  onCodeOfConductClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onCodeOfConductClick }) => {
  return (
    <footer className="bg-background py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
                 <div className="font-display font-bold text-2xl tracking-tighter text-white mb-6">PAYTECH<span className="text-accent">TN</span></div>
            </div>
            
            <div>
                <h4 className="font-code text-xs text-tertiary uppercase tracking-widest mb-6">Product</h4>
                <ul className="space-y-4 font-body text-secondary text-sm">
                    <li><a href="#about" className="hover:text-accent transition-colors">Community</a></li>
                    <li><a href="#events" className="hover:text-accent transition-colors">Events</a></li>
                    <li><a href="#join" className="hover:text-accent transition-colors">Sessions</a></li>
                    <li><span className="text-tertiary">Blog (Coming Soon)</span></li>
                </ul>
            </div>

            <div>
                <h4 className="font-code text-xs text-tertiary uppercase tracking-widest mb-6">Connect</h4>
                <ul className="space-y-4 font-body text-secondary text-sm">
                    <li><a href="#about" className="hover:text-accent transition-colors">About</a></li>
                    <li><a href="mailto:paytechtn@gmail.com" className="hover:text-accent transition-colors">Contact</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Partners</a></li>
                    <li>
                      <button 
                        onClick={onCodeOfConductClick}
                        className="hover:text-accent transition-colors text-left"
                      >
                        Code of Conduct
                      </button>
                    </li>
                </ul>
            </div>

            <div>
                <h4 className="font-code text-xs text-tertiary uppercase tracking-widest mb-6">Follow Us</h4>
                <ul className="space-y-4 font-body text-secondary text-sm">
                    <li>
                      <a 
                        href="https://www.linkedin.com/company/paytechtn/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors"
                      >
                        LinkedIn
                      </a>
                    </li>
                    <li><span className="text-tertiary">Twitter (Coming Soon)</span></li>
                    <li><span className="text-tertiary">Discord (Coming Soon)</span></li>
                </ul>
            </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-tertiary">
            <p>&copy; 2025 PayTechTN. Organized by Finzly.</p>
            <p>Built by engineers. For the fintech community.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;