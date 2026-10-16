import React from 'react';
import { X, Sparkles, SlidersHorizontal, Glasses, Moon, Zap, Smile } from 'lucide-react';
import { SemiConfig, SemiShape, SemiMaterial, SemiColor, SemiMood } from '../types';
import { sound } from '../utils/sound';

interface SemiCompanionProps {
  config: SemiConfig;
  onUpdateConfig: (newConfig: SemiConfig) => void;
  isOpen: boolean;
  onClose: () => void;
  currentMessage: string;
}

const COLOR_MAP: Record<SemiColor, { bg: string; text: string; label: string; hex: string }> = {
  haldi: { bg: 'bg-amber-400', text: 'text-amber-950', label: 'Haldi (Turmeric)', hex: '#F59E0B' },
  kesar: { bg: 'bg-orange-500', text: 'text-orange-950', label: 'Kesar (Saffron)', hex: '#F97316' },
  gulmohar: { bg: 'bg-rose-500', text: 'text-white', label: 'Gulmohar (Vermilion)', hex: '#EF4444' },
  mehendi: { bg: 'bg-lime-600', text: 'text-lime-950', label: 'Mehendi (Henna)', hex: '#84CC16' },
  jaipur: { bg: 'bg-blue-600', text: 'text-white', label: 'Jaipur Blue', hex: '#3B82F6' },
  jamun: { bg: 'bg-purple-600', text: 'text-white', label: 'Jamun (Plum)', hex: '#8B5CF6' },
  chai: { bg: 'bg-amber-800', text: 'text-amber-100', label: 'Chai (Warm Brew)', hex: '#92400E' },
};

