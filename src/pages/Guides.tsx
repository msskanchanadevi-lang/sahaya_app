import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Search, 
  ArrowRight, 
  QrCode, 
  Video, 
  Image, 
  BellRing, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { AccessibleCard } from '../components/ui/AccessibleCard';
import { AccessibleButton } from '../components/ui/AccessibleButton';
import { SpeakButton } from '../components/ui/SpeakButton';
import { GUIDES_DATA } from '../data/contentData';

export const Guides: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredGuides = GUIDES_DATA.filter((guide) => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          guide.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || guide.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const getGuideIcon = (iconName: string) => {
    switch (iconName) {
      case 'QrCode': return <QrCode className="w-8 h-8 text-[#2D5A5A]" />;
      case 'Video': return <Video className="w-8 h-8 text-[#2D5A5A]" />;
      case 'Image': return <Image className="w-8 h-8 text-[#2D5A5A]" />;
      case 'BellRing': return <BellRing className="w-8 h-8 text-[#2D5A5A]" />;
      default: return <Compass className="w-8 h-8 text-[#2D5A5A]" />;
    }
  };

  return (
    <PageWrapper
      title="Step-by-Step Interactive Guides"
      subtitle="Follow simple visual walkthroughs. We show only one major action at a time with clear voice instructions."
      badge="Major Feature"
      breadcrumbs={[{ label: 'Guides' }]}
    >
      <div className="space-y-10">
        
        {/* Search & Filter Header Bar */}
        <div className="bg-[#F2F1EC] p-6 sm:p-8 rounded-3xl border border-[#E5E1D8] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-7 relative">
              <label htmlFor="guides-search-input" className="sr-only">
                Search guides
              </label>
              <div className="relative">
                <Search className="w-5 h-5 text-[#8C867A] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  id="guides-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type a task (e.g. QR code, video call, photo)..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-[#E5E1D8] focus:border-[#2D5A5A] text-lg font-medium placeholder-[#8C867A] text-[#1A1A1A] shadow-2xs outline-none"
                />
              </div>
            </div>

            {/* Quick Filter Buttons */}
            <div className="md:col-span-5 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold border transition-colors cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#2D5A5A] text-white border-[#2D5A5A]'
                    : 'bg-white text-[#5C574F] border-[#E5E1D8] hover:bg-[#F2F1EC]'
                }`}
              >
                All ({GUIDES_DATA.length})
              </button>
              <button
                onClick={() => setSelectedCategory('Staying Connected')}
                className={`px-3.5 py-2 rounded-xl text-sm font-bold border transition-colors cursor-pointer ${
                  selectedCategory === 'Staying Connected'
                    ? 'bg-[#2D5A5A] text-white border-[#2D5A5A]'
                    : 'bg-white text-[#5C574F] border-[#E5E1D8] hover:bg-[#F2F1EC]'
                }`}
              >
                Family Calls & Photos
              </button>
            </div>

          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredGuides.map((guide) => (
            <AccessibleCard
              key={guide.id}
              className="p-8 flex flex-col justify-between"
              hoverEffect
            >
              <div className="space-y-5">
                
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-[#2D5A5A]/10 border border-[#2D5A5A]/20 flex items-center justify-center">
                    {getGuideIcon(guide.iconName)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2D5A5A]/10 text-[#2D5A5A] uppercase">
                      {guide.steps.length} Steps
                    </span>
                    <SpeakButton
                      textToSpeak={`${guide.title}. ${guide.summary}. Takes about ${guide.estimatedMinutes} minutes.`}
                      size="sm"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-[#2D5A5A] uppercase tracking-wider block">
                    {guide.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-display mt-1">
                    {guide.title}
                  </h3>
                  <p className="text-base text-[#5C574F] mt-2 leading-relaxed font-normal">
                    {guide.summary}
                  </p>
                </div>

                <div className="p-3 bg-[#F2F1EC] rounded-xl border border-[#E5E1D8] flex items-center justify-between text-xs sm:text-sm font-semibold text-[#5C574F]">
                  <span>⏱ Estimated: {guide.estimatedMinutes} mins</span>
                  <span>Level: {guide.difficulty}</span>
                </div>

              </div>

              <div className="pt-6 mt-6 border-t border-[#E5E1D8] flex items-center justify-between">
                <span className="text-xs font-bold text-[#2D5A5A] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A5A]" />
                  <span>Voice narration included</span>
                </span>
                <Link to={`/guides/${guide.id}`}>
                  <AccessibleButton
                    variant="primary"
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Start Guide
                  </AccessibleButton>
                </Link>
              </div>
            </AccessibleCard>
          ))}
        </div>

      </div>
    </PageWrapper>
  );
};
