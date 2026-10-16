import React from 'react';
import { Package, ArrowDown, Sparkles, Box, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface BoxHeroProps {
  isBoxOpen: boolean;
  onToggleBox: () => void;
  clutterCount: number;
  totalClutter: number;
}

export const BoxHero: React.FC<BoxHeroProps> = ({
  isBoxOpen,
  onToggleBox,
  clutterCount,
  totalClutter,
}) => {
  return (
    <section id="top" className="relative pt-12 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Postal Meta Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-kraft-600 mb-6 border-b border-kraft-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping inline-block" />
          <span className="uppercase tracking-widest font-bold">
            BACKEND SYSTEMS & DISTRIBUTED PLATFORMS ENGINEER · GHAZIABAD / NCR
          </span>
        </div>
        <div className="flex items-center gap-3 text-kraft-500">
          <span>AIRMAIL / EXPEDITED</span>
          <span>·</span>
          <span>DISPATCH #2026-BLR</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Heading and Intro */}
        <div className="lg:col-span-7 space-y-5">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-kraft-950 tracking-tight leading-[1.1]">
            Harpreet Jaggi, <span className="italic font-normal text-amber-800">unboxed.</span>
          </h1>

          <p className="text-base sm:text-lg text-kraft-800 leading-relaxed font-sans max-w-xl">
            I design it, build it and ship it. Senior product designer at{' '}
            <strong className="text-kraft-950 underline decoration-amber-500 underline-offset-4 font-semibold">
              Kendal
            </strong>
            . Before that: Parallel, SALT, Toddle and Atlassian.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                sound.playBoxOpen();
                onToggleBox();
              }}
              className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-kraft-50 bg-kraft-900 hover:bg-kraft-800 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
            >
              <Package size={18} className="text-amber-400 group-hover:rotate-12 transition transform" />
              <span>{isBoxOpen ? 'Close the box' : 'Open the box'}</span>
              <span className="bg-amber-600/30 text-amber-300 text-[10px] px-2 py-0.5 rounded-full">
                {isBoxOpen ? 'UNPACKED' : 'SEALED'}
              </span>
            </button>

            <a
              href="#work"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-kraft-700 hover:text-kraft-950 hover:underline underline-offset-4 transition py-3 px-3"
            >
              <span>Skip to the work</span>
              <ArrowDown size={14} className="animate-bounce" />
            </a>
          </div>

          {/* Packaging labels / stamps */}
          <div className="flex flex-wrap gap-2 pt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-300 rounded font-mono text-[11px] font-bold uppercase tracking-wider shadow-2xs">
              <Sparkles size={11} />
              OPEN WITH CURIOSITY
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-red-50 text-red-700 border border-red-300 rounded font-mono text-[11px] font-bold uppercase tracking-wider shadow-2xs">
              THIS SIDE UP ↑
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-kraft-200 text-kraft-800 border border-kraft-300 rounded font-mono text-[11px] uppercase tracking-wider shadow-2xs">
              NO REFUNDS
            </span>
          </div>
        </div>

        {/* Right Column: Interactive 3D Package Box Representation */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            onClick={() => {
              sound.playBoxOpen();
              onToggleBox();
            }}
            className={`w-full max-w-sm aspect-4/3 sm:aspect-square bg-[#E8DCBF] rounded-2xl p-6 border-2 border-[#C9B793] shadow-box relative cursor-pointer group transition-all duration-500 overflow-hidden ${
              isBoxOpen ? 'ring-4 ring-amber-500/30 scale-[1.02]' : 'hover:-translate-y-1'
            }`}
          >
            {/* Packing tape strip across the cardboard box */}
            <div className="absolute top-1/2 left-0 right-0 h-10 -translate-y-1/2 tape-strip flex items-center justify-center pointer-events-none transform -rotate-1">
              <span className="font-mono text-[10px] text-amber-900/60 font-bold tracking-widest uppercase">
                {isBoxOpen ? 'SEAL BROKEN · UNPACKED' : 'TAMPER EVIDENT TAPE · PULL TO OPEN'}
              </span>
            </div>

            {/* Corner Stencil Details */}
            <div className="flex justify-between items-start font-mono text-[10px] text-amber-950/70 uppercase">
              <div>
                <p className="font-bold">PARCEL #HJ-04</p>
                <p>BENGALURU, IN</p>
              </div>
              <div className="text-right">
                <span className="inline-block border border-amber-900/40 px-1.5 py-0.5 rounded font-bold">
                  2.4 KG
                </span>
              </div>
            </div>

            {/* Center Box Icon / Status */}
            <div className="h-full flex flex-col items-center justify-center text-center -mt-4 relative z-10">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-500 ${
                  isBoxOpen
                    ? 'bg-amber-100 text-amber-800 rotate-12 scale-110 shadow-inner'
                    : 'bg-amber-900/10 text-amber-950 group-hover:scale-110'
                }`}
              >
                <Box size={32} />
              </div>
              <p className="font-mono text-xs font-bold text-amber-950 uppercase tracking-wider">
                {isBoxOpen ? 'The box is opened' : 'Click box to inspect'}
              </p>
              <p className="text-[11px] text-amber-900/70 mt-1 max-w-[200px] font-sans">
                {isBoxOpen
                  ? `${clutterCount} of ${totalClutter} items unpacked`
                  : 'Tap or scroll to inspect packing contents'}
              </p>
            </div>

            {/* Bottom Status bar */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[10px] font-mono text-amber-950/80 pt-2 border-t border-[#C9B793]/60">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={12} className={isBoxOpen ? 'text-emerald-700' : 'text-amber-800'} />
                {isBoxOpen ? 'UNBOXED' : 'READY TO UNPACK'}
              </span>
              <span>1 PUN INCLUDED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

