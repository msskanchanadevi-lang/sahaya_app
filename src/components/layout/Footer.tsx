import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, PhoneCall, Sliders, ShieldCheck, ArrowUp, Sparkles, Volume2 } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const Footer: React.FC = () => {
  const { speak } = useAccessibility();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C2424] text-[#F3F4F6] border-t-4 border-[#2D5A5A] pt-16 pb-24 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Highlight Banner */}
        <div className="bg-[#263030] rounded-3xl p-6 sm:p-8 border border-[#3A4646] mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#2D5A5A]/40 border border-[#2D5A5A] flex items-center justify-center text-[#E89D71] shrink-0">
              <PhoneCall className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Need a human voice or patient help?
              </h3>
              <p className="text-base text-neutral-300 mt-1">
                SAHAYA is built on empathy. Practice as many times as you like with zero rush or pressure.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/voice"
              className="px-6 py-3.5 rounded-xl bg-[#2D5A5A] hover:bg-[#234848] text-white font-bold text-base flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Volume2 className="w-5 h-5 text-[#E89D71]" />
              <span>Open Voice Companion</span>
            </Link>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D5A5A] flex items-center justify-center text-white">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold font-display text-white">SAHAYA</span>
            </div>
            <p className="text-neutral-300 text-base leading-relaxed">
              "Technology should adapt to people, not force people to adapt to technology."
            </p>
            <p className="text-xs text-neutral-400">
              A human-centered digital companion crafted for adults aged 60 and above.
            </p>
          </div>

          {/* Col 2: Learning & Guides */}
          <div>
            <h4 className="text-lg font-bold text-[#E89D71] mb-4 uppercase tracking-wider">
              Learning & Guides
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/learn" className="text-neutral-300 hover:text-white text-base font-medium flex items-center gap-2">
                  <span>→</span> Learning Hub (4 Categories)
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-neutral-300 hover:text-white text-base font-medium flex items-center gap-2">
                  <span>→</span> Step-by-Step Interactive Guides
                </Link>
              </li>
              <li>
                <Link to="/guides/guide-qr-code" className="text-neutral-300 hover:text-white text-base font-medium flex items-center gap-2">
                  <span>→</span> How to Scan a QR Code
                </Link>
              </li>
              <li>
                <Link to="/guides/guide-video-call" className="text-neutral-300 hover:text-white text-base font-medium flex items-center gap-2">
                  <span>→</span> How to Make a Video Call
                </Link>
              </li>
              <li>
                <Link to="/guides/guide-medication-reminder" className="text-neutral-300 hover:text-white text-base font-medium flex items-center gap-2">
                  <span>→</span> Medication Reminder Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Interactive Tools */}
          <div>
            <h4 className="text-lg font-bold text-[#E89D71] mb-4 uppercase tracking-wider">
              Interactive Tools
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/try-it" className="text-neutral-300 hover:text-white text-base font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E89D71]" />
                  <span>Practice Sandboxes (Simulations)</span>
                </Link>
              </li>
              <li>
                <Link to="/voice" className="text-neutral-300 hover:text-white text-base font-medium flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[#E89D71]" />
                  <span>Voice Assistant Interface</span>
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-neutral-300 hover:text-white text-base font-medium flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-neutral-400" />
                  <span>Accessibility Center</span>
                </Link>
              </li>
              <li>
                <Link to="/how-it-helps" className="text-neutral-300 hover:text-white text-base font-medium flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>7 Real Problems We Solve</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Community & About */}
          <div>
            <h4 className="text-lg font-bold text-[#E89D71] mb-4 uppercase tracking-wider">
              Community & Mission
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/community" className="text-neutral-300 hover:text-white text-base font-medium flex items-center gap-2">
                  <span>→</span> Stories & Family Support
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-neutral-300 hover:text-white text-base font-medium flex items-center gap-2">
                  <span>→</span> Prototype Metrics & Impact
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-white text-base font-medium flex items-center gap-2">
                  <span>→</span> Design Principles & Ergonomics
                </Link>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-neutral-800">
              <button
                id="footer-back-to-top"
                type="button"
                onClick={scrollToTop}
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors w-full justify-center"
              >
                <ArrowUp className="w-4 h-4" />
                <span>Back to Top of Page</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer and Accessibility Standard */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
          <p>
            © {new Date().getFullYear()} SAHAYA Project. Designed for human dignity and universal digital accessibility (WCAG 2.2 AAA conscious).
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span className="px-2.5 py-1 rounded bg-[#263030] text-neutral-300 border border-[#3A4646]">
              Senior Ergonomics Certified
            </span>
            <span className="px-2.5 py-1 rounded bg-[#263030] text-neutral-300 border border-[#3A4646]">
              Safe Sandbox Environment
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
