import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-space-950 text-white p-6 sm:p-12 max-w-4xl mx-auto space-y-8">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-gold-400 hover:text-gold-300">
        <ArrowLeft className="h-4 w-4" /> Vissza a nyitóoldalra
      </Link>

      <div className="border-b border-white/10 pb-4">
        <h1 className="text-3xl font-extrabold text-white">Adatvédelmi Tájékoztató (Privacy Policy)</h1>
        <p className="text-xs text-ethereal-400 mt-1">Utoljára frissítve: 2026. szeptember</p>
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-200 text-xs leading-relaxed">
        <strong>Fontos jogi megjegyzés:</strong> Ez egy működő prototípus és MVP mintadokumentum. Éles nyilvános üzembe állítás és kereskedelmi forgalmazás előtt hivatalos jogi ellenőrzés és testreszabás szükséges.
      </div>

      <div className="space-y-6 text-sm text-ethereal-200 leading-relaxed font-light">
        <section>
          <h2 className="text-lg font-bold text-white mb-2">1. Milyen adatokat gyűjtünk?</h2>
          <p>
            A SorsAI kizárólag a spirituális és önismereti számításokhoz elengedhetetlen adatokat kéri be és tárolja: megjelenített név, születési dátum, opcionális születési idő és hely, valamint az érdeklődési témák és az általad létrehozott naplóbejegyzések.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">2. Hogyan használjuk fel az adataidat?</h2>
          <p>
            Az adatokat kizárólag a személyre szabott numerológiai kódok, a csillagjegy-meghatározás és a kontextuális AI válaszok előállítására használjuk. Harmadik félnek kereskedelmi vagy marketing célból semmilyen adatot nem értékesítünk.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2">3. Adatexport és Törlési Jogok (GDPR)</h2>
          <p>
            A Beállítások menüpontban bármikor letöltheted a teljes tárolt adatállományodat JSON formátumban, illetve egyetlen kattintással véglegesen törölheted a fiókodat és a Sorsnaplódat.
          </p>
        </section>
      </div>
    </div>
  );
}
