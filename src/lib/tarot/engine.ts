import { TAROT_DECK } from './cards';
import { SPREADS } from './spreads';
import { DrawnSpreadCard, SpreadType, TarotCard } from './types';

/**
 * Deterministic, cryptographically seeded or random deck shuffling
 */
export function shuffleDeck(deck: TarotCard[] = TAROT_DECK): TarotCard[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j: number;
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      j = array[0] % (i + 1);
    } else {
      j = Math.floor(Math.random() * (i + 1));
    }
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Backend deterministic Tarot spread drawer.
 * Guarantees no duplicate cards within a spread.
 */
export function drawSpread(spreadType: SpreadType, deck?: TarotCard[]): DrawnSpreadCard[] {
  const spreadDef = SPREADS[spreadType];
  if (!spreadDef) {
    throw new Error(`Unknown spread type: ${spreadType}`);
  }

  const shuffled = shuffleDeck(deck);
  const count = spreadDef.cardCount;
  const drawn: DrawnSpreadCard[] = [];

  for (let i = 0; i < count; i++) {
    const card = shuffled[i];
    // Reversed orientation has approx 25% probability
    const isReversed = Math.random() < 0.25;
    const position = spreadDef.positions[i] || {
      index: i,
      name: `Position ${i + 1}`,
      name_hu: `${i + 1}. pozíció`,
      name_de: `Position ${i + 1}`,
      name_fr: `Position ${i + 1}`,
      description: `Position ${i + 1}`,
      description_hu: `${i + 1}. pozíció leírása`
    };

    drawn.push({
      card,
      position,
      isReversed
    });
  }

  return drawn;
}

export function getCardById(id: string): TarotCard | undefined {
  return TAROT_DECK.find(c => c.id === id);
}

export function drawDailyCard(): DrawnSpreadCard {
  return drawSpread('single')[0];
}
