import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ArrowRight, BookOpen, Smartphone, CreditCard, CalendarCheck, Users, HelpCircle } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { AccessibleCard } from '../components/ui/AccessibleCard';
import { AccessibleButton } from '../components/ui/AccessibleButton';
import { SpeakButton } from '../components/ui/SpeakButton';
import { LEARN_CATEGORIES, GUIDES_DATA } from '../data/contentData';

export const CategoryDetail: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const category = LEARN_CATEGORIES.find((c) => c.id === categoryId) || LEARN_CATEGORIES[0];
  
  // Find related guides for this category
  const relatedGuides = GUIDES_DATA.filter((g) => category.guides.includes(g.id));

  return (
    <PageWrapper
      title={category.title}
      subtitle={category.description}
      badge="Learning Category"
      breadcrumbs={[
        { label: 'Learn', path: '/learn' },
        { label: category.title },
      ]}
      actions={
        <AccessibleButton
          variant="secondary"
          size="sm"
          onClick={() => navigate('/learn')}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          Back to Hub
        </AccessibleButton>
      }
    >
      <div className="space-y-12">
        
        {/* Category Header Card */}
        <div className="bg-[#F2F1EC] p-8 rounded-3xl border border-[#E5E1D8] space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#2D5A5A] uppercase tracking-wider block">
                Category Objective
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-display mt-1">
                {category.tagline}
              </h2>
            </div>
            <SpeakButton
              textToSpeak={`${category.title}. ${category.description}`}
              size="md"
            />
          </div>

          <div className="border-t border-[#E5E1D8] pt-6">
            <h3 className="text-sm font-bold text-[#5C574F] uppercase tracking-wider mb-3">
              Skills you will master:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {category.keySkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-2xl border border-[#E5E1D8] shadow-xs flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#2D5A5A] shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-[#1A1A1A]">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step-by-Step Guides inside this category */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-[#1A1A1A] font-display">
              Step-by-Step Interactive Guides for {category.title}
            </h3>
            <span className="text-sm text-[#8C867A] font-semibold">
              {relatedGuides.length > 0 ? `${relatedGuides.length} Guides Available` : 'Guides Ready'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(relatedGuides.length > 0 ? relatedGuides : GUIDES_DATA.slice(0, 2)).map((guide) => (
              <AccessibleCard
                key={guide.id}
                className="p-8 flex flex-col justify-between"
                hoverEffect
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2D5A5A]/10 text-[#2D5A5A]">
                      {guide.steps.length} Simple Steps
                    </span>
                    <span className="text-xs font-semibold text-[#8C867A]">
                      ⏱ {guide.estimatedMinutes} mins
                    </span>
                  </div>

                  <h4 className="text-2xl font-bold text-[#1A1A1A] font-display">
                    {guide.title}
                  </h4>

                  <p className="text-base text-[#5C574F] leading-relaxed font-normal">
                    {guide.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E5E1D8] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#8C867A]">
                    Difficulty: {guide.difficulty}
                  </span>
                  <Link to={`/guides/${guide.id}`}>
                    <AccessibleButton
                      variant="primary"
                      size="md"
                      icon={<ArrowRight className="w-4 h-4" />}
                      iconPosition="right"
                    >
                      Start Step Guide
                    </AccessibleButton>
                  </Link>
                </div>
              </AccessibleCard>
            ))}
          </div>
        </div>

        {/* Safe Sandbox Practice Link */}
        <div className="bg-[#2D5A5A] text-white p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2">
            <h4 className="text-2xl font-bold font-display">
              Want to practice this in the safe sandbox?
            </h4>
            <p className="text-[#F2F1EC] text-base max-w-xl font-normal opacity-90">
              No real accounts or money involved. Practice with a virtual phone interface until you feel 100% comfortable.
            </p>
          </div>
          <Link to="/try-it">
            <AccessibleButton variant="amber" size="lg">
              Launch Practice Sandbox
            </AccessibleButton>
          </Link>
        </div>

      </div>
    </PageWrapper>
  );
};
