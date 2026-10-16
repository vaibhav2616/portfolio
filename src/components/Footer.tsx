import React from 'react';
import { ArrowUp, Mail, Linkedin, BookOpen, Volume2, VolumeX } from 'lucide-react';
import { GachaMachine } from './GachaMachine';
import { sound } from '../utils/sound';

interface FooterProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <footer id="siteFooter" className="pt-16 pb-28 px-4 sm:px-6 max-w-5xl mx-auto border-t border-kraft-200">
      {/* Gacha Machine interactive widget */}
      <div className="mb-14">
        <GachaMachine />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-kraft-200">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <a
            href="#top"
            onClick={() => sound.playClick(700)}
            className="inline-flex items-center gap-2 group font-mono text-sm tracking-tight"
          >
            <span className="font-bold text-kraft-900 group-hover:text-amber-700 transition">
              hj.
            </span>
            <span className="bg-red-500/10 text-red-700 text-xs px-2 py-0.5 rounded font-mono font-bold tracking-wider uppercase border border-red-500/30">
              FRAGILE
            </span>
          </a>

          <p className="text-sm text-kraft-700 font-sans max-w-sm leading-relaxed">
            Thanks for unboxing. Let's make something people actually use.
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                onToggleSound();
                sound.playClick(soundEnabled ? 400 : 800);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-kraft-300 bg-white hover:bg-kraft-100 text-xs font-mono text-kraft-700 transition"
            >
              {soundEnabled ? (
                <>
                  <Volume2 size={14} className="text-emerald-600" />
                  <span>Sound is on. Turn sound off</span>
                </>
              ) : (
                <>
                  <VolumeX size={14} className="text-kraft-400" />
                  <span>Sound is off. Turn sound on</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Column 1: Work */}
        <div className="md:col-span-3 space-y-3">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-kraft-900">
            WORK
          </p>
          <ul className="space-y-2 text-xs font-sans text-kraft-700">
            <li>
              <a
                href="https://www.harpreetjaggi.in/cowork/"
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="hover:text-kraft-950 hover:underline"
              >
                CoWork (Kendal)
              </a>
            </li>
            <li>
              <a
                href="https://www.harpreetjaggi.in/salt/"
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="hover:text-kraft-950 hover:underline"
              >
                SALT SUMMARY
              </a>
            </li>
            <li>
              <a
                href="https://www.harpreetjaggi.in/toddle/"
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="hover:text-kraft-950 hover:underline"
              >
                Toddle Insights
              </a>
            </li>
            <li>
              <a
                href="https://www.harpreetjaggi.in/atlassian/"
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="hover:text-kraft-950 hover:underline"
              >
                Atlassian SUMMARY
              </a>
            </li>
          </ul>
        </div>

        {/* Navigation Column 2: Elsewhere */}
        <div className="md:col-span-4 space-y-3">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-kraft-900">
            ELSEWHERE
          </p>
          <ul className="space-y-2 text-xs font-sans text-kraft-700">
            <li>
              <a
                href="mailto:vaibhav.2327it1108@kiet.edu"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-1.5 hover:text-amber-800 hover:underline"
              >
                <Mail size={13} />
                <span>vaibhav.2327it1108@kiet.edu</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/vaibhav-rastogi-26asvr/"
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-1.5 hover:text-amber-800 hover:underline"
              >
                <Linkedin size={13} />
                <span>LinkedIn ↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/vaibhav2616"
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-1.5 hover:text-amber-800 hover:underline"
              >
                <BookOpen size={13} />
                <span>GitHub ↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Colophon & Back to top */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-kraft-500">
        <p className="flex items-center gap-1">
          <span>© 2026 Vaibhav Rastogi · Engineered and built in Ghaziabad / Delhi NCR.</span>
        </p>

        <a
          href="#top"
          onClick={() => sound.playClick(900)}
          className="inline-flex items-center gap-1.5 hover:text-kraft-900 transition font-bold"
        >
          <span>Back to top</span>
          <ArrowUp size={13} />
        </a>
      </div>
    </footer>
  );
};

