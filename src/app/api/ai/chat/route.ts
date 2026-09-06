import { NextRequest, NextResponse } from 'next/server';
import { executeAIWithFallback, SynthesisOutputSchema } from '@/lib/ai';
import { PERSONAS, PersonaId, getSynthesisPrompt, getFortuneReaderPrompt, getTarotReaderPrompt, getNumerologyReaderPrompt, getAstrologerPrompt } from '@/prompts';
import { drawSpread } from '@/lib/tarot';
import { generateNumerologyProfile } from '@/lib/numerology';
import { getZodiacSign } from '@/lib/astrology';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      message,
      persona = 'luna',
      mode = 'quick',
      userProfile,
      language = 'hu'
    } = body;

    const selectedPersona = PERSONAS[persona as PersonaId] || PERSONAS.luna;

    // Mode: Full Destiny Synthesis
    if (mode === 'synthesis') {
      const birthDate = userProfile?.birthDate || "1994-07-14";
      const displayName = userProfile?.displayName || "Vándor";

      // 1. Draw Tarot Card
      const drawnCards = drawSpread('single');
      const activeCard = drawnCards[0];

      // 2. Compute Numerology
      const numProfile = generateNumerologyProfile(displayName, birthDate);

      // 3. Zodiac sign
      const zodiac = getZodiacSign(birthDate);

      // Build Synthesis Prompt Payload
      const systemPrompt = getSynthesisPrompt(selectedPersona.systemDirective, language);
      const promptPayload = `
FELHASZNÁLÓI PROFIL:
- Név: ${displayName}
- Születési dátum: ${birthDate}
- Csillagjegy: ${zodiac.name_hu} (${zodiac.element_hu} elem, ${zodiac.rulingPlanet_hu} uralkodó)
- Életútszám: ${numProfile.lifePath.value} (${numProfile.lifePath.title_hu})
- Személyes Év rezgése: ${numProfile.personalYear.value}

KIHÚZOTT TAROT LAP A KÉRDÉSHEZ:
- Lap: ${activeCard.card.name_hu} (${activeCard.card.name})
- Pozíció: ${activeCard.isReversed ? 'Fordított (árnyék aspektus)' : 'Álló (tiszta áramlás)'}
- Lap kulcsszavai: ${activeCard.card.keywords.join(', ')}

FELHASZNÁLÓ KÉRDÉSE:
"${message}"

Kérlek, végezd el a teljes integrált szintézist a megadott JSON sémának megfelelően.
`;

      const { result, isDemoFallback } = await executeAIWithFallback(async (provider) => {
        return provider.generateStructured(promptPayload, SynthesisOutputSchema, systemPrompt);
      });

      return NextResponse.json({
        type: 'synthesis',
        data: result,
        activeCard,
        isDemoFallback,
        persona: selectedPersona
      });
    }

    // Other modes: quick, tarot, numerology, astrology
    let systemPrompt = getFortuneReaderPrompt(selectedPersona.systemDirective, language);
    if (mode === 'tarot') {
      systemPrompt = getTarotReaderPrompt(selectedPersona.systemDirective, language);
    } else if (mode === 'numerology') {
      systemPrompt = getNumerologyReaderPrompt(selectedPersona.systemDirective, language);
    } else if (mode === 'astrology') {
      systemPrompt = getAstrologerPrompt(selectedPersona.systemDirective, language);
    }

    const { result, isDemoFallback } = await executeAIWithFallback(async (provider) => {
      return provider.generateText(message, systemPrompt);
    });

    return NextResponse.json({
      type: 'text',
      content: result,
      isDemoFallback,
      persona: selectedPersona
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Hiba történt a beszélgetés során.' },
      { status: 500 }
    );
  }
}
