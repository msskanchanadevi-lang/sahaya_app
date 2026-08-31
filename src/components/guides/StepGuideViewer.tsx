import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  Lightbulb,
  Camera,
  Utensils,
  Phone,
  Video,
  Image,
  Bell,
  Clock,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Guide, GuideStep } from '../../types';
import { AccessibleButton } from '../ui/AccessibleButton';
import { SpeakButton } from '../ui/SpeakButton';
import { useAccessibility } from '../../context/AccessibilityContext';

interface StepGuideViewerProps {
  guide: Guide;
}

export const StepGuideViewer: React.FC<StepGuideViewerProps> = ({ guide }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { speak, autoReadAloud } = useAccessibility();

  const totalSteps = guide.steps.length;
  const currentStep = guide.steps[currentStepIndex];
  const isLastStep = currentStepIndex === totalSteps - 1;
  const isFirstStep = currentStepIndex === 0;

  // Auto read aloud if setting enabled
  useEffect(() => {
    if (autoReadAloud && currentStep) {
      speak(`Step ${currentStep.stepNumber} of ${totalSteps}. ${currentStep.title}. ${currentStep.instruction}`);
    }
  }, [currentStepIndex, autoReadAloud, currentStep, totalSteps, speak]);

  const handleNext = () => {
    if (!completedSteps.includes(currentStepIndex)) {
      setCompletedSteps([...completedSteps, currentStepIndex]);
    }
    if (isLastStep) {
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}
    } else {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setCompletedSteps([]);
  };

  const handleInteractiveStepClick = () => {
    handleNext();
  };

  // Render dedicated visual illustration for this step
  const renderStepVisual = (step: GuideStep) => {
    switch (step.illustrationType) {
      case 'qr_camera':
        return (
          <div className="w-full h-64 bg-neutral-900 rounded-3xl border-4 border-neutral-700 flex flex-col items-center justify-center p-6 text-white relative shadow-inner">
            <div className="w-24 h-24 rounded-2xl border-4 border-teal-400 border-dashed flex items-center justify-center bg-teal-950/40 mb-3 animate-pulse">
              <Camera className="w-12 h-12 text-teal-300" />
            </div>
            <span className="font-bold text-base text-neutral-200">Phone Camera Ready</span>
            <span className="text-xs text-neutral-400 mt-1">Point lens directly at the square code</span>
          </div>
        );

      case 'qr_align':
        return (
          <div className="w-full h-64 bg-neutral-900 rounded-3xl border-4 border-neutral-700 flex flex-col items-center justify-center p-4 relative shadow-inner">
            <div className="relative w-40 h-40 bg-white rounded-2xl p-2 flex flex-col justify-between border-4 border-emerald-500 shadow-lg">
              <div className="flex justify-between">
                <div className="w-6 h-6 bg-black"></div>
                <div className="w-6 h-6 bg-black"></div>
              </div>
              <div className="text-center font-bold text-xs text-neutral-800 flex items-center justify-center gap-1">
                <Utensils className="w-5 h-5 text-teal-700" />
              </div>
              <div className="flex justify-between">
                <div className="w-6 h-6 bg-black"></div>
                <div className="w-4 h-4 bg-teal-600"></div>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-400 mt-2">✓ Square QR in Full Focus</span>
          </div>
        );

      case 'qr_tap':
        return (
          <div className="w-full h-64 bg-neutral-900 rounded-3xl border-4 border-neutral-700 flex flex-col items-center justify-center p-4 relative shadow-inner">
            <div className="w-full max-w-xs bg-[#FEF08A] text-neutral-900 p-4 rounded-2xl border-2 border-amber-400 shadow-xl flex items-center justify-between animate-bounce">
              <div className="flex items-center gap-2">
                <ExternalLink className="w-6 h-6 text-amber-900" />
                <div className="text-left">
                  <div className="font-extrabold text-sm text-neutral-900">restaurant-menu.com</div>
                  <div className="text-xs text-neutral-700">Tap here to view menu</div>
                </div>
              </div>
              <span className="px-3 py-1 bg-amber-400 text-black text-xs font-black rounded-lg">TAP</span>
            </div>
            <span className="text-xs text-neutral-400 mt-4">Banner pops up automatically</span>
          </div>
        );

      case 'call_ringing':
        return (
          <div className="w-full h-64 bg-teal-900 rounded-3xl border-4 border-teal-700 flex flex-col items-center justify-center p-6 text-white relative shadow-inner">
            <div className="w-20 h-20 rounded-full bg-teal-600/60 border-2 border-teal-300 flex items-center justify-center mb-3 animate-pulse">
              <Video className="w-10 h-10 text-white" />
            </div>
            <span className="text-xl font-bold font-display">Grandson Ananya</span>
            <span className="text-sm text-teal-200 mt-1">Starting Video Connection...</span>
          </div>
        );

      case 'call_answer':
      case 'call_speaker':
        return (
          <div className="w-full h-64 bg-emerald-950 rounded-3xl border-4 border-emerald-700 flex flex-col items-center justify-center p-6 text-white relative shadow-inner">
            <div className="w-20 h-20 rounded-full bg-emerald-700 border-2 border-emerald-300 flex items-center justify-center mb-3">
              <Phone className="w-10 h-10 text-white" />
            </div>
            <span className="text-xl font-bold font-display text-emerald-300">Face-to-Face Video Active</span>
            <span className="text-xs text-neutral-300 mt-1">Speak comfortably with hands free</span>
          </div>
        );

      case 'photo_gallery':
      case 'photo_select':
      case 'photo_send':
        return (
          <div className="w-full h-64 bg-[#FAF8F5] rounded-3xl border-4 border-[#E6DFD5] flex flex-col items-center justify-center p-6 text-neutral-900 relative shadow-inner">
            <div className="grid grid-cols-3 gap-2 w-full max-w-xs mb-3">
              <div className="h-16 rounded-xl bg-teal-100 border border-teal-300 flex items-center justify-center text-teal-800 font-bold text-xs">
                🌸 Flower
              </div>
              <div className="h-16 rounded-xl bg-amber-100 border-2 border-amber-500 flex items-center justify-center text-amber-900 font-bold text-xs ring-2 ring-amber-400">
                🎂 Party ✓
              </div>
              <div className="h-16 rounded-xl bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-800 font-bold text-xs">
                🌳 Garden
              </div>
            </div>
            <span className="text-sm font-bold text-teal-900">Select photo & tap Send</span>
          </div>
        );

      case 'alarm_clock':
      case 'alarm_set':
      case 'alarm_save':
        return (
          <div className="w-full h-64 bg-neutral-900 rounded-3xl border-4 border-neutral-700 flex flex-col items-center justify-center p-6 text-white relative shadow-inner">
            <div className="flex items-center gap-3 bg-neutral-800 px-6 py-4 rounded-2xl border border-neutral-600 mb-3">
              <Clock className="w-8 h-8 text-amber-400" />
              <div className="text-left">
                <span className="text-3xl font-black text-amber-300 tracking-wider">08:00 AM</span>
                <span className="text-xs text-neutral-300 block">Morning Medicine Reminder</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-400">✓ Set to Repeat Daily</span>
          </div>
        );

      default:
        return (
          <div className="w-full h-64 bg-neutral-100 rounded-3xl border-2 border-neutral-300 flex items-center justify-center">
            <Lightbulb className="w-12 h-12 text-teal-700" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E1D8] shadow-lg max-w-4xl mx-auto">
      
      {/* Top Guide Meta Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E1D8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2D5A5A]/10 text-[#2D5A5A] uppercase tracking-wider">
              {guide.category}
            </span>
            <span className="text-xs text-[#8C867A] font-semibold">
              ⏱ {guide.estimatedMinutes} mins • {guide.difficulty}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mt-2 font-display">
            {guide.title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <AccessibleButton
            variant="secondary"
            size="sm"
            onClick={handleRestart}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Start Over
          </AccessibleButton>
        </div>
      </div>

      {/* Progress Bar & Step Indicators */}
      <div className="py-6 border-b border-[#E5E1D8]">
        <div className="flex items-center justify-between mb-3 text-sm font-bold text-[#2D5A5A]">
          <span className="text-base sm:text-lg">
            STEP {currentStep.stepNumber} OF {totalSteps}
          </span>
          <span className="text-[#8C867A] font-semibold">
            {Math.round(((currentStepIndex + 1) / totalSteps) * 100)}% Completed
          </span>
        </div>

        {/* Visual Progress Steps Bar */}
        <div className="grid grid-cols-5 gap-2">
          {guide.steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStepIndex(idx)}
              className={`h-3.5 rounded-full transition-all cursor-pointer ${
                idx === currentStepIndex
                  ? 'bg-[#2D5A5A] ring-2 ring-[#2D5A5A]/40 ring-offset-2'
                  : idx < currentStepIndex
                  ? 'bg-[#E89D71]'
                  : 'bg-[#E5E1D8] hover:bg-[#D5D0C5]'
              }`}
              aria-label={`Jump to step ${idx + 1}`}
              title={`Step ${idx + 1}: ${s.title}`}
            />
          ))}
        </div>
      </div>

      {/* Main Single Step Card Focus */}
      <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Clear Visual Demonstration */}
        <div className="lg:col-span-6 flex flex-col items-center">
          {renderStepVisual(currentStep)}

          {/* Interactive Tap Simulation inside Step */}
          {currentStep.interactiveActionLabel && (
            <div className="mt-4 w-full">
              <button
                id={`guide-step-action-${currentStep.stepNumber}`}
                onClick={handleInteractiveStepClick}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#2D5A5A]/10 hover:bg-[#2D5A5A]/15 text-[#2D5A5A] border-2 border-dashed border-[#2D5A5A] font-bold text-base flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Sparkles className="w-5 h-5 text-[#E89D71]" />
                <span>Simulate: {currentStep.interactiveActionLabel}</span>
              </button>
            </div>
          )}
        </div>

        {/* Right: Step Instruction & Human Explanation */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2D5A5A] bg-[#2D5A5A]/10 px-3 py-1 rounded-md">
                Current Instruction
              </span>
              <SpeakButton
                textToSpeak={`${currentStep.title}. ${currentStep.instruction}. ${currentStep.tip ? 'Helpful tip: ' + currentStep.tip : ''}`}
                label="Listen to step"
                size="sm"
              />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] font-display leading-snug">
              {currentStep.title}
            </h3>

            <p className="text-lg sm:text-xl text-[#5C574F] leading-relaxed font-medium">
              {currentStep.instruction}
            </p>
          </div>

          {/* Helpful Senior Tip Box */}
          {currentStep.tip && (
            <div className="p-4 sm:p-5 bg-[#E89D71]/10 rounded-2xl border border-[#E89D71]/30 flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-[#8B4E2D] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#8B4E2D] text-sm uppercase tracking-wide block">
                  Helpful Tip
                </span>
                <p className="text-[#2C1810] text-base mt-0.5 leading-relaxed font-normal">
                  {currentStep.tip}
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Bottom Step Navigation Action Buttons */}
      <div className="pt-6 border-t border-[#E5E1D8] flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Previous Button */}
        <AccessibleButton
          id="guide-prev-step-btn"
          variant="secondary"
          size="lg"
          onClick={handlePrev}
          disabled={isFirstStep}
          icon={<ChevronLeft className="w-6 h-6" />}
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Previous Step
        </AccessibleButton>

        {/* Next / Finish Button */}
        {isLastStep ? (
          <AccessibleButton
            id="guide-finish-step-btn"
            variant="amber"
            size="lg"
            onClick={handleNext}
            icon={<CheckCircle2 className="w-6 h-6" />}
            iconPosition="right"
            className="w-full sm:w-auto"
          >
            Complete Guide & Celebrate!
          </AccessibleButton>
        ) : (
          <AccessibleButton
            id="guide-next-step-btn"
            variant="primary"
            size="lg"
            onClick={handleNext}
            icon={<ChevronRight className="w-6 h-6" />}
            iconPosition="right"
            className="w-full sm:w-auto"
          >
            Next Step ({currentStepIndex + 2} of {totalSteps})
          </AccessibleButton>
        )}

      </div>

      {/* Completion Banner if finished */}
      {completedSteps.includes(totalSteps - 1) && (
        <div className="mt-8 p-6 bg-[#2D5A5A]/10 rounded-3xl border-2 border-[#2D5A5A]/30 text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 bg-[#2D5A5A]/20 text-[#2D5A5A] rounded-full mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#1A1A1A] font-display">
              Wonderful! You Completed This Guide
            </h3>
            <p className="text-[#5C574F] text-base max-w-lg mx-auto mt-1">
              You now know the exact steps for {guide.title}. Ready to test your skills in the safe practice sandbox?
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/try-it">
              <AccessibleButton variant="primary" size="md">
                Try Safe Sandbox Practice
              </AccessibleButton>
            </Link>
            <Link to="/guides">
              <AccessibleButton variant="outline" size="md">
                View All Guides
              </AccessibleButton>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};
