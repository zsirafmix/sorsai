"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import {
  SunMedium,
  Sparkles,
  Calendar,
  Compass,
  ArrowRight,
  BookOpen,
  Check
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { EnergyGauge } from '@/components/mystical/EnergyGauge';
import { TarotCardView } from '@/components/tarot/TarotCardView';
import { GlowBadge } from '@/components/mystical/GlowBadge';
import { useAuth } from '@/lib/storage/authContext';
import { useTranslation } from '@/lib/i18n';
import { TAROT_DECK } from '@/lib/tarot';
import { calculateLifePath, calculatePersonalYear, calculatePersonalMonth } from '@/lib/numerology';
import { getZodiacSign } from '@/lib/astrology';
import { demoStore } from '@/lib/storage/demoStore';

export default function DailyPage() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const todayString = new Date().toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  const birthDate = user?.birthDate || "1994-07-14";
  const zodiac = getZodiacSign(birthDate);
  const lifePath = calculateLifePath(birthDate);
  const personalYear = calculatePersonalYear(birthDate);
  const personalMonth = calculatePersonalMonth(birthDate);

  // Deterministic daily card based on day of year + life path value so it doesn't change on refresh
  const dailyCard = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const cardIndex = (dayOfYear + lifePath.value) % TAROT_DECK.length;
    return TAROT_DECK[cardIndex];
  }, [lifePath.value]);

  const handleSaveDaily = () => {
    demoStore.addJournalEntry({
      type: 'tarot',
      title: `Napi Útmutatás (${todayString}): ${dailyCard.name_hu}`,
      text: `Mai Tarot lap: ${dailyCard.name_hu} (${dailyCard.name})\nKulcsszavak: ${dailyCard.keywords.join(', ')}\n\nNapi üzenet: A mai nap különösen kedvez a tisztánlátásnak és a tudatos jelenlétnek.`,
      tags: ['napi_üzenet', dailyCard.name_hu, `év_${personalYear.value}`],
      mood: 'Nyugodt'
    });
    alert("Napi útmutatás elmentve a Sorsnaplóba!");
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GlowBadge variant="gold">
                <SunMedium className="h-3.5 w-3.5" />
                Napi Kozmikus Kapcsolat
              </GlowBadge>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white capitalize">
              {todayString}
            </h1>
            <p className="text-xs sm:text-sm text-ethereal-300 mt-1">
              Személyes energiáid, kártyád és számaid mai konvergenciája.
            </p>
          </div>

          <button
            onClick={handleSaveDaily}
            className="inline-flex items-center gap-2 rounded-xl border border-gold-500/40 bg-gold-500/10 px-4 py-2.5 text-xs font-semibold text-gold-300 hover:bg-gold-500/20 transition-all shadow-sm"
          >
            <BookOpen className="h-4 w-4" />
            <span>Mentés Sorsnaplóba</span>
          </button>
        </div>

        {/* Energy Gauge */}
        <EnergyGauge score={81} subScores={{ love: 85, career: 78, finances: 72, self: 90 }} />

        {/* Daily Matrix Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Today's Tarot */}
          <div className="rounded-3xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl shadow-glass flex flex-col items-center justify-between text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-4">
              Mai Tarot Lapod
            </span>

            <TarotCardView
              card={dailyCard}
              positionName="A Nap Archetípusa"
              size="md"
              isFlipped={true}
            />

            <div className="mt-4 p-3 rounded-xl bg-space-950/60 border border-white/5 text-xs text-ethereal-300 text-left w-full">
              <span className="font-semibold text-white block mb-1">Lap tanítása:</span>
              <p className="line-clamp-3">{dailyCard.uprightMeaning}</p>
            </div>
          </div>

          {/* Card 2 & 3: Daily Personal Message & Cosmic Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Message */}
            <div className="rounded-3xl border border-gold-500/30 bg-gradient-to-br from-space-900 via-mystic-950 to-space-950 p-6 sm:p-8 backdrop-blur-xl shadow-gold-glow space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block">
                Napi Személyes Útmutatás
              </span>
              <p className="text-base sm:text-lg font-medium text-white leading-relaxed italic">
                „Ma különösen érdemes tisztázni egy régóta halogatott beszélgetést vagy belső kérdést. A(z) {dailyCard.name_hu} szimbóluma arra hív, hogy ne a félelmeidből, hanem a belső bizonyosságodból cselekedj. Amit ma tudatosan megfigyelsz, az holnapra megkönnyebbülést és új lendületet hoz.”
              </p>

              <div className="rounded-2xl bg-gold-500/10 border border-gold-500/30 p-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block mb-1">
                  A Nap reflexiós kérdése
                </span>
                <p className="text-sm font-medium text-gold-200 italic">
                  „Mi az a terület, ahol ma megengedheted magadnak a lassabb, de mélyebb jelenlétet?”
                </p>
              </div>
            </div>

            {/* Numbers & Zodiac Today */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-card-gradient p-5 backdrop-blur-xl">
                <span className="text-xs font-semibold text-blue-300 block mb-1">Személyes Számok Ma</span>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-extrabold text-white">{personalMonth.value}</span>
                  <span className="text-xs text-ethereal-300">({personalMonth.title_hu})</span>
                </div>
                <p className="text-xs text-ethereal-400 leading-relaxed font-light">
                  A {personalYear.value}-es Személyes Évedben most a(z) {personalMonth.value}-es hónap energiája a rendeződést és a belső egyensúlyt hangsúlyozza.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-card-gradient p-5 backdrop-blur-xl">
                <span className="text-xs font-semibold text-purple-300 block mb-1">Csillagkép Ritmus</span>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-bold text-white">{zodiac.name_hu}</span>
                  <span className="text-xs text-ethereal-400">({zodiac.element_hu} elem)</span>
                </div>
                <p className="text-xs text-ethereal-400 leading-relaxed font-light">
                  A {zodiac.rulingPlanet_hu} hatása ma a tiszta kifejezést és a szívbéli megérzéseket erősíti fel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
