import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  HeartHandshake, 
  ArrowRight, 
  Sparkles, 
  Volume2, 
  Eye, 
  CheckCircle2, 
  Mic, 
  Globe,
  Sliders,
  HelpCircle,
  BookOpen,
  Compass
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { AccessibleButton } from '../components/ui/AccessibleButton';
import { SpeakButton } from '../components/ui/SpeakButton';
import { AccessibleCard } from '../components/ui/AccessibleCard';
import { GUIDES_DATA } from '../data/contentData';

export const Home: React.FC = () => {
  const { reduceMotion, t, currentLanguageMeta } = useAccessibility();

  const heroHeadline = t('hero.title', 'Technology should feel simple again.');
  const heroSubtitle = t('hero.subtitle', 'SAHAYA helps older adults confidently navigate everyday digital tasks — one simple step at a time.');

  return (
    <div className="space-y-20 sm:space-y-28">
      
      {/* 1. HERO SECTION */}
      <section aria-labelledby="hero-heading" className="relative pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Action CTAs */}
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Mission Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#2D5A5A]/10 border border-[#2D5A5A]/25 text-[#2D5A5A] font-bold text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2D5A5A] animate-pulse"></span>
              <span>{t('hero.mission_pill', 'Human-Centered Companion for Seniors 60+')}</span>
            </div>

            {/* Main Headline */}
            <h1 
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] font-display tracking-tight leading-[1.12]"
            >
              {heroHeadline}
            </h1>

            {/* Supporting Text */}
            <p className="text-xl sm:text-2xl text-[#5C574F] leading-relaxed font-normal readable-measure">
              {heroSubtitle}
            </p>

            {/* Voice Read Aloud for Hero */}
            <div className="pt-1">
              <SpeakButton
                textToSpeak={`${heroHeadline} ${heroSubtitle}`}
                label={t('voice.listen_again', 'Listen to welcome message')}
                size="md"
              />
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link to="/learn" id="hero-cta-start-exploring">
                <AccessibleButton
                  variant="primary"
                  size="xl"
                  fullWidth
                  icon={<ArrowRight className="w-6 h-6" />}
                  iconPosition="right"
                >
                  {t('hero.start_exploring', 'Start Exploring')}
                </AccessibleButton>
              </Link>

              <Link to="/voice" id="hero-cta-voice-companion">
                <AccessibleButton
                  variant="amber"
                  size="xl"
                  fullWidth
                  icon={<Mic className="w-6 h-6" />}
                >
                  {t('hero.try_voice', 'Talk with SAHAYA Voice')}
                </AccessibleButton>
              </Link>

              <Link to="/how-it-helps" id="hero-cta-see-how-it-works">
                <AccessibleButton
                  variant="outline"
                  size="xl"
                  fullWidth
                >
                  {t('hero.see_how', 'See How It Works')}
                </AccessibleButton>
              </Link>
            </div>

            {/* Assurance Badges */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-[#E5E1D8] text-xs sm:text-sm font-semibold text-[#5C574F]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A5A] shrink-0" />
                <span>100% Free & Ad-Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A5A] shrink-0" />
                <span>Zero Tech Jargon</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A5A] shrink-0" />
                <span>Safe Sandbox Mode</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Authentic Lifestyle Photography + Subtle Floating Badges */}
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            {/* Main Visual Container */}
            <div className="relative rounded-[32px] overflow-hidden border-4 border-white shadow-2xl bg-[#F2F1EC]">
              
              {/* High Quality Lifestyle Photo */}
              <img
                src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=1000&q=80"
                alt="A smiling senior grandfather comfortably and joyfully holding a smartphone at home with natural lighting"
                className="w-full h-[420px] sm:h-[480px] object-cover object-center"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* Gentle Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

              {/* Photo Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#E5E1D8] shadow-lg">
                <p className="text-sm font-bold text-[#1A1A1A] font-display">
                  "I finally scanned my first restaurant menu all by myself!"
                </p>
                <span className="text-xs text-[#5C574F] font-medium">
                  — Rameshwar S., 68 years young
                </span>
              </div>
            </div>

            {/* Subtle Floating Element 1: Large Text Ready */}
            <div className="absolute -top-4 -left-4 sm:-left-6 bg-white p-3.5 sm:p-4 rounded-2xl border-2 border-[#2D5A5A] shadow-xl flex items-center gap-3 animate-fade-in">
              <div className="w-10 h-10 rounded-xl bg-[#2D5A5A]/10 flex items-center justify-center text-[#2D5A5A] shrink-0">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#2D5A5A] uppercase tracking-wider block">
                  Design Rule
                </span>
                <span className="font-extrabold text-sm sm:text-base text-[#1A1A1A] block">
                  Large Text Ready
                </span>
              </div>
            </div>

            {/* Subtle Floating Element 2: Voice Support */}
            <div className="absolute top-1/3 -right-4 sm:-right-6 bg-white p-3.5 sm:p-4 rounded-2xl border-2 border-[#E89D71] shadow-xl flex items-center gap-3 animate-fade-in">
              <div className="w-10 h-10 rounded-full bg-[#E89D71]/20 flex items-center justify-center text-[#8B4E2D] shrink-0">
                <Volume2 className="w-5 h-5 text-[#8B4E2D] animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#8B4E2D] uppercase tracking-wider block">
                  {currentLanguageMeta.nativeName}
                </span>
                <span className="font-extrabold text-sm sm:text-base text-[#1A1A1A] block">
                  AI Voice Support
                </span>
              </div>
            </div>

            {/* Subtle Floating Element 3: Simple Steps */}
            <div className="absolute -bottom-6 right-8 bg-[#2D5A5A] text-white p-3.5 sm:p-4 rounded-2xl border-2 border-[#E89D71]/60 shadow-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-sm">
                1→1
              </div>
              <div>
                <span className="font-extrabold text-sm text-white block">
                  Simple Linear Steps
                </span>
                <span className="text-xs text-[#EBF2F2]">
                  One action at a time
                </span>
              </div>
            </div>

          </motion.div>

        </div>
      </section>

      {/* 2. THE SAHAYA DIFFERENCE — 4 PILLARS */}
      <section aria-labelledby="pillars-heading" className="pt-6">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F2F1EC] text-[#5C574F] border border-[#E5E1D8]">
            Core Product Philosophy
          </span>
          <h2 id="pillars-heading" className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] font-display">
            Built for confidence, not confusion.
          </h2>
          <p className="text-lg text-[#5C574F] font-normal">
            Technology often leaves older adults behind. Here is how SAHAYA reimagines every interaction:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <AccessibleCard className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2D5A5A]/10 text-[#2D5A5A] flex items-center justify-center font-bold text-xl">
              1
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A] font-display">
              {t('pillars.step1_title', 'One Action at a Time')}
            </h3>
            <p className="text-base text-[#5C574F] leading-relaxed font-normal">
              {t('pillars.step1_desc', 'No cluttered sidebars or multiple popups. Every screen presents exactly one clear decision.')}
            </p>
          </AccessibleCard>

          <AccessibleCard className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E89D71]/20 text-[#8B4E2D] flex items-center justify-center font-bold text-xl">
              2
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A] font-display">
              {t('pillars.step2_title', 'Zero Tech Jargon')}
            </h3>
            <p className="text-base text-[#5C574F] leading-relaxed font-normal">
              {t('pillars.step2_desc', 'No confusing acronyms. We explain concepts in warm, plain language with real-world comparisons.')}
            </p>
          </AccessibleCard>

          <AccessibleCard className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2D5A5A]/15 text-[#2D5A5A] flex items-center justify-center font-bold text-xl">
              3
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A] font-display">
              {t('pillars.step3_title', 'Safe Practice Sandboxes')}
            </h3>
            <p className="text-base text-[#5C574F] leading-relaxed font-normal">
              {t('pillars.step3_desc', 'Practice scanning QR codes and answering calls in a 100% risk-free simulated environment.')}
            </p>
          </AccessibleCard>

          <AccessibleCard className="p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E89D71]/15 text-[#8B4E2D] flex items-center justify-center font-bold text-xl">
              4
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A] font-display">
              {t('pillars.step4_title', 'Infinite Patience')}
            </h3>
            <p className="text-base text-[#5C574F] leading-relaxed font-normal">
              {t('pillars.step4_desc', 'Listen to instructions as many times as you like. Read at your own natural pace without timers.')}
            </p>
          </AccessibleCard>

        </div>
      </section>

      {/* 3. FEATURED GUIDES SECTION */}
      <section aria-labelledby="featured-guides-heading" className="bg-[#F2F1EC] p-8 sm:p-12 rounded-3xl border border-[#E5E1D8]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A5A] block">
              Interactive Learning
            </span>
            <h2 id="featured-guides-heading" className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] font-display">
              Popular Step-by-Step Guides
            </h2>
            <p className="text-lg text-[#5C574F]">
              Each guide breaks down an everyday task into simple, illustrated steps with audio narration.
            </p>
          </div>

          <Link to="/guides">
            <AccessibleButton variant="primary" size="md">
              View All Guides →
            </AccessibleButton>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GUIDES_DATA.slice(0, 3).map((guide) => (
            <AccessibleCard 
              key={guide.id} 
              className="p-6 flex flex-col justify-between"
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

                <h3 className="text-xl font-bold text-[#1A1A1A] font-display">
                  {guide.title}
                </h3>

                <p className="text-sm text-[#5C574F] leading-relaxed">
                  {guide.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E5E1D8]">
                <Link to={`/guides/${guide.id}`} className="block">
                  <AccessibleButton variant="outline" size="md" fullWidth>
                    Open Step Guide
                  </AccessibleButton>
                </Link>
              </div>
            </AccessibleCard>
          ))}
        </div>
      </section>

      {/* 4. TRY IT YOURSELF TEASER HERO */}
      <section className="bg-[#2D5A5A] text-white p-8 sm:p-14 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#E89D71] text-[#2C1810]">
              Interactive Practice Sandbox
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight">
              Test your skills in our Safe Practice Sandbox.
            </h2>
            <p className="text-lg sm:text-xl text-[#EBF2F2] font-normal leading-relaxed max-w-2xl">
              Practice scanning QR codes, answering phone calls, and spotting suspicious messages without any real money or sensitive transactions.
            </p>
            
            <div className="pt-4 flex flex-wrap gap-4">
              <Link to="/try-it">
                <AccessibleButton variant="amber" size="xl">
                  Try Interactive Simulations Now
                </AccessibleButton>
              </Link>
              <Link to="/voice">
                <AccessibleButton variant="outline" size="xl" className="bg-white/10 text-white border-white hover:bg-white/20">
                  Try Voice Assistant
                </AccessibleButton>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="w-48 h-48 rounded-full bg-white/10 border-4 border-white/20 flex flex-col items-center justify-center p-4 text-center">
              <Sparkles className="w-12 h-12 text-[#E89D71] mb-2 animate-bounce" />
              <span className="font-extrabold text-lg text-white">100% Risk-Free</span>
              <span className="text-xs text-[#EBF2F2] mt-1">Consequence-free learning</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

