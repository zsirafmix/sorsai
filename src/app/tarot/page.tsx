"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Shuffle,
  Eye,
  BookOpen,
  Check,
  Crown,
  Sun
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { TarotCardView } from '@/components/tarot/TarotCardView';
import { MysticalLoader } from '@/components/mystical/MysticalLoader';
import { SPREADS, SpreadType, DrawnSpreadCard } from '@/lib/tarot';
import { useAuth } from '@/lib/storage/authContext';
import { useTranslation } from '@/lib/i18n';
import { canUseFeature } from '@/lib/entitlements';
import { demoStore } from '@/lib/storage/demoStore';
import { TarotAnalysis } from '@/lib/ai/schemas';

export default function TarotPage() {
  const { user } = useAuth();
  const { language, t } = useTranslation();

  const [spreadType, setSpreadType] = useState<SpreadType>('threeCard');
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState<DrawnSpreadCard[]>([]);
  const [flippedMap, setFlippedMap] = useState<Record<number, boolean>>({});
  const [isDrawing, setIsDrawing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<TarotAnalysis | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const isAllowedSpread = spreadType === 'single' || canUseFeature(user, 'tarot_all_spreads');

  const handleDraw = async () => {
    setIsDrawing(true);
    setAnalysis(null);
    setIsSaved(false);
    setFlippedMap({});

    try {
      const res = await fetch('/api/tarot/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spreadType })
      });
      const data = await res.json();
      setDrawnCards(data.cards);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDrawing(false);
    }
  };

  const flipCard = (index: number) => {
    setFlippedMap((prev) => ({ ...prev, [index]: true }));
  };

  const flipAll = () => {
    const all: Record<number, boolean> = {};
    drawnCards.forEach((_, idx) => {
      all[idx] = true;
    });
    setFlippedMap(all);
  };

  const handleAnalyze = async () => {
    if (drawnCards.length === 0) return;
    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/ai/tarot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spreadType,
          question,
          drawnCards,
          language,
          provider: typeof window !== 'undefined' ? (localStorage.getItem('sorsai_ai_provider') || undefined) : undefined
        })
      });
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveToJournal = () => {
    if (!analysis) return;
    demoStore.addJournalEntry({
      type: 'tarot',
      title: `Tarot: ${analysis.headline}`,
      text: `${analysis.interconnection}\n\nTanács: ${analysis.advice}\n\nReflexió: ${analysis.reflectionQuestion}`,
      tags: ['tarot', spreadType, ...drawnCards.map((c) => c.card.name)],
      mood: 'Intuitív'
    });
    setIsSaved(true);
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Title Header */}
        <div className="relative rounded-3xl mystic-card p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(212,175,55,0.15)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="mystic-corner-tl" />
          <div className="mystic-corner-br" />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-serif text-[11px] uppercase tracking-[0.25em] text-gold-300 px-3 py-1 rounded-full border border-gold-500/30 bg-space-950/70">
                ✦ 78 LAPOS RIDER-WAITE SZENTÉLY ✦
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide">
              {t.tarot.title}
            </h1>
            <p className="mt-1 text-sm text-ethereal-300 font-serif italic">
              {t.tarot.subtitle}
            </p>
          </div>
        </div>

        {/* Spread Selector and Question Input */}
        <div className="relative rounded-3xl mystic-card p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(212,175,55,0.15)] space-y-6">
          <div className="mystic-corner-tl" />
          <div className="mystic-corner-br" />

          <div>
            <label className="block font-serif text-xs font-bold text-gold-300 uppercase tracking-[0.2em] mb-3">
              ✦ {t.tarot.selectSpread}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.values(SPREADS).map((s) => {
                const isSelected = spreadType === s.id;
                const isLocked = s.id !== 'single' && !canUseFeature(user, 'tarot_all_spreads');

                return (
                  <button
                    key={s.id}
                    onClick={() => setSpreadType(s.id)}
                    className={`relative flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-gold-500/70 bg-gold-500/20 text-white shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                        : 'border-gold-500/15 bg-space-950/70 text-ethereal-300 hover:border-gold-500/40'
                    }`}
                  >
                    {isLocked && (
                      <span className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-serif uppercase tracking-wider text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded-full border border-amber-500/30">
                        <Crown className="h-2.5 w-2.5" /> Pro
                      </span>
                    )}
                    <span className="font-serif text-xs font-bold leading-tight line-clamp-1">{s.title_hu}</span>
                    <span className="text-[10px] font-mono text-gold-400/90 mt-1">{s.cardCount} lap</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Locked spread notice */}
          {!isAllowedSpread && (
            <div className="flex items-center justify-between p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs font-serif">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Ez a kirakási mód a Prémium csomag része. Az 1 Lapos fókusz ingyenesen használható!</span>
              </div>
              <Link href="/pricing" className="underline font-bold hover:text-white uppercase tracking-wider">
                Váltás Prémiumra →
              </Link>
            </div>
          )}

          {/* Question input */}
          <div>
            <label className="block font-serif text-xs font-bold text-gold-300 uppercase tracking-[0.2em] mb-2">
              ✦ Kérdés vagy Belső Fókuszpont
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={t.tarot.questionPlaceholder}
                className="flex-1 rounded-2xl border border-gold-500/25 bg-[#090614]/90 px-4 py-3.5 text-sm text-white placeholder-ethereal-500 focus:border-gold-400 focus:outline-none font-serif"
              />
              <button
                onClick={handleDraw}
                disabled={isDrawing || !isAllowedSpread}
                className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 px-7 py-3.5 font-serif text-xs font-bold uppercase tracking-wider text-space-950 hover:brightness-110 disabled:opacity-40 transition-all shadow-[0_0_25px_rgba(212,175,55,0.35)] shrink-0"
              >
                <Shuffle className="h-4 w-4" />
                <span>{isDrawing ? "Keverés..." : t.tarot.drawCards}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Drawn Cards Display Board - Sacred Altar */}
        {drawnCards.length > 0 && (
          <div className="relative rounded-3xl mystic-card p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(212,175,55,0.2)] space-y-8 overflow-hidden">
            <div className="mystic-corner-tl" />
            <div className="mystic-corner-br" />

            {/* Sacred Altar Circle Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none opacity-20">
              <svg className="w-full h-full text-gold-400 animate-spin-slow" viewBox="0 0 400 400" fill="none">
                <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
                <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="1" />
                <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="0.8" />
                <polygon points="200,50 330,275 70,275" stroke="currentColor" strokeWidth="0.75" fill="none" />
                <polygon points="200,350 330,125 70,125" stroke="currentColor" strokeWidth="0.75" fill="none" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-white tracking-wide flex items-center gap-2">
                  <span className="text-gold-400">✦</span>
                  <span>Kihúzott Lapok ({drawnCards.length} lap)</span>
                </h3>
                <p className="text-xs text-ethereal-300 font-serif italic mt-0.5">
                  {t.tarot.flipCard}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={flipAll}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-gold-500/30 bg-gold-500/10 px-4 py-2 font-serif text-xs font-semibold text-gold-300 hover:bg-gold-500/20 transition-all"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>{t.tarot.flipAll}</span>
                </button>

                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-mystic-500 via-purple-500 to-indigo-600 px-5 py-2 font-serif text-xs font-bold uppercase tracking-wider text-white hover:brightness-110 transition-all shadow-[0_0_20px_rgba(157,78,221,0.4)]"
                >
                  <Sparkles className="h-3.5 w-3.5 text-gold-300" />
                  <span>{isAnalyzing ? "Elemzés..." : t.tarot.analyzeSpread}</span>
                </button>
              </div>
            </div>

            {/* Responsive cards altar grid */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-8 sm:gap-10 py-6">
              {drawnCards.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <TarotCardView
                    card={item.card}
                    positionName={item.position.name_hu}
                    isReversed={item.isReversed}
                    isFlipped={!!flippedMap[idx]}
                    onFlip={() => flipCard(idx)}
                    size="md"
                  />
                </div>
              ))}
            </div>

            {/* AI Analysis Loading */}
            {isAnalyzing && (
              <div className="p-6 rounded-2xl border border-gold-500/30 bg-space-950/80 shadow-gold-glow">
                <MysticalLoader statusText="A lapok egymással való összefüggéseit és szimbolikus üzenetét elemzem..." />
              </div>
            )}

            {/* AI Analysis Result */}
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-3xl mystic-card p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(212,175,55,0.25)] space-y-6"
              >
                <div className="mystic-corner-tl" />
                <div className="mystic-corner-br" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-4">
                  <div>
                    <span className="font-serif text-[10px] uppercase tracking-[0.25em] font-bold text-gold-400 block">
                      ✦ ÖSSZEGZŐ TAROT KINYILATKOZTATÁS ✦
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold gold-text-gradient mt-1">
                      {analysis.headline}
                    </h3>
                  </div>

                  <button
                    onClick={handleSaveToJournal}
                    disabled={isSaved}
                    className="inline-flex items-center gap-2 rounded-xl border border-gold-500/40 bg-gold-500/10 px-4 py-2 font-serif text-xs font-semibold text-gold-300 hover:bg-gold-500/20 transition-all shrink-0"
                  >
                    {isSaved ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-400">Elmentve a Naplóba</span>
                      </>
                    ) : (
                      <>
                        <BookOpen className="h-4 w-4" />
                        <span>Mentés Sorsnaplóba</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-4 text-sm text-ethereal-200 leading-relaxed">
                  <div className="rounded-2xl bg-space-950/70 border border-gold-500/20 p-5">
                    <h4 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-gold-400 mb-2">
                      ✦ A Lapok Egymásra Hatása & Dinamikája
                    </h4>
                    <p className="font-light leading-relaxed">
                      {analysis.interconnection}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-space-950/70 border border-gold-500/20 p-5">
                    <h4 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-gold-400 mb-2">
                      ✦ Szellemi Útmutatás & Cselekvési Tanács
                    </h4>
                    <p className="font-light leading-relaxed">
                      {analysis.advice}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-r from-gold-500/15 via-amber-500/10 to-transparent border border-gold-500/40 p-5 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                    <span className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-gold-400 block mb-1">
                      ✦ Belső Reflexiós Kérdés
                    </span>
                    <p className="font-serif text-base sm:text-lg text-gold-200 italic">
                      „{analysis.reflectionQuestion}”
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
