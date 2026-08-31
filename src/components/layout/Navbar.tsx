import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  HeartHandshake, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Sliders, 
  Sparkles,
  BookOpen,
  Mic,
  Compass,
  Smile,
  ShieldCheck,
  Info
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { LanguageSelector } from '../ui/LanguageSelector';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { 
    textSize, 
    setTextSize, 
    highContrast, 
    setHighContrast, 
    t 
  } = useAccessibility();
  const location = useLocation();

  const navItems = [
    { name: t('nav.home', 'Home'), path: '/', icon: <Smile className="w-4 h-4" /> },
    { name: t('nav.how_it_helps', 'How It Helps'), path: '/how-it-helps', icon: <HeartHandshake className="w-4 h-4" /> },
    { name: t('nav.learn', 'Learn'), path: '/learn', icon: <BookOpen className="w-4 h-4" /> },
    { name: t('nav.guides', 'Guides'), path: '/guides', icon: <Compass className="w-4 h-4" /> },
    { name: t('nav.voice', 'Voice'), path: '/voice', icon: <Mic className="w-4 h-4" /> },
    { name: t('nav.accessibility', 'Accessibility'), path: '/accessibility', icon: <Sliders className="w-4 h-4" /> },
    { name: t('nav.try_it', 'Try It'), path: '/try-it', icon: <Sparkles className="w-4 h-4" /> },
    { name: t('nav.community', 'Community'), path: '/community', icon: <Smile className="w-4 h-4" /> },
    { name: t('nav.impact', 'Impact'), path: '/impact', icon: <ShieldCheck className="w-4 h-4" /> },
    { name: t('nav.about', 'About'), path: '/about', icon: <Info className="w-4 h-4" /> },
  ];

  const cycleTextSize = () => {
    if (textSize === 'standard') setTextSize('large');
    else if (textSize === 'large') setTextSize('xl');
    else setTextSize('standard');
  };

  const getTextSizeLabel = () => {
    if (textSize === 'standard') return 'Text: A (Normal)';
    if (textSize === 'large') return 'Text: A+ (Large)';
    return 'Text: A++ (Extra Large)';
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFCF8]/95 backdrop-blur-md border-b border-[#E5E1D8] transition-colors">
      {/* Top Accessible Quick Bar */}
      <div className="bg-[#F2F1EC] px-4 py-1.5 text-xs text-[#5C574F] border-b border-[#E5E1D8]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#2D5A5A]"></span>
            <span>{t('topbar.elderly_badge', 'Accessibility First Companion for Seniors (60+)')}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Selector Dropdown */}
            <LanguageSelector variant="dropdown" showLabel={false} />

            {/* Quick Text Size cycle */}
            <button
              id="nav-quick-text-resize"
              onClick={cycleTextSize}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FAF8F5] text-[#1A1A1A] font-semibold border border-[#E5E1D8] transition-colors cursor-pointer text-xs flex items-center gap-1 shadow-xs"
              title="Click to increase font size across the entire application"
              aria-label={getTextSizeLabel()}
            >
              <span className="font-bold text-[#2D5A5A]">A±</span>
              <span className="hidden sm:inline">{getTextSizeLabel()}</span>
            </button>

            {/* High Contrast toggle */}
            <button
              id="nav-quick-contrast-toggle"
              onClick={() => setHighContrast(!highContrast)}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FAF8F5] text-[#1A1A1A] font-semibold border border-[#E5E1D8] transition-colors cursor-pointer text-xs flex items-center gap-1 shadow-xs"
              title="Toggle High Contrast mode for maximum visual clarity"
              aria-label={highContrast ? 'Disable high contrast' : 'Enable high contrast'}
            >
              {highContrast ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#E89D71]" />
                  <span className="hidden sm:inline">{t('topbar.normal_mode', 'Normal Mode')}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#5C574F]" />
                  <span className="hidden sm:inline">{t('topbar.high_contrast', 'High Contrast')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Product Brand */}
          <Link 
            to="/" 
            className="flex items-center gap-3.5 group focus-visible:outline-4 focus-visible:outline-[#2D5A5A] rounded-xl p-1"
            aria-label="SAHAYA Home"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#2D5A5A] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#2D5A5A] font-display block leading-none">
                {t('app.name', 'SAHAYA')}
              </span>
              <span className="text-xs font-semibold text-[#8C867A] tracking-wider block mt-1 uppercase">
                {t('app.tagline', 'Digital Companion')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  id={`nav-link-${item.path.replace('/', '') || 'home'}`}
                  className={`px-3.5 py-2.5 rounded-xl font-medium text-base transition-all duration-150 flex items-center gap-1.5 focus-visible:outline-4 focus-visible:outline-[#2D5A5A] ${
                    isActive
                      ? 'bg-[#2D5A5A] text-white shadow-xs font-semibold'
                      : 'text-[#5C574F] hover:bg-[#F2F1EC] hover:text-[#1A1A1A]'
                  }`}
                >
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/voice"
              id="nav-voice-assistant-btn"
              className="px-4 py-2.5 rounded-xl bg-[#2D5A5A]/10 hover:bg-[#2D5A5A]/15 text-[#2D5A5A] border border-[#2D5A5A]/25 font-semibold flex items-center gap-2 text-sm shadow-xs transition-colors"
            >
              <Mic className="w-4 h-4 text-[#2D5A5A] animate-pulse" />
              <span>{t('nav.voice_helper_btn', 'Voice Helper')}</span>
            </Link>

            <Link
              to="/try-it"
              id="nav-try-simulations-btn"
              className="px-5 py-2.5 rounded-xl bg-[#2D5A5A] hover:bg-[#234848] text-white font-semibold text-sm shadow-sm transition-all flex items-center gap-2 hover:shadow"
            >
              <Sparkles className="w-4 h-4 text-[#E89D71]" />
              <span>{t('nav.try_sandbox_btn', 'Try Practice Sandbox')}</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 rounded-xl bg-[#F2F1EC] hover:bg-[#E5E1D8] text-[#1A1A1A] border border-[#E5E1D8] cursor-pointer min-touch-target flex items-center justify-center focus-visible:outline-4 focus-visible:outline-[#2D5A5A]"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer"
          className="xl:hidden bg-[#FDFCF8] border-b-2 border-[#2D5A5A] shadow-xl px-4 pt-3 pb-8 transition-all"
        >
          <div className="text-xs font-bold text-[#8C867A] uppercase tracking-wider mb-2 px-2">
            {t('nav.settings', 'Navigation & Languages')}
          </div>

          {/* Mobile Language Pills */}
          <div className="mb-4 px-2">
            <LanguageSelector variant="pill" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3.5 rounded-xl font-bold text-lg flex items-center gap-3 border transition-colors ${
                    isActive
                      ? 'bg-[#2D5A5A] text-white border-[#2D5A5A]'
                      : 'bg-white text-[#1A1A1A] border-[#E5E1D8] hover:bg-[#F2F1EC]'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-[#2D5A5A]'}>{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E5E1D8] flex flex-col sm:flex-row gap-3">
            <Link
              to="/try-it"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 text-center rounded-xl bg-[#2D5A5A] text-white font-bold text-lg flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-5 h-5 text-[#E89D71]" />
              <span>{t('nav.try_sandbox_btn', 'Interactive Practice Sandbox')}</span>
            </Link>
            <Link
              to="/accessibility"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 text-center rounded-xl bg-[#F2F1EC] text-[#1A1A1A] font-bold text-lg flex items-center justify-center gap-2 border border-[#E5E1D8]"
            >
              <Sliders className="w-5 h-5 text-[#5C574F]" />
              <span>{t('nav.accessibility', 'Accessibility Center')}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

