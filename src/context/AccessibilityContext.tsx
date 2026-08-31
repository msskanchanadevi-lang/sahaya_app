import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TextSize, AppLanguage, VoiceSpeed, AccessibilitySettings } from '../types';
import { TRANSLATIONS, SUPPORTED_LANGUAGES, LanguageMeta } from '../i18n/translations';

interface AccessibilityContextType extends AccessibilitySettings {
  setTextSize: (size: TextSize) => void;
  setHighContrast: (enabled: boolean) => void;
  setReduceMotion: (enabled: boolean) => void;
  setVoiceSpeed: (speed: VoiceSpeed) => void;
  setAutoReadAloud: (enabled: boolean) => void;
  setLanguage: (lang: AppLanguage) => void;
  speak: (text: string, onEnd?: () => void, customLang?: AppLanguage, customRate?: number) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  activeSpokenText: string | null;
  resetAccessibility: () => void;
  t: (key: string, fallback?: string) => string;
  supportedLanguages: LanguageMeta[];
  currentLanguageMeta: LanguageMeta;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSizeState] = useState<TextSize>(() => {
    return (localStorage.getItem('sahaya_text_size') as TextSize) || 'standard';
  });

  const [highContrast, setHighContrastState] = useState<boolean>(() => {
    return localStorage.getItem('sahaya_high_contrast') === 'true';
  });

  const [reduceMotion, setReduceMotionState] = useState<boolean>(() => {
    return localStorage.getItem('sahaya_reduce_motion') === 'true';
  });

  const [voiceSpeed, setVoiceSpeedState] = useState<VoiceSpeed>(() => {
    const saved = localStorage.getItem('sahaya_voice_speed');
    if (saved === '0.8' || saved === '1.0' || saved === '1.2') {
      return Number(saved) as VoiceSpeed;
    }
    return 1.0;
  });

  const [autoReadAloud, setAutoReadAloudState] = useState<boolean>(false);
  
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    const saved = localStorage.getItem('sahaya_language') as AppLanguage;
    if (saved && ['en', 'ta', 'hi', 'te', 'ml', 'mr'].includes(saved)) {
      return saved;
    }
    return 'en';
  });

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [activeSpokenText, setActiveSpokenText] = useState<string | null>(null);

  // Translation helper
  const t = useCallback((key: string, fallback?: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    if (TRANSLATIONS.en && TRANSLATIONS.en[key]) {
      return TRANSLATIONS.en[key];
    }
    return fallback || key;
  }, [language]);

  const currentLanguageMeta = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  // Apply DOM classes whenever settings change
  useEffect(() => {
    const root = document.documentElement;
    
    // Text size class
    root.classList.remove('text-size-standard', 'text-size-large', 'text-size-xl');
    root.classList.add(`text-size-${textSize}`);
    localStorage.setItem('sahaya_text_size', textSize);

    // High contrast class
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    localStorage.setItem('sahaya_high_contrast', String(highContrast));

    // Reduce motion class
    if (reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    localStorage.setItem('sahaya_reduce_motion', String(reduceMotion));

    // Save language
    localStorage.setItem('sahaya_language', language);
    // Save voice speed
    localStorage.setItem('sahaya_voice_speed', String(voiceSpeed));
  }, [textSize, highContrast, reduceMotion, language, voiceSpeed]);

  // Speech Synthesis Helper
  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveSpokenText(null);
    }
  }, []);

  const speak = useCallback((
    text: string, 
    onEnd?: () => void,
    customLang?: AppLanguage,
    customRate?: number
  ) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis is not supported in this browser.');
      return;
    }

    // Cancel any ongoing speech first
    window.speechSynthesis.cancel();

    // Clean text: strip markdown formatting
    const cleanText = text
      .replace(/[*_#`[\]()]/g, '')
      .replace(/\n+/g, ' ')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Set speech rate
    const targetRate = customRate ?? voiceSpeed;
    utterance.rate = targetRate;
    utterance.pitch = 1.0;

    const targetLangCode = customLang || language;
    const targetMeta = SUPPORTED_LANGUAGES.find(l => l.code === targetLangCode) || SUPPORTED_LANGUAGES[0];
    utterance.lang = targetMeta.speechLang;

    // Try to find a matching installed voice for target language
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => 
      v.lang.toLowerCase().startsWith(targetLangCode) || 
      v.lang.toLowerCase().replace('_', '-').startsWith(targetMeta.speechLang.toLowerCase())
    );
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setActiveSpokenText(cleanText);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setActiveSpokenText(null);
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      // Don't treat user cancellations as severe errors
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.error('Speech synthesis error:', e);
      }
      setIsSpeaking(false);
      setActiveSpokenText(null);
    };

    window.speechSynthesis.speak(utterance);
  }, [voiceSpeed, language]);

  const setTextSize = (size: TextSize) => {
    setTextSizeState(size);
  };

  const setHighContrast = (enabled: boolean) => {
    setHighContrastState(enabled);
  };

  const setReduceMotion = (enabled: boolean) => {
    setReduceMotionState(enabled);
  };

  const setVoiceSpeed = (speed: VoiceSpeed) => {
    setVoiceSpeedState(speed);
  };

  const setAutoReadAloud = (enabled: boolean) => {
    setAutoReadAloudState(enabled);
  };

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
  };

  const resetAccessibility = () => {
    setTextSizeState('standard');
    setHighContrastState(false);
    setReduceMotionState(false);
    setVoiceSpeedState(1.0);
    setAutoReadAloudState(false);
    setLanguageState('en');
    stopSpeaking();
  };

  return (
    <AccessibilityContext.Provider
      value={{
        textSize,
        setTextSize,
        highContrast,
        setHighContrast,
        reduceMotion,
        setReduceMotion,
        voiceSpeed,
        setVoiceSpeed,
        autoReadAloud,
        setAutoReadAloud,
        language,
        setLanguage,
        speak,
        stopSpeaking,
        isSpeaking,
        activeSpokenText,
        resetAccessibility,
        t,
        supportedLanguages: SUPPORTED_LANGUAGES,
        currentLanguageMeta,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
