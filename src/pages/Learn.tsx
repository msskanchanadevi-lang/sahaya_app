import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  CreditCard, 
  CalendarCheck, 
  Users, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  Volume2 
} from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { AccessibleCard } from '../components/ui/AccessibleCard';
import { AccessibleButton } from '../components/ui/AccessibleButton';
import { SpeakButton } from '../components/ui/SpeakButton';
import { LEARN_CATEGORIES, GUIDES_DATA } from '../data/contentData';

export const Learn: React.FC = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-10 h-10 text-[#2D5A5A]" />;
      case 'CreditCard': return <CreditCard className="w-10 h-10 text-[#2D5A5A]" />;
      case 'CalendarCheck': return <CalendarCheck className="w-10 h-10 text-[#2D5A5A]" />;
      case 'Users': return <Users className="w-10 h-10 text-[#2D5A5A]" />;
      default: return <BookOpen className="w-10 h-10 text-[#2D5A5A]" />;
    }
  };

  return (
    <PageWrapper
      title="Learning Hub"
      subtitle="Choose what you want to master today. Everything is explained in plain language with zero technical rush."
      badge="Curriculum"
      breadcrumbs={[{ label: 'Learn' }]}
    >
      <div className="space-y-12">
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LEARN_CATEGORIES.map((category) => (
            <AccessibleCard
              key={category.id}
              className="p-8 flex flex-col justify-between"
              hoverEffect
            >
              <div className="space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-[#2D5A5A]/10 border border-[#2D5A5A]/20 flex items-center justify-center">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <SpeakButton
                    textToSpeak={`${category.title}. ${category.description}. Skills included: ${category.keySkills.join(', ')}`}
                    size="sm"
                  />
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-display">
                    {category.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#2D5A5A] mt-1">
                    {category.tagline}
                  </p>
                  <p className="text-base text-[#5C574F] mt-3 leading-relaxed font-normal">
                    {category.description}
                  </p>
                </div>

                {/* Key Skills Pill Checklist */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8C867A] block">
                    Key Practical Skills:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {category.keySkills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-2.5 rounded-xl bg-[#F2F1EC] border border-[#E5E1D8] text-xs sm:text-sm font-medium text-[#1A1A1A] flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#2D5A5A] shrink-0" />
                        <span className="truncate">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Link to Category Detail */}
              <div className="pt-6 mt-6 border-t border-[#E5E1D8] flex items-center justify-between">
                <span className="text-sm font-bold text-[#2D5A5A]">
                  {category.lessonsCount} Modules Included
                </span>
                <Link to={`/learn/${category.id}`}>
                  <AccessibleButton
                    variant="primary"
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Open Category
                  </AccessibleButton>
                </Link>
              </div>
            </AccessibleCard>
          ))}
        </div>

        {/* Quick Launch Interactive Guide Strip */}
        <div className="bg-[#F2F1EC] p-8 rounded-3xl border border-[#E5E1D8] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#2D5A5A] uppercase tracking-wider">
                Jump Straight In
              </span>
              <h3 className="text-2xl font-bold text-[#1A1A1A] font-display">
                Quick Interactive Step-by-Step Guides
              </h3>
            </div>
            <Link to="/guides">
              <AccessibleButton variant="outline" size="sm">
                View All Guides
              </AccessibleButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GUIDES_DATA.map((guide) => (
              <Link
                key={guide.id}
                to={`/guides/${guide.id}`}
                className="p-5 bg-white rounded-2xl border border-[#E5E1D8] hover:border-[#2D5A5A] hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-[#2D5A5A] block mb-1">
                    {guide.category}
                  </span>
                  <h4 className="font-bold text-base text-[#1A1A1A] group-hover:text-[#2D5A5A] leading-snug">
                    {guide.title}
                  </h4>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E5E1D8] flex items-center justify-between text-xs font-semibold text-[#5C574F]">
                  <span>⏱ {guide.estimatedMinutes} mins</span>
                  <span className="text-[#2D5A5A] font-bold group-hover:translate-x-1 transition-transform">Start →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </PageWrapper>
  );
};
