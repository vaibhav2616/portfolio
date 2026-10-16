import React from 'react';
import { Sparkles, Check, RefreshCw, Layers } from 'lucide-react';
import { ClutterItem } from '../types';
import { sound } from '../utils/sound';

interface UnboxClutterProps {
  items: ClutterItem[];
  onToggleItem: (id: number) => void;
  onClearAll: () => void;
  onResetAll: () => void;
}

export const UnboxClutter: React.FC<UnboxClutterProps> = ({
  items,
  onToggleItem,
  onClearAll,
  onResetAll,
}) => {
  const clearedCount = items.filter((i) => i.cleared).length;
  const isAllCleared = clearedCount === items.length;

  return (
    <section id="clutter" className="py-12 px-4 sm:px-6 max-w-5xl mx-auto border-t border-kraft-200">
      <div className="bg-kraft-50 border border-kraft-300 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-kraft-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-800 uppercase tracking-wider mb-1">
              <Layers size={14} />
              <span>WHAT WAS IN THE BOX</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-kraft-950">
              Clear the packing clutter.
            </h2>
            <p className="text-xs sm:text-sm text-kraft-600 font-sans mt-0.5">
              Click items to unpack the parcel and reveal what actually matters.
            </p>
          </div>

          {/* Clutter Out Counter Badge */}
          <div className="flex items-center gap-3">
            <div className="bg-kraft-200 border border-kraft-300 rounded-xl px-4 py-2 text-right">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-kraft-600 font-bold">
                CLUTTER OUT
              </span>
              <span className="font-mono text-lg font-bold text-kraft-950">
                {clearedCount} <span className="text-kraft-400 font-normal">/</span> {items.length}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => {
                  sound.playSuccess();
                  onClearAll();
                }}
                className="px-3 py-1 text-[11px] font-mono bg-kraft-900 hover:bg-kraft-800 text-kraft-50 rounded-lg transition"
              >
                Clear all
              </button>
              <button
                onClick={() => {
                  sound.playClick(500);
                  onResetAll();
                }}
                className="px-3 py-1 text-[11px] font-mono bg-kraft-200 hover:bg-kraft-300 text-kraft-700 rounded-lg transition flex items-center justify-center gap-1"
                title="Reset clutter items"
              >
                <RefreshCw size={10} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Clutter Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.label.includes('Bubble wrap')) {
                  sound.playPop();
                } else {
                  sound.playClick(item.cleared ? 500 : 750);
                }
                onToggleItem(item.id);
              }}
              className={`p-3 rounded-xl border text-left font-mono text-xs transition-all duration-200 relative group flex flex-col justify-between min-h-[92px] ${
                item.cleared
                  ? 'bg-kraft-100/60 border-kraft-200 text-kraft-400 line-through'
                  : 'bg-white border-kraft-300 text-kraft-800 hover:border-amber-500 hover:shadow-sm'
              }`}
            >
              <span className="leading-snug block mb-2">{item.label}</span>
              <div className="flex items-center justify-between pt-1 border-t border-kraft-100 w-full text-[10px]">
                <span className="text-kraft-400 uppercase font-sans">{item.category}</span>
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center transition ${
                    item.cleared
                      ? 'bg-emerald-600 text-white'
                      : 'border border-kraft-300 group-hover:border-amber-600'
                  }`}
                >
                  {item.cleared && <Check size={10} />}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Banner notification when all items are cleared */}
        {isAllCleared && (
          <div className="mt-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs font-mono text-emerald-900 animate-fade-in">
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-emerald-600" />
              <strong>10 / 10 CLUTTER OUT:</strong> The box is completely cleared. Scroll down for the case studies.
            </span>
            <a
              href="#work"
              onClick={() => sound.playClick()}
              className="text-emerald-800 underline font-bold hover:text-emerald-950 ml-2 whitespace-nowrap"
            >
              See projects ↓
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

