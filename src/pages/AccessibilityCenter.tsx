import React from 'react';
import { 
  Sliders, 
  Type, 
  Sun, 
  Moon, 
  Sparkles, 
  Volume2, 
  Globe, 
  RotateCcw, 
  Check, 
  Eye, 
  ShieldCheck 
} from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { AccessibleCard } from '../components/ui/AccessibleCard';
import { AccessibleButton } from '../components/ui/AccessibleButton';
import { SpeakButton } from '../components/ui/SpeakButton';
import { useAccessibility } from '../context/AccessibilityContext';
import { AppLanguage, TextSize, VoiceSpeed } from '../types';
import { LanguageSelector } from '../components/ui/LanguageSelector';

export const AccessibilityCenter: React.FC = () => {
  const {
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
    resetAccessibility,
    speak,
    t,
    supportedLanguages,
    currentLanguageMeta
  } = useAccessibility();

  const handleTestSpeech = () => {
    let testText = 'This is a demonstration of the current voice speed and clarity setting. Everything is customized for your comfort.';
    if (language === 'ta') {
      testText = 'இது உங்கள் சகாயா குரல் உதவியாளரின் பரிசோதனை ஒலி. உங்களின் சௌகரியத்திற்கு ஏற்ப அனைத்தும் அமைக்கப்பட்டுள்ளது.';
    } else if (language === 'hi') {
      testText = 'यह आपकी सहाय आवाज़ और गति की जाँच है। सब कुछ आपकी सुविधा और सरलता के लिए तैयार किया गया है।';
    } else if (language === 'te') {
      testText = 'ఇది సహాయ వాయిస్ స్పీడ్ పరీక్ష. మీ సౌలభ్యం కోసం అన్నీ సులభంగా తయారు చేయబడ్డాయి.';
    } else if (language === 'ml') {
      testText = 'ഇത് സഹായ ശബ്ദ പരിശോധനയാണ്. നിങ്ങളുടെ സൗകര്യത്തിന് അനുസരിച്ച് എല്ലാം ക്രമീകരിച്ചിരിക്കുന്നു.';
    } else if (language === 'mr') {
      testText = 'हे सहाय व्हॉइस स्पीड चाचणी आहे. आपल्या सोयीसाठी सर्वकाही सहजपणे सानुकूलित केले आहे.';
    }

    speak(testText, undefined, language, voiceSpeed);
  };

  return (
    <PageWrapper
      title={t('a11y.title', 'Accessibility Center')}
      subtitle={t('a11y.subtitle', 'Customize SAHAYA to match your vision, hearing, and motor preferences. All settings update instantly across every page.')}
      badge="Universal Accessibility"
      breadcrumbs={[{ label: t('a11y.title', 'Accessibility Center') }]}
      actions={
        <AccessibleButton
          variant="secondary"
          size="sm"
          onClick={resetAccessibility}
          icon={<RotateCcw className="w-4 h-4" />}
        >
          {t('a11y.reset_btn', 'Reset to Standard')}
        </AccessibleButton>
      }
    >
      <div className="space-y-10 max-w-5xl mx-auto">
        
        {/* Live Visual Preview Card */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#2D5A5A]/30 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E1D8] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A5A] flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>{t('a11y.preview_title', 'Live Visual Typography & Contrast Preview')}</span>
            </span>
            <span className="text-xs font-semibold text-[#8C867A]">
              Current Mode: {textSize.toUpperCase()} Text • {highContrast ? 'High Contrast' : 'Standard Warm'} • {currentLanguageMeta.nativeName}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1A1A1A]">
              "{t('hero.tagline', 'Technology should adapt to people, not force people to adapt to technology.')}"
            </h3>
            <p className="text-lg text-[#5C574F] leading-relaxed font-normal">
              Notice how the text size and contrast throughout this entire window adjust immediately as you change the buttons below.
            </p>
          </div>
        </div>

        {/* Setting Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* 1. Global Text Size */}
          <AccessibleCard className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#2D5A5A]/10 border border-[#2D5A5A]/20 flex items-center justify-center text-[#2D5A5A]">
                  <Type className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] font-display">{t('a11y.text_size_title', 'Text Magnification')}</h3>
                  <span className="text-xs text-[#8C867A] font-semibold">{t('a11y.text_size_sub', 'Scales whole application')}</span>
                </div>
              </div>
              <SpeakButton
                textToSpeak="Text magnification settings. Choose standard, large, or extra large text."
                size="sm"
              />
            </div>

            <p className="text-sm text-[#5C574F] leading-relaxed">
              {t('a11y.text_size_desc', 'Enlarge text size across the navigation, buttons, and step-by-step guides for comfortable reading without glasses.')}
            </p>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <button
                id="setting-text-standard"
                onClick={() => setTextSize('standard')}
                className={`py-3.5 px-2 rounded-2xl font-bold border transition-all cursor-pointer text-center ${
                  textSize === 'standard'
                    ? 'bg-[#2D5A5A] text-white border-[#2D5A5A] shadow-sm ring-2 ring-[#2D5A5A]/30'
                    : 'bg-white text-[#1A1A1A] border-[#E5E1D8] hover:bg-[#F2F1EC]'
                }`}
              >
                <span className="text-sm block">{t('a11y.size_standard', 'Standard')}</span>
                <span className="text-xs opacity-75 font-normal">16px Base</span>
              </button>

              <button
                id="setting-text-large"
                onClick={() => setTextSize('large')}
                className={`py-3.5 px-2 rounded-2xl font-bold border transition-all cursor-pointer text-center ${
                  textSize === 'large'
                    ? 'bg-[#2D5A5A] text-white border-[#2D5A5A] shadow-sm ring-2 ring-[#2D5A5A]/30'
                    : 'bg-white text-[#1A1A1A] border-[#E5E1D8] hover:bg-[#F2F1EC]'
                }`}
              >
                <span className="text-base block">{t('a11y.size_large', 'Large')}</span>
                <span className="text-xs opacity-75 font-normal">18.5px Base</span>
              </button>

              <button
                id="setting-text-xl"
                onClick={() => setTextSize('xl')}
                className={`py-3.5 px-2 rounded-2xl font-bold border transition-all cursor-pointer text-center ${
                  textSize === 'xl'
                    ? 'bg-[#2D5A5A] text-white border-[#2D5A5A] shadow-sm ring-2 ring-[#2D5A5A]/30'
                    : 'bg-white text-[#1A1A1A] border-[#E5E1D8] hover:bg-[#F2F1EC]'
                }`}
              >
                <span className="text-lg block font-extrabold">{t('a11y.size_xl', 'Extra Large')}</span>
                <span className="text-xs opacity-75 font-normal">21px Base</span>
              </button>
            </div>
          </AccessibleCard>

          {/* 2. High Contrast Mode */}
          <AccessibleCard className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E89D71]/20 border border-[#E89D71]/30 flex items-center justify-center text-[#8B4E2D]">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] font-display">{t('a11y.contrast_title', 'High Contrast Mode')}</h3>
                  <span className="text-xs text-[#8C867A] font-semibold">{t('a11y.contrast_sub', 'WCAG AAA Compliance')}</span>
                </div>
              </div>
              <SpeakButton
                textToSpeak="High contrast mode. High contrast creates maximum contrast for low vision."
                size="sm"
              />
            </div>

            <p className="text-sm text-[#5C574F] leading-relaxed">
              {t('a11y.contrast_desc', 'Switches the application to a high-contrast theme with sharp borders and distinct button outlines.')}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                id="setting-contrast-off"
                onClick={() => setHighContrast(false)}
                className={`py-4 px-4 rounded-2xl font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  !highContrast
                    ? 'bg-[#2D5A5A] text-white border-[#2D5A5A] shadow-sm'
                    : 'bg-white text-[#1A1A1A] border-[#E5E1D8] hover:bg-[#F2F1EC]'
                }`}
              >
                <Sun className="w-5 h-5" />
                <span>{t('a11y.contrast_off', 'Warm Normal')}</span>
              </button>

              <button
                id="setting-contrast-on"
                onClick={() => setHighContrast(true)}
                className={`py-4 px-4 rounded-2xl font-bold border-2 transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  highContrast
                    ? 'bg-black text-yellow-300 border-yellow-400 shadow-md ring-2 ring-yellow-400/40'
                    : 'bg-white text-[#1A1A1A] border-[#E5E1D8] hover:bg-[#F2F1EC]'
                }`}
              >
                <Moon className="w-5 h-5" />
                <span>{t('a11y.contrast_on', 'High Contrast')}</span>
              </button>
            </div>
          </AccessibleCard>

          {/* 3. Reduce Motion */}
          <AccessibleCard className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#2D5A5A]/10 border border-[#2D5A5A]/20 flex items-center justify-center text-[#2D5A5A]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] font-display">{t('a11y.motion_title', 'Reduce Motion')}</h3>
                  <span className="text-xs text-[#8C867A] font-semibold">{t('a11y.motion_sub', 'Calm vestibular comfort')}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-[#5C574F] leading-relaxed">
              {t('a11y.motion_desc', 'Disables or removes all sliding, bouncing, and scrolling animations for users prone to dizziness.')}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                id="setting-motion-allow"
                onClick={() => setReduceMotion(false)}
                className={`py-3.5 px-4 rounded-2xl font-bold border transition-all cursor-pointer text-center ${
                  !reduceMotion
                    ? 'bg-[#2D5A5A] text-white border-[#2D5A5A]'
                    : 'bg-white text-[#1A1A1A] border-[#E5E1D8]'
                }`}
              >
                {t('a11y.motion_off', 'Subtle Animations (On)')}
              </button>

              <button
                id="setting-motion-reduce"
                onClick={() => setReduceMotion(true)}
                className={`py-3.5 px-4 rounded-2xl font-bold border transition-all cursor-pointer text-center ${
                  reduceMotion
                    ? 'bg-[#2D5A5A] text-white border-[#2D5A5A]'
                    : 'bg-white text-[#1A1A1A] border-[#E5E1D8]'
                }`}
              >
                {t('a11y.motion_on', 'Reduce Motion (Calm)')}
              </button>
            </div>
          </AccessibleCard>

          {/* 4. Voice Speed & Narration */}
          <AccessibleCard className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#2D5A5A]/10 border border-[#2D5A5A]/20 flex items-center justify-center text-[#2D5A5A]">
                  <Volume2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] font-display">{t('a11y.voice_title', 'Voice & Speech Rate')}</h3>
                  <span className="text-xs text-[#8C867A] font-semibold">{t('a11y.voice_sub', 'Speech Synthesis')}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-[#5C574F] leading-relaxed">
              {t('a11y.voice_desc', 'Control the pacing of voice readouts. The slow pace is optimized for crystal-clear elderly comprehension.')}
            </p>

            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <button
                  id="setting-voice-slow"
                  onClick={() => setVoiceSpeed(0.8)}
                  className={`py-3 px-2 rounded-2xl font-bold border cursor-pointer text-xs sm:text-sm text-center ${
                    voiceSpeed === 0.8
                      ? 'bg-[#2D5A5A] text-white border-[#2D5A5A]'
                      : 'bg-white text-[#1A1A1A] border-[#E5E1D8]'
                  }`}
                >
                  {t('voice.speed_slow', 'Slow (0.8x)')}
                </button>
                <button
                  id="setting-voice-normal"
                  onClick={() => setVoiceSpeed(1.0)}
                  className={`py-3 px-2 rounded-2xl font-bold border cursor-pointer text-xs sm:text-sm text-center ${
                    voiceSpeed === 1.0
                      ? 'bg-[#2D5A5A] text-white border-[#2D5A5A]'
                      : 'bg-white text-[#1A1A1A] border-[#E5E1D8]'
                  }`}
                >
                  {t('voice.speed_normal', 'Normal (1.0x)')}
                </button>
                <button
                  id="setting-voice-fast"
                  onClick={() => setVoiceSpeed(1.2)}
                  className={`py-3 px-2 rounded-2xl font-bold border cursor-pointer text-xs sm:text-sm text-center ${
                    voiceSpeed === 1.2
                      ? 'bg-[#2D5A5A] text-white border-[#2D5A5A]'
                      : 'bg-white text-[#1A1A1A] border-[#E5E1D8]'
                  }`}
                >
                  {t('voice.speed_fast', 'Faster (1.2x)')}
                </button>
              </div>

              <AccessibleButton
                variant="outline"
                size="sm"
                fullWidth
                onClick={handleTestSpeech}
                icon={<Volume2 className="w-4 h-4" />}
              >
                {t('a11y.test_voice_btn', 'Test Voice Audio Output')}
              </AccessibleButton>
            </div>
          </AccessibleCard>

          {/* 5. Language Selector */}
          <AccessibleCard className="p-6 sm:p-8 space-y-6 md:col-span-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E89D71]/20 border border-[#E89D71]/30 flex items-center justify-center text-[#8B4E2D]">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] font-display">{t('a11y.lang_title', 'Language Selection')}</h3>
                  <span className="text-xs text-[#8C867A] font-semibold">{t('a11y.lang_sub', 'Choose your preferred native language')}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-[#5C574F]">
              {t('a11y.lang_desc', 'Switch the entire application, step-by-step guides, and voice assistant to your native language.')}
            </p>

            <LanguageSelector variant="grid" />
          </AccessibleCard>

        </div>

      </div>
    </PageWrapper>
  );
};
