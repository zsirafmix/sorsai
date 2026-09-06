import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-space-950 text-white p-6 sm:p-12 max-w-4xl mx-auto space-y-8">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gold-400 hover:text-gold-300">
        <ArrowLeft className="h-4 w-4" /> Vissza a nyitóoldalra
      </Link>

      <div className="border-b border-white/10 pb-4">
        <h1 className="text-3xl font-extrabold text-white">Felhasználási Feltételek (Terms of Service)</h1>
        <p className="text-xs text-ethereal-400 mt-1">Utoljára frissítve: 2026. szeptember</p>
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-200 text-xs leading-relaxed">
        <strong>Fontos jogi megjegyzés:</strong> Ez a feltételrendszer demonstrációs és fejlesztői célokat szolgál; élesítés előtt jogi szakértői áttekintést igényel.
      </div>

      <div className="space-y-6 text-sm text-ethereal-200 leading-relaxed font-light">
        <section>
          <h2 className="text-lg font-bold text-white mb-2">1. Szolgáltatás célja és jellege</h2>
          <p>
            A SorsAI szórakoztató, önismereti és spirituális-szimbolikus célokat szolgáló alkalmazás. Az oldalon található elemzések, kártyavetések és numerológiai értelmezések semmilyen körülmények között nem minősülnek biztos jövőbelátásnak vagy objektív determinisztikus jóslásnak.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">2. Szakmai tanácsadás kizárása</h2>
          <p>
            A SorsAI nem nyújt orvosi, pszichiátriai, jogi vagy pénzügyi befektetési tanácsadást. Bármilyen egészségügyi tünet, jogi dilemma vagy pénzügyi döntés esetén fordulj szakképzett orvoshoz, ügyvédhez vagy pénzügyi tanácsadóhoz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">3. Felelősségkorlátozás</h2>
          <p>
            A felhasználó kizárólagosan felelős a kapott szimbolikus üzenetek alapján hozott egyéni döntéseiért. A szolgáltató nem vonható felelősségre semmilyen közvetlen vagy közvetett következményért.
          </p>
        </section>
      </div>
    </div>
  );
}
