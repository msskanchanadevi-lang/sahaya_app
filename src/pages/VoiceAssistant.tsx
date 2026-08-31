import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { VoiceCompanion } from '../components/voice/VoiceCompanion';
import { Heart, Volume2, ShieldCheck } from 'lucide-react';

export const VoiceAssistant: React.FC = () => {
  return (
    <PageWrapper
      title="Voice Assistant & Spoken Companion"
      subtitle="Ask any question aloud or tap a preset prompt. SAHAYA answers in simple, slow, respectful language with immediate helpful actions."
      badge="Voice Support"
      breadcrumbs={[{ label: 'Voice Assistant' }]}
    >
      <div className="space-y-12">
        <VoiceCompanion />

        {/* Informative Guidance Banner */}
        <div className="bg-[#F2F1EC] p-6 sm:p-8 rounded-3xl border border-[#E5E1D8] max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2D5A5A]/10 text-[#2D5A5A] flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[#1A1A1A]">No Robot Jargon</h4>
              <p className="text-xs text-[#5C574F] mt-1">
                Designed to sound like a patient friend, not a complicated computer algorithm.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E89D71]/20 text-[#8B4E2D] flex items-center justify-center shrink-0">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[#1A1A1A]">Calm Pace</h4>
              <p className="text-xs text-[#5C574F] mt-1">
                Voice speech rates are tuned slower with clear articulation for easy hearing.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2D5A5A]/15 text-[#2D5A5A] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[#1A1A1A]">Private & Safe</h4>
              <p className="text-xs text-[#5C574F] mt-1">
                Your speech stays local to your browser session. No personal voice recordings are sold.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
