import React, { useState } from 'react';
import { Phone, PhoneCall, PhoneOff, Volume2, Mic, MicOff, UserCheck, RotateCcw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AccessibleButton } from '../ui/AccessibleButton';
import { SpeakButton } from '../ui/SpeakButton';

export const PhoneCallSim: React.FC = () => {
  const [callState, setCallState] = useState<'incoming' | 'connected' | 'ended'>('incoming');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeaker, setIsSpeaker] = useState<boolean>(true);

  const handleAnswer = () => {
    setCallState('connected');
    try {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
    } catch {}
  };

  const handleEndCall = () => {
    setCallState('ended');
  };

  const handleReset = () => {
    setCallState('incoming');
    setIsMuted(false);
    setIsSpeaker(true);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E1D8] shadow-md max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E1D8]">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E89D71]/20 text-[#8B4E2D] uppercase tracking-wider">
            Simulation 2 • Safe Practice
          </span>
          <h3 className="text-2xl font-bold text-[#1A1A1A] mt-1 font-display">
            Practice Answering a Family Call & Using Speakerphone
          </h3>
          <p className="text-[#5C574F] text-base mt-1">
            Build confidence answering incoming calls without accidental hang-ups.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <SpeakButton 
            textToSpeak="Practice answering an incoming call from family. Green button accepts the call. Red button ends the call."
            size="sm"
          />
          <AccessibleButton
            variant="secondary"
            size="sm"
            onClick={handleReset}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Reset
          </AccessibleButton>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left: Phone Screen Mockup */}
        <div className="md:col-span-7 flex justify-center">
          <div className="w-full max-w-[320px] h-[520px] bg-neutral-950 rounded-[38px] p-3 shadow-2xl border-4 border-neutral-700 relative flex flex-col justify-between overflow-hidden">
            
            {/* Top Bar */}
            <div className="flex justify-between items-center px-4 pt-2 text-neutral-400 text-xs font-semibold">
              <span>09:41 AM</span>
              <span className="flex items-center gap-1 text-emerald-400">● 5G Wi-Fi</span>
            </div>

            {/* Screen Content */}
            <div className="flex-1 flex flex-col items-center justify-around py-4 text-center">
              
              {/* Caller Avatar */}
              <div className="space-y-3">
                <div className="w-24 h-24 rounded-full bg-teal-100 border-4 border-teal-500 mx-auto flex items-center justify-center text-teal-800 shadow-md">
                  <Heart className="w-12 h-12 text-teal-700 fill-teal-200" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white font-display">Granddaughter Priya</h4>
                  <p className="text-sm font-semibold text-teal-300">
                    {callState === 'incoming' && 'Incoming Family Call...'}
                    {callState === 'connected' && 'Call Connected (00:42)'}
                    {callState === 'ended' && 'Call Finished'}
                  </p>
                </div>
              </div>

              {/* Call Controls State */}
              {callState === 'incoming' && (
                <div className="w-full px-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Big Clear Red Decline */}
                    <button
                      id="sim-call-decline"
                      onClick={handleEndCall}
                      className="py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold flex flex-col items-center gap-1 cursor-pointer transition-all shadow-md active:scale-95"
                    >
                      <PhoneOff className="w-7 h-7" />
                      <span className="text-sm">Decline</span>
                    </button>

                    {/* Big Clear Green Accept */}
                    <button
                      id="sim-call-accept"
                      onClick={handleAnswer}
                      className="py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex flex-col items-center gap-1 cursor-pointer transition-all shadow-lg animate-bounce active:scale-95"
                    >
                      <PhoneCall className="w-7 h-7" />
                      <span className="text-sm font-extrabold">Answer Call</span>
                    </button>
                  </div>
                  <p className="text-xs text-neutral-400">
                    Tap the green "Answer Call" button to speak with Priya.
                  </p>
                </div>
              )}

              {callState === 'connected' && (
                <div className="w-full px-3 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Mute Toggle */}
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-3 rounded-2xl font-bold text-sm flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                        isMuted ? 'bg-amber-500 text-white' : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
                      }`}
                    >
                      {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                      <span>{isMuted ? 'Muted' : 'Mute Mic'}</span>
                    </button>

                    {/* Speakerphone Toggle */}
                    <button
                      onClick={() => setIsSpeaker(!isSpeaker)}
                      className={`p-3 rounded-2xl font-bold text-sm flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                        isSpeaker ? 'bg-teal-600 text-white' : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
                      }`}
                    >
                      <Volume2 className="w-6 h-6" />
                      <span>{isSpeaker ? 'Speaker: ON' : 'Speaker: OFF'}</span>
                    </button>
                  </div>

                  {/* End Call Button */}
                  <button
                    id="sim-call-hangup"
                    onClick={handleEndCall}
                    className="w-full py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <PhoneOff className="w-6 h-6" />
                    <span>End Call</span>
                  </button>
                </div>
              )}

              {callState === 'ended' && (
                <div className="space-y-3">
                  <p className="text-neutral-300 text-sm font-semibold">Call Ended Cleanly.</p>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 rounded-xl bg-teal-700 text-white font-bold text-sm"
                  >
                    Receive Another Call
                  </button>
                </div>
              )}

            </div>

            {/* Bottom notch */}
            <div className="w-24 h-1 bg-neutral-600 rounded-full mx-auto my-1"></div>
          </div>
        </div>

        {/* Right: Explanatory Context */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E6DFD5]">
            <h4 className="font-bold text-lg text-[#191E24] mb-2 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#0D6664] text-white flex items-center justify-center text-sm font-bold">
                ✓
              </span>
              <span>Senior Phone Safety Tip</span>
            </h4>
            <p className="text-neutral-700 text-base leading-relaxed">
              Older adults often accidentally decline calls by swiping in the wrong direction. SAHAYA teaches clear, single-tap confirmation buttons.
            </p>
          </div>

          <div className="space-y-2">
            <div className="p-3 bg-white rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-800 flex items-center gap-2">
              <span className="text-emerald-600 text-lg font-bold">●</span> Green is always for answering and speaking.
            </div>
            <div className="p-3 bg-white rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-800 flex items-center gap-2">
              <span className="text-red-600 text-lg font-bold">●</span> Red is always for finishing and hanging up.
            </div>
            <div className="p-3 bg-white rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-800 flex items-center gap-2">
              <span className="text-teal-600 text-lg font-bold">●</span> Speakerphone helps you hear loudly without holding the phone to your ear.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
