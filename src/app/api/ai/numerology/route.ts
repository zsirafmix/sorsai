import { NextRequest, NextResponse } from 'next/server';
import { executeAIWithFallback } from '@/lib/ai';
import { getNumerologyReaderPrompt, PERSONAS } from '@/prompts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { profile, language = 'hu', provider: preferredProvider } = body;
    const resolvedProvider = preferredProvider || req.headers.get('x-sorsai-provider') || undefined;

    const persona = PERSONAS.sophia;
    const systemPrompt = getNumerologyReaderPrompt(persona.systemDirective, language);

    const promptPayload = `
NUMEROLÓGIAI ELEMZÉS KÉRÉSE:
- Életútszám: ${profile.lifePath.value} (${profile.lifePath.title_hu || profile.lifePath.title}) [Mester szám: ${profile.lifePath.isMaster ? 'Igen' : 'Nem'}]
- Születésnapi szám: ${profile.birthdayNumber.value}
- Személyes Év rezgése: ${profile.personalYear.value}
- Személyes Hónap rezgése: ${profile.personalMonth.value}
- Névszám (Kifejezés): ${profile.expressionNumber.value} (${profile.expressionNumber.title_hu || profile.expressionNumber.title})
- Lélekszám (Belső vágy): ${profile.soulUrge.value}
- Személyiségszám (Külvilág): ${profile.personalityNumber.value}

Kérlek, értelmezd ezen rezgések szinergiáját, a mesterszámok feladatait, és adj gyakorlati, önreflexiós tanácsot a felhasználónak a mindennapokra!
`;

    const { result, isDemoFallback } = await executeAIWithFallback(async (provider) => {
      return provider.generateText(promptPayload, systemPrompt);
    }, resolvedProvider);

    return NextResponse.json({
      interpretation: result,
      isDemoFallback
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
