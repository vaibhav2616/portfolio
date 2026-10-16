import React from 'react';
import { Receipt, Coffee } from 'lucide-react';
import { ReceiptEntry } from '../types';
import { sound } from '../utils/sound';

interface CareerReceiptProps {
  entries: ReceiptEntry[];
}

export const CareerReceipt: React.FC<CareerReceiptProps> = ({ entries }) => {
  return (
    <section id="till" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-kraft-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Context and Stat Callouts */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-800 uppercase tracking-widest mb-1">
              <Receipt size={14} />
              <span>CAREER · ITEMISED</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-kraft-950">
              Itemised, like a receipt.
            </h2>
            <p className="text-sm text-kraft-700 font-sans mt-3 leading-relaxed">
              Every place I've designed, built and shipped, with the total at the bottom. No refunds.
            </p>
          </div>

          {/* Three Key Metrics */}
          <div className="space-y-4 pt-2">
            <div className="p-4 bg-kraft-50 border border-kraft-300 rounded-xl flex items-start gap-4">
              <div className="font-mono text-2xl font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-lg border border-amber-300">
                200+
              </div>
              <div>
                <p className="font-bold text-kraft-900 text-sm font-sans">
                  paying users on CoWork
                </p>
                <p className="text-xs text-kraft-600 font-sans mt-0.5">
                  Converted from a rapid 24-hour interactive broker demo.
                </p>
              </div>
            </div>

            <div className="p-4 bg-kraft-50 border border-kraft-300 rounded-xl flex items-start gap-4">
              <div className="font-mono text-2xl font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-lg border border-amber-300">
                85%
              </div>
              <div>
                <p className="font-bold text-kraft-900 text-sm font-sans">
                  adoption of Toddle Insights
                </p>
                <p className="text-xs text-kraft-600 font-sans mt-0.5">
                  Reached school-wide daily adoption in under three months.
                </p>
              </div>
            </div>

            <div className="p-4 bg-kraft-50 border border-kraft-300 rounded-xl flex items-start gap-4">
              <div className="font-mono text-2xl font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-lg border border-amber-300">
                ₹12L
              </div>
              <div>
                <p className="font-bold text-kraft-900 text-sm font-sans">
                  a day in payments
                </p>
                <p className="text-xs text-kraft-600 font-sans mt-0.5">
                  Processed reliably through SALT's transactional flows.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Physical Thermal Receipt Component */}
        <div className="lg:col-span-6 flex justify-center">
          <div
            onClick={() => sound.playClick(600)}
            className="w-full max-w-sm bg-[#FAF8F5] text-kraft-900 font-mono shadow-receipt rounded-sm border border-kraft-300 relative select-none transform hover:-rotate-1 transition-transform duration-300"
          >
            {/* Top jagged edge */}
            <div className="receipt-edge-top w-full" />

            <div className="p-6 sm:p-7 space-y-4">
              {/* Receipt Header */}
              <div className="text-center space-y-1 pb-4 border-b border-dashed border-kraft-300">
                <h3 className="font-bold text-lg tracking-wider">VAIBHAV & CO.</h3>
                <p className="text-[11px] text-kraft-600 tracking-widest">
                  GHAZIABAD · SYSTEMS LAB · OPEN 24/7
                </p>
                <p className="text-[10px] text-amber-800 font-bold">
                  CASHIER: SEMI · TILL #01
                </p>
              </div>

              {/* Timestamp and Transaction Details */}
              <div className="flex justify-between text-[10px] text-kraft-500 pb-1">
                <span>DATE: 2021–2026</span>
                <span>STATUS: COMPLETE</span>
              </div>

              {/* Itemized Line Items */}
              <div className="space-y-3.5 pt-2">
                {entries.map((entry, index) => (
                  <div key={index} className="flex justify-between items-start text-xs leading-snug">
                    <div>
                      <span className="font-bold uppercase tracking-wide block">
                        {entry.company}
                      </span>
                      <span className="text-[11px] text-kraft-600 block">
                        {entry.role}
                      </span>
                    </div>
                    <span className="text-right text-[11px] font-semibold text-amber-900 whitespace-nowrap pl-2">
                      {entry.period}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Calculation Section */}
              <div className="pt-4 border-t-2 border-dashed border-kraft-400 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>TOTAL EXPERIENCE</span>
                  <span className="text-amber-900">3+ YRS ENG</span>
                </div>
                <div className="flex justify-between text-xs text-kraft-600">
                  <span>ITEMS / PRODUCTS</span>
                  <span>6 SYSTEMS</span>
                </div>
                <div className="flex justify-between text-xs text-kraft-600 flex items-center">
                  <span className="flex items-center gap-1">
                    <Coffee size={12} className="text-amber-700" />
                    PAID IN
                  </span>
                  <span className="font-bold text-amber-800">COFFEE & CODE (ALWAYS HOT)</span>
                </div>
              </div>

              {/* Barcode Simulation */}
              <div className="pt-5 pb-2 text-center space-y-2 border-t border-kraft-200">
                {/* SVG Barcode */}
                <div className="flex justify-center items-center gap-[2px] h-9 px-4">
                  {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 1, 3, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2].map(
                    (width, idx) => (
                      <div
                        key={idx}
                        className="bg-kraft-900 h-full"
                        style={{ width: `${width * 1.5}px` }}
                      />
                    )
                  )}
                </div>
                <p className="text-[10px] tracking-widest text-kraft-500 uppercase">
                  * 2026-PORTFOLIO-UNBOXED *
                </p>
                <p className="text-[11px] font-bold text-kraft-800 pt-1">
                  THANK YOU FOR READING. ZERO DUPLICATE EVENTS GUARANTEED.
                </p>
              </div>
            </div>

            {/* Bottom jagged edge */}
            <div className="receipt-edge-bottom w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

