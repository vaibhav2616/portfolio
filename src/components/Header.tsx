import React from 'react';
import { Volume2, VolumeX, Sparkles, Send } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderProps {
  onOpenSemiSettings: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSemiSettings,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-kraft-100/90 border-b border-kraft-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Fragile Badge */}
        <div className="flex items-center gap-3">
          <a
            href="#top"
            onClick={() => sound.playClick(700)}
            className="flex items-center gap-2 group font-mono text-sm tracking-tight"
          >
            <span className="font-bold text-kraft-900 group-hover:text-amber-700 transition">
              vr.
            </span>
            <span className="bg-red-500/10 text-red-700 text-xs px-2 py-0.5 rounded font-mono font-bold tracking-wider uppercase border border-red-500/30">
              FRAGILE
            </span>
          </a>
        </div>

        {/* Primary Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-kraft-700">
          <a
            href="#top"
            onClick={() => sound.playClick()}
            className="hover:text-kraft-900 hover:underline underline-offset-4 decoration-amber-600 transition"
          >
            Home
          </a>
          <a
            href="#work"
            onClick={() => sound.playClick()}
            className="hover:text-kraft-900 hover:underline underline-offset-4 decoration-amber-600 transition"
          >
            Work
          </a>
          <a
            href="#till"
            onClick={() => sound.playClick()}
            className="hover:text-kraft-900 hover:underline underline-offset-4 decoration-amber-600 transition"
          >
            Career
          </a>
          <a
            href="#inside"
            onClick={() => sound.playClick()}
            className="hover:text-kraft-900 hover:underline underline-offset-4 decoration-amber-600 transition"
          >
            About me
          </a>
        </nav>

        {/* Actions: Semi Customizer, Sound, Say Hi */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              sound.playClick(soundEnabled ? 400 : 800);
            }}
            title={soundEnabled ? "Sound is on. Turn sound off" : "Sound is off. Turn sound on"}
            className="p-2 rounded-full hover:bg-kraft-200/70 text-kraft-700 hover:text-kraft-950 transition border border-transparent hover:border-kraft-300"
            aria-label={soundEnabled ? "Mute audio" : "Unmute audio"}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Semi companion toggle */}
          <button
            onClick={() => {
              sound.playClick(650);
              onOpenSemiSettings();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-kraft-200 hover:bg-kraft-300/80 text-kraft-800 transition border border-kraft-300 shadow-sm"
          >
            <Sparkles size={14} className="text-amber-600 animate-pulse" />
            <span>Semi</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          </button>

          {/* Say Hi CTA */}
          <a
            href="#siteFooter"
            onClick={() => sound.playClick()}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-kraft-900 hover:bg-kraft-800 text-kraft-50 transition shadow-sm"
          >
            <span>Say hi</span>
            <Send size={12} />
          </a>
        </div>
      </div>
    </header>
  );
};

