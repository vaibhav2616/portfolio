export type SemiShape = 'round' | 'clover' | 'flower' | 'square';
export type SemiMaterial = 'fabric' | 'glass' | 'glow' | 'plastic';
export type SemiColor = 'haldi' | 'kesar' | 'gulmohar' | 'mehendi' | 'jaipur' | 'jamun' | 'chai';
export type SemiMood = 'idle' | 'working' | 'sleeping' | 'curious';

export interface SemiConfig {
  shape: SemiShape;
  material: SemiMaterial;
  color: SemiColor;
  mood: SemiMood;
}

export interface ClutterItem {
  id: number;
  label: string;
  cleared: boolean;
  category: string;
}

export interface ProjectItem {
  num: string;
  title: string;
  org: string;
  period: string;
  tagline: string;
  description: string;
  metric: string;
  metricLabel: string;
  link: string;
  highlights: string[];
}

export interface BookItem {
  id: number;
  title: string;
  author: string;
  chapter: string;
  heading: string;
  text: string;
  badge: string;
  starLink?: string;
}

export interface PackingItem {
  qty: string;
  item: string;
  description: string;
  proof: string;
  proofLink: string;
  expandedDetails: string;
}

export interface ReceiptEntry {
  company: string;
  role: string;
  period: string;
  type?: 'job' | 'edu';
}

