export type ArcanaType = 'major' | 'minor';
export type TarotSuit = 'wands' | 'cups' | 'swords' | 'pentacles';

export interface TarotCard {
  id: string;
  name: string;
  name_hu: string;
  name_de: string;
  name_fr: string;
  arcana: ArcanaType;
  number: number;
  suit?: TarotSuit;
  uprightMeaning: string;
  reversedMeaning: string;
  keywords: string[];
  element?: 'fire' | 'water' | 'air' | 'earth' | 'spirit';
  astrology?: string;
  iconName?: string;
}

export type SpreadType = 
  | 'single'
  | 'threeCard'
  | 'love'
  | 'career'
  | 'decision'
  | 'thirtyDays'
  | 'twelveMonths'
  | 'celticCross';

export interface SpreadPosition {
  index: number;
  name: string;
  name_hu: string;
  name_de: string;
  name_fr: string;
  description: string;
  description_hu: string;
}

export interface SpreadDefinition {
  id: SpreadType;
  title: string;
  title_hu: string;
  title_de: string;
  title_fr: string;
  cardCount: number;
  positions: SpreadPosition[];
}

export interface DrawnSpreadCard {
  card: TarotCard;
  position: SpreadPosition;
  isReversed: boolean;
}
