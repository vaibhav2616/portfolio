import React from 'react';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { sound } from '../utils/sound';

interface StepperDockProps {
  currentSection: string;
  onNavigateSection: (sectionId: string) => void;
}

const SECTIONS = [
  { id: 'top', label: 'The box' },
  { id: 'clutter', label: 'Clutter' },
  { id: 'work', label: 'Case files' },
  { id: 'slip', label: 'Packing slip' },
  { id: 'till', label: 'Receipt' },
  { id: 'inside', label: 'About me' },
];

export const StepperDock: React.FC<StepperDockProps> = ({
  currentSection,
  onNavigateSection,
}) => {
  const currentIndex = Math.max(
    0,
    SECTIONS.findIndex((s) => s.id === currentSection)
  );

  const handlePrev = () => {
    if (currentIndex > 0) {
      sound.playClick(600);
      const prevSection = SECTIONS[currentIndex - 1];
      onNavigateSection(prevSection.id);
    }
  };

  const handleNext = () => {
    if (currentIndex < SECTIONS.length - 1) {
      sound.playClick(750);
      const nextSection = SECTIONS[currentIndex + 1];
      onNavigateSection(nextSection.id);
    }
  };

  return (
    <nav
      aria-label="Step through the page"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-kraft-900/90 backdrop-blur-md text-kraft-50 border border-kraft-700/80 rounded-full px-3 py-2 shadow-2xl flex items-center gap-1.5 sm:gap-3 transition-all"
    >
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="p-1.5 rounded-full hover:bg-kraft-800 disabled:opacity-30 disabled:hover:bg-transparent text-kraft-300 transition"
        title="Previous section"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Current Section Label & Dots */}
      <div className="flex items-center gap-2 px-2 text-xs font-mono font-medium border-x border-kraft-700/60">
        <Compass size={13} className="text-amber-400" />
        <span className="whitespace-nowrap font-bold text-amber-200">
          {SECTIONS[currentIndex]?.label || 'The box'}
        </span>

        {/* Section Jump Dots */}
        <div className="hidden sm:flex items-center gap-1.5 ml-2">
          {SECTIONS.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => {
                sound.playClick(500 + idx * 50);
                onNavigateSection(sec.id);
              }}
              title={`Go to ${sec.label}`}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === idx
                  ? 'bg-amber-400 scale-125'
                  : 'bg-kraft-600 hover:bg-kraft-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentIndex === SECTIONS.length - 1}
        className="p-1.5 rounded-full hover:bg-kraft-800 disabled:opacity-30 disabled:hover:bg-transparent text-kraft-300 transition"
        title="Next section"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
};