export const SemiCompanion: React.FC<SemiCompanionProps> = ({
  config,
  onUpdateConfig,
  isOpen,
  onClose,
  currentMessage,
}) => {
  const currentColor = COLOR_MAP[config.color];

  const getShapeClasses = (shape: SemiShape) => {
    switch (shape) {
      case 'round':
        return 'rounded-full';
      case 'clover':
        return 'rounded-[24px] rotate-3';
      case 'flower':
        return 'rounded-[30% 70% 70% 30% / 30% 30% 70% 70%]';
      case 'square':
        return 'rounded-xl';
    }
  };

  const getMaterialClasses = (mat: SemiMaterial) => {
    switch (mat) {
      case 'fabric':
        return 'border border-black/20 shadow-inner bg-opacity-95';
      case 'glass':
        return 'backdrop-blur-md bg-opacity-70 border border-white/50 shadow-lg';
      case 'glow':
        return 'shadow-[0_0_25px_rgba(245,158,11,0.6)] border border-amber-300';
      case 'plastic':
        return 'border-2 border-white/40 shadow-md';
    }
  };

  return (
    <>
      {/* Semi Live Companion Badge & Speech Bubble */}
      <div className="fixed bottom-24 right-5 sm:right-8 z-30 flex flex-col items-end pointer-events-none">
        {/* Speech Bubble */}
        {currentMessage && (
          <div className="mb-2 max-w-xs px-3.5 py-2 bg-kraft-50 border border-kraft-300 text-kraft-900 rounded-2xl rounded-br-sm shadow-md text-xs font-mono animate-fade-in pointer-events-auto">
            <div className="text-[10px] uppercase font-bold text-amber-700 mb-0.5 flex items-center gap-1">
              <Sparkles size={10} />
              <span>SEMI</span>
            </div>
            {currentMessage}
          </div>
        )}

        {/* Semi Interactive Avatar */}
        <button
          onClick={() => {
            sound.playClick(800);
            onUpdateConfig({
              ...config,
              mood: config.mood === 'working' ? 'curious' : 'working',
            });
          }}
          className={`w-12 h-12 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 pointer-events-auto cursor-pointer ${
            currentColor.bg
          } ${getShapeClasses(config.shape)} ${getMaterialClasses(config.material)}`}
          title="Semi: Click to interact, or open settings"
          aria-label="Semi Companion Avatar"
        >
          {config.mood === 'working' && <Glasses size={20} className={currentColor.text} />}
          {config.mood === 'sleeping' && <Moon size={18} className={currentColor.text} />}
          {config.mood === 'curious' && <Zap size={18} className={currentColor.text} />}
          {config.mood === 'idle' && <Smile size={20} className={currentColor.text} />}
        </button>
      </div>

      {/* Semi Customization Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-kraft-950/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-kraft-50 border border-kraft-300 rounded-2xl shadow-2xl max-w-md w-full p-6 text-kraft-900 relative">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-kraft-200">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-amber-700" />
                <h3 className="font-bold font-serif text-lg">Pick your Semi</h3>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="p-1 rounded-full hover:bg-kraft-200 text-kraft-700 transition"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-kraft-600 mt-2 font-sans italic">
              "It came in the box. It has opinions. Every version is called Semi."
            </p>

            <div className="mt-5 space-y-4 text-xs font-mono">
              {/* Shape */}
              <div>
                <label className="block text-kraft-700 font-bold mb-1.5 uppercase">Shape</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['round', 'clover', 'flower', 'square'] as SemiShape[]).map((shape) => (
                    <button
                      key={shape}
                      onClick={() => {
                        sound.playClick(700);
                        onUpdateConfig({ ...config, shape });
                      }}
                      className={`py-2 px-2 capitalize rounded-lg border text-center transition ${
                        config.shape === shape
                          ? 'border-amber-700 bg-amber-100 font-bold text-amber-900'
                          : 'border-kraft-200 bg-white hover:bg-kraft-100'
                      }`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Tokens */}
              <div>
                <label className="block text-kraft-700 font-bold mb-1.5 uppercase">
                  Cultural Color Token: <span className="text-amber-800">{currentColor.label}</span>
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {(Object.keys(COLOR_MAP) as SemiColor[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        sound.playClick(900);
                        onUpdateConfig({ ...config, color: c });
                      }}
                      className={`w-full aspect-square rounded-full transition transform hover:scale-110 ${
                        COLOR_MAP[c].bg
                      } ${
                        config.color === c
                          ? 'ring-2 ring-offset-2 ring-kraft-900 scale-105'
                          : 'opacity-85 hover:opacity-100'
                      }`}
                      title={COLOR_MAP[c].label}
                    />
                  ))}
                </div>
              </div>

              {/* Material */}
              <div>
                <label className="block text-kraft-700 font-bold mb-1.5 uppercase">Material Finish</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['fabric', 'glass', 'glow', 'plastic'] as SemiMaterial[]).map((mat) => (
                    <button
                      key={mat}
                      onClick={() => {
                        sound.playClick(600);
                        onUpdateConfig({ ...config, material: mat });
                      }}
                      className={`py-2 px-2 capitalize rounded-lg border text-center transition ${
                        config.material === mat
                          ? 'border-amber-700 bg-amber-100 font-bold text-amber-900'
                          : 'border-kraft-200 bg-white hover:bg-kraft-100'
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mood */}
              <div>
                <label className="block text-kraft-700 font-bold mb-1.5 uppercase">Mood</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['idle', 'working', 'sleeping', 'curious'] as SemiMood[]).map((mood) => (
                    <button
                      key={mood}
                      onClick={() => {
                        sound.playClick(750);
                        onUpdateConfig({ ...config, mood });
                      }}
                      className={`py-2 px-2 capitalize rounded-lg border text-center transition ${
                        config.mood === mood
                          ? 'border-amber-700 bg-amber-100 font-bold text-amber-900'
                          : 'border-kraft-200 bg-white hover:bg-kraft-100'
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Done button */}
            <div className="mt-6 pt-3 border-t border-kraft-200 flex justify-end">
              <button
                onClick={() => {
                  sound.playSuccess();
                  onClose();
                }}
                className="px-5 py-2 rounded-xl bg-kraft-900 hover:bg-kraft-800 text-kraft-50 text-xs font-mono font-bold transition shadow-sm"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

