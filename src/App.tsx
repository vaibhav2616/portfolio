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
    title: 'AI SRE Pipeline',
    org: 'JIRA AI TRIAGE',
    period: '2025–NOW',
    tagline: 'Autonomous incident triage & log diagnosis.',
    description: 'Autonomous SRE & auto-triage pipeline consuming Kafka error telemetry, evaluating root causes with deep telemetry agents, and opening verified Jira bugs.',
    metric: '98%',
    metricLabel: 'Automated Root Cause Triage Accuracy',
    link: 'ai-sre/',
    highlights: ['Kafka Telemetry', 'Multi-Agent SRE', 'Jira MCP Auto-Triage'],
  },
  {
    num: '02',
    title: 'Payment Engine',
    org: 'FINANCIAL CHASSIS',
    period: '2024–25',
    tagline: 'High-throughput institutional clearing chassis.',
    description: 'Distributed high-concurrency payment orchestration across Indian & global rails with dual-tier ingress idempotency, transactional outbox Kafka streaming, multi-bank cascading routing, and zero-sum double-entry ledger.',
    metric: 'Δ = ₹0.00',
    metricLabel: 'Zero-Sum Invariant Double-Entry Ledger',
    link: 'payment-engine/',
    highlights: ['Dual-Tier Idempotency', 'Transactional Outbox', 'Circuit Breakers'],
  },
  {
    num: '03',
    title: 'Pizza Delivery API',
    org: 'VESUVIO HEARTH',
    period: '2024–25',
    tagline: 'Artisanal delivery engine with sub-100ms P99 latency.',
    description: 'Production-grade pizza ordering and dispatch engine built with FastAPI, SQLAlchemy ORM, JWT authentication, and live 25-minute delivery tracking.',
    metric: '< 100ms',
    metricLabel: 'P99 Query Response Latency',
    link: 'pizza-api/',
    highlights: ['FastAPI REST API', 'SQLAlchemy ORM', 'Docker Containers'],
  },
  {
    num: '04',
    title: 'Insurance Prediction',
    org: 'MACHINE LEARNING',
    period: '2025',
    tagline: 'End-to-end ML pipeline with R² = 0.87 accuracy & sub-150ms predictions.',
    description: 'Predictive insurance pricing pipeline trained with Gradient Boosting and feature crosses (BMI x Smoker), served via async FastAPI endpoints and interactive Streamlit UI in Docker.',
    metric: 'R² = 0.87',
    metricLabel: 'Model Predictive Accuracy',
    link: 'insurance-prediction/',
    highlights: ['Gradient Boosting ML', 'FastAPI Async Engine', 'Streamlit UI + Docker'],
  },
];

// Packing Slip Rows
const PACKING_SLIP_ITEMS: PackingItem[] = [
  {
    qty: '1 ×',
    item: 'Reliability',
    description: 'Autonomous incident triage and root-cause analysis.',
    proof: 'SEE SRE PIPELINE →',
    proofLink: 'ai-sre/',
    expandedDetails: 'Kafka telemetry streaming feeding AI diagnostic pipelines that automatically isolate exceptions and file verified Jira tickets via MCP.',
  },
  {
    qty: '1 ×',
    item: 'Integrity',
    description: 'Zero double-charges and mathematical zero-sum ledger.',
    proof: 'SEE PAYMENT ENGINE →',
    proofLink: 'payment-engine/',
    expandedDetails: 'Dual-tier Redis+PostgreSQL ingress idempotency combined with transactional outbox event relay and Kirchhoff double-entry invariant validation (Δ = ₹0.00).',
  },
  {
    qty: '1 ×',
    item: 'Performance',
    description: 'Sub-100ms P99 queries under concurrent load.',
    proof: 'SEE PIZZA REST API →',
    proofLink: 'pizza-api/',
    expandedDetails: 'Optimized SQLAlchemy query execution plans with indexing, connection pooling, and JWT role-based access control.',
  },
  {
    qty: '1 ×',
    item: 'Machine Learning',
    description: 'Predictive ML pipelines & sub-150ms Streamlit UI.',
    proof: 'SEE INSURANCE PREDICTION →',
    proofLink: 'insurance-prediction/',
    expandedDetails: 'Multi-factor feature scaling, interaction cross engineering, and hyperparameter-tuned gradient boosting reaching R² = 0.87 with containerized async FastAPI serving.',
  },
];

// Career Receipt Records
const CAREER_ENTRIES: ReceiptEntry[] = [
  { company: 'ORGANIC SABZIWALA', role: 'Backend Systems Intern · B2B + B2C Grocery Platform', period: 'DEC 2025 – MAY 2026' },
  { company: 'DISTRIBUTED FINANCIAL CHASSIS', role: 'Backend Systems & ACID Transaction Architecture', period: '2026' },
  { company: 'SAARTHI (PATENT FILED)', role: 'Lead Architect · AR/VR Cultural Heritage Platform', period: 'DEC 2024' },
  { company: 'INNOTECH 2024', role: 'Platform Lead & Project Finalist', period: '2024' },
  { company: 'QUALIFIED GATE 2026', role: 'Computer Science & IT · National Examination', period: '2026' },
  { company: 'KIET GROUP OF INSTITUTIONS', role: 'B.Tech Information Technology · CGPA 8.3', period: '2023–2027', type: 'edu' },
  { company: "ST. ANTHONY'S SCHOOL", role: 'Senior Secondary CBSE · 85%', period: '2021–2022', type: 'edu' },
];

// Kobo Bookshelf
const BOOKS: BookItem[] = [
  {
    id: 1,
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    chapter: 'CHAPTER 1 · FAST AND SLOW',
    heading: 'System 1 guesses, System 2 computes invariants.',
    text: 'Kahneman splits thinking in two: the fast intuitive guess and the slow deliberative check. In distributed backend engineering, System 1 assumes the network is reliable and writes succeed. System 2 verifies idempotency keys, handles network partitions, and enforces zero-sum ledger invariants.',
    badge: 'SYSTEMS THINKING',
    starLink: 'https://github.com/vaibhav2616',
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

