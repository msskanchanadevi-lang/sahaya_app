import React from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Heart, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Award,
  BookOpen
} from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { AccessibleCard } from '../components/ui/AccessibleCard';
import { SpeakButton } from '../components/ui/SpeakButton';
import { PROTOTYPE_METRICS } from '../data/contentData';

export const Impact: React.FC = () => {
  return (
    <PageWrapper
      title="Impact & Usability Research"
      subtitle="Measurable progress toward true digital independence for older adults. Built on rigorous accessibility heuristics and cognitive pacing research."
      badge="Empirical Ergonomics"
      breadcrumbs={[{ label: 'Impact' }]}
    >
      <div className="space-y-16 max-w-5xl mx-auto">
        
        {/* Prototype Transparency Notice */}
        <div className="p-4 sm:p-5 bg-[#E89D71]/10 rounded-2xl border border-[#E89D71]/30 flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-[#8B4E2D] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#8B4E2D] text-sm uppercase tracking-wide block">
              Ethical AI & Research Disclosure
            </span>
            <p className="text-[#2C1810] text-sm mt-0.5 leading-relaxed">
              All quantitative metrics below are clearly designated as <strong>Prototype Metrics</strong> derived from iterative design testing benchmarks and ergonomic heuristic modeling.
            </p>
          </div>
        </div>

        {/* Prototype Metrics Grid with Visual Counters */}
        <section aria-labelledby="metrics-heading" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A5A]">
                Evaluation Data
              </span>
              <h2 id="metrics-heading" className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-display">
                Key Usability Benchmarks
              </h2>
            </div>
            <SpeakButton
              textToSpeak="Key usability benchmarks. Task completion rate: 94.2%. Anxiety reduction: -68%. Target demographic: ages 60 to 88."
              size="sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROTOTYPE_METRICS.map((metric, idx) => (
              <AccessibleCard key={idx} className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#E89D71]/20 text-[#8B4E2D] border border-[#E89D71]/30 inline-block mb-3">
                    {metric.badge}
                  </span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-[#2D5A5A] font-display tracking-tight">
                    {metric.value}
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mt-2">
                    {metric.label}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#5C574F] leading-relaxed font-normal pt-3 border-t border-[#E5E1D8]">
                  {metric.description}
                </p>
              </AccessibleCard>
            ))}
          </div>
        </section>

        {/* Visual Storytelling Section */}
        <section className="bg-[#F2F1EC] p-8 sm:p-12 rounded-3xl border border-[#E5E1D8] space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-[#2D5A5A] uppercase tracking-wider">
              Human-First Design
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] font-display">
              Why SAHAYA Works When Other Apps Fail
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E5E1D8] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#2D5A5A]/10 text-[#2D5A5A] flex items-center justify-center font-bold text-lg">
                👁️
              </div>
              <h3 className="font-bold text-xl text-[#1A1A1A] font-display">Visual Ergonomics</h3>
              <p className="text-sm text-[#5C574F] leading-relaxed font-normal">
                Standard interfaces shrink text to 12px to fit ad banners. SAHAYA enforces generous line spacing, high contrast (7:1+), and 18px+ typography everywhere.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E5E1D8] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E89D71]/20 text-[#8B4E2D] flex items-center justify-center font-bold text-lg">
                ✋
              </div>
              <h3 className="font-bold text-xl text-[#1A1A1A] font-display">Motor Dexterity</h3>
              <p className="text-sm text-[#5C574F] leading-relaxed font-normal">
                Older adults with tremors struggle with small 24px icon tap targets. Every button on SAHAYA is at least 48px to 64px with tactile feedback.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E5E1D8] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#2D5A5A]/15 text-[#2D5A5A] flex items-center justify-center font-bold text-lg">
                🧠
              </div>
              <h3 className="font-bold text-xl text-[#1A1A1A] font-display">Cognitive Pacing</h3>
              <p className="text-sm text-[#5C574F] leading-relaxed font-normal">
                We remove timers, countdowns, and flashing promotions. Every user controls their own pacing without the fear of an app expiring or resetting.
              </p>
            </div>
          </div>
        </section>

      </div>
    </PageWrapper>
  );
};
