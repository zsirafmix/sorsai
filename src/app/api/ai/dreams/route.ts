import { NextRequest, NextResponse } from 'next/server';
import { executeAIWithFallback, DreamAnalysisSchema } from '@/lib/ai';
import { getDreamInterpreterPrompt, PERSONAS } from '@/prompts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dreamText, language = 'hu', provider: preferredProvider } = body;
    const resolvedProvider = preferredProvider || req.headers.get('x-sorsai-provider') || undefined;

    const persona = PERSONAS.orion; // Orion has philosophical/mystical depth
    const systemPrompt = getDreamInterpreterPrompt(persona.systemDirective, language);

    const promptPayload = `
ÁLOMFEJTÉS ÉS SZIMBÓLUMELEMZÉS:
Felhasználó által leírt álom:
"${dreamText}"

Kérlek, elemezd az álmot a megadott JSON formátumban (szimbólumok, érzelmi tónus, pszichológiai jelentés, spirituális üzenet, kapcsolat az ébrenléttel, reflexiós kérdések)!
`;

    const { result, isDemoFallback } = await executeAIWithFallback(async (provider) => {
      return provider.generateStructured(promptPayload, DreamAnalysisSchema, systemPrompt);
    }, resolvedProvider);

    return NextResponse.json({
      analysis: result,
      isDemoFallback
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
