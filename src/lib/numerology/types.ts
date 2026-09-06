export interface NumberResult {
  value: number;
  isMaster: boolean;
  title: string;
  title_hu: string;
  title_de: string;
  title_fr: string;
  archetype: string;
  archetype_hu: string;
  keywords: string[];
  summary: string;
  summary_hu: string;
}

export interface NumerologyProfile {
  lifePath: NumberResult;
  birthdayNumber: NumberResult;
  personalYear: NumberResult;
  personalMonth: NumberResult;
  expressionNumber: NumberResult;
  soulUrge: NumberResult;
  personalityNumber: NumberResult;
  calculatedAt: string;
}
