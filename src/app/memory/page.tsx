"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  Plus,
  Trash2,
  Lock,
  Sparkles,
  Check
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { GlowBadge } from '@/components/mystical/GlowBadge';
import { useTranslation } from '@/lib/i18n';
import { demoStore, AIMemoryData } from '@/lib/storage/demoStore';

export default function MemoryPage() {
  const { t } = useTranslation();
  const [memory, setMemory] = useState<AIMemoryData>(() => demoStore.getMemory());
  const [newTheme, setNewTheme] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const toggleEnabled = () => {
    const updated = demoStore.saveMemory({ isEnabled: !memory.isEnabled });
    setMemory(updated);
    showNotice();
  };

  const addTheme = () => {
    if (!newTheme.trim()) return;
    const updated = demoStore.saveMemory({
      currentThemes: [...memory.currentThemes, newTheme.trim()]
    });
    setMemory(updated);
    setNewTheme('');
    showNotice();
  };

  const removeTheme = (index: number) => {
    const updated = demoStore.saveMemory({
      currentThemes: memory.currentThemes.filter((_, i) => i !== index)
    });
    setMemory(updated);
    showNotice();
  };

  const addGoal = () => {
    if (!newGoal.trim()) return;
    const updated = demoStore.saveMemory({
      goals: [...memory.goals, newGoal.trim()]
    });
    setMemory(updated);
    setNewGoal('');
    showNotice();
  };

  const removeGoal = (index: number) => {
    const updated = demoStore.saveMemory({
      goals: memory.goals.filter((_, i) => i !== index)
    });
    setMemory(updated);
    showNotice();
  };

  const handleClear = () => {
    if (confirm("Biztosan törölni szeretnéd a SorsAI teljes mentett memóriáját?")) {
      demoStore.clearMemory();
      setMemory(demoStore.getMemory());
      showNotice();
    }
  };

  const showNotice = () => {
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2000);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GlowBadge variant="purple">
                <Brain className="h-3.5 w-3.5" />
                Strukturált AI Kontextus
              </GlowBadge>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              {t.memory.title}
            </h1>
            <p className="text-xs sm:text-sm text-ethereal-300 mt-1">
              {t.memory.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleEnabled}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                memory.isEnabled
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'border-rose-500/40 bg-rose-500/10 text-rose-300'
              }`}
            >
              {memory.isEnabled ? (
                <>
                  <ToggleRight className="h-5 w-5" />
                  <span>{t.memory.statusEnabled}</span>
                </>
              ) : (
                <>
                  <ToggleLeft className="h-5 w-5" />
                  <span>{t.memory.statusDisabled}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {isSavedNotice && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold"
          >
            <Check className="h-4 w-4" />
            <span>A memória beállításai sikeresen frissültek.</span>
          </motion.div>
        )}

        {/* Current Themes */}
        <div className="rounded-3xl border border-white/10 bg-card-gradient p-6 sm:p-8 backdrop-blur-xl shadow-glass space-y-4">
          <h3 className="text-base font-bold text-white flex items-center justify-between">
            <span>{t.memory.currentThemes}</span>
            <span className="text-xs text-gold-400 font-medium">({memory.currentThemes.length} aktív téma)</span>
          </h3>
          <p className="text-xs text-ethereal-300 leading-relaxed font-light">
            Ezek azok a háttértémák, amelyeket a SorsAI figyelembe vesz az elemzések szintézise során.
          </p>

          <div className="space-y-2">
            {memory.currentThemes.map((theme, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-space-950/60 border border-white/5"
              >
                <span className="text-xs sm:text-sm text-white font-medium">✦ {theme}</span>
                <button
                  onClick={() => removeTheme(idx)}
                  className="text-ethereal-500 hover:text-rose-400 transition-colors p-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={newTheme}
              onChange={(e) => setNewTheme(e.target.value)}
              placeholder="pl. Karrier újratervezése, belső bizonytalanság..."
              className="flex-1 rounded-xl border border-white/10 bg-space-950/70 px-4 py-2 text-xs text-white placeholder-ethereal-500 focus:border-gold-400 focus:outline-none"
            />
            <button
              onClick={addTheme}
              className="rounded-xl bg-gold-500/20 border border-gold-500/40 px-4 py-2 text-xs font-bold text-gold-300 hover:bg-gold-500/30 shrink-0"
            >
              Hozzáadás
            </button>
          </div>
        </div>

        {/* Goals and Strivings */}
        <div className="rounded-3xl border border-white/10 bg-card-gradient p-6 sm:p-8 backdrop-blur-xl shadow-glass space-y-4">
          <h3 className="text-base font-bold text-white flex items-center justify-between">
            <span>{t.memory.goals}</span>
            <span className="text-xs text-mystic-300 font-medium">({memory.goals.length} célkitűzés)</span>
          </h3>

          <div className="space-y-2">
            {memory.goals.map((goal, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-space-950/60 border border-white/5"
              >
                <span className="text-xs sm:text-sm text-white font-medium">🎯 {goal}</span>
                <button
                  onClick={() => removeGoal(idx)}
                  className="text-ethereal-500 hover:text-rose-400 transition-colors p-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="pl. Új vállalkozás megalapozása, türelem fejlesztése..."
              className="flex-1 rounded-xl border border-white/10 bg-space-950/70 px-4 py-2 text-xs text-white placeholder-ethereal-500 focus:border-mystic-400 focus:outline-none"
            />
            <button
              onClick={addGoal}
              className="rounded-xl bg-mystic-500/20 border border-mystic-500/40 px-4 py-2 text-xs font-bold text-mystic-300 hover:bg-mystic-500/30 shrink-0"
            >
              Hozzáadás
            </button>
          </div>
        </div>

        {/* Privacy Note & Danger Zone */}
        <div className="rounded-3xl border border-white/5 bg-space-900/30 p-6 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-ethereal-400 leading-relaxed max-w-md">
              {t.memory.memoryPrivacyNote}
            </p>
          </div>

          <button
            onClick={handleClear}
            className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 shrink-0"
          >
            {t.memory.clearMemory}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
