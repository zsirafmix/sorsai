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
  Crown
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { TarotCardView } from '@/components/tarot/TarotCardView';
import { MysticalLoader } from '@/components/mystical/MysticalLoader';
import { GlowBadge } from '@/components/mystical/GlowBadge';
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
          language
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
      title: `Tarot (${SPREADS[spreadType].title_hu}): ${analysis.headline}`,
      text: `${question ? `Kérdés: "${question}"\n\n` : ''}${analysis.interconnection}\n\nTanács: ${analysis.advice}\nReflexió: ${analysis.reflectionQuestion}`,
      tags: ['tarot', spreadType, ...drawnCards.map((c) => c.card.name_hu)],
      mood: 'Misztikus'
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
              <GlowBadge variant="gold">
                <Sparkles className="h-3.5 w-3.5" />
                78 Lapos Autentikus Rider-Waite
              </GlowBadge>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              {t.tarot.title}
            </h1>
            <p className="text-xs sm:text-sm text-ethereal-300 mt-1">
              {t.tarot.subtitle}
            </p>
          </div>
        </div>

        {/* Spread Selector and Question Input */}
        <div className="rounded-3xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl shadow-glass space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gold-400 uppercase tracking-wider mb-3">
              {t.tarot.selectSpread}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {Object.values(SPREADS).map((s) => {
                const isSelected = spreadType === s.id;
                const isLocked = s.id !== 'single' && !canUseFeature(user, 'tarot_all_spreads');

                return (
                  <button
                    key={s.id}
                    onClick={() => setSpreadType(s.id)}
                    className={`relative flex flex-col items-start p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-gold-500/60 bg-gold-500/20 text-white shadow-gold-glow'
                        : 'border-white/5 bg-space-950/60 text-ethereal-300 hover:border-white/20'
                    }`}
                  >
                    {isLocked && (
                      <span className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded-full">
                        <Crown className="h-2.5 w-2.5" /> Pro
                      </span>
                    )}
                    <span className="text-xs font-bold leading-tight line-clamp-1">{s.title_hu}</span>
                    <span className="text-[10px] text-gold-400/90 mt-1">{s.cardCount} lap</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Locked spread notice */}
          {!isAllowedSpread && (
            <div className="flex items-center justify-between p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Ez a kirakási mód a Prémium csomag része. Az 1 Lapos fókusz ingyenesen használható!</span>
              </div>
              <Link href="/pricing" className="underline font-bold hover:text-white">
                Váltás Prémiumra →
              </Link>
            </div>
          )}

          {/* Question input */}
          <div>
            <label className="block text-xs font-semibold text-ethereal-300 uppercase tracking-wider mb-2">
              Kérdés vagy fókuszpont
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={t.tarot.questionPlaceholder}
                className="flex-1 rounded-xl border border-white/10 bg-space-950/70 px-4 py-3 text-sm text-white placeholder-ethereal-500 focus:border-gold-400 focus:outline-none"
              />
              <button
                onClick={handleDraw}
                disabled={isDrawing || !isAllowedSpread}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 px-6 py-3 text-sm font-bold text-space-950 hover:brightness-110 disabled:opacity-40 transition-all shadow-gold-glow shrink-0"
              >
                <Shuffle className="h-4 w-4" />
                <span>{isDrawing ? "Keverés..." : t.tarot.drawCards}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Drawn Cards Display Board */}
        {drawnCards.length > 0 && (
          <div className="rounded-3xl border border-white/10 bg-card-gradient p-6 sm:p-8 backdrop-blur-xl shadow-glass space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Kihúzott Lapok ({drawnCards.length} lap)
                </h3>
                <p className="text-xs text-ethereal-400">
                  {t.tarot.flipCard}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={flipAll}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-ethereal-300 hover:bg-white/10 transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>{t.tarot.flipAll}</span>
                </button>

                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-mystic-500 to-purple-500 px-4 py-2 text-xs font-bold text-white hover:brightness-110 transition-all shadow-mystic-glow"
                >
                  <Sparkles className="h-3.5 w-3.5 text-gold-300" />
                  <span>{isAnalyzing ? "Elemzés..." : t.tarot.analyzeSpread}</span>
                </button>
              </div>
            </div>

            {/* Responsive cards grid */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 py-4">
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

            {/* AI Analysis Result */}
            {isAnalyzing && (
              <div className="p-6 rounded-2xl border border-gold-500/30 bg-space-950/70 shadow-gold-glow">
                <MysticalLoader statusText="A lapok egymással való összefüggéseit és szimbolikus üzenetét elemzem..." />
              </div>
            )}

            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-gold-500/40 bg-space-950/80 p-6 sm:p-8 backdrop-blur-2xl shadow-gold-glow space-y-6"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-gold-400">
                      Összegző Tarot Elemzés
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                      {analysis.headline}
                    </h3>
                  </div>

                  <button
                    onClick={handleSaveToJournal}
                    disabled={isSaved}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-xs font-semibold text-gold-300 hover:bg-gold-500/20 transition-all shadow-sm"
                  >
                    {isSaved ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-400">Elmentve</span>
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
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-400 mb-1">
                      A Lapok Egymásra Hatása
                    </h4>
                    <p className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      {analysis.interconnection}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-400 mb-1">
                      Szellemi Útmutatás & Tanács
                    </h4>
                    <p className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      {analysis.advice}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gold-500/10 border border-gold-500/30 p-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-400 block mb-1">
                      Reflexiós kérdés a lapok tükrében
                    </span>
                    <p className="text-gold-200 italic font-medium">
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
