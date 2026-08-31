import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  LayoutGrid, 
  Layers, 
  HelpCircle, 
  ShieldCheck, 
  Compass, 
  HeartHandshake, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { AccessibleCard } from '../components/ui/AccessibleCard';
import { AccessibleButton } from '../components/ui/AccessibleButton';
import { SpeakButton } from '../components/ui/SpeakButton';
import { PROBLEMS_DATA } from '../data/contentData';

export const HowItHelps: React.FC = () => {
  const getProblemIcon = (iconName: string) => {
    switch (iconName) {
      case 'Eye': return <Eye className="w-8 h-8 text-[#2D5A5A]" />;
      case 'LayoutGrid': return <LayoutGrid className="w-8 h-8 text-[#2D5A5A]" />;
      case 'Layers': return <Layers className="w-8 h-8 text-[#2D5A5A]" />;
      case 'HelpCircle': return <HelpCircle className="w-8 h-8 text-[#2D5A5A]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-[#2D5A5A]" />;
      case 'Compass': return <Compass className="w-8 h-8 text-[#2D5A5A]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-8 h-8 text-[#2D5A5A]" />;
      default: return <Sparkles className="w-8 h-8 text-[#2D5A5A]" />;
    }
  };

  return (
    <PageWrapper
      title="How SAHAYA Solves Real Technology Hurdles"
      subtitle="Modern software is designed for 20-year-olds with 20/20 vision and decades of digital intuition. Here are the 7 major barriers faced by seniors and how we dismantle each one."
      badge="Human-Centered Research"
      breadcrumbs={[{ label: 'How It Helps' }]}
    >
      <div className="space-y-12">
        
        {/* Research Quote Banner */}
        <div className="bg-[#F2F1EC] p-6 sm:p-8 rounded-3xl border border-[#E5E1D8] max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-[#2D5A5A] text-white flex items-center justify-center font-serif text-3xl font-bold shrink-0">
            “
          </div>
          <div>
            <p className="text-xl font-display font-bold text-[#1A1A1A] italic">
              "We didn't grow up with touchscreens. When an app changes, we feel lost and worry we will break our phone or lose our life savings."
            </p>
            <span className="text-sm font-semibold text-[#5C574F] block mt-2">
              — UX Field Study with 50+ Older Adults (Ages 62–84)
            </span>
          </div>
        </div>

        {/* The 7 Interactive Problem & Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROBLEMS_DATA.map((problem, index) => (
            <AccessibleCard 
              key={problem.id} 
              className="p-8 flex flex-col justify-between"
              hoverEffect
            >
              <div className="space-y-6">
                
                {/* Header: Icon & Number */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-[#2D5A5A]/10 border border-[#2D5A5A]/20 flex items-center justify-center shrink-0">
                      {getProblemIcon(problem.icon)}
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F2F1EC] text-[#5C574F] border border-[#E5E1D8]">
                      Barrier #{index + 1}
                    </span>
                  </div>
                  
                  <SpeakButton
                    textToSpeak={`Problem: ${problem.problemTitle}. How SAHAYA solves it: ${problem.howSahayaSolves}`}
                    size="sm"
                  />
                </div>

                {/* Problem Title */}
                <div>
                  <h3 className="text-2xl font-bold text-[#1A1A1A] font-display">
                    {problem.problemTitle}
                  </h3>
                  
                  {/* The Senior Quote */}
                  <blockquote className="mt-3 p-4 bg-[#E89D71]/10 rounded-2xl border-l-4 border-[#E89D71] text-[#2C1810] font-serif italic text-base">
                    {problem.problemQuote}
                  </blockquote>
                </div>

                {/* The Real Friction vs How We Solve It */}
                <div className="space-y-4 text-base">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B4E2D] mb-1">
                      The Real Friction:
                    </h4>
                    <p className="text-[#5C574F] leading-relaxed font-normal">
                      {problem.theRealPain}
                    </p>
                  </div>

                  <div className="p-4 bg-[#2D5A5A]/10 rounded-2xl border border-[#2D5A5A]/20">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D5A5A] mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2D5A5A]" />
                      <span>How SAHAYA Solves It:</span>
                    </h4>
                    <p className="text-[#1A1A1A] font-medium leading-relaxed">
                      {problem.howSahayaSolves}
                    </p>
                  </div>
                </div>

              </div>

              {/* Action Button: Navigate to Interactive Solution */}
              <div className="pt-6 mt-6 border-t border-[#E5E1D8] flex items-center justify-between">
                <span className="text-xs font-bold text-[#8C867A]">
                  Feature: {problem.sahayaFeature}
                </span>
                <Link to={problem.targetRoute}>
                  <AccessibleButton variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                    Try Solution
                  </AccessibleButton>
                </Link>
              </div>

            </AccessibleCard>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#2D5A5A] text-white p-8 sm:p-10 rounded-3xl text-center space-y-4">
          <h2 className="text-3xl font-extrabold font-display">
            Ready to experience these solutions first-hand?
          </h2>
          <p className="text-lg text-[#F2F1EC] max-w-xl mx-auto font-normal opacity-90">
            Browse our step-by-step learning modules or test your skills in the safe practice sandbox.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link to="/learn">
              <AccessibleButton variant="amber" size="lg">
                Explore Learning Categories
              </AccessibleButton>
            </Link>
            <Link to="/accessibility">
              <AccessibleButton variant="outline" size="lg" className="bg-white/10 text-white border-white">
                Customize Accessibility Settings
              </AccessibleButton>
            </Link>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
};
