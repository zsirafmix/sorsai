import { NextRequest, NextResponse } from 'next/server';
import { drawSpread, SpreadType } from '@/lib/tarot';

export async function POST(req: NextRequest) {
  try {
    const { spreadType = 'threeCard' } = await req.json();
    const cards = drawSpread(spreadType as SpreadType);
    return NextResponse.json({
      spreadType,
      cards,
      drawnAt: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
