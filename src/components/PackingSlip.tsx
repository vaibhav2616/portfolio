import React, { useState } from 'react';
import { ClipboardList, ChevronDown, ChevronUp, ArrowRight, Stamp } from 'lucide-react';
import { PackingItem } from '../types';
import { sound } from '../utils/sound';

interface PackingSlipProps {
  items: PackingItem[];
}

export const PackingSlip: React.FC<PackingSlipProps> = ({ items }) => {
  const [expandedId, setExpandedId] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    sound.playClick(expandedId === index ? 500 : 700);
    setExpandedId(expandedId === index ? null : index);
  };

  return (
    <section id="slip" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-kraft-200">
      <div className="bg-kraft-50 border border-kraft-300 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Subtle Watermark Stamp */}
        <div className="absolute right-6 top-6 opacity-10 pointer-events-none rotate-12">
          <Stamp size={120} className="text-amber-950" />
        </div>

        {/* Packing Slip Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-kraft-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-800 uppercase tracking-widest mb-1">
              <ClipboardList size={14} />
              <span>PACKING SLIP · MANIFEST</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-kraft-950">
              What you're getting
            </h2>
            <p className="text-xs sm:text-sm text-kraft-600 font-sans mt-0.5">
              Verified deliverables inside every design collaboration.
            </p>
          </div>

          {/* Stamped Order Tag */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-md font-bold">
              ORDER #BRDS
            </span>
            <span className="bg-kraft-200 text-kraft-800 border border-kraft-300 px-3 py-1 rounded-md">
              4 ITEMS · 1 PUN
            </span>
            <span className="bg-kraft-200 text-kraft-700 border border-kraft-300 px-3 py-1 rounded-md">
              PACKED IN BENGALURU
            </span>
          </div>
        </div>

        {/* Manifest Table */}
        <div className="mt-6">
          {/* Header Row */}
          <div className="hidden sm:grid grid-cols-12 gap-4 pb-2 border-b border-kraft-200 text-[11px] font-mono font-bold text-kraft-500 uppercase tracking-wider">
            <div className="col-span-1">QTY</div>
            <div className="col-span-3">ITEM</div>
            <div className="col-span-5">DESCRIPTION</div>
            <div className="col-span-3 text-right">PROOF</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-kraft-200">
            {items.map((row, idx) => {
              const isExpanded = expandedId === idx;
              return (
                <div key={idx} className="py-3.5 transition group">
                  <div
                    onClick={() => toggleExpand(idx)}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center cursor-pointer select-none"
                  >
                    <div className="sm:col-span-1 font-mono font-bold text-amber-800 text-xs sm:text-sm">
                      {row.qty}
                    </div>

                    <div className="sm:col-span-3 font-mono font-bold text-kraft-950 text-sm flex items-center gap-1.5">
                      <span>{row.item}</span>
                      {isExpanded ? (
                        <ChevronUp size={14} className="text-kraft-500 sm:hidden" />
                      ) : (
                        <ChevronDown size={14} className="text-kraft-500 sm:hidden" />
                      )}
                    </div>

                    <div className="sm:col-span-5 text-xs sm:text-sm text-kraft-700 font-sans">
                      {row.description}
                    </div>

                    <div className="sm:col-span-3 flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0">
                      <a
                        href={row.proofLink}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playClick(850);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-800 hover:text-amber-950 hover:underline"
                      >
                        <span>{row.proof}</span>
                        <ArrowRight size={12} />
                      </a>
                      <button
                        type="button"
                        className="p-1 text-kraft-400 hover:text-kraft-700 transition hidden sm:inline-block"
                        aria-label="Expand packing details"
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Evidence Details */}
                  {isExpanded && (
                    <div className="mt-3 p-3.5 bg-white border border-kraft-200 rounded-xl text-xs font-sans text-kraft-700 animate-fade-in flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <p className="leading-relaxed">
                        <strong className="text-kraft-900 font-semibold font-mono">Proof Specification: </strong>
                        {row.expandedDetails}
                      </p>
                      <a
                        href={row.proofLink}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.playClick(900)}
                        className="px-3 py-1 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 font-mono text-[11px] font-bold whitespace-nowrap transition"
                      >
                        Verify Live Case →
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="mt-8 pt-4 border-t border-kraft-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-kraft-500">
          <p>Click an item to inspect the proof.</p>
          <p className="text-kraft-600 font-semibold">No returns. Exchanges welcome.</p>
        </div>
      </div>
    </section>
  );
};

