import React from 'react';
import { Link } from 'react-router-dom';
import { Sliders, Sun, Moon, Volume2, ZoomIn, ZoomOut, Check } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const AccessibilityBar: React.FC = () => {
  const { 
    textSize, 
    setTextSize, 
    highContrast, 
    setHighContrast, 
    speak, 
    isSpeaking, 
    stopSpeaking,
    language,
    voiceSpeed,
    t
  } = useAccessibility();

  const handleReadCurrentPage = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      // Find main heading and main content on the screen
      const heading = document.querySelector('h1')?.textContent || t('app.name', 'SAHAYA');
      const intro = document.querySelector('p')?.textContent || '';
      speak(`${heading}. ${intro}`, undefined, language, voiceSpeed);
    }
  };

  return (
    <aside 
      aria-label="Quick Accessibility Tools" 
      className="fixed bottom-4 right-4 sm:right-6 z-30 flex flex-col sm:flex-row items-end sm:items-center gap-2 bg-[#FDFCF8]/95 backdrop-blur-md p-2 rounded-2xl border-2 border-[#2D5A5A] shadow-xl transition-all"
    >
      <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#E5E1D8]">
        
        {/* Text Size Control A / A+ / A++ */}
        <span className="text-xs font-bold px-1 text-[#8C867A] uppercase tracking-tight">Text:</span>
        <button
          id="quickbar-text-standard"
          onClick={() => setTextSize('standard')}
          className={`px-2.5 py-1.5 rounded-lg font-bold text-sm transition-all cursor-pointer ${
            textSize === 'standard'
              ? 'bg-[#2D5A5A] text-white'
              : 'text-[#5C574F] hover:bg-[#F2F1EC]'
          }`}
          aria-label={t('a11y.size_standard', 'Standard')}
          title="Standard Text Size"
        >
          A
        </button>
        <button
          id="quickbar-text-large"
          onClick={() => setTextSize('large')}
          className={`px-2.5 py-1.5 rounded-lg font-bold text-base transition-all cursor-pointer ${
            textSize === 'large'
              ? 'bg-[#2D5A5A] text-white'
              : 'text-[#5C574F] hover:bg-[#F2F1EC]'
          }`}
          aria-label={t('a11y.size_large', 'Large')}
          title="Large Text Size (18.5px)"
        >
          A+
        </button>
        <button
          id="quickbar-text-xl"
          onClick={() => setTextSize('xl')}
          className={`px-2.5 py-1.5 rounded-lg font-bold text-lg transition-all cursor-pointer ${
            textSize === 'xl'
              ? 'bg-[#2D5A5A] text-white'
              : 'text-[#5C574F] hover:bg-[#F2F1EC]'
          }`}
          aria-label={t('a11y.size_xl', 'Extra Large')}
          title="Extra Large Text Size (21px)"
        >
          A++
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Read Page button */}
        <button
          id="quickbar-listen-page"
          onClick={handleReadCurrentPage}
          className={`px-3 py-2 rounded-xl font-bold text-sm flex items-center gap-1.5 cursor-pointer border transition-all ${
            isSpeaking
              ? 'bg-[#E89D71] text-[#2C1810] border-[#C97B50] animate-pulse'
              : 'bg-white text-[#2D5A5A] border-[#E5E1D8] hover:bg-[#F2F1EC]'
          }`}
          aria-label={isSpeaking ? t('voice.stop_speaking', 'Stop') : t('voice.listen_again', 'Listen')}
        >
          <Volume2 className="w-4 h-4 text-current" />
          <span className="hidden md:inline">{isSpeaking ? t('voice.stop_speaking', 'Stop') : t('voice.listen_again', 'Listen')}</span>
        </button>

        {/* Contrast Toggle */}
        <button
          id="quickbar-contrast"
          onClick={() => setHighContrast(!highContrast)}
          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white text-[#1A1A1A] border border-[#E5E1D8] hover:bg-[#F2F1EC] font-bold text-sm flex items-center gap-1.5 cursor-pointer"
          aria-label={highContrast ? t('topbar.normal_mode', 'Normal Mode') : t('topbar.high_contrast', 'High Contrast')}
          title="Toggle High Contrast Mode"
        >
          {highContrast ? <Sun className="w-4 h-4 text-[#E89D71]" /> : <Moon className="w-4 h-4 text-[#5C574F]" />}
          <span className="hidden md:inline">{highContrast ? t('a11y.contrast_off', 'Normal') : t('a11y.contrast_on', 'Contrast')}</span>
        </button>

        {/* Full Accessibility Settings Center Link */}
        <Link
          to="/accessibility"
          id="quickbar-open-center"
          className="px-3.5 py-2 rounded-xl bg-[#2D5A5A] hover:bg-[#234848] text-white font-bold text-sm flex items-center gap-1.5 shadow-sm"
          title="Open full Accessibility Settings"
          aria-label="Open full Accessibility Center"
        >
          <Sliders className="w-4 h-4" />
          <span className="hidden sm:inline">{t('nav.settings', 'Settings')}</span>
        </Link>
      </div>
    </aside>
  );
};

