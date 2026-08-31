import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface SpeakButtonProps {
  textToSpeak: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
}

export const SpeakButton: React.FC<SpeakButtonProps> = ({
  textToSpeak,
  label = 'Listen aloud',
  size = 'md',
  className = '',
  id,
}) => {
  const { speak, stopSpeaking, isSpeaking, activeSpokenText } = useAccessibility();
  const isThisSpeaking = isSpeaking && activeSpokenText === textToSpeak.replace(/[*_#`[\]]/g, '').trim();

  const handleToggleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isThisSpeaking) {
      stopSpeaking();
    } else {
      speak(textToSpeak);
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5 min-h-[38px]',
    md: 'px-4 py-2 text-base gap-2 min-h-[44px]',
    lg: 'px-5 py-3 text-lg gap-2.5 min-h-[52px]',
  };

  return (
    <button
      id={id || `speak-btn-${Math.random().toString(36).substring(2, 9)}`}
      type="button"
      onClick={handleToggleSpeak}
      aria-label={isThisSpeaking ? 'Stop reading aloud' : `Read aloud: ${label}`}
      className={`inline-flex items-center justify-center font-medium rounded-xl border transition-all cursor-pointer select-none focus-visible:ring-4 focus-visible:ring-[#2D5A5A]/40 ${
        isThisSpeaking
          ? 'bg-[#E89D71] text-[#2C1810] border-[#C97B50] shadow-md animate-pulse'
          : 'bg-white hover:bg-[#2D5A5A]/5 text-[#2D5A5A] border-[#2D5A5A]/30 hover:border-[#2D5A5A] shadow-xs'
      } ${sizeClasses[size]} ${className}`}
    >
      {isThisSpeaking ? (
        <>
          <VolumeX className="w-5 h-5 shrink-0 text-[#2C1810]" aria-hidden="true" />
          <span className="font-semibold text-[#2C1810]">Stop Voice</span>
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5 shrink-0 text-[#2D5A5A]" aria-hidden="true" />
          <span className="font-medium">{label}</span>
        </>
      )}
    </button>
  );
};
