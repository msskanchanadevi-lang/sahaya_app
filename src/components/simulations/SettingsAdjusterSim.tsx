import React, { useState } from 'react';
import { Sliders, Eye, Sun, Volume2, Type, Sparkles, RotateCcw } from 'lucide-react';
import { AccessibleButton } from '../ui/AccessibleButton';
import { SpeakButton } from '../ui/SpeakButton';

export const SettingsAdjusterSim: React.FC = () => {
  const [simScale, setSimScale] = useState<number>(2); // 1 = Small, 2 = Medium, 3 = Large
  const [simContrast, setSimContrast] = useState<'normal' | 'dark' | 'yellow'>('normal');
  const [simBold, setSimBold] = useState<boolean>(true);

  const handleReset = () => {
    setSimScale(2);
    setSimContrast('normal');
    setSimBold(true);
  };

  const getSimFontClass = () => {
    if (simScale === 1) return 'text-sm';
    if (simScale === 2) return 'text-base';
    return 'text-xl';
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E6DFD5] shadow-md max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 uppercase tracking-wider">
            Simulation 4 • Visual Ergonomics
          </span>
          <h3 className="text-2xl font-bold text-[#191E24] mt-1 font-display">
            Practice Customizing Phone Display & Text Size
          </h3>
          <p className="text-neutral-600 text-base mt-1">
            Test how bigger text and high-contrast colors make reading completely effortless.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <SpeakButton 
            textToSpeak="Practice customizing phone display. Change the text size slider and color mode to find what feels most comfortable for your eyes."
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
        
        {/* Left: Controls */}
        <div className="md:col-span-6 space-y-6">
          
          {/* Text Size Control */}
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E6DFD5] space-y-3">
            <label className="text-base font-bold text-[#191E24] flex items-center gap-2">
              <Type className="w-5 h-5 text-teal-700" />
              <span>Simulated Text Size</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSimScale(1)}
                className={`py-3 rounded-xl font-bold border-2 cursor-pointer text-sm ${
                  simScale === 1
                    ? 'bg-[#0D6664] text-white border-[#0D6664]'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => setSimScale(2)}
                className={`py-3 rounded-xl font-bold border-2 cursor-pointer text-base ${
                  simScale === 2
                    ? 'bg-[#0D6664] text-white border-[#0D6664]'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                }`}
              >
                Large
              </button>
              <button
                onClick={() => setSimScale(3)}
                className={`py-3 rounded-xl font-bold border-2 cursor-pointer text-lg ${
                  simScale === 3
                    ? 'bg-[#0D6664] text-white border-[#0D6664]'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                }`}
              >
                Extra Large
              </button>
            </div>
          </div>

          {/* Color Mode */}
          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E6DFD5] space-y-3">
            <label className="text-base font-bold text-[#191E24] flex items-center gap-2">
              <Sun className="w-5 h-5 text-teal-700" />
              <span>Color Contrast Mode</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSimContrast('normal')}
                className={`py-2.5 px-2 rounded-xl font-bold border-2 cursor-pointer text-xs sm:text-sm ${
                  simContrast === 'normal'
                    ? 'bg-teal-800 text-white border-teal-800'
                    : 'bg-white text-neutral-700 border-neutral-300'
                }`}
              >
                Warm White
              </button>
              <button
                onClick={() => setSimContrast('dark')}
                className={`py-2.5 px-2 rounded-xl font-bold border-2 cursor-pointer text-xs sm:text-sm ${
                  simContrast === 'dark'
                    ? 'bg-neutral-900 text-white border-white'
                    : 'bg-neutral-900 text-neutral-300 border-neutral-700'
                }`}
              >
                Deep Dark
              </button>
              <button
                onClick={() => setSimContrast('yellow')}
                className={`py-2.5 px-2 rounded-xl font-bold border-2 cursor-pointer text-xs sm:text-sm ${
                  simContrast === 'yellow'
                    ? 'bg-black text-yellow-300 border-yellow-400'
                    : 'bg-black text-yellow-400 border-neutral-800'
                }`}
              >
                High Yellow
              </button>
            </div>
          </div>

          {/* Bold toggle */}
          <button
            onClick={() => setSimBold(!simBold)}
            className="w-full py-3 px-4 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 font-bold text-sm text-[#191E24] flex items-center justify-between cursor-pointer"
          >
            <span>Enhanced Bold Text</span>
            <span className={`px-2.5 py-1 rounded text-xs ${simBold ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-700'}`}>
              {simBold ? 'Enabled' : 'Disabled'}
            </span>
          </button>

        </div>

        {/* Right: Live Interactive Phone Screen Preview */}
        <div className="md:col-span-6 flex justify-center">
          <div className="w-full max-w-[300px] min-h-[460px] bg-neutral-900 rounded-[36px] p-3 shadow-xl border-4 border-neutral-700 flex flex-col justify-between">
            
            {/* Phone header */}
            <div className="text-center text-xs text-neutral-400 py-1">
              Live Phone Preview
            </div>

            {/* Screen Content */}
            <div
              className={`flex-1 rounded-[22px] p-4 transition-all overflow-hidden flex flex-col justify-between ${
                simContrast === 'normal'
                  ? 'bg-[#FAF8F5] text-neutral-900'
                  : simContrast === 'dark'
                  ? 'bg-neutral-950 text-white'
                  : 'bg-black text-[#FACC15]'
              }`}
            >
              <div className="space-y-3">
                <div className="border-b pb-2 border-current/20 flex justify-between items-center">
                  <span className={`font-bold ${simBold ? 'font-black' : 'font-medium'} ${getSimFontClass()}`}>
                    Medicine List
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-current/10">Today</span>
                </div>

                <div className={`space-y-2 ${getSimFontClass()} ${simBold ? 'font-bold' : 'font-normal'}`}>
                  <div className="p-2.5 rounded-xl border border-current/20 bg-current/5">
                    <div>💊 08:00 AM</div>
                    <div className="text-xs opacity-80">Blood Pressure tablet with warm water</div>
                  </div>

                  <div className="p-2.5 rounded-xl border border-current/20 bg-current/5">
                    <div>💧 01:00 PM</div>
                    <div className="text-xs opacity-80">Vitamin D3 drop after lunch</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-current/20 text-center">
                <span className="text-xs font-semibold opacity-90">
                  {simScale === 3 ? '✓ Extra Large Readability' : simScale === 2 ? '✓ Large Readability' : 'Normal Size'}
                </span>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="w-20 h-1 bg-neutral-600 rounded-full mx-auto my-1"></div>
          </div>
        </div>

      </div>
    </div>
  );
};
