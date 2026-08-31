import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Home, Volume2 } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { SpeakButton } from '../ui/SpeakButton';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  badge?: string;
  readAloudSummary?: string;
  actions?: React.ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  title,
  subtitle,
  breadcrumbs,
  badge,
  readAloudSummary,
  actions,
}) => {
  const { reduceMotion } = useAccessibility();

  // Scroll to top on route entry
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [reduceMotion, title]);

  const summaryToRead = readAloudSummary || `${title}. ${subtitle || ''}`;

  return (
    <motion.main
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? false : { opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      {/* Breadcrumb Navigation if provided */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center flex-wrap gap-2 text-sm sm:text-base font-semibold text-[#8C867A]">
            <li className="flex items-center gap-1.5">
              <Link
                to="/"
                className="text-[#2D5A5A] hover:text-[#234848] flex items-center gap-1 p-1 rounded hover:bg-[#F2F1EC] transition-colors"
              >
                <Home className="w-4 h-4 text-[#2D5A5A]" />
                <span>Home</span>
              </Link>
            </li>
            {breadcrumbs.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#8C867A]" />
                {crumb.path ? (
                  <Link
                    to={crumb.path}
                    className="text-[#2D5A5A] hover:text-[#234848] p-1 rounded hover:bg-[#F2F1EC] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#1A1A1A] font-bold" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Page Header */}
      <header className="mb-10 pb-6 border-b border-[#E5E1D8] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-3xl space-y-3">
          {badge && (
            <span className="inline-block px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#E89D71]/15 text-[#8B4E2D] border border-[#E89D71]/30">
              {badge}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] font-display tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg sm:text-xl text-[#5C574F] leading-relaxed readable-measure font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right Header Action / Listen Button */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <SpeakButton
            textToSpeak={summaryToRead}
            label="Listen to page summary"
            size="md"
          />
          {actions}
        </div>
      </header>

      {/* Main Page Content Body */}
      <div>{children}</div>
    </motion.main>
  );
};
