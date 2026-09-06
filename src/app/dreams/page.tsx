"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MoonStar,
  Sparkles,
  BookOpen,
  Check,
  HelpCircle,
  Feather,
  Compass,
  Lightbulb
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { GlowBadge } from '@/components/mystical/GlowBadge';
import { MysticalLoader } from '@/components/mystical/MysticalLoader';
import { useTranslation } from '@/lib/i18n';
import { demoStore } from '@/lib/storage/demoStore';
import { DreamAnalysis } from '@/lib/ai/schemas';

const SAMPLE_DREAMS = [
  "Egy hatalmas, sötétkék tó partján álltam, ahol a vízből egy fénylő arany kulcs emelkedett ki, de féltem belépni a vízbe.",
  "Repültem a hegyek felett, és lent apró fények mutatták az utat egy ősi könyvtár felé.",
  "Egy labirintusban kerestem a kijáratot, és egy tükör előtt állva egy bölcs oroszlán nézett vissza rám."
];

export default function DreamsPage() {
  const { language, t } = useTranslation();

  const [dreamText, setDreamText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DreamAnalysis | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleInterpret = async () => {
    if (!dreamText.trim()) return;
    setIsAnalyzing(true);
    setIsSaved(false);

    try {
      const res = await fetch('/api/ai/dreams', {
        method: 'POST',
        body: JSON.stringify({
          dreamText,
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
      type: 'dream',
      title: analysis.title,
      text: `Álomleírás:\n"${dreamText}"\n\nPszichológiai jelentés:\n${analysis.psychologicalMeaning}\n\nSpirituális üzenet:\n${analysis.spiritualMeaning}`,
      tags: ['álom', ...analysis.symbols.map((s) => s.symbol)],
      mood: analysis.emotionalTone
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
                <MoonStar className="h-3.5 w-3.5" />
                Jung-i & Archetípusos Álomfejtő
              </GlowBadge>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              {t.dreams.title}
            </h1>
            <p className="text-xs sm:text-sm text-ethereal-300 mt-1">
              {t.dreams.subtitle}
            </p>
          </div>
        </div>

        {/* Input Card */}
        <div className="rounded-3xl border border-white/10 bg-card-gradient p-6 sm:p-8 backdrop-blur-xl shadow-glass space-y-4">
          <label className="block text-sm font-bold text-white flex items-center gap-2">
            <Feather className="h-4 w-4 text-gold-400" />
            <span>{t.dreams.promptText}</span>
          </label>

          <textarea
            rows={5}
            value={dreamText}
            onChange={(e) => setDreamText(e.target.value)}
            placeholder={t.dreams.inputPlaceholder}
            className="w-full rounded-2xl border border-white/10 bg-space-950/70 p-4 text-sm text-white placeholder-ethereal-500 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 leading-relaxed"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            {/* Quick samples */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-ethereal-500">Próbáld ki:</span>
              {SAMPLE_DREAMS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setDreamText(s)}
                  className="rounded-lg border border-white/5 bg-white/5 px-2.5 py-1 text-[11px] text-ethereal-300 hover:border-gold-500/30 hover:text-gold-200 truncate max-w-[200px]"
                >
                  Minta #{idx + 1}
                </button>
              ))}
            </div>

            <button
              onClick={handleInterpret}
              disabled={isAnalyzing || !dreamText.trim()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-mystic-500 to-indigo-500 px-6 py-3 text-sm font-bold text-white hover:brightness-110 disabled:opacity-40 transition-all shadow-mystic-glow shrink-0"
            >
              <Sparkles className="h-4 w-4 text-gold-300" />
              <span>{isAnalyzing ? "Értelmezés..." : t.dreams.interpret}</span>
            </button>
          </div>
        </div>

        {isAnalyzing && (
          <div className="rounded-3xl border border-mystic-500/30 bg-card-gradient p-8 backdrop-blur-xl shadow-glass">
            <MysticalLoader statusText="Az éjszakai szimbólumok, érzések és archetípusok összefüggéseit fejtem meg..." />
          </div>
        )}

        {/* Results */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 bg-card-gradient p-6 sm:p-8 backdrop-blur-xl shadow-glass space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs uppercase tracking-wider font-bold text-mystic-400">
                    Álomelemzés
                  </span>
                  <span className="rounded-full bg-mystic-500/20 border border-mystic-500/40 px-2.5 py-0.5 text-[10px] text-mystic-200">
                    {analysis.emotionalTone}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {analysis.title}
                </h3>
              </div>

              <button
                onClick={handleSaveToJournal}
                disabled={isSaved}
                className="inline-flex items-center gap-1.5 rounded-xl border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-xs font-semibold text-gold-300 hover:bg-gold-500/20"
              >
                {isSaved ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <BookOpen className="h-3.5 w-3.5" />}
                <span>{isSaved ? "Elmentve" : "Mentés Sorsnaplóba"}</span>
              </button>
            </div>

            {/* Symbols Cards */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-3">
                {t.dreams.keySymbols}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {analysis.symbols.map((sym, i) => (
                  <div key={i} className="rounded-2xl bg-space-950/70 border border-white/5 p-4">
                    <span className="font-bold text-white text-xs block mb-1 text-gold-300">
                      ✦ {sym.symbol}
                    </span>
                    <p className="text-xs text-ethereal-300 leading-relaxed font-light">
                      {sym.meaning}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Psychological & Spiritual Interpretations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-space-950/60 border border-white/5 p-5 space-y-2">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Compass className="h-4 w-4" />
                  {t.dreams.psychological}
                </span>
                <p className="text-xs text-ethereal-300 leading-relaxed font-light">
                  {analysis.psychologicalMeaning}
                </p>
              </div>

              <div className="rounded-2xl bg-space-950/60 border border-white/5 p-5 space-y-2">
                <span className="text-xs font-bold text-mystic-300 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  {t.dreams.spiritual}
                </span>
                <p className="text-xs text-ethereal-300 leading-relaxed font-light">
                  {analysis.spiritualMeaning}
                </p>
              </div>
            </div>

            {/* Connection to waking life */}
            <div className="rounded-2xl bg-space-950/70 border border-white/5 p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
                {t.dreams.lifeConnection}
              </h4>
              <p className="text-xs text-ethereal-200 leading-relaxed font-light">
                {analysis.lifeConnection}
              </p>
            </div>

            {/* Reflection questions */}
            <div className="rounded-2xl bg-gold-500/10 border border-gold-500/30 p-5 space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block mb-1">
                {t.dreams.reflection}
              </span>
              <ul className="space-y-1.5 text-xs text-gold-200 italic">
                {analysis.reflectionQuestions.map((q, i) => (
                  <li key={i}>„{q}”</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </AppShell>
  );
}
