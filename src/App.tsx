import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BoxHero } from './components/BoxHero';
import { UnboxClutter } from './components/UnboxClutter';
import { ProjectsGrid } from './components/ProjectsGrid';
import { PackingSlip } from './components/PackingSlip';
import { CareerReceipt } from './components/CareerReceipt';
import { AboutReader } from './components/AboutReader';
import { Footer } from './components/Footer';
import { SemiCompanion } from './components/SemiCompanion';
import { StepperDock } from './components/StepperDock';
import { sound } from './utils/sound';
import {
  SemiConfig,
  ClutterItem,
  ProjectItem,
  PackingItem,
  ReceiptEntry,
  BookItem,
} from './types';

// Initial Clutter List (Observed from DOM)
const INITIAL_CLUTTER: ClutterItem[] = [
  { id: 1, label: 'Last bit of packing paper. Nearly there.', cleared: false, category: 'Packing' },
  { id: 2, label: 'Bubble wrap. I popped three. Sorry.', cleared: false, category: 'Cushion' },
  { id: 3, label: 'A model kit. The shelf at home is full, apparently.', cleared: false, category: 'Hobby' },
  { id: 4, label: 'A murder mystery. She reads the last page last.', cleared: false, category: 'Book' },
  { id: 5, label: 'Taking the pot out. Gently. It’s load-bearing.', cleared: false, category: 'Desk' },
  { id: 6, label: 'Chai, strong. This one stays nearby.', cleared: false, category: 'Fuel' },
  { id: 7, label: 'Stamps from everywhere. Collected, not posted.', cleared: false, category: 'Artifact' },
  { id: 8, label: 'An origami crane. Folded, not bent.', cleared: false, category: 'Paper' },
  { id: 9, label: 'A grocery receipt. Grocery runs are a hobby. Yes, really.', cleared: false, category: 'Routine' },
  { id: 10, label: 'Wired earphones. Bluetooth is a trust exercise.', cleared: false, category: 'Audio' },
];

// 4 Case Files
const PROJECTS: ProjectItem[] = [
  {
    num: '01',
    title: 'CoWork',
    org: 'KENDAL',
    period: '2025–NOW',
    tagline: 'The CRM nobody has to fill in.',
    description: 'Tells commercial real estate brokers what to do first, every morning. Built on automatic context extraction and high-velocity workflow queues.',
    metric: '200+',
    metricLabel: 'Active Brokers on demo launch',
    link: 'https://www.harpreetjaggi.in/cowork/',
    highlights: ['Broker Workflow', 'Zero-Input CRM', 'Fast Prototyping'],
  },
  {
    num: '02',
    title: 'SALT',
    org: 'SALT FINTECH',
    period: '2024–25',
    tagline: 'Where the money moves.',
    description: 'Payments orchestrator across a global trade platform, an enterprise ERP, and CRM ledgers. High-trust friction reduction for cross-border transactions.',
    metric: '₹12L',
    metricLabel: 'Daily Payment Volume Processed',
    link: 'https://www.harpreetjaggi.in/salt/',
    highlights: ['Multi-currency Flows', 'ERP Integration', 'Friction Audit'],
  },
  {
    num: '03',
    title: 'Toddle Insights',
    org: 'TODDLE',
    period: '2023–24',
    tagline: 'Ask the school.',
    description: 'Answers for the big picture and for the kid in row three. Democratizing learning analytics for K-12 teachers, coordinators, and school boards.',
    metric: '85%',
    metricLabel: 'Adoption in 3 Months',
    link: 'https://www.harpreetjaggi.in/toddle/',
    highlights: ['K-12 Analytics', 'Teacher Ergonomics', 'School Intelligence'],
  },
  {
    num: '04',
    title: 'Atlassian',
    org: 'ATLASSIAN',
    period: '2023',
    tagline: 'How enterprises actually buy.',
    description: 'Designing enterprise self-serve quoting and multi-tier pricing transitions within Commerce Cloud, removing sales bottlenecks for complex tiering.',
    metric: '100k+',
    metricLabel: 'Enterprise Commerce Quoting',
    link: 'https://www.harpreetjaggi.in/atlassian/',
    highlights: ['B2B Procurement', 'Self-Serve Quoting', 'Commerce UX'],
  },
];

