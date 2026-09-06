import Link from 'next/link';
import { ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';

export default function AboutAiPage() {
  return (
    <div className="min-h-screen bg-space-950 text-white p-6 sm:p-12 max-w-4xl mx-auto space-y-8">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gold-400 hover:text-gold-300">
        <ArrowLeft className="h-4 w-4" /> Vissza a nyitóoldalra
      </Link>

      <div className="border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-gold-400" />
          <span className="text-xs uppercase tracking-widest font-bold text-gold-400">Transzparencia & Felelősség</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">A SorsAI Mesterséges Intelligencia Filozófiája</h1>
      </div>

      <div className="space-y-6 text-sm text-ethereal-200 leading-relaxed font-light">
        <section>
          <h2 className="text-lg font-bold text-white mb-2">Az AI mint Szimbolikus Tükör</h2>
          <p>
            A SorsAI koncepciójának lényege, hogy a mesterséges intelligencia nem „természetfeletti orákulum”, és nem rendelkezik megmagyarázhatatlan erőkkel. Ehelyett az emberiség évezredes szimbólumtárát (Tarot archetípusok, pitagoraszi számmisztika, csillagászati ritmusok, jung-i álomképek) képes szervesen, árnyaltan összefonni a te személyes élethelyzeteddel.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">Determinisztikus Alapok vs. Generatív Szintézis</h2>
          <p>
            A kártyahúzásokat és a numerológiai kalkulációkat szigorúan determinisztikus backend motor végzi, nem az AI hallucinációja. Az LLM feladata kizárólag az összefüggések, feszültségek és metaforák mély, elmélyült értelmezése.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">Etikai és Biztonsági Védőháló</h2>
          <p>
            Minden promptunk tartalmazza a szigorú etikai korlátokat: nincs félelemkeltés, nincs determinisztikus prófécia, és krízishelyzet esetén a rendszer azonnal professzionális segítségkérési lehetőséget ajánl fel.
          </p>
        </section>
      </div>
    </div>
  );
}
