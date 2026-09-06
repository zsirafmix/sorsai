"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Binary,
  Sparkles,
  Crown,
  BookOpen,
  Check,
  Calendar,
  User,
  Heart,
  Lightbulb
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { GlowBadge } from '@/components/mystical/GlowBadge';
import { MysticalLoader } from '@/components/mystical/MysticalLoader';
import { useAuth } from '@/lib/storage/authContext';
import { useTranslation } from '@/lib/i18n';
import { generateNumerologyProfile } from '@/lib/numerology';
import { canUseFeature } from '@/lib/entitlements';
import { demoStore } from '@/lib/storage/demoStore';

export default function NumerologyPage() {
  const { user } = useAuth();
  const { language, t } = useTranslation();

  const [calcName, setCalcName] = useState('');
  const [calcDate, setCalcDate] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInterpretation, setAiInterpretation] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const activeName = isCustom ? calcName || "Kereső" : user?.displayName || "Kereső";
  const activeDate = isCustom ? calcDate || "1994-07-14" : user?.birthDate || "1994-07-14";

  const profile = useMemo(() => {
    return generateNumerologyProfile(activeName, activeDate);
  }, [activeName, activeDate]);

  const isPremium = canUseFeature(user, 'numerology_full');

  const handleDeepAnalysis = async () => {
    setIsAnalyzing(true);
    setIsSaved(false);

    try {
      const res = await fetch('/api/ai/numerology', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, language })
      });
      const data = await res.json();
      setAiInterpretation(data.interpretation);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveToJournal = () => {
    if (!aiInterpretation) return;
    demoStore.addJournalEntry({
      type: 'personal',
      title: `Numerológiai Elemzés (${activeName})`,
      text: `Életútszám: ${profile.lifePath.value} (${profile.lifePath.title_hu})\nSzemélyes Év: ${profile.personalYear.value}\n\n${aiInterpretation}`,
      tags: ['numerológia', `életút_${profile.lifePath.value}`, `év_${profile.personalYear.value}`],
      mood: 'Tudatos'
    });
    setIsSaved(true);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GlowBadge variant="purple">
                <Binary className="h-3.5 w-3.5" />
                Pitagoraszi Kódrendszer
              </GlowBadge>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              {t.numerology.title}
            </h1>
            <p className="text-xs sm:text-sm text-ethereal-300 mt-1">
              {t.numerology.subtitle}
            </p>
          </div>

          {/* Switcher: My numbers vs Calculator */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-space-900/60 border border-white/10">
            <button
              onClick={() => setIsCustom(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !isCustom ? 'bg-gold-500/20 text-gold-300 border border-gold-500/30' : 'text-ethereal-400 hover:text-white'
              }`}
            >
              Saját Kódjaim
            </button>
            <button
              onClick={() => setIsCustom(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isCustom ? 'bg-gold-500/20 text-gold-300 border border-gold-500/30' : 'text-ethereal-400 hover:text-white'
              }`}
            >
              Másik Személy Számítása
            </button>
          </div>
        </div>

        {/* Custom calculation form if active */}
        {isCustom && (
          <div className="rounded-3xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl shadow-glass">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gold-400" />
              <span>Adatok megadása a kalkulációhoz</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-ethereal-300 mb-1">Teljes név (születési vagy használt)</label>
                <input
                  type="text"
                  value={calcName}
                  onChange={(e) => setCalcName(e.target.value)}
                  placeholder="pl. Kovács Katalin"
                  className="w-full rounded-xl border border-white/10 bg-space-950/70 px-4 py-2.5 text-sm text-white focus:border-gold-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-ethereal-300 mb-1">Születési dátum</label>
                <input
                  type="date"
                  value={calcDate}
                  onChange={(e) => setCalcDate(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-space-950/70 px-4 py-2.5 text-sm text-white focus:border-gold-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Number Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Life Path Number (Free) */}
          <div className="rounded-3xl border-2 border-gold-500/40 bg-gradient-to-b from-space-900 via-mystic-950 to-space-950 p-6 backdrop-blur-xl shadow-gold-glow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-gold-500/20 pb-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                  {t.numerology.lifePath}
                </span>
                {profile.lifePath.isMaster && (
                  <span className="rounded-full bg-gold-500/20 border border-gold-500/50 px-2.5 py-0.5 text-[10px] font-bold text-gold-300">
                    Mester Szám
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-4 my-2">
                <span className="text-6xl font-black text-white tracking-tight">
                  {profile.lifePath.value}
                </span>
                <div>
                  <h3 className="text-base font-bold text-gold-300 leading-tight">
                    {profile.lifePath.title_hu}
                  </h3>
                  <p className="text-xs text-ethereal-400">{profile.lifePath.archetype_hu}</p>
                </div>
              </div>

              <p className="mt-4 text-xs text-ethereal-200 leading-relaxed font-light">
                {profile.lifePath.summary_hu}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
              {profile.lifePath.keywords.map((kw, i) => (
                <span key={i} className="rounded-lg bg-white/5 px-2 py-0.5 text-[10px] text-gold-300/90 font-medium">
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          {/* Birthday Number (Free) */}
          <div className="rounded-3xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl shadow-glass flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-ethereal-300">
                  {t.numerology.birthdayNumber}
                </span>
                <span className="text-[10px] text-ethereal-500">Születés napja</span>
              </div>

              <div className="flex items-baseline gap-4 my-2">
                <span className="text-5xl font-bold text-white">
                  {profile.birthdayNumber.value}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {profile.birthdayNumber.title_hu}
                  </h3>
                  <p className="text-xs text-ethereal-400">{profile.birthdayNumber.archetype_hu}</p>
                </div>
              </div>

              <p className="mt-4 text-xs text-ethereal-300 leading-relaxed">
                {profile.birthdayNumber.summary_hu}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-white/5 text-[11px] text-ethereal-400">
              Veleszületett különleges adottságaid és közvetlen tehetséged.
            </div>
          </div>

          {/* Personal Year (Premium or unlocked) */}
          <div className="relative rounded-3xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl shadow-glass flex flex-col justify-between overflow-hidden">
            {!isPremium && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-space-950/80 backdrop-blur-sm p-4 text-center">
                <Crown className="h-8 w-8 text-gold-400 mb-2" />
                <h4 className="text-sm font-bold text-white">Prémium Numerológia</h4>
                <p className="text-[11px] text-ethereal-400 mt-1 max-w-xs">
                  A személyes év és hónap ciklusai a Prémium csomagban érhetők el.
                </p>
                <Link
                  href="/pricing"
                  className="mt-3 rounded-xl bg-gold-500/20 border border-gold-500/40 px-3.5 py-1.5 text-xs font-bold text-gold-300 hover:bg-gold-500/30"
                >
                  Feloldás →
                </Link>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  {t.numerology.personalYear} ({new Date().getFullYear()})
                </span>
                <span className="text-[10px] text-ethereal-400">9 Éves Ciklus</span>
              </div>

              <div className="flex items-baseline gap-4 my-2">
                <span className="text-5xl font-bold text-white">
                  {profile.personalYear.value}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-amber-300">
                    {profile.personalYear.title_hu}
                  </h3>
                  <p className="text-xs text-ethereal-400">Idei fő fejlődési feladat</p>
                </div>
              </div>

              <p className="mt-4 text-xs text-ethereal-300 leading-relaxed">
                {profile.personalYear.summary_hu}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-ethereal-400">
              <span>Személyes Hónap rezgése:</span>
              <strong className="text-white text-sm">{profile.personalMonth.value} ({profile.personalMonth.title_hu})</strong>
            </div>
          </div>

          {/* Expression / Name Number */}
          <div className="relative rounded-3xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl shadow-glass flex flex-col justify-between overflow-hidden">
            {!isPremium && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-space-950/80 backdrop-blur-sm p-4 text-center">
                <Crown className="h-6 w-6 text-gold-400 mb-1" />
                <span className="text-xs font-bold text-white">Prémium Kód</span>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  {t.numerology.expressionNumber}
                </span>
                <span className="text-[10px] text-ethereal-400">Név rezgése</span>
              </div>

              <div className="flex items-baseline gap-4 my-2">
                <span className="text-5xl font-bold text-white">
                  {profile.expressionNumber.value}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-blue-300">
                    {profile.expressionNumber.title_hu}
                  </h3>
                  <p className="text-xs text-ethereal-400">{profile.expressionNumber.archetype_hu}</p>
                </div>
              </div>

              <p className="mt-4 text-xs text-ethereal-300 leading-relaxed">
                Hogyan fejezed ki önmagad a világban, és milyen látható képességeket mozgósítasz.
              </p>
            </div>
          </div>

          {/* Soul Urge Number */}
          <div className="relative rounded-3xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl shadow-glass flex flex-col justify-between overflow-hidden">
            {!isPremium && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-space-950/80 backdrop-blur-sm p-4 text-center">
                <Crown className="h-6 w-6 text-gold-400 mb-1" />
                <span className="text-xs font-bold text-white">Prémium Kód</span>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                  {t.numerology.soulUrge}
                </span>
                <span className="text-[10px] text-ethereal-400">Magánhangzók</span>
              </div>

              <div className="flex items-baseline gap-4 my-2">
                <span className="text-5xl font-bold text-white">
                  {profile.soulUrge.value}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-rose-300">
                    {profile.soulUrge.title_hu}
                  </h3>
                  <p className="text-xs text-ethereal-400">Legbelső vágyaid</p>
                </div>
              </div>

              <p className="mt-4 text-xs text-ethereal-300 leading-relaxed">
                Ami a lelked legmélyén valóban boldoggá tesz, még ha a külvilág nem is látja azonnal.
              </p>
            </div>
          </div>

          {/* Personality Number */}
          <div className="relative rounded-3xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl shadow-glass flex flex-col justify-between overflow-hidden">
            {!isPremium && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-space-950/80 backdrop-blur-sm p-4 text-center">
                <Crown className="h-6 w-6 text-gold-400 mb-1" />
                <span className="text-xs font-bold text-white">Prémium Kód</span>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                  {t.numerology.personalityNumber}
                </span>
                <span className="text-[10px] text-ethereal-400">Mássalhangzók</span>
              </div>

              <div className="flex items-baseline gap-4 my-2">
                <span className="text-5xl font-bold text-white">
                  {profile.personalityNumber.value}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-purple-300">
                    {profile.personalityNumber.title_hu}
                  </h3>
                  <p className="text-xs text-ethereal-400">Első benyomás</p>
                </div>
              </div>

              <p className="mt-4 text-xs text-ethereal-300 leading-relaxed">
                Ahogyan a külvilág és más emberek érzékelnek téged a társas érintkezések során.
              </p>
            </div>
          </div>
        </div>

        {/* AI Deep Numerology Synthesis Card */}
        <div className="rounded-3xl border border-gold-500/30 bg-card-gradient p-6 sm:p-8 backdrop-blur-xl shadow-glass space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-gold-400" />
                <span>AI Számmisztikai Mélyelemzés</span>
              </h3>
              <p className="text-xs text-ethereal-300 mt-1">
                Sophia, az önismereti és racionális mentor integrálja számaid rezgéseit.
              </p>
            </div>

            <button
              onClick={handleDeepAnalysis}
              disabled={isAnalyzing}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 px-5 py-2.5 text-xs font-bold text-space-950 hover:brightness-110 disabled:opacity-40 transition-all shadow-gold-glow shrink-0"
            >
              <Lightbulb className="h-4 w-4" />
              <span>{isAnalyzing ? "Elemzés..." : "Mélyelemzés Generálása"}</span>
            </button>
          </div>

          {isAnalyzing && (
            <MysticalLoader statusText="A születési és névkódok szintézise folyamatban..." />
          )}

          {aiInterpretation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-space-950/80 border border-gold-500/20 p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs font-bold text-gold-300">Sophia Mentor Elemzése</span>
                <button
                  onClick={handleSaveToJournal}
                  disabled={isSaved}
                  className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300"
                >
                  {isSaved ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <BookOpen className="h-3.5 w-3.5" />}
                  <span>{isSaved ? "Elmentve" : "Mentés Sorsnaplóba"}</span>
                </button>
              </div>

              <div className="text-xs sm:text-sm text-ethereal-200 leading-relaxed whitespace-pre-line font-light">
                {aiInterpretation}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
