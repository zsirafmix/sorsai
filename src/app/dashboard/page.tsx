"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Sparkles,
  Binary,
  HeartHandshake,
  MoonStar,
  ArrowRight,
  SunMedium,
  BookOpen,
  Calendar,
  Compass,
  Scroll
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { EnergyGauge } from '@/components/mystical/EnergyGauge';
import { TarotCardView } from '@/components/tarot/TarotCardView';
import { GlowBadge } from '@/components/mystical/GlowBadge';
import { useAuth } from '@/lib/storage/authContext';
import { useTranslation } from '@/lib/i18n';
import { TAROT_DECK } from '@/lib/tarot';

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useTranslation();

  // Daily Card (The Star - major_17_star)
  const starCard = TAROT_DECK.find((c) => c.id === 'major_17_star') || TAROT_DECK[0];

  const recentReadings = [
    {
      id: "rec_1",
      title: "Teljes Sorszintézis – Karrier és Belső Hivatás",
      date: "Ma, 10:45",
      type: "Sorszintézis",
      href: "/chat"
    },
    {
      id: "rec_2",
      title: "Kelta Kereszt – Kapcsolati döntési keresztút",
      date: "Tegnap, 19:20",
      type: "Tarot",
      href: "/tarot"
    },
    {
      id: "rec_3",
      title: "Mélylélektani Álom – Repülés a csillagos égen",
      date: "2 napja",
      type: "Álomelemzés",
      href: "/dreams"
    }
  ];

  const quickActions = [
    {
      title: t.common.askDestiny,
      desc: "Beszélgess személyes AI vezetőddel a sorsodról",
      icon: MessageSquare,
      href: "/chat",
      color: "border-mystic-500/30 bg-mystic-500/10 text-mystic-300"
    },
    {
      title: t.tarot.title,
      desc: "Autentikus kártyavetés 8 különböző kirakási móddal",
      icon: Sparkles,
      href: "/tarot",
      color: "border-gold-500/30 bg-gold-500/10 text-gold-300"
    },
    {
      title: t.numerology.title,
      desc: "Életútszám, névszám és a személyes év kódjai",
      icon: Binary,
      href: "/numerology",
      color: "border-blue-500/30 bg-blue-500/10 text-blue-300"
    },
    {
      title: t.relationships.title,
      desc: "Párkapcsolati szinasztria és érzelmi harmónia",
      icon: HeartHandshake,
      href: "/relationships",
      color: "border-rose-500/30 bg-rose-500/10 text-rose-300"
    },
    {
      title: t.dreams.title,
      desc: "Éjszakai látomásaid mély szimbolikus megfejtése",
      icon: MoonStar,
      href: "/dreams",
      color: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300"
    },
    {
      title: "Sorsnapló & Krónika",
      desc: "Múltbéli jóslatok és megerősítések szent archívuma",
      icon: Scroll,
      href: "/journal",
      color: "border-amber-500/30 bg-amber-500/10 text-amber-300"
    },
  ];

  return (
    <AppShell>
      <div className="space-y-10">
        {/* Welcome Header */}
        <div className="relative rounded-3xl mystic-card p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(212,175,55,0.15)] flex flex-col md:flex-row md:items-center md:justify-between gap-6 overflow-hidden">
          <div className="mystic-corner-tl" />
          <div className="mystic-corner-br" />

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-serif text-[11px] uppercase tracking-[0.25em] text-gold-300 px-3 py-1 rounded-full border border-gold-500/30 bg-space-950/70">
                ✦ {user?.tier === 'premium' ? "Prémium Beavatott" : "Kereső (Ingyenes)"} ✦
              </span>
              <span className="text-xs text-gold-400/80 font-mono">
                {new Date().toLocaleDateString('hu-HU', { weekday: 'long', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide">
              {t.dashboard.welcome.replace('{name}', user?.displayName || "Fénykereső")}
            </h1>
            <p className="mt-2 text-sm text-ethereal-300 font-serif italic">
              „A mai nap energiái a belső csendet, a spirituális tisztánlátást és a határozott elengedést támogatják.”
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <Link
              href="/daily"
              className="inline-flex items-center gap-2.5 rounded-2xl border border-gold-500/50 bg-gradient-to-r from-gold-500/20 to-amber-500/20 px-5 py-3 text-xs font-serif font-bold uppercase tracking-widest text-gold-200 hover:bg-gold-500/30 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] shrink-0"
            >
              <SunMedium className="h-4 w-4 text-gold-400 animate-spin-slow" />
              <span>{t.common.dailyMessage}</span>
            </Link>
          </div>
        </div>

        {/* Energy Gauge Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <h2 className="font-serif text-lg font-bold uppercase tracking-widest text-gold-300 flex items-center gap-2">
              <span>✦</span>
              <span>Kozmikus Energiamező</span>
            </h2>
            <span className="text-[11px] font-mono text-ethereal-400">Élő égi tranzit szinkron</span>
          </div>
          <EnergyGauge />
        </div>

        {/* Today's Tarot & Daily Personal Message Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Daily Tarot Card - Sacred Altar */}
          <div className="relative rounded-3xl mystic-card p-6 sm:p-7 backdrop-blur-2xl shadow-[0_0_40px_rgba(212,175,55,0.15)] flex flex-col items-center text-center justify-between">
            <div className="mystic-corner-tl" />
            <div className="mystic-corner-br" />

            <div className="w-full flex items-center justify-between border-b border-gold-500/20 pb-3 mb-5">
              <span className="font-serif text-xs font-bold text-gold-300 uppercase tracking-widest flex items-center gap-1.5">
                <span>✦</span>
                <span>{t.dashboard.todayTarot}</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-ethereal-400">Rider-Waite</span>
            </div>

            <div className="my-2">
              <TarotCardView
                card={starCard}
                size="sm"
                isFlipped={true}
                positionName="A Nap Kártyája"
              />
            </div>

            <div className="mt-5 p-3.5 rounded-2xl bg-space-950/70 border border-gold-500/20 text-left w-full">
              <p className="font-serif text-xs font-bold text-gold-300 uppercase tracking-wider mb-1">
                ✦ {t.dashboard.shortInterpretation}
              </p>
              <p className="text-xs text-ethereal-200 leading-relaxed font-light">
                A Csillag a megkönnyebbülés, a remény és a kozmikus védelem jelképe. Nyugalom költözik a szívedbe.
              </p>
            </div>
          </div>

          {/* Daily Personal Guidance Chamber */}
          <div className="relative lg:col-span-2 rounded-3xl mystic-card p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(212,175,55,0.15)] flex flex-col justify-between">
            <div className="mystic-corner-tl" />
            <div className="mystic-corner-br" />

            <div>
              <div className="flex items-center justify-between border-b border-gold-500/20 pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-gold-400 animate-pulse-slow" />
                  <span className="font-serif text-xs font-bold text-gold-300 uppercase tracking-widest">
                    {t.dashboard.todayMessage}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-ethereal-400">Frissítve a hajnali tranzittal</span>
              </div>

              {/* Sacred Inscription Box */}
              <div className="relative rounded-2xl bg-[#0a0717]/90 border border-gold-500/30 p-6 shadow-[0_0_25px_rgba(212,175,55,0.1)]">
                <p className="font-serif text-base sm:text-lg font-medium text-white leading-relaxed italic drop-shadow">
                  „Ma különösen érdemes tisztázni egy régóta halogatott beszélgetést vagy belső kételyt. A bolygók és a számok finom harmóniája arra hív, hogy ne a félelmeidből, hanem a belső bizonyosságodból cselekedj. Amit ma elengedsz, annak helyére megkönnyebbülés és új lendület érkezik.”
                </p>
                <div className="mt-4 pt-3 border-t border-gold-500/15 flex items-center justify-between text-xs text-ethereal-300">
                  <span className="font-serif">Vezető orákulum: <strong className="text-gold-300 tracking-wide font-serif">✦ Luna Orákulum</strong></span>
                  <Link href="/daily" className="font-serif text-xs text-gold-400 hover:text-gold-200 transition-colors uppercase tracking-wider">
                    Részletes Napi Horoszkóp →
                  </Link>
                </div>
              </div>

              {/* Day's Theme Pills */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="font-serif text-xs text-ethereal-300 font-medium">Kozmikus Fókuszok:</span>
                <span className="rounded-full bg-gold-500/10 border border-gold-500/30 px-3 py-1 font-serif text-xs text-gold-300 font-medium shadow-sm">
                  ✦ Megtisztulás
                </span>
                <span className="rounded-full bg-mystic-500/10 border border-mystic-500/30 px-3 py-1 font-serif text-xs text-mystic-300 font-medium shadow-sm">
                  ✦ Nyílt Kommunikáció
                </span>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 font-serif text-xs text-emerald-300 font-medium shadow-sm">
                  ✦ Érzelmi Harmónia
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gold-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-ethereal-300 font-serif italic">Kérdeznél az orákulumtól a mai nap mélyebb üzenetéről?</span>
              <Link
                href="/chat"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 px-5 py-2.5 text-xs font-serif font-bold uppercase tracking-wider text-space-950 hover:brightness-110 transition-all shadow-gold-glow"
              >
                <span>Beszélgetés Indítása</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="font-serif text-lg font-bold uppercase tracking-widest text-gold-300 flex items-center gap-2">
              <span>✦</span>
              <span>{t.dashboard.quickActions}</span>
            </h2>
            <span className="text-[11px] font-mono text-ethereal-400">Válassz szent ösvényt</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <Link
                  key={i}
                  href={action.href}
                  className="relative rounded-2xl mystic-card p-5 hover:border-gold-500/60 transition-all flex items-start gap-4 group shadow-sm hover:shadow-[0_0_25px_rgba(212,175,55,0.2)]"
                >
                  <div className={`p-3 rounded-2xl border ${action.color} group-hover:scale-110 group-hover:shadow-gold-glow transition-all`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-sm font-bold text-white group-hover:text-gold-300 transition-colors tracking-wide">
                      {action.title}
                    </h3>
                    <p className="mt-1 text-xs text-ethereal-300 leading-snug line-clamp-2 font-light">
                      {action.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Readings List */}
        <div className="relative rounded-3xl mystic-card p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(212,175,55,0.15)]">
          <div className="mystic-corner-tl" />
          <div className="mystic-corner-br" />

          <div className="flex items-center justify-between border-b border-gold-500/20 pb-4 mb-5">
            <h2 className="font-serif text-base font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <span className="text-gold-400">✦</span>
              <span>{t.dashboard.recentReadings}</span>
            </h2>
            <Link href="/journal" className="font-serif text-xs text-gold-400 hover:text-gold-200 uppercase tracking-wider transition-colors">
              Sorsnapló Megnyitása →
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {recentReadings.map((reading) => (
              <div key={reading.id} className="py-3.5 flex items-center justify-between gap-4 group">
                <div className="min-w-0">
                  <h4 className="font-serif text-sm font-semibold text-white group-hover:text-gold-300 transition-colors truncate">
                    {reading.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-ethereal-400">
                    <span className="text-gold-400/90 font-serif uppercase tracking-wider">✦ {reading.type}</span>
                    <span>•</span>
                    <span>{reading.date}</span>
                  </div>
                </div>
                <Link
                  href={reading.href}
                  className="rounded-xl border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5 text-xs font-serif text-gold-300 hover:bg-gold-500/20 transition-all shrink-0"
                >
                  Megtekintés
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
