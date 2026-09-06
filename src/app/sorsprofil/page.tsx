"use client";

import React from 'react';
import Link from 'next/link';
import {
  User,
  Compass,
  Binary,
  Sparkles,
  Calendar,
  MapPin,
  Heart,
  Crown,
  Lock,
  Layers,
  Edit3
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { GlowBadge } from '@/components/mystical/GlowBadge';
import { useAuth } from '@/lib/storage/authContext';
import { useTranslation } from '@/lib/i18n';
import { getZodiacSign } from '@/lib/astrology';
import { calculateLifePath, calculateBirthdayNumber, calculatePersonalYear } from '@/lib/numerology';
import { TAROT_DECK } from '@/lib/tarot';

export default function SorsprofilPage() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const birthDate = user?.birthDate || "1994-07-14";
  const zodiac = getZodiacSign(birthDate);
  const lifePath = calculateLifePath(birthDate);
  const birthdayNum = calculateBirthdayNumber(birthDate);
  const personalYear = calculatePersonalYear(birthDate);

  // Tarot Archetype mapping (based on Life Path: Major Arcana 1-9 or 11/22)
  const archetypeCard = TAROT_DECK.find(
    (c) => c.arcana === 'major' && c.number === (lifePath.value > 21 ? lifePath.value % 22 : lifePath.value)
  ) || TAROT_DECK[0];

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-gold-500/40 bg-gradient-to-tr from-space-900 to-mystic-900 text-2xl font-black text-gold-300 shadow-gold-glow">
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "S"}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <GlowBadge variant="gold">
                  {user?.tier === 'premium' ? "Beavatott Profil" : "Kereső Profil"}
                </GlowBadge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {user?.displayName || "Fénykereső Vándor"}
              </h1>
              <p className="text-xs text-ethereal-400 flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {birthDate}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {user?.birthPlace || "Budapest"}</span>
              </p>
            </div>
          </div>

          <Link
            href="/onboarding"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-ethereal-300 hover:bg-white/10 transition-colors shrink-0"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Adatok módosítása</span>
          </Link>
        </div>

        {/* Destiny Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Zodiac Sun Sign */}
          <div className="rounded-3xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl shadow-glass flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                  Csillagjegy (Napjegy)
                </span>
                <span className="text-xl">{zodiac.symbol}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{zodiac.name_hu} ({zodiac.name})</h3>
              <p className="text-xs text-gold-300/80 mb-3">{zodiac.dateRange_hu}</p>
              <p className="text-xs text-ethereal-300 leading-relaxed font-light">
                {zodiac.description_hu}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-ethereal-400">
              <span>Uralkodó elem: <strong className="text-white">{zodiac.element_hu}</strong></span>
              <span>Bolygó: <strong className="text-white">{zodiac.rulingPlanet_hu}</strong></span>
            </div>
          </div>

          {/* Life Path Number */}
          <div className="rounded-3xl border border-gold-500/30 bg-card-gradient p-6 backdrop-blur-xl shadow-gold-glow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                  {t.numerology.lifePath}
                </span>
                {lifePath.isMaster && (
                  <span className="text-[10px] font-bold text-gold-300 bg-gold-500/20 px-2 py-0.5 rounded-full">
                    Mester Szám
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-extrabold text-white">{lifePath.value}</span>
                <h3 className="text-lg font-bold text-gold-300">{lifePath.title_hu}</h3>
              </div>
              <p className="text-xs text-ethereal-300 leading-relaxed font-light">
                {lifePath.summary_hu}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-ethereal-400">
              <span>Születésnapi szám: <strong className="text-white">{birthdayNum.value}</strong></span>
              <span>Személyes Év: <strong className="text-white">{personalYear.value}</strong></span>
            </div>
          </div>

          {/* Tarot Archetype */}
          <div className="rounded-3xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl shadow-glass flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-mystic-300">
                  Születési Tarot Archetípus
                </span>
                <Sparkles className="h-4 w-4 text-mystic-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">
                {archetypeCard.name_hu} ({archetypeCard.name})
              </h3>
              <p className="text-xs text-mystic-300 mb-3">No. {archetypeCard.number} • Nagy Arkánum</p>
              <p className="text-xs text-ethereal-300 leading-relaxed font-light">
                {archetypeCard.uprightMeaning}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/5 flex flex-wrap gap-1">
              {archetypeCard.keywords.slice(0, 3).map((kw, i) => (
                <span key={i} className="text-[10px] text-ethereal-400 bg-white/5 px-2 py-0.5 rounded">
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Interests & Themes */}
        <div className="rounded-3xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl shadow-glass space-y-4">
          <h3 className="text-base font-bold text-white">Domináns Érdeklődési Területeid</h3>
          <div className="flex flex-wrap gap-2">
            {(user?.interests || ["önismeret", "spiritualitás"]).map((interest, i) => (
              <span
                key={i}
                className="rounded-xl border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5 text-xs font-semibold text-gold-300 capitalize"
              >
                ✦ {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Ephemeris & Phase 2 Upcoming Slots */}
        <div className="rounded-3xl border border-white/5 bg-space-900/40 p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div>
              <h3 className="text-sm font-bold text-ethereal-300 flex items-center gap-2">
                <Lock className="h-4 w-4 text-ethereal-400" />
                <span>Kiterjesztett Asztrológiai Rendszer (2. Fázis)</span>
              </h3>
              <p className="text-xs text-ethereal-500 mt-0.5">
                {t.common.ephemerisNote}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 opacity-60">
            <div className="rounded-2xl border border-white/5 bg-space-950/60 p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-ethereal-400 block mb-1">Holdjegy</span>
              <span className="text-xs text-white">Hamarosan</span>
            </div>
            <div className="rounded-2xl border border-white/5 bg-space-950/60 p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-ethereal-400 block mb-1">Aszcendens</span>
              <span className="text-xs text-white">Hamarosan</span>
            </div>
            <div className="rounded-2xl border border-white/5 bg-space-950/60 p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-ethereal-400 block mb-1">Uralkodó Ház</span>
              <span className="text-xs text-white">Hamarosan</span>
            </div>
            <div className="rounded-2xl border border-white/5 bg-space-950/60 p-4 text-center">
              <span className="text-[10px] uppercase font-bold text-ethereal-400 block mb-1">Bolygóállások</span>
              <span className="text-xs text-white">Hamarosan</span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
