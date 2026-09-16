export type ExperienceLevel = 'none' | 'basic' | 'intermediate';
export type Objective = 'frontend' | 'backend' | 'fullstack';
export type Timeframe = '6months' | '1year' | '2years';
export type Priority = 'essential' | 'recommended' | 'optional';
export type BadgeType = 'now' | 'ai' | 'hot' | 'base';
export type ColorTheme = 'teal' | 'blue' | 'purple' | 'amber' | 'coral' | 'gray';

export interface RoadmapParams {
  experienceLevel: ExperienceLevel;
  language: string;
  objective: Objective;
  timeframe: Timeframe;
}

export interface SkillItem {
  text: string;
  badge?: BadgeType;
}

export interface RoadmapCard {
  title: string;
  icon: string;         // tabler icon name ej: "ti-brand-angular"
  color: ColorTheme;
  items: SkillItem[];
  note?: string;
  fullWidth?: boolean;
}

export interface RoadmapPhase {
  label: string;        // "Fase 1 · 0–3 meses"
  title: string;        // "Conseguir el primer trabajo"
  description: string;
  timelineLabel: string; // "Ahora · 0–3m"
  cards: RoadmapCard[];
}

export interface RoadmapResponse {
  phases: RoadmapPhase[];
}

export interface RoadmapRequest {
  params: RoadmapParams;
}