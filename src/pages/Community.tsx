import React, { useState } from 'react';
import { 
  Smile, 
  Heart, 
  Users, 
  HelpCircle, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { AccessibleCard } from '../components/ui/AccessibleCard';
import { AccessibleButton } from '../components/ui/AccessibleButton';
import { SpeakButton } from '../components/ui/SpeakButton';
import { COMMUNITY_STORIES, FAQS_DATA } from '../data/contentData';

export const Community: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <PageWrapper
      title="Community & Family Support"
      subtitle="You are never alone on your digital journey. Read inspiring beginner experiences, discover family teaching guides, and find clear answers."
      badge="Warm Community"
      breadcrumbs={[{ label: 'Community' }]}
    >
      <div className="space-y-16 max-w-5xl mx-auto">
        
        {/* 1. Beginner Stories */}
        <section aria-labelledby="stories-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A5A]">
                Peer Experiences
              </span>
              <h2 id="stories-heading" className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-display">
                Real Beginner Milestone Stories
              </h2>
            </div>
            <span className="text-xs text-[#8C867A] font-semibold bg-[#F2F1EC] px-3 py-1.5 rounded-full border border-[#E5E1D8]">
              Illustrative Demo Stories
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMMUNITY_STORIES.map((story) => (
              <AccessibleCard key={story.id} className="p-6 sm:p-7 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  {/* Avatar & Name */}
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full ${story.avatarBg} flex items-center justify-center font-bold text-base shrink-0 border-2 border-white shadow-xs`}>
                      {story.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1A1A1A] leading-tight">
                        {story.name}
                      </h3>
                      <span className="text-xs text-[#8C867A] font-medium">
                        Age {story.age} • {story.city}
                      </span>
                    </div>
                  </div>

                  {/* Story Text */}
                  <p className="text-[#5C574F] text-base leading-relaxed font-normal italic">
                    "{story.story}"
                  </p>
                </div>

                {/* Milestone Badge */}
                <div className="pt-4 border-t border-[#E5E1D8]">
                  <div className="p-2.5 rounded-xl bg-[#2D5A5A]/10 border border-[#2D5A5A]/20 text-xs font-bold text-[#2D5A5A] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E89D71] shrink-0" />
                    <span>{story.milestone}</span>
                  </div>
                </div>
              </AccessibleCard>
            ))}
          </div>
        </section>

        {/* 2. Family Support & Caregiver Advice */}
        <section aria-labelledby="family-heading" className="bg-[#F2F1EC] p-8 sm:p-10 rounded-3xl border border-[#E5E1D8] space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2D5A5A]/10 text-[#2D5A5A] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 id="family-heading" className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-display">
                Guide for Family Members & Caregivers
              </h2>
              <p className="text-[#5C574F] text-sm mt-0.5">
                How to teach technology with empathy, dignity, and zero frustration.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 bg-white rounded-2xl border border-[#E5E1D8] shadow-xs space-y-2">
              <span className="text-2xl font-bold text-[#2D5A5A] font-display">01</span>
              <h3 className="font-bold text-lg text-[#1A1A1A]">Never Grab the Phone</h3>
              <p className="text-sm text-[#5C574F] leading-relaxed font-normal">
                When you do it for them, muscle memory is not formed. Point with your finger and let them tap every button themselves.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-[#E5E1D8] shadow-xs space-y-2">
              <span className="text-2xl font-bold text-[#8B4E2D] font-display">02</span>
              <h3 className="font-bold text-lg text-[#1A1A1A]">Write Physical Cheatsheets</h3>
              <p className="text-sm text-[#5C574F] leading-relaxed font-normal">
                Older adults love physical notes. Write 3-line bullet instructions with large handwriting and leave it beside their phone stand.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-[#E5E1D8] shadow-xs space-y-2">
              <span className="text-2xl font-bold text-[#2D5A5A] font-display">03</span>
              <h3 className="font-bold text-lg text-[#1A1A1A]">Praise Every Small Victory</h3>
              <p className="text-sm text-[#5C574F] leading-relaxed font-normal">
                Sending one photo or scanning one QR code is a major milestone. Celebrate their courage to learn new tools.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Frequently Asked Questions (FAQ) */}
        <section aria-labelledby="faq-heading" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A5A]">
                Clear Answers
              </span>
              <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-display">
                Frequently Asked Questions
              </h2>
            </div>
            <SpeakButton
              textToSpeak="Frequently asked questions about SAHAYA. Tap any question to read the full answer."
              size="sm"
            />
          </div>

          <div className="space-y-4">
            {FAQS_DATA.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#E5E1D8] shadow-xs overflow-hidden transition-all"
                >
                  <button
                    id={`faq-item-${index}`}
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#2D5A5A]/5 transition-colors focus-visible:outline-4 focus-visible:outline-[#2D5A5A]"
                  >
                    <span className="text-lg sm:text-xl font-bold text-[#1A1A1A] font-display">
                      {faq.question}
                    </span>
                    <span className="p-2 rounded-xl bg-[#F2F1EC] text-[#1A1A1A] shrink-0 border border-[#E5E1D8]">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-[#5C574F] text-base sm:text-lg leading-relaxed border-t border-[#E5E1D8] font-normal">
                      <p>{faq.answer}</p>
                      <div className="mt-3">
                        <SpeakButton textToSpeak={faq.answer} label="Listen to answer" size="sm" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </PageWrapper>
  );
};
