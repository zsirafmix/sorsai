import { describe, it, expect } from 'vitest';
import {
  SynthesisOutputSchema,
  TarotAnalysisSchema,
  DreamAnalysisSchema,
  RelationshipAnalysisSchema
} from '../src/lib/ai/schemas';

describe('AI Zod Schemas Validation Tests', () => {
  it('should validate and fill defaults for SynthesisOutputSchema', () => {
    const valid = SynthesisOutputSchema.parse({
      title: "Próba szintézis",
      summary: "Összefoglaló teszt"
    });

    expect(valid.title).toBe("Próba szintézis");
    expect(valid.summary).toBe("Összefoglaló teszt");
    expect(valid.themes.length).toBeGreaterThan(0);
    expect(valid.reflectionQuestions.length).toBeGreaterThan(0);
  });

  it('should validate TarotAnalysisSchema', () => {
    const data = {
      headline: "A Kártyák Szava",
      cardSyntheses: [
        { cardId: "c1", positionName: "Múlt", coreMessage: "Stabilitás" }
      ],
      interconnection: "A lapok harmóniában vannak.",
      advice: "Figyelj a belső hangra.",
      reflectionQuestion: "Mit érzel most?"
    };

    const parsed = TarotAnalysisSchema.parse(data);
    expect(parsed.headline).toBe("A Kártyák Szava");
    expect(parsed.cardSyntheses.length).toBe(1);
  });

  it('should validate DreamAnalysisSchema', () => {
    const data = {
      title: "Repülés álom",
      symbols: [{ symbol: "Égbolt", meaning: "Tágas lehetőségek" }],
      emotionalTone: "Békés",
      psychologicalMeaning: "Felszabadulás",
      spiritualMeaning: "Lélekszárnyalás",
      lifeConnection: "A döntés meghozatala utáni nyugalom",
      reflectionQuestions: ["Hol érzel szabadságot?"]
    };

    const parsed = DreamAnalysisSchema.parse(data);
    expect(parsed.title).toBe("Repülés álom");
    expect(parsed.symbols[0].symbol).toBe("Égbolt");
  });

  it('should validate RelationshipAnalysisSchema and reject invalid scores', () => {
    const validData = {
      harmonyScores: {
        emotional: 88,
        communication: 75,
        passion: 92,
        longTerm: 80
      },
      summary: "Erős szellemi összhang",
      strengths: ["Közös értékek"],
      growthAreas: ["Nyitottság"],
      spiritualAdvice: "Bízzatok egymásban",
      reflectionQuestion: "Hogyan lehetsz még jelenvalóbb?"
    };

    const parsed = RelationshipAnalysisSchema.parse(validData);
    expect(parsed.harmonyScores.emotional).toBe(88);

    // Invalid score > 100 should throw
    expect(() => {
      RelationshipAnalysisSchema.parse({
        ...validData,
        harmonyScores: { ...validData.harmonyScores, emotional: 150 }
      });
    }).toThrow();
  });
});
