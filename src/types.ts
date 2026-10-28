export type MemberId = 'james' | 'juhoon' | 'martin' | 'seonghyeon' | 'keonho';

export interface Member {
  id: MemberId;
  chineseName: string;
  englishName: string;
  title: string;
  quote: string;
  coreRole: string;
  summary: string;
  details: string;
  endingNote: string;
  color: string;
  badgeBg: string;
  accentBorder: string;
  themeTag: string;
  image: string;
}

export interface HiddenDimensions {
  reliability: number; // 可靠感
  gentleness: number;  // 溫柔感
  contrast: number;    // 反差感
  chemistry: number;   // 默契感
  mystery: number;     // 神秘感
  playfulness: number; // 玩心
}

export interface QuizOption {
  letter: string;
  text: string;
  scores: Record<MemberId, number>;
  dimensions: Partial<HiddenDimensions>;
}

export interface Question {
  id: number;
  prompt: string;
  options: QuizOption[];
}