// Packing Slip Rows
const PACKING_SLIP_ITEMS: PackingItem[] = [
  {
    qty: '1 ×',
    item: 'Build',
    description: 'Working software, not decks.',
    proof: 'SEE COWORK →',
    proofLink: 'https://www.harpreetjaggi.in/cowork/',
    expandedDetails: 'Functional interactive React/TypeScript prototypes built in 24-hour sprints to stress-test real user dynamics before engineering lock-in.',
  },
  {
    qty: '1 ×',
    item: 'Research',
    description: 'Finding the real question.',
    proof: 'SEE ATLASSIAN →',
    proofLink: 'https://www.harpreetjaggi.in/atlassian/',
    expandedDetails: 'Deep enterprise customer shadowing and procurement cycle mapping, identifying why self-serve purchasing stalled at seat quotas.',
  },
  {
    qty: '1 ×',
    item: 'Decide',
    description: 'Calls you can defend.',
    proof: 'SEE TODDLE →',
    proofLink: 'https://www.harpreetjaggi.in/toddle/',
    expandedDetails: 'Prioritizing teacher day-to-day usability over speculative administrator metrics, achieving 85% organic three-month adoption.',
  },
  {
    qty: '1 ×',
    item: 'Ship',
    description: 'And owning what ships.',
    proof: 'SEE SALT →',
    proofLink: 'https://www.harpreetjaggi.in/salt/',
    expandedDetails: 'Overseeing zero-downtime payment checkouts moving ₹12L daily with comprehensive state fallbacks and error handling.',
  },
];

// Career Receipt Records
const CAREER_ENTRIES: ReceiptEntry[] = [
  { company: 'KENDAL', role: 'Senior product designer', period: '2025–NOW' },
  { company: 'PARALLEL', role: 'Senior consultant · launch.today', period: 'APR–OCT 2025' },
  { company: 'SALT', role: 'Product designer', period: '2024–25' },
  { company: 'TODDLE', role: 'Product designer', period: '2023–24' },
  { company: 'ATLASSIAN', role: 'Design intern', period: '2023' },
  { company: 'MIT INSTITUTE OF DESIGN', role: 'UX design · Bachelor of Design', period: 'EDU', type: 'edu' },
];

// Kobo Bookshelf
const BOOKS: BookItem[] = [
  {
    id: 1,
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    chapter: 'CHAPTER 1 · FAST AND SLOW',
    heading: 'My gut says the stars are close.',
    text: 'Kahneman splits thinking in two: the fast guess and the slow check. Mountains and night skies make me feel small, and System 1 says the stars are right there. System 2 does the maths. A friend gifted me a star named Khushi, my nickname. Magnitude 8.81, so binoculars, not eyes.',
    badge: 'LEO · TOO FAINT FOR NAKED EYE',
    starLink: 'https://www.harpreetjaggi.in/star/',
  },
  {
    id: 2,
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    chapter: 'CHAPTER 2 · UNRAVELLING',
    heading: 'Silence as a conscious choice.',
    text: 'A psychological study in withholding. In product design, what we intentionally choose NOT to say or show to the user creates the room for real focus.',
    badge: 'PSYCHOLOGICAL THRILLER',
  },
  {
    id: 3,
    title: 'Graveyard Shift',
    author: 'M. L. Rio',
    chapter: 'CHAPTER 3 · NIGHT OBSERVATIONS',
    heading: 'Late nights in Bengaluru.',
    text: 'Stories best unraveled when the street dogs stop barking and the caffeine sets in. Designing software late at night gives you clarity on what is essential.',
    badge: 'NOCTURNE',
  },
  {
    id: 4,
    title: 'Percy Jackson',
    author: 'Rick Riordan',
    chapter: 'CHAPTER 4 · MODERN MYTHS',
    heading: 'Relentless forward momentum.',
    text: 'Heroics without pretension. Simple metaphors that carry immense weight and stay memorable across decades.',
    badge: 'MYTHOLOGY',
  },
  {
    id: 5,
    title: 'Title redacted',
    author: 'Name classified',
    chapter: 'CHAPTER 5 · WORK IN PROGRESS',
    heading: 'The unwritten chapters.',
    text: 'Keeping space open for whatever comes next. Software is never finished; it just pauses long enough to gather feedback.',
    badge: 'CONFIDENTIAL',
  },
];

export const App: React.FC = () => {
  // State
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [clutterItems, setClutterItems] = useState<ClutterItem[]>(INITIAL_CLUTTER);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSemiSettingsOpen, setIsSemiSettingsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('top');
  const [semiSpeech, setSemiSpeech] = useState("It's open. Mind the clutter.");

  const [semiConfig, setSemiConfig] = useState<SemiConfig>({
    shape: 'clover',
    material: 'glass',
    color: 'haldi',
    mood: 'idle',
  });

  // Toggle sound
  const handleToggleSound = () => {
    sound.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  // Clutter handlers
  const handleToggleClutter = (id: number) => {
    setClutterItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cleared: !item.cleared } : item))
    );
  };

  const handleClearAllClutter = () => {
    setClutterItems((prev) => prev.map((item) => ({ ...item, cleared: true })));
    setSemiSpeech("All clutter packed away! Clean and ready for the case studies.");
  };

  const handleResetClutter = () => {
    setClutterItems(INITIAL_CLUTTER);
    setSemiSpeech("Clutter unpacked again. Take your time inspecting.");
  };

  // Smooth Section Jump
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track scroll position to update Stepper Dock and Semi Dialogue
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['top', 'clutter', 'work', 'slip', 'till', 'inside', 'siteFooter'];
      const scrollY = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollY) {
          const activeSec = sections[i] === 'siteFooter' ? 'inside' : sections[i];
          if (activeSec !== currentSection) {
            setCurrentSection(activeSec);
            // Update Semi's dialogue
            if (activeSec === 'top') {
              setSemiSpeech(isBoxOpen ? "It's open. Mind the clutter." : "Welcome! Scroll to open the box.");
            } else if (activeSec === 'clutter') {
              setSemiSpeech("Bubble wrap pops! Click to clear items.");
            } else if (activeSec === 'work') {
              setSemiSpeech("Four things that actually matter. CoWork is my favorite.");
            } else if (activeSec === 'slip') {
              setSemiSpeech("4 items, 1 pun. Packed in Bengaluru.");
            } else if (activeSec === 'till') {
              setSemiSpeech("Paid in hot chai. No refunds!");
            } else if (activeSec === 'inside') {
              setSemiSpeech("I think I've explained myself enough. Possibly too much.");
            }
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection, isBoxOpen]);

  const clearedClutterCount = clutterItems.filter((i) => i.cleared).length;

  return (
    <div className="min-h-screen bg-kraft-100 text-kraft-900 font-sans selection:bg-amber-300 selection:text-kraft-950 flex flex-col justify-between">
      {/* Top Navbar */}
      <Header
        onOpenSemiSettings={() => setIsSemiSettingsOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      <main className="flex-1">
        {/* 1. Box Hero */}
        <BoxHero
          isBoxOpen={isBoxOpen}
          onToggleBox={() => setIsBoxOpen(!isBoxOpen)}
          clutterCount={clearedClutterCount}
          totalClutter={clutterItems.length}
        />

        {/* 2. Unboxing Clutter Checklist */}
        <UnboxClutter
          items={clutterItems}
          onToggleItem={handleToggleClutter}
          onClearAll={handleClearAllClutter}
          onResetAll={handleResetClutter}
        />

        {/* 3. Featured Case Files */}
        <ProjectsGrid projects={PROJECTS} />

        {/* 4. Packing Slip */}
        <PackingSlip items={PACKING_SLIP_ITEMS} />

        {/* 5. Career Itemised Receipt */}
        <CareerReceipt entries={CAREER_ENTRIES} />

        {/* 6. About Me & Interactive Kobo Reader */}
        <AboutReader books={BOOKS} />
      </main>

      {/* Footer & Gacha Machine */}
      <Footer
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Floating Stepper Dock */}
      <StepperDock
        currentSection={currentSection}
        onNavigateSection={handleNavigateSection}
      />

      {/* Semi Live Companion & Settings Modal */}
      <SemiCompanion
        config={semiConfig}
        onUpdateConfig={setSemiConfig}
        isOpen={isSemiSettingsOpen}
        onClose={() => setIsSemiSettingsOpen(false)}
        currentMessage={semiSpeech}
      />
    </div>
  );
};

