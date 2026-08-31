import React, { useState } from 'react';
import { 
  Sparkles, 
  QrCode, 
  PhoneCall, 
  ShieldAlert, 
  Sliders, 
  CheckCircle2, 
  Lightbulb, 
  RotateCcw,
  Volume2
} from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { QrScanSim } from '../components/simulations/QrScanSim';
import { PhoneCallSim } from '../components/simulations/PhoneCallSim';
import { SafeMessageSim } from '../components/simulations/SafeMessageSim';
import { SettingsAdjusterSim } from '../components/simulations/SettingsAdjusterSim';
import { AccessibleButton } from '../components/ui/AccessibleButton';
import { SpeakButton } from '../components/ui/SpeakButton';

export const TryIt: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'qr' | 'call' | 'msg' | 'settings'>('qr');

  return (
    <PageWrapper
      title="Try It Yourself — Safe Practice Sandbox"
      subtitle="Interactive simulations designed for live experimentation. Practice everyday digital actions in a 100% safe, consequence-free environment."
      badge="Live Sandbox Demo"
      breadcrumbs={[{ label: 'Try It Yourself' }]}
    >
      <div className="space-y-10">
        
        {/* Safety Guarantee Highlight */}
        <div className="bg-[#F2F1EC] p-6 sm:p-8 rounded-3xl border border-[#E5E1D8] max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#2D5A5A] text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-7 h-7 text-[#E89D71]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] font-display">
                100% Safe Sandbox Guarantee
              </h3>
              <p className="text-base text-[#5C574F] mt-1 font-normal">
                No real bank cards, calls, or phone settings are affected. Tap freely and learn by doing!
              </p>
            </div>
          </div>
          <SpeakButton
            textToSpeak="Welcome to the safe practice sandbox. Choose any simulation to practice without worry."
            size="sm"
          />
        </div>

        {/* Interactive Simulation Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          
          <button
            id="tab-sim-qr"
            onClick={() => setActiveTab('qr')}
            className={`p-4 rounded-2xl border font-bold text-base flex flex-col items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'qr'
                ? 'bg-[#2D5A5A] text-white border-[#2D5A5A] shadow-md ring-2 ring-[#2D5A5A]/30'
                : 'bg-white text-[#1A1A1A] border-[#E5E1D8] hover:bg-[#F2F1EC]'
            }`}
          >
            <QrCode className={`w-7 h-7 ${activeTab === 'qr' ? 'text-white' : 'text-[#2D5A5A]'}`} />
            <span>1. Scan QR Code</span>
          </button>

          <button
            id="tab-sim-call"
            onClick={() => setActiveTab('call')}
            className={`p-4 rounded-2xl border font-bold text-base flex flex-col items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'call'
                ? 'bg-[#2D5A5A] text-white border-[#2D5A5A] shadow-md ring-2 ring-[#2D5A5A]/30'
                : 'bg-white text-[#1A1A1A] border-[#E5E1D8] hover:bg-[#F2F1EC]'
            }`}
          >
            <PhoneCall className={`w-7 h-7 ${activeTab === 'call' ? 'text-white' : 'text-[#2D5A5A]'}`} />
            <span>2. Answer Phone Call</span>
          </button>

          <button
            id="tab-sim-msg"
            onClick={() => setActiveTab('msg')}
            className={`p-4 rounded-2xl border font-bold text-base flex flex-col items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'msg'
                ? 'bg-[#2D5A5A] text-white border-[#2D5A5A] shadow-md ring-2 ring-[#2D5A5A]/30'
                : 'bg-white text-[#1A1A1A] border-[#E5E1D8] hover:bg-[#F2F1EC]'
            }`}
          >
            <ShieldAlert className={`w-7 h-7 ${activeTab === 'msg' ? 'text-white' : 'text-[#2D5A5A]'}`} />
            <span>3. Spot Fake SMS</span>
          </button>

          <button
            id="tab-sim-settings"
            onClick={() => setActiveTab('settings')}
            className={`p-4 rounded-2xl border font-bold text-base flex flex-col items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'settings'
                ? 'bg-[#2D5A5A] text-white border-[#2D5A5A] shadow-md ring-2 ring-[#2D5A5A]/30'
                : 'bg-white text-[#1A1A1A] border-[#E5E1D8] hover:bg-[#F2F1EC]'
            }`}
          >
            <Sliders className={`w-7 h-7 ${activeTab === 'settings' ? 'text-white' : 'text-[#2D5A5A]'}`} />
            <span>4. Display & Zoom</span>
          </button>

        </div>

        {/* Render Active Simulation Component */}
        <div className="py-2">
          {activeTab === 'qr' && <QrScanSim />}
          {activeTab === 'call' && <PhoneCallSim />}
          {activeTab === 'msg' && <SafeMessageSim />}
          {activeTab === 'settings' && <SettingsAdjusterSim />}
        </div>

      </div>
    </PageWrapper>
  );
};
