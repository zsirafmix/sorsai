export type ZodiacElement = 'fire' | 'earth' | 'air' | 'water';
export type ZodiacModality = 'cardinal' | 'fixed' | 'mutable';

export interface ZodiacSign {
  id: string;
  name: string;
  name_hu: string;
  name_de: string;
  name_fr: string;
  symbol: string;
  element: ZodiacElement;
  element_hu: string;
  modality: ZodiacModality;
  modality_hu: string;
  rulingPlanet: string;
  rulingPlanet_hu: string;
  dateRange: string;
  dateRange_hu: string;
  keywords: string[];
  description: string;
  description_hu: string;
}
