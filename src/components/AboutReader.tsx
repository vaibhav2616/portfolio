import React, { useState } from 'react';
import { BookOpen, RotateCw, ExternalLink, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { BookItem } from '../types';
import { sound } from '../utils/sound';

interface AboutReaderProps {
  books: BookItem[];
}

export const AboutReader: React.FC<AboutReaderProps> = ({ books }) => {
  const [activeBookIdx, setActiveBookIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentBook = books[activeBookIdx];

  const handlePrev = () => {
    sound.playClick(600);
    setActiveBookIdx((prev) => (prev > 0 ? prev - 1 : books.length - 1));
  };

  const handleNext = () => {
    sound.playClick(750);
    setActiveBookIdx((prev) => (prev < books.length - 1 ? prev + 1 : 0));
  };

  const handleFlip = () => {
    sound.playBoxOpen();
    setIsFlipped(!isFlipped);
  };

  return (
    <section id="inside" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-kraft-200">
      {/* Bio Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-800 uppercase tracking-widest mb-1">
          <BookOpen size={14} />
          <span>ABOUT ME · INSIDE THE MIND</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-kraft-950">
          Small on purpose.
        </h2>
        <p className="text-base sm:text-lg text-kraft-800 font-sans mt-3 max-w-2xl leading-relaxed">
          Mountains and night skies make me feel tiny, and I like it. Feeling small makes me want to make things worth the trouble.
        </p>
      </div>

      {/* Interactive Kobo E-Reader Simulator */}
      <div className="bg-kraft-50 border border-kraft-300 rounded-3xl p-6 sm:p-10 shadow-sm">
        {/* Bookshelf Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-6 border-b border-kraft-200">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase font-bold text-kraft-600">
              Reading now ({books.length} books):
            </span>
          </div>

          {/* Book navigation buttons */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-kraft-500 mr-2">
              {activeBookIdx + 1} of {books.length}
            </span>
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg border border-kraft-300 bg-white hover:bg-kraft-100 text-kraft-700 transition"
              aria-label="Previous book"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg border border-kraft-300 bg-white hover:bg-kraft-100 text-kraft-700 transition"
              aria-label="Next book"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={handleFlip}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold transition ml-2"
            >
              <RotateCw size={13} className={isFlipped ? 'rotate-180 transition transform' : ''} />
              <span>{isFlipped ? 'Show front' : 'Flip it over'}</span>
            </button>
          </div>
        </div>

        {/* Tab selection pills */}
        <div className="flex flex-wrap gap-2 py-4">
          {books.map((b, idx) => (
            <button
              key={b.id}
              onClick={() => {
                sound.playClick(600 + idx * 50);
                setActiveBookIdx(idx);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition ${
                activeBookIdx === idx
                  ? 'bg-kraft-900 text-kraft-50 font-bold shadow-xs'
                  : 'bg-white border border-kraft-200 text-kraft-700 hover:bg-kraft-100'
              }`}
            >
              {b.title} <span className="opacity-60 text-[10px]">· {b.author}</span>
            </button>
          ))}
        </div>

        {/* 3D Kobo Reader Device */}
        <div className="mt-6 perspective-1000 flex justify-center">
          <div
            className={`w-full max-w-2xl min-h-[380px] transition-transform duration-700 transform-style-preserve-3d relative rounded-2xl ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRONT FACE: E-Reader Screen */}
            <div className="w-full h-full bg-[#F3EFE6] border-8 border-kraft-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between backface-hidden">
              <div>
                <div className="flex justify-between items-center text-[11px] font-mono text-kraft-500 uppercase pb-3 border-b border-kraft-300/60">
                  <span>{currentBook.chapter}</span>
                  <span className="font-bold text-amber-900">{currentBook.badge}</span>
                </div>

                <div className="pt-6 space-y-3">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-kraft-950">
                    {currentBook.heading}
                  </h3>
                  <p className="text-sm sm:text-base text-kraft-800 leading-relaxed font-sans">
                    {currentBook.text}
                  </p>
                </div>
              </div>

              {/* Bottom footer & Easter egg link */}
              <div className="pt-6 border-t border-kraft-300/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                {currentBook.starLink ? (
                  <a
                    href="https://www.harpreetjaggi.in/star/"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playSuccess()}
                    className="inline-flex items-center gap-1.5 text-amber-900 font-bold hover:underline bg-amber-100/70 px-3 py-1.5 rounded-lg border border-amber-300/80 transition"
                  >
                    <Sparkles size={13} className="text-amber-600" />
                    <span>DO THE SLOW MATHS: FIND MY STAR →</span>
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="text-kraft-500">Kobo Clara 2E · Page 142</span>
                )}
                <span className="text-[11px] text-kraft-400">Drag or click flip to see stickers</span>
              </div>
            </div>

            {/* BACK FACE: Sticker Cluttered Backplate */}
            <div className="w-full h-full bg-kraft-900 border-8 border-kraft-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between backface-hidden rotate-y-180 text-kraft-100">
              <div>
                <div className="flex justify-between items-center text-[10px] font-mono text-kraft-400 uppercase pb-2 border-b border-kraft-700">
                  <span>KOBO BACKPLATE · DRAG TO TURN IT</span>
                  <span>FLIPPED FOR STICKERS</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6">
                  <div className="bg-amber-400 text-amber-950 p-3 rounded-lg font-mono text-xs font-bold transform -rotate-3 shadow-md">
                    DESIGN · SHIP · REPEAT
                  </div>
                  <div className="bg-rose-500 text-white p-3 rounded-lg font-mono text-xs font-bold transform rotate-6 shadow-md">
                    FRAGILE: HANDLE WITH CARE
                  </div>
                  <div className="bg-blue-500 text-white p-3 rounded-lg font-mono text-xs font-bold transform -rotate-6 shadow-md">
                    BENGALURU TECH CLUB
                  </div>
                  <div className="bg-emerald-500 text-emerald-950 p-3 rounded-lg font-mono text-xs font-bold transform rotate-3 shadow-md">
                    CHAI FUELLED
                  </div>
                  <div className="bg-purple-500 text-white p-3 rounded-lg font-mono text-xs font-bold transform -rotate-2 shadow-md">
                    NO REFUNDS
                  </div>
                  <div className="bg-kraft-200 text-kraft-900 p-3 rounded-lg font-mono text-xs font-bold transform rotate-4 shadow-md">
                    KHUSHI ★ 8.81 MAG
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-kraft-700 text-right">
                <button
                  onClick={handleFlip}
                  className="px-3 py-1 bg-kraft-800 hover:bg-kraft-700 text-xs font-mono rounded-lg transition"
                >
                  Return to reader screen ↑
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Postcard Callout */}
        <div className="mt-8 p-5 bg-[#FAF7F0] border-l-4 border-amber-600 rounded-r-xl font-mono text-xs text-kraft-800 space-y-1 shadow-2xs">
          <p className="font-bold text-amber-900 uppercase">
            POSTCARD · TO WHOEVER IS READING:
          </p>
          <p className="font-sans text-sm text-kraft-900 italic">
            "Most software is uninspired. I'm trying to fix that, one tool at a time."
          </p>
        </div>
      </div>
    </section>
  );
};

