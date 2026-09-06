"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Briefcase, Coins, Compass } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface EnergyGaugeProps {
  score?: number;
  subScores?: {
    love: number;
    career: number;
    finances: number;
    self: number;
  };
}

export const EnergyGauge: React.FC<EnergyGaugeProps> = ({
  score = 78,
  subScores = { love: 82, career: 71, finances: 64, self: 88 },
}) => {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl shadow-glass">
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 h-36 w-36 rounded-full bg-mystic-500/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Main Score Circular Display */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-gold-500/30 bg-space-950/70 shadow-gold-glow">
            <svg className="absolute h-full w-full -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="6"
                className="text-white/5"
                fill="none"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="6"
                className="text-gold-400"
                fill="none"
                strokeDasharray={351}
                strokeDashoffset={351 - (351 * score) / 100}
                strokeLinecap="round"
                initial={{ strokeDashoffset: 351 }}
                animate={{ strokeDashoffset: 351 - (351 * score) / 100 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
            <div className="text-center z-10">
              <span className="text-3xl font-bold tracking-tight text-white">{score}</span>
              <span className="block text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
                {t.dashboard.energyScale}
              </span>
            </div>
          </div>
          <p className="mt-3 text-sm font-medium text-ethereal-300">
            {t.dashboard.todayEnergy}
          </p>
        </div>

        {/* Breakdown sub-scores */}
        <div className="grid flex-1 grid-cols-2 gap-3 w-full">
          <div className="rounded-xl border border-white/5 bg-space-900/60 p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs text-ethereal-400 mb-1">
              <Heart className="h-3.5 w-3.5 text-rose-400" />
              <span>{t.dashboard.energyLove}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-semibold text-white">{subScores.love}</span>
              <span className="text-xs text-rose-400/80 font-medium">Harmonikus</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-400"
                initial={{ width: 0 }}
                animate={{ width: `${subScores.love}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-space-900/60 p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs text-ethereal-400 mb-1">
              <Briefcase className="h-3.5 w-3.5 text-amber-400" />
              <span>{t.dashboard.energyCareer}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-semibold text-white">{subScores.career}</span>
              <span className="text-xs text-amber-400/80 font-medium">Aktív</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400"
                initial={{ width: 0 }}
                animate={{ width: `${subScores.career}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-space-900/60 p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs text-ethereal-400 mb-1">
              <Coins className="h-3.5 w-3.5 text-emerald-400" />
              <span>{t.dashboard.energyFinances}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-semibold text-white">{subScores.finances}</span>
              <span className="text-xs text-emerald-400/80 font-medium">Stabil</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                initial={{ width: 0 }}
                animate={{ width: `${subScores.finances}%` }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-space-900/60 p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs text-ethereal-400 mb-1">
              <Compass className="h-3.5 w-3.5 text-mystic-400" />
              <span>{t.dashboard.energySelf}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-semibold text-white">{subScores.self}</span>
              <span className="text-xs text-mystic-300 font-medium">Mély fókusz</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-mystic-500 to-purple-400"
                initial={{ width: 0 }}
                animate={{ width: `${subScores.self}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
