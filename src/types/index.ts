export type TextSize = 'standard' | 'large' | 'xl';
export type AppLanguage = 'en' | 'ta' | 'hi' | 'te' | 'ml' | 'mr';
export type VoiceSpeed = 0.8 | 1.0 | 1.2;

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  language?: AppLanguage;
  isSpoken?: boolean;
  quickAction?: string;
}

export interface AccessibilitySettings {
  textSize: TextSize;
  highContrast: boolean;
  reduceMotion: boolean;
  voiceSpeed: VoiceSpeed;
  autoReadAloud: boolean;
  language: AppLanguage;
}

export interface GuideStep {
  stepNumber: number;
  title: string;
  instruction: string;
  tip?: string;
  illustrationType: 'qr_camera' | 'qr_align' | 'qr_tap' | 'call_ringing' | 'call_answer' | 'call_speaker' | 'photo_gallery' | 'photo_select' | 'photo_send' | 'alarm_clock' | 'alarm_set' | 'alarm_save';
  interactiveActionLabel?: string;
  expectedActionExplanation?: string;
}

export interface Guide {
  id: string;
  title: string;
  category: string;
  estimatedMinutes: number;
  summary: string;
  iconName: string;
  difficulty: 'Beginner' | 'Comfortable';
  steps: GuideStep[];
}

export interface ProblemSolution {
  id: string;
  problemTitle: string;
  problemQuote: string;
  theRealPain: string;
  howSahayaSolves: string;
  sahayaFeature: string;
  targetRoute: string;
  icon: string;
  keyBenefit: string;
}

export interface LearnCategory {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  lessonsCount: number;
  guides: string[]; // Guide IDs
  keySkills: string[];
}

export interface CommunityStory {
  id: string;
  name: string;
  age: number;
  city: string;
  story: string;
  milestone: string;
  avatarBg: string;
  initials: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface MetricData {
  label: string;
  value: string;
  description: string;
  badge: string;
}
