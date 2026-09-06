"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Briefcase, Coins, Compass, Sun, Sparkles } from 'lucide-react';
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

  // 12 Astrolabe radial tick marks
  const tickMarks = Array.from({ length: 12 }, (_, i) => i * 30);

  return (
    <div className="relative overflow-hidden rounded-3xl mystic-card p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(212,175,55,0.15)]">
      {/* Corner filigree accents */}
      <div className="mystic-corner-tl" />
      <div className="mystic-corner-br" />

      {/* Subtle nebula glow backdrops */}
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-mystic-500/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
        {/* Main Score: Astrolabe Celestial Horologium */}
        <div className="relative flex flex-col items-center justify-center shrink-0">
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-2 border-gold-500/50 bg-[#0c0819]/80 shadow-[0_0_30px_rgba(212,175,55,0.25)]">
            {/* Outer Astrolabe Tick Ring */}
            <div className="absolute inset-1 rounded-full border border-gold-500/20 pointer-events-none">
              {tickMarks.map((deg) => (
                <div
                  key={deg}
                  className="absolute top-0 left-1/2 -ml-[0.5px] h-2 w-[1px] bg-gold-400/40 origin-bottom"
                  style={{
                    transform: `rotate(${deg}deg) translateY(2px)`,
                    transformOrigin: '50% 75px',
                  }}
                />
              ))}
            </div>

            {/* Rotating subtle zodiac dash ring */}
            <div className="absolute inset-3 rounded-full border border-dashed border-gold-400/20 animate-spin-slow pointer-events-none" />

            {/* Circular Progress Gauge */}
            <svg className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="64"
                stroke="currentColor"
                strokeWidth="7"
                className="text-white/5"
                fill="none"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="64"
                stroke="url(#astrolabe-gold-gradient)"
                strokeWidth="7"
                fill="none"
                strokeDasharray={402}
                strokeDashoffset={402 - (402 * score) / 100}
                strokeLinecap="round"
                initial={{ strokeDashoffset: 402 }}
                animate={{ strokeDashoffset: 402 - (402 * score) / 100 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              />
              <defs>
                <linearGradient id="astrolabe-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#aa7c11" />
                </linearGradient>
              </defs>
            </svg>

            {/* Central Score readout */}
            <div className="text-center z-10 flex flex-col items-center">
              <Sun className="h-4 w-4 text-gold-400/80 mb-0.5 animate-pulse-slow" />
              <span className="font-serif text-4xl font-bold tracking-tight text-white drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]">
                {score}
              </span>
              <span className="font-serif block text-[9px] uppercase tracking-[0.25em] text-gold-300 font-semibold mt-0.5">
                ✦ {t.dashboard.energyScale} ✦
              </span>
            </div>
          </div>

          <p className="mt-3.5 font-serif text-xs font-medium uppercase tracking-widest text-gold-300/90 text-center flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-gold-400" />
            <span>{t.dashboard.todayEnergy}</span>
            <Sparkles className="h-3 w-3 text-gold-400" />
          </p>
        </div>

        {/* Breakdown sub-scores: 4 Planetary Spheres */}
        <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
          {/* Love / Vénusz */}
          <div className="relative rounded-2xl border border-rose-500/20 bg-space-950/60 p-3.5 backdrop-blur-sm shadow-sm hover:border-rose-500/40 transition-all">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2 text-rose-300/90 font-serif">
                <Heart className="h-3.5 w-3.5 text-rose-400" />
                <span className="tracking-wide">{t.dashboard.energyLove}</span>
              </div>
              <span className="text-[10px] uppercase font-serif text-rose-300/70 border border-rose-500/20 px-1.5 py-0.5 rounded">
                Harmónia
              </span>
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-serif text-xl font-bold text-white">{subScores.love}</span>
              <span className="text-[11px] text-ethereal-400">/ 100</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden p-0.5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-rose-600 via-rose-400 to-pink-300 shadow-[0_0_8px_rgba(244,63,94,0.6)]"
                initial={{ width: 0 }}
                animate={{ width: `${subScores.love}%` }}
                transition={{ duration: 1.2, delay: 0.2 }}
              />
            </div>
          </div>

          {/* Career / Mars & Nap */}
          <div className="relative rounded-2xl border border-amber-500/20 bg-space-950/60 p-3.5 backdrop-blur-sm shadow-sm hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2 text-amber-300/90 font-serif">
                <Briefcase className="h-3.5 w-3.5 text-amber-400" />
                <span className="tracking-wide">{t.dashboard.energyCareer}</span>
              </div>
              <span className="text-[10px] uppercase font-serif text-amber-300/70 border border-amber-500/20 px-1.5 py-0.5 rounded">
                Aktív
              </span>
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-serif text-xl font-bold text-white">{subScores.career}</span>
              <span className="text-[11px] text-ethereal-400">/ 100</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden p-0.5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                initial={{ width: 0 }}
                animate={{ width: `${subScores.career}%` }}
                transition={{ duration: 1.2, delay: 0.3 }}
              />
            </div>
          </div>

          {/* Finances / Jupiter */}
          <div className="relative rounded-2xl border border-emerald-500/20 bg-space-950/60 p-3.5 backdrop-blur-sm shadow-sm hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2 text-emerald-300/90 font-serif">
                <Coins className="h-3.5 w-3.5 text-emerald-400" />
                <span className="tracking-wide">{t.dashboard.energyFinances}</span>
              </div>
              <span className="text-[10px] uppercase font-serif text-emerald-300/70 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                Bőség
              </span>
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-serif text-xl font-bold text-white">{subScores.finances}</span>
              <span className="text-[11px] text-ethereal-400">/ 100</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden p-0.5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-300 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                initial={{ width: 0 }}
                animate={{ width: `${subScores.finances}%` }}
                transition={{ duration: 1.2, delay: 0.4 }}
              />
            </div>
          </div>

          {/* Self / Merkúr */}
          <div className="relative rounded-2xl border border-mystic-500/20 bg-space-950/60 p-3.5 backdrop-blur-sm shadow-sm hover:border-mystic-500/40 transition-all">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2 text-mystic-300/90 font-serif">
                <Compass className="h-3.5 w-3.5 text-mystic-400" />
                <span className="tracking-wide">{t.dashboard.energySelf}</span>
              </div>
              <span className="text-[10px] uppercase font-serif text-mystic-300/70 border border-mystic-500/20 px-1.5 py-0.5 rounded">
                Mély Fókusz
              </span>
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-serif text-xl font-bold text-white">{subScores.self}</span>
              <span className="text-[11px] text-ethereal-400">/ 100</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden p-0.5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple-600 via-mystic-400 to-indigo-300 shadow-[0_0_8px_rgba(157,78,221,0.6)]"
                initial={{ width: 0 }}
                animate={{ width: `${subScores.self}%` }}
                transition={{ duration: 1.2, delay: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
