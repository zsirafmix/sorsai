import { NextRequest, NextResponse } from 'next/server';
import { executeAIWithFallback, TarotAnalysisSchema } from '@/lib/ai';
import { getTarotReaderPrompt, PERSONAS } from '@/prompts';

export async function POST(req: NextRequest) {
  try {
    const { spreadType, question, drawnCards, language = 'hu' } = await req.json();

    const persona = PERSONAS.selene; // Selene is Tarot Specialist
    const systemPrompt = getTarotReaderPrompt(persona.systemDirective, language);

    const cardsDescription = drawnCards.map((c: any) => {
      const orientation = c.isReversed ? 'Fordított (árnyék / blokk)' : 'Álló (tiszta áramlás)';
      return `- ${c.position.name_hu || c.position.name}: ${c.card.name_hu} (${c.card.name}) [${orientation}]\n  Kulcsszavak: ${c.card.keywords.join(', ')}`;
    }).join('\n');

    const promptPayload = `
TAROT KIRAKÁS ÉRTELMEZÉSE:
Kirakás típusa: ${spreadType}
Feltett kérdés: "${question || 'Általános spirituális útmutatás'}"

KIHÚZOTT LAPOK ÉS POZÍCIÓK:
${cardsDescription}

Kérlek, vizsgáld meg a lapok EGYMÁSSAL való kapcsolatát, feszültségeit és a feltett kérdésre adott összegző tanítását. Válaszolj a megadott JSON formátumban!
`;

    const { result, isDemoFallback } = await executeAIWithFallback(async (provider) => {
      return provider.generateStructured(promptPayload, TarotAnalysisSchema, systemPrompt);
    });

    return NextResponse.json({
      analysis: result,
      isDemoFallback
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
