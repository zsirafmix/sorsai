"use client";

import React, { useState } from 'react';
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
  Calendar
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

  // Daily Card (e.g. The Star - major_17_star)
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
  ];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GlowBadge variant="gold">
                ✨ {user?.tier === 'premium' ? "Prémium Beavatott" : "Kereső (Ingyenes)"}
              </GlowBadge>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              {t.dashboard.welcome.replace('{name}', user?.displayName || "Fénykereső")}
            </h1>
            <p className="text-xs sm:text-sm text-ethereal-300 mt-1">
              A mai nap energiái a csendes belső megújulást és a tiszta szándékokat támogatják.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/daily"
              className="inline-flex items-center gap-2 rounded-xl border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-xs font-semibold text-gold-300 hover:bg-gold-500/20 transition-all shadow-gold-glow"
            >
              <SunMedium className="h-4 w-4" />
              <span>{t.common.dailyMessage}</span>
            </Link>
          </div>
        </div>

        {/* Energy Gauge Section */}
        <div className="space-y-3">
          <EnergyGauge />
        </div>

        {/* Today's Tarot & Daily Personal Message Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Daily Tarot Card */}
          <div className="rounded-2xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl shadow-glass flex flex-col items-center text-center justify-between">
            <div className="w-full flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider">
                {t.dashboard.todayTarot}
              </span>
              <span className="text-[10px] text-ethereal-400">Rider-Waite</span>
            </div>

            <TarotCardView
              card={starCard}
              size="sm"
              isFlipped={true}
              positionName="A Nap Kártyája"
            />

            <div className="mt-4 p-3 rounded-xl bg-space-950/60 border border-white/5 text-left w-full">
              <p className="text-xs font-semibold text-gold-300 mb-1">{t.dashboard.shortInterpretation}</p>
              <p className="text-[11px] text-ethereal-300 leading-relaxed">
                A Csillag a megkönnyebbülés, a remény és az új távlatok szimbóluma. Bízz abban, hogy a nehéz időszak lezárult.
              </p>
            </div>
          </div>

          {/* Daily Personal Guidance */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl shadow-glass flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-gold-400" />
                  <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider">
                    {t.dashboard.todayMessage}
                  </span>
                </div>
                <span className="text-[10px] text-ethereal-400">Generálva ma 06:00</span>
              </div>

              <div className="rounded-2xl bg-space-950/70 border border-gold-500/20 p-5 shadow-gold-glow">
                <p className="text-sm sm:text-base font-medium text-white leading-relaxed italic">
                  „Ma különösen érdemes tisztázni egy régóta halogatott beszélgetést vagy belső kételyt. A bolygók és a számok finom harmóniája arra hív, hogy ne a félelmeidből, hanem a belső bizonyosságodból cselekedj. Amit ma elengedsz, annak helyére megkönnyebbülés és új lendület érkezik.”
                </p>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-ethereal-400">
                  <span>Vezető orákulum: <strong className="text-gold-300">Luna</strong></span>
                  <Link href="/daily" className="text-gold-400 hover:underline">
                    Részletes napi horoszkóp →
                  </Link>
                </div>
              </div>

              {/* Day's Theme Pill */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="text-xs text-ethereal-400 font-medium">Napi kulcstémák:</span>
                <span className="rounded-lg bg-gold-500/10 border border-gold-500/30 px-2.5 py-1 text-xs text-gold-300 font-medium">
                  Megtisztulás
                </span>
                <span className="rounded-lg bg-mystic-500/10 border border-mystic-500/30 px-2.5 py-1 text-xs text-mystic-300 font-medium">
                  Nyílt kommunikáció
                </span>
                <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-xs text-emerald-300 font-medium">
                  Érzelmi béke
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-ethereal-400">Kérdeznél az orákulumtól a napi lap kapcsán?</span>
              <Link
                href="/chat"
                className="inline-flex items-center gap-1.5 rounded-xl bg-gold-500/20 border border-gold-500/40 px-4 py-2 text-xs font-semibold text-gold-200 hover:bg-gold-500/30 transition-all shadow-gold-glow"
              >
                <span>Beszélgetés indítása</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>{t.dashboard.quickActions}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <Link
                  key={i}
                  href={action.href}
                  className="rounded-2xl border border-white/10 bg-card-gradient p-5 backdrop-blur-xl hover:border-gold-500/40 hover:scale-[1.01] transition-all flex items-start gap-4 group"
                >
                  <div className={`p-3 rounded-xl border ${action.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white group-hover:text-gold-300 transition-colors">
                      {action.title}
                    </h3>
                    <p className="mt-1 text-xs text-ethereal-400 leading-snug line-clamp-2">
                      {action.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Readings List */}
        <div className="rounded-2xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl shadow-glass">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <h2 className="text-base font-bold text-white">
              {t.dashboard.recentReadings}
            </h2>
            <Link href="/journal" className="text-xs text-gold-400 hover:underline">
              Összes megtekintése a Sorsnaplóban →
            </Link>
          </div>

          <div className="space-y-3">
            {recentReadings.map((reading) => (
              <Link
                key={reading.id}
                href={reading.href}
                className="flex items-center justify-between p-3.5 rounded-xl bg-space-950/60 border border-white/5 hover:border-gold-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-gold-500/10 border border-gold-500/30 px-2.5 py-1 text-[11px] font-semibold text-gold-300">
                    {reading.type}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white truncate max-w-xs sm:max-w-md">
                    {reading.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-ethereal-400">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{reading.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
