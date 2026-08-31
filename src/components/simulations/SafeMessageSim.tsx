import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle, HelpCircle, RotateCcw } from 'lucide-react';
import { AccessibleButton } from '../ui/AccessibleButton';
import { SpeakButton } from '../ui/SpeakButton';

export const SafeMessageSim: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<'safe' | 'scam' | null>(null);

  const handleChoose = (choice: 'safe' | 'scam') => {
    setSelectedAnswer(choice);
  };

  const handleReset = () => {
    setSelectedAnswer(null);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E6DFD5] shadow-md max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 uppercase tracking-wider">
            Simulation 3 • Security Training
          </span>
          <h3 className="text-2xl font-bold text-[#191E24] mt-1 font-display">
            Practice Spotting a Dangerous SMS / Link
          </h3>
          <p className="text-neutral-600 text-base mt-1">
            Learn the golden rule: Real banks never ask you to click urgent links to unlock your account.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <SpeakButton 
            textToSpeak="Practice identifying a dangerous text message. Notice the urgent threat and suspicious web link. This is a scam message."
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

      <div className="mt-8 space-y-6">
        {/* Simulated Suspicious SMS Message Bubble */}
        <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-neutral-300 max-w-xl mx-auto shadow-inner">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-4 text-xs font-bold text-neutral-500">
            <span>From: +1 (800) 555-0199</span>
            <span>Today, 10:14 AM</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs space-y-2">
            <p className="text-lg font-medium text-neutral-900 leading-snug">
              🚨 <span className="font-bold text-red-600">URGENT WARNING:</span> Your Bank Debit Card has been temporarily BLOCKED due to unusual activity. To reactivate immediately, tap here: <span className="text-blue-600 underline font-semibold">http://bank-unlock-verify99.info/login</span>
            </p>
          </div>
        </div>

        {/* Question & Interactive Choice */}
        <div className="max-w-xl mx-auto text-center space-y-4">
          <h4 className="text-xl font-bold text-[#191E24]">
            What should you do with this text message?
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              id="sim-msg-choose-scam"
              onClick={() => handleChoose('scam')}
              className={`p-5 rounded-2xl border-2 font-bold text-lg cursor-pointer transition-all flex flex-col items-center gap-2 ${
                selectedAnswer === 'scam'
                  ? 'bg-red-50 border-red-600 text-red-900 shadow-md ring-2 ring-red-400'
                  : 'bg-white hover:bg-red-50/50 border-neutral-300 text-neutral-800'
              }`}
            >
              <ShieldAlert className="w-8 h-8 text-red-600" />
              <span>It is a SCAM! Delete it.</span>
            </button>

            <button
              id="sim-msg-choose-safe"
              onClick={() => handleChoose('safe')}
              className={`p-5 rounded-2xl border-2 font-bold text-lg cursor-pointer transition-all flex flex-col items-center gap-2 ${
                selectedAnswer === 'safe'
                  ? 'bg-amber-50 border-amber-600 text-amber-900 shadow-md ring-2 ring-amber-400'
                  : 'bg-white hover:bg-neutral-50 border-neutral-300 text-neutral-800'
              }`}
            >
              <HelpCircle className="w-8 h-8 text-blue-600" />
              <span>Click the link to check</span>
            </button>
          </div>

          {/* Feedback Section */}
          {selectedAnswer === 'scam' && (
            <div className="p-5 bg-emerald-50 border-2 border-emerald-400 rounded-2xl text-left space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-lg">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>Correct! Excellent eye.</span>
              </div>
              <p className="text-emerald-950 text-base leading-relaxed">
                This is 100% a fake scam message. Notice the three red flags:
              </p>
              <ul className="list-disc list-inside text-sm text-emerald-900 space-y-1 font-medium pl-2">
                <li><strong>Urgent panic words:</strong> "BLOCKED", "URGENT WARNING".</li>
                <li><strong>Strange web link:</strong> <code className="bg-emerald-100 px-1 rounded">bank-unlock-verify99.info</code> is not an official bank website.</li>
                <li><strong>Golden Rule:</strong> Real banks will never demand you enter passwords or OTPs through an SMS link.</li>
              </ul>
            </div>
          )}

          {selectedAnswer === 'safe' && (
            <div className="p-5 bg-amber-50 border-2 border-amber-400 rounded-2xl text-left space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-lg">
                <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0" />
                <span>Never click unknown links!</span>
              </div>
              <p className="text-amber-950 text-base">
                Scammers send messages pretending to be your bank to create panic so you click quickly. If you are ever worried about your account, always call the official phone number printed on the back of your physical bank card instead.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
