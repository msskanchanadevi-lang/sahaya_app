import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartHandshake, 
  Eye, 
  Sliders, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  Award,
  ArrowRight
} from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { AccessibleCard } from '../components/ui/AccessibleCard';
import { AccessibleButton } from '../components/ui/AccessibleButton';
import { SpeakButton } from '../components/ui/SpeakButton';

export const About: React.FC = () => {
  return (
    <PageWrapper
      title="About SAHAYA & Design Philosophy"
      subtitle="Technology should adapt to people, not force people to adapt to technology."
      badge="Design Challenge"
      breadcrumbs={[{ label: 'About' }]}
    >
      <div className="space-y-16 max-w-5xl mx-auto">
        
        {/* Core Philosophy Banner */}
        <div className="bg-[#F2F1EC] p-8 sm:p-12 rounded-3xl border border-[#E5E1D8] space-y-4 text-center max-w-3xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#2D5A5A] text-white mx-auto flex items-center justify-center shadow-sm">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] font-display">
            "Technology should adapt to people, not force people to adapt to technology."
          </h2>
          <p className="text-lg text-[#5C574F] leading-relaxed font-normal">
            SAHAYA was created to address one of the most pressing yet overlooked human challenges in the modern digital age: the systemic exclusion of older adults from everyday digital tools.
          </p>
        </div>

        {/* The Problem: Why Older Adults Are Overlooked */}
        <section aria-labelledby="problem-heading" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 id="problem-heading" className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-display">
              Why Older Adults Are Overlooked in Tech
            </h2>
            <SpeakButton
              textToSpeak="Why older adults are overlooked in technology. Modern design assumes young users with decades of digital intuition and perfect eyesight."
              size="sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#5C574F] text-base sm:text-lg leading-relaxed font-normal">
            <div className="space-y-4">
              <p>
                Over 1 billion people worldwide are over the age of 60. Yet, the vast majority of consumer applications are created by product teams in their 20s and 30s who design for their own reflexes, high-resolution screens, and 20/20 vision.
              </p>
              <p>
                When apps update, navigation elements change without explanation. Hidden swipe gestures replace clear labeled buttons. Microscopic gray text on white backgrounds becomes unreadable for older eyes experiencing normal presbyopia.
              </p>
            </div>

            <div className="space-y-4">
              <p>
                The consequence is not just technical inconvenience—it is <strong>social exclusion and emotional vulnerability</strong>. Seniors become dependent on busy relatives for basic tasks like paying bills, booking doctor visits, or seeing grandchildren on video.
              </p>
              <p className="p-4 bg-[#2D5A5A]/10 rounded-2xl border border-[#2D5A5A]/20 text-[#1A1A1A] font-medium">
                SAHAYA restores digital independence with a dignified, patient, and accessible companion.
              </p>
            </div>
          </div>
        </section>

        {/* 4 Core Accessibility Pillars */}
        <section aria-labelledby="accessibility-pillars-heading" className="space-y-6">
          <h2 id="accessibility-pillars-heading" className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-display">
            Our 4 Accessibility Foundations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AccessibleCard className="p-8 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#2D5A5A]/10 text-[#2D5A5A] flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] font-display">
                Optical Contrast & Generous Typography
              </h3>
              <p className="text-[#5C574F] text-base leading-relaxed font-normal">
                Minimum 18px body copy with WCAG AAA 7:1+ contrast ratios. Warm off-white backgrounds eliminate harsh glare while maintaining crisp readability.
              </p>
            </AccessibleCard>

            <AccessibleCard className="p-8 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E89D71]/20 text-[#8B4E2D] flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] font-display">
                Zero Hidden Gestures & 48px+ Targets
              </h3>
              <p className="text-[#5C574F] text-base leading-relaxed font-normal">
                Every interactive element features an explicit text label and a minimum 48px to 64px touch target with clear keyboard focus indicators.
              </p>
            </AccessibleCard>

            <AccessibleCard className="p-8 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#2D5A5A]/15 text-[#2D5A5A] flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] font-display">
                Multimodal Audio & Spoken Narration
              </h3>
              <p className="text-[#5C574F] text-base leading-relaxed font-normal">
                Every guide, card, and step can be listened to aloud via speech synthesis, supporting seniors with visual fatigue or low reading comfort.
              </p>
            </AccessibleCard>

            <AccessibleCard className="p-8 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E89D71]/30 text-[#8B4E2D] flex items-center justify-center font-bold text-xl">
                4
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] font-display">
                Safe Consequence-Free Sandboxes
              </h3>
              <p className="text-[#5C574F] text-base leading-relaxed font-normal">
                Muscle memory is built through safe practice. Our interactive simulations let seniors make mistakes without losing money or breaking anything.
              </p>
            </AccessibleCard>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#2D5A5A] text-white p-8 sm:p-12 rounded-3xl text-center space-y-4">
          <h2 className="text-3xl font-extrabold font-display">
            Experience the companion in action.
          </h2>
          <p className="text-lg text-[#F2F1EC] max-w-lg mx-auto font-normal opacity-90">
            Start with our step-by-step guides or launch our interactive simulations now.
          </p>
          <div className="pt-3 flex flex-wrap justify-center gap-4">
            <Link to="/learn">
              <AccessibleButton variant="amber" size="lg">
                Explore Learning Hub
              </AccessibleButton>
            </Link>
            <Link to="/try-it">
              <AccessibleButton variant="outline" size="lg" className="bg-white/10 text-white border-white">
                Launch Practice Sandbox
              </AccessibleButton>
            </Link>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
};
