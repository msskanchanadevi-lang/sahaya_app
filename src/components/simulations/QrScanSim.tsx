import React, { useState } from 'react';
import { Camera, CheckCircle2, RotateCcw, Utensils, ExternalLink, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AccessibleButton } from '../ui/AccessibleButton';
import { SpeakButton } from '../ui/SpeakButton';

export const QrScanSim: React.FC = () => {
  const [scanState, setScanState] = useState<'idle' | 'aligned' | 'opened'>('idle');

  const handleAlign = () => {
    setScanState('aligned');
  };

  const handleOpenLink = () => {
    setScanState('opened');
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // safe fallback
    }
  };

  const handleReset = () => {
    setScanState('idle');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E1D8] shadow-md max-w-3xl mx-auto">
      
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E1D8]">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2D5A5A]/10 text-[#2D5A5A] uppercase tracking-wider">
            Simulation 1 • Safe Practice
          </span>
          <h3 className="text-2xl font-bold text-[#1A1A1A] mt-1 font-display">
            Practice Scanning a Restaurant Menu QR Code
          </h3>
          <p className="text-[#5C574F] text-base mt-1">
            Learn the exact 3 steps to open a digital menu without touching any paper.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <SpeakButton 
            textToSpeak="Practice scanning a restaurant QR code. Step 1: Hold camera in front of the code. Step 2: Tap the yellow banner that appears. Step 3: View the menu."
            size="sm"
          />
          <AccessibleButton
            variant="secondary"
            size="sm"
            onClick={handleReset}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Start Over
          </AccessibleButton>
        </div>
      </div>

      {/* Simulated Smartphone Screen Container */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left: Interactive Phone Mockup */}
        <div className="md:col-span-7 flex justify-center">
          <div className="w-full max-w-[320px] h-[520px] bg-neutral-900 rounded-[38px] p-3 shadow-2xl border-4 border-neutral-700 relative flex flex-col justify-between overflow-hidden">
            
            {/* Phone Notch */}
            <div className="w-32 h-5 bg-black rounded-b-xl mx-auto z-20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-neutral-800"></div>
            </div>

            {/* Screen Content Viewport */}
            <div className="relative w-full flex-1 rounded-[26px] overflow-hidden bg-neutral-800 flex flex-col items-center justify-center p-4 text-center select-none">
              
              {scanState === 'idle' && (
                <div className="space-y-4">
                  <div className="w-44 h-44 bg-white p-3 rounded-2xl border-4 border-dashed border-teal-400 mx-auto flex flex-col items-center justify-center relative shadow-inner">
                    {/* Visual QR Code Pattern */}
                    <div className="w-32 h-32 bg-neutral-900 rounded-lg p-2 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div className="w-8 h-8 border-4 border-white bg-black rounded-xs"></div>
                        <div className="w-8 h-8 border-4 border-white bg-black rounded-xs"></div>
                      </div>
                      <div className="flex items-center justify-center">
                        <Utensils className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex justify-between">
                        <div className="w-8 h-8 border-4 border-white bg-black rounded-xs"></div>
                        <div className="w-4 h-4 bg-white rounded-xs"></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-white text-sm font-medium bg-black/60 px-3 py-1.5 rounded-full inline-block">
                    Point camera at the QR code
                  </p>
                </div>
              )}

              {scanState === 'aligned' && (
                <div className="w-full h-full flex flex-col items-center justify-between py-6">
                  <div className="w-44 h-44 bg-white p-3 rounded-2xl border-4 border-emerald-500 mx-auto flex flex-col items-center justify-center relative shadow-md animate-pulse">
                    {/* Detected visual */}
                    <div className="w-32 h-32 bg-neutral-900 rounded-lg p-2 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div className="w-8 h-8 border-4 border-white bg-black rounded-xs"></div>
                        <div className="w-8 h-8 border-4 border-white bg-black rounded-xs"></div>
                      </div>
                      <div className="flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                      </div>
                      <div className="flex justify-between">
                        <div className="w-8 h-8 border-4 border-white bg-black rounded-xs"></div>
                        <div className="w-4 h-4 bg-white rounded-xs"></div>
                      </div>
                    </div>
                  </div>

                  {/* Yellow Banner Notification */}
                  <div className="w-full animate-bounce">
                    <button
                      id="sim-tap-yellow-banner"
                      onClick={handleOpenLink}
                      className="w-full bg-[#FEF08A] hover:bg-[#FDE047] text-neutral-900 p-3 rounded-2xl border-2 border-amber-400 shadow-lg text-left cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Utensils className="w-5 h-5 text-amber-800 shrink-0" />
                        <div>
                          <div className="font-bold text-sm text-neutral-900">Grand Cafe Menu (PDF)</div>
                          <div className="text-xs text-neutral-700">grandcafe.com/menu</div>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-amber-400 text-black text-xs font-bold rounded-lg shrink-0">
                        Tap here!
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {scanState === 'opened' && (
                <div className="w-full h-full bg-[#FAF8F5] rounded-2xl p-4 text-left overflow-y-auto flex flex-col justify-between text-neutral-900">
                  <div>
                    <div className="flex items-center justify-between border-b border-neutral-300 pb-2">
                      <span className="font-display font-bold text-base text-teal-900">Grand Cafe Menu</span>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-green-100 text-green-800 rounded">Open</span>
                    </div>

                    <div className="mt-3 space-y-2 text-xs">
                      <div className="p-2 bg-white rounded-lg border border-neutral-200">
                        <div className="font-bold text-sm">Masala Chai & Samosa</div>
                        <div className="text-neutral-600">Fresh hot tea with herbal spices — $4.50</div>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-neutral-200">
                        <div className="font-bold text-sm">Vegetable Soup Bowl</div>
                        <div className="text-neutral-600">Steamed fresh garden greens — $6.00</div>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-neutral-200">
                        <div className="font-bold text-sm">Warm Apple Pie Slice</div>
                        <div className="text-neutral-600">Served with light cinnamon cream — $5.00</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-neutral-300 text-center">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Successfully Scanned!
                    </span>
                  </div>
                </div>
              )}

            </div>

            {/* Phone Home Indicator */}
            <div className="w-24 h-1 bg-neutral-600 rounded-full mx-auto my-1"></div>
          </div>
        </div>

        {/* Right: Step-by-Step Guidance Controls */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E6DFD5]">
            <h4 className="font-bold text-lg text-[#191E24] mb-2 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#0D6664] text-white flex items-center justify-center text-sm font-bold">
                {scanState === 'idle' ? '1' : scanState === 'aligned' ? '2' : '3'}
              </span>
              <span>
                {scanState === 'idle' && 'Step 1: Point Camera'}
                {scanState === 'aligned' && 'Step 2: Tap the Yellow Banner'}
                {scanState === 'opened' && 'Step 3: Great Job! Menu is Open'}
              </span>
            </h4>
            
            <p className="text-neutral-700 text-base leading-relaxed">
              {scanState === 'idle' && 'Hold your phone in front of the QR code. Tap the button below to simulate aligning the camera lens.'}
              {scanState === 'aligned' && 'Notice how the phone automatically detected the QR code! Now gently tap the yellow banner inside the phone screen.'}
              {scanState === 'opened' && 'You did it! In the real world, your browser opens the exact restaurant menu without typing any long web address.'}
            </p>
          </div>

          <div className="space-y-3">
            {scanState === 'idle' && (
              <AccessibleButton
                id="sim-action-align"
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAlign}
                icon={<Camera className="w-5 h-5" />}
              >
                1. Point & Align Camera
              </AccessibleButton>
            )}

            {scanState === 'aligned' && (
              <AccessibleButton
                id="sim-action-open-link"
                variant="amber"
                size="lg"
                fullWidth
                onClick={handleOpenLink}
                icon={<ExternalLink className="w-5 h-5" />}
              >
                2. Tap to Open Yellow Banner
              </AccessibleButton>
            )}

            {scanState === 'opened' && (
              <div className="space-y-3">
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 font-semibold flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-emerald-600 shrink-0" />
                  <span>Success! You have mastered scanning QR codes.</span>
                </div>
                <AccessibleButton
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={handleReset}
                  icon={<RotateCcw className="w-4 h-4" />}
                >
                  Practice Again
                </AccessibleButton>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
