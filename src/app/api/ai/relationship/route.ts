import { NextRequest, NextResponse } from 'next/server';
import { executeAIWithFallback, RelationshipAnalysisSchema } from '@/lib/ai';
import { getRelationshipReaderPrompt, PERSONAS } from '@/prompts';
import { calculateLifePath } from '@/lib/numerology';
import { getZodiacSign } from '@/lib/astrology';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userProfile, partner, language = 'hu', provider: preferredProvider } = body;
    const resolvedProvider = preferredProvider || req.headers.get('x-sorsai-provider') || undefined;

    const persona = PERSONAS.luna;
    const systemPrompt = getRelationshipReaderPrompt(persona.systemDirective, language);

    const userLifePath = calculateLifePath(userProfile?.birthDate || "1994-07-14");
    const userZodiac = getZodiacSign(userProfile?.birthDate || "1994-07-14");

    const partnerLifePath = calculateLifePath(partner.birthDate || "1995-03-22");
    const partnerZodiac = getZodiacSign(partner.birthDate || "1995-03-22");

    const promptPayload = `
KAPCSOLATI SZINASZTRIA ELEMZÉS:
1. Személy (Felhasználó):
- Név: ${userProfile?.displayName || "Felhasználó"}
- Születési dátum: ${userProfile?.birthDate || "1994-07-14"}
- Napjegy: ${userZodiac.name_hu} (${userZodiac.element_hu} elem)
- Életútszám: ${userLifePath.value} (${userLifePath.title_hu})

2. Személy (Partner):
- Név: ${partner.name}
- Születési dátum: ${partner.birthDate}
- Napjegy: ${partnerZodiac.name_hu} (${partnerZodiac.element_hu} elem)
- Életútszám: ${partnerLifePath.value} (${partnerLifePath.title_hu})

Elemezd a kapcsolat dinamikáját a szórakoztató harmónia százalékokkal, erősségekkel, fejlődési pontokkal és tanáccsal a megadott JSON formátumban!
`;

    const { result, isDemoFallback } = await executeAIWithFallback(async (provider) => {
      return provider.generateStructured(promptPayload, RelationshipAnalysisSchema, systemPrompt);
    }, resolvedProvider);

    return NextResponse.json({
      analysis: result,
      userZodiac,
      partnerZodiac,
      userLifePath,
      partnerLifePath,
      isDemoFallback
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
