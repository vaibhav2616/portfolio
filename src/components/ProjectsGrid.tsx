import React from 'react';
import { ArrowUpRight, FolderGit2, Sparkles, TrendingUp } from 'lucide-react';
import { ProjectItem } from '../types';
import { sound } from '../utils/sound';

interface ProjectsGridProps {
  projects: ProjectItem[];
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  return (
    <section id="work" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-kraft-200">
      {/* Section Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-800 uppercase tracking-wider mb-1">
          <FolderGit2 size={14} />
          <span>CASE FILES · THE WORK</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-kraft-950">
          Four things that actually matter.
        </h2>
        <p className="text-sm text-kraft-700 font-sans mt-2 max-w-xl">
          Real software delivered into production, measured in active users, millions in payments, and team velocity.
        </p>
      </div>

      {/* Projects 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.num}
            className="bg-kraft-50 border border-kraft-300 hover:border-amber-600/70 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Top decorative folder tab tag */}
            <div className="absolute top-0 right-0 bg-kraft-200 border-l border-b border-kraft-300 px-3 py-1 text-[11px] font-mono text-kraft-700 rounded-bl-xl uppercase">
              {proj.org}
            </div>

            <div>
              {/* Index & Year */}
              <div className="flex items-center gap-3 text-xs font-mono text-amber-800 font-bold mb-3">
                <span className="bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  {proj.num}
                </span>
                <span className="text-kraft-500 font-normal">{proj.period}</span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-kraft-950 group-hover:text-amber-900 transition">
                {proj.title}
              </h3>
              <p className="text-sm font-semibold text-amber-800 mt-1 font-sans">
                {proj.tagline}
              </p>
              <p className="text-sm text-kraft-700 mt-3 leading-relaxed font-sans">
                {proj.description}
              </p>

              {/* Key Highlights list */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {proj.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-[11px] font-mono bg-white border border-kraft-200 px-2.5 py-0.5 rounded-md text-kraft-600"
                  >
                    <Sparkles size={10} className="text-amber-500" />
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Metric & Action link */}
            <div className="mt-6 pt-5 border-t border-kraft-200 flex items-center justify-between">
              <div>
                <span className="block text-2xl font-mono font-bold text-kraft-950 flex items-center gap-1.5">
                  <TrendingUp size={16} className="text-emerald-600" />
                  {proj.metric}
                </span>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-kraft-500">
                  {proj.metricLabel}
                </span>
              </div>

              <a
                href={proj.link}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick(800)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-kraft-900 hover:bg-kraft-800 text-kraft-50 transition shadow-sm group/btn"
              >
                <span>Read case</span>
                <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition transform" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

