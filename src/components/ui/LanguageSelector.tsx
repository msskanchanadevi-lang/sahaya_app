import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { AppLanguage } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../i18n/translations';

interface LanguageSelectorProps {
  variant?: 'pill' | 'dropdown' | 'grid';
  showLabel?: boolean;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'dropdown',
  showLabel = true,
  className = '',
}) => {
  const { language, setLanguage, t } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 ${className}`}>
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <button
              key={lang.code}
              id={`lang-btn-${lang.code}`}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={`p-3.5 rounded-2xl font-bold border transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-1 ${
                isSelected
                  ? 'bg-[#2D5A5A] text-white border-[#2D5A5A] shadow-sm ring-2 ring-[#2D5A5A]/30'
                  : 'bg-white text-[#1A1A1A] border-[#E5E1D8] hover:bg-[#F2F1EC] hover:border-[#2D5A5A]/40'
              }`}
              aria-pressed={isSelected}
              aria-label={`Select language ${lang.name} (${lang.nativeName})`}
            >
              <span className="text-base sm:text-lg font-bold block">{lang.nativeName}</span>
              <span className={`text-xs block ${isSelected ? 'text-[#E89D71]' : 'text-[#8C867A]'}`}>
                {lang.name}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'pill') {
    return (
      <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <button
              key={lang.code}
              id={`lang-pill-${lang.code}`}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={`px-3 py-1.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#2D5A5A] text-white shadow-xs'
                  : 'bg-[#F2F1EC] text-[#5C574F] hover:bg-[#E5E1D8] hover:text-[#1A1A1A]'
              }`}
              aria-pressed={isSelected}
            >
              {lang.nativeName}
            </button>
          );
        })}
      </div>
    );
  }

  // Default Dropdown
  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        id="language-selector-dropdown-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#1A1A1A] font-semibold border border-[#E5E1D8] transition-colors cursor-pointer text-xs sm:text-sm flex items-center gap-2 shadow-xs focus-visible:outline-3 focus-visible:outline-[#2D5A5A]"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Current language: ${currentLang.nativeName}. Click to change language.`}
      >
        <Globe className="w-4 h-4 text-[#2D5A5A] shrink-0" />
        <span className="font-bold">{currentLang.nativeName}</span>
        {showLabel && <span className="text-[#8C867A] hidden md:inline">({currentLang.name})</span>}
        <ChevronDown className={`w-3.5 h-3.5 text-[#5C574F] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          id="language-selector-menu"
          className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#FDFCF8] border-2 border-[#2D5A5A] shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-3 py-1.5 border-b border-[#E5E1D8] text-xs font-bold text-[#8C867A] uppercase tracking-wider">
            {t('a11y.lang_title', 'Select Language')}
          </div>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                id={`lang-option-${lang.code}`}
                type="button"
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#2D5A5A]/10 text-[#2D5A5A] font-bold'
                    : 'text-[#1A1A1A] hover:bg-[#F2F1EC]'
                }`}
                role="menuitem"
              >
                <div className="flex flex-col">
                  <span className="font-bold text-base">{lang.nativeName}</span>
                  <span className="text-xs text-[#8C867A]">{lang.name}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#2D5A5A]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
