import React, { useState } from 'react';
import { Gift, Sparkles, RefreshCw } from 'lucide-react';
import { sound } from '../utils/sound';

const GIFTS = [
  {
    title: 'Golden Design Principle',
    text: 'Working software always beats 40-slide Figma decks.',
    color: 'bg-amber-400 text-amber-950',
    icon: '✨',
  },
  {
    title: 'Bengaluru Chai Voucher',
    text: 'Good for one cutting chai on 100ft Road whenever we meet.',
    color: 'bg-orange-500 text-white',
    icon: '☕',
  },
  {
    title: 'Constellation Coordinate',
    text: 'Star Khushi · RA 11h 24m, Dec +12° 45′ · Keep looking up.',
    color: 'bg-indigo-600 text-white',
    icon: '⭐',
  },
  {
    title: 'Tamper Evident Sticker',
    text: 'FRAGILE: Handle your next side-project with curiosity.',
    color: 'bg-rose-500 text-white',
    icon: '📦',
  },
];

export const GachaMachine: React.FC = () => {
  const [capsulesLeft, setCapsulesLeft] = useState(2);
  const [dispensedGift, setDispensedGift] = useState<{
    title: string;
    text: string;
    color: string;
    icon: string;
  } | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const handleDispense = () => {
    if (capsulesLeft <= 0 || isRolling) return;

    setIsRolling(true);
    sound.playGachaRoll();

    setTimeout(() => {
      sound.playSuccess();
      const gift = GIFTS[Math.floor(Math.random() * GIFTS.length)];
      setDispensedGift(gift);
      setCapsulesLeft((prev) => Math.max(0, prev - 1));
      setIsRolling(false);
    }, 600);
  };

  const handleReset = () => {
    sound.playClick();
    setCapsulesLeft(2);
    setDispensedGift(null);
  };

  return (
    <div className="bg-kraft-50 border border-kraft-300 rounded-2xl p-6 sm:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-kraft-200">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-800 uppercase tracking-widest">
            <Gift size={14} />
            <span>GACHA MACHINE</span>
          </div>
          <h3 className="text-lg font-serif font-bold text-kraft-950 mt-0.5">
            Take a parting gift.
          </h3>
          <p className="text-xs text-kraft-600 font-sans">
            Dispense a collectible capsule before leaving the unboxing.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs px-3 py-1.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-lg font-bold">
            {capsulesLeft} {capsulesLeft === 1 ? 'CAPSULE' : 'CAPSULES'} LEFT
          </span>
          {capsulesLeft === 0 && (
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg border border-kraft-300 hover:bg-kraft-200 text-kraft-700 transition"
              title="Refill machine"
            >
              <RefreshCw size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Dispenser */}
      <div className="pt-6 flex flex-col sm:flex-row items-center gap-6">
        {/* Machine Crank / Dispense Button */}
        <button
          onClick={handleDispense}
          disabled={capsulesLeft === 0 || isRolling}
          className={`px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-sm ${
            capsulesLeft > 0
              ? 'bg-amber-600 hover:bg-amber-500 text-white cursor-pointer hover:shadow-md active:scale-95'
              : 'bg-kraft-200 text-kraft-400 cursor-not-allowed border border-kraft-300'
          }`}
        >
          <Sparkles size={16} className={isRolling ? 'animate-spin' : ''} />
          <span>{isRolling ? 'Dispensing...' : 'Turn the crank'}</span>
        </button>

        {/* Gift Capsule Display */}
        {dispensedGift && (
          <div
            className={`flex-1 p-4 rounded-xl border animate-fade-in shadow-xs flex items-start gap-3.5 ${dispensedGift.color}`}
          >
            <span className="text-2xl">{dispensedGift.icon}</span>
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wide">
                {dispensedGift.title}
              </p>
              <p className="text-xs font-sans mt-0.5 opacity-90 leading-relaxed">
                "{dispensedGift.text}"
              </p>
            </div>
          </div>
        )}

        {!dispensedGift && (
          <p className="text-xs font-mono text-kraft-500 italic">
            {capsulesLeft > 0
              ? 'Click to turn the crank and receive your parting capsule.'
              : 'Machine empty! Click refresh to insert new coins.'}
          </p>
        )}
      </div>
    </div>
  );
};

