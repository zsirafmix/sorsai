"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HeartHandshake,
  Heart,
  MessageSquare,
  Flame,
  Shield,
  Sparkles,
  Crown,
  BookOpen,
  Check,
  UserCheck
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { GlowBadge } from '@/components/mystical/GlowBadge';
import { MysticalLoader } from '@/components/mystical/MysticalLoader';
import { useAuth } from '@/lib/storage/authContext';
import { useTranslation } from '@/lib/i18n';
import { canUseFeature } from '@/lib/entitlements';
import { demoStore } from '@/lib/storage/demoStore';
import { RelationshipAnalysis } from '@/lib/ai/schemas';

export default function RelationshipsPage() {
  const { user } = useAuth();
  const { language, t } = useTranslation();

  const [partner, setPartner] = useState({
    name: "Bence",
    birthDate: "1993-11-18",
    birthTime: "14:30",
    birthPlace: "Győr, Magyarország"
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const isPremium = canUseFeature(user, 'relationship_analysis');

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setIsSaved(false);

    try {
      const res = await fetch('/api/ai/relationship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfile: user,
          partner,
          language,
          provider: typeof window !== 'undefined' ? (localStorage.getItem('sorsai_ai_provider') || undefined) : undefined
        })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveToJournal = () => {
    if (!result?.analysis) return;
    const a = result.analysis as RelationshipAnalysis;
    demoStore.addJournalEntry({
      type: 'relationship',
      title: `Kapcsolati Elemzés: ${user?.displayName || "Én"} & ${partner.name}`,
      text: `${a.summary}\n\nÉrzelmi összhang: ${a.harmonyScores.emotional}%\nKommunikáció: ${a.harmonyScores.communication}%\nSzenvedély: ${a.harmonyScores.passion}%\nHosszú táv: ${a.harmonyScores.longTerm}%\n\nTanács: ${a.spiritualAdvice}`,
      tags: ['kapcsolat', partner.name, 'szinasztria'],
      mood: 'Szeretetteljes'
    });
    setIsSaved(true);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GlowBadge variant="purple">
                <HeartHandshake className="h-3.5 w-3.5" />
                Szinasztria & Kapcsolati Dinamika
              </GlowBadge>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              {t.relationships.title}
            </h1>
            <p className="text-xs sm:text-sm text-ethereal-300 mt-1">
              {t.relationships.subtitle}
            </p>
          </div>
        </div>

        {/* Partner Input Card */}
        <div className="rounded-3xl border border-white/10 bg-card-gradient p-6 sm:p-8 backdrop-blur-xl shadow-glass space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-rose-400" />
            <span>Második személy hozzáadása az elemzéshez</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-rose-300 uppercase tracking-wider mb-2">
                {t.relationships.partnerName}
              </label>
              <input
                type="text"
                value={partner.name}
                onChange={(e) => setPartner({ ...partner, name: e.target.value })}
                placeholder="pl. Tamás vagy Eszter"
                className="w-full rounded-xl border border-white/10 bg-space-950/70 px-4 py-3 text-sm text-white focus:border-rose-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-300 uppercase tracking-wider mb-2">
                {t.relationships.partnerBirthDate}
              </label>
              <input
                type="date"
                value={partner.birthDate}
                onChange={(e) => setPartner({ ...partner, birthDate: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-space-950/70 px-4 py-3 text-sm text-white focus:border-rose-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ethereal-400 uppercase tracking-wider mb-2">
                Születési időpont (opcionális)
              </label>
              <input
                type="time"
                value={partner.birthTime}
                onChange={(e) => setPartner({ ...partner, birthTime: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-space-950/70 px-4 py-3 text-sm text-white focus:border-rose-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ethereal-400 uppercase tracking-wider mb-2">
                Születési hely (opcionális)
              </label>
              <input
                type="text"
                value={partner.birthPlace}
                onChange={(e) => setPartner({ ...partner, birthPlace: e.target.value })}
                placeholder="pl. Szeged, Magyarország"
                className="w-full rounded-xl border border-white/10 bg-space-950/70 px-4 py-3 text-sm text-white focus:border-rose-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
            <span className="text-[11px] text-ethereal-400 italic">
              A számított harmónia mutatók szimbolikus, inspirációs célt szolgálnak.
            </span>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 text-sm font-bold text-white hover:brightness-110 disabled:opacity-40 transition-all shadow-[0_0_20px_rgba(244,63,94,0.3)]"
            >
              <Heart className="h-4 w-4" />
              <span>{isAnalyzing ? "Elemzés folyamatban..." : t.relationships.calculateMatch}</span>
            </button>
          </div>
        </div>

        {isAnalyzing && (
          <div className="rounded-3xl border border-rose-500/30 bg-card-gradient p-8 backdrop-blur-xl shadow-glass">
            <MysticalLoader statusText="A két lélek numerológiai és csillagrezgéseit hangolom össze..." />
          </div>
        )}

        {/* Results view */}
        {result?.analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Compatibility Scores */}
            <div className="rounded-3xl border border-rose-500/30 bg-card-gradient p-6 sm:p-8 backdrop-blur-xl shadow-glass space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-rose-400">
                    Szimbolikus Kapcsolati Harmónia
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {user?.displayName || "Te"} & {partner.name}
                  </h3>
                </div>

                <button
                  onClick={handleSaveToJournal}
                  disabled={isSaved}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20"
                >
                  {isSaved ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <BookOpen className="h-3.5 w-3.5" />}
                  <span>{isSaved ? "Elmentve" : "Mentés Sorsnaplóba"}</span>
                </button>
              </div>

              {/* Progress bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/5 bg-space-950/70 p-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="flex items-center gap-1.5 text-rose-300 font-semibold">
                      <Heart className="h-3.5 w-3.5 text-rose-400" />
                      {t.relationships.emotionalHarmony}
                    </span>
                    <strong className="text-white text-sm">{result.analysis.harmonyScores.emotional}%</strong>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-400"
                      style={{ width: `${result.analysis.harmonyScores.emotional}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-space-950/70 p-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
                      <MessageSquare className="h-3.5 w-3.5 text-amber-400" />
                      {t.relationships.communication}
                    </span>
                    <strong className="text-white text-sm">{result.analysis.harmonyScores.communication}%</strong>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400"
                      style={{ width: `${result.analysis.harmonyScores.communication}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-space-950/70 p-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="flex items-center gap-1.5 text-orange-300 font-semibold">
                      <Flame className="h-3.5 w-3.5 text-orange-400" />
                      {t.relationships.passion}
                    </span>
                    <strong className="text-white text-sm">{result.analysis.harmonyScores.passion}%</strong>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-400"
                      style={{ width: `${result.analysis.harmonyScores.passion}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-space-950/70 p-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="flex items-center gap-1.5 text-purple-300 font-semibold">
                      <Shield className="h-3.5 w-3.5 text-purple-400" />
                      {t.relationships.longTermDynamics}
                    </span>
                    <strong className="text-white text-sm">{result.analysis.harmonyScores.longTerm}%</strong>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-400"
                      style={{ width: `${result.analysis.harmonyScores.longTerm}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Report Card */}
            <div className="rounded-3xl border border-white/10 bg-card-gradient p-6 sm:p-8 backdrop-blur-xl shadow-glass space-y-6">
              <h3 className="text-lg font-bold text-white">
                {t.relationships.synthesisReport}
              </h3>

              <p className="text-sm text-ethereal-200 leading-relaxed font-light bg-space-950/50 p-4 rounded-2xl border border-white/5">
                {result.analysis.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-space-950/60 border border-white/5 p-4 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 block">Közös Erősségek</span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-ethereal-300">
                    {result.analysis.strengths?.map((str: string, i: number) => (
                      <li key={i}>{str}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-space-950/60 border border-white/5 p-4 space-y-2">
                  <span className="text-xs font-bold text-amber-400 block">Fejlődési Pontok</span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-ethereal-300">
                    {result.analysis.growthAreas?.map((gro: string, i: number) => (
                      <li key={i}>{gro}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl bg-rose-500/10 border border-rose-500/30 p-5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400 block mb-1">
                  Közös spirituális tanács
                </span>
                <p className="text-sm text-rose-200 leading-relaxed">
                  {result.analysis.spiritualAdvice}
                </p>
                <div className="mt-3 pt-3 border-t border-rose-500/20 text-xs italic text-rose-300/80">
                  Reflexió: „{result.analysis.reflectionQuestion}”
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </AppShell>
  );
}
