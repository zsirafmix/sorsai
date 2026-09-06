import { describe, it, expect } from 'vitest';
import { TAROT_DECK, MAJOR_ARCANA, MINOR_ARCANA, shuffleDeck, drawSpread, SPREADS } from '../src/lib/tarot';

describe('Tarot Deck and Engine Tests', () => {
  it('should have exactly 78 cards in total', () => {
    expect(TAROT_DECK.length).toBe(78);
    expect(MAJOR_ARCANA.length).toBe(22);
    expect(MINOR_ARCANA.length).toBe(56);
  });

  it('should have unique IDs for all 78 cards', () => {
    const idSet = new Set(TAROT_DECK.map((c) => c.id));
    expect(idSet.size).toBe(78);
  });

  it('should properly shuffle the deck without losing cards', () => {
    const shuffled = shuffleDeck();
    expect(shuffled.length).toBe(78);
    const idSet = new Set(shuffled.map((c) => c.id));
    expect(idSet.size).toBe(78);
  });

  it('should draw correct number of cards for all spread types without duplicates', () => {
    const spreadTypes = Object.keys(SPREADS) as Array<keyof typeof SPREADS>;

    for (const spreadType of spreadTypes) {
      const drawn = drawSpread(spreadType);
      const expectedCount = SPREADS[spreadType].cardCount;
      expect(drawn.length).toBe(expectedCount);

      const uniqueCardIds = new Set(drawn.map((d) => d.card.id));
      expect(uniqueCardIds.size).toBe(expectedCount);

      // Verify each card has position and boolean orientation
      drawn.forEach((d) => {
        expect(typeof d.isReversed).toBe('boolean');
        expect(d.position).toBeDefined();
        expect(d.card.name_hu).toBeDefined();
      });
    }
  });
});
