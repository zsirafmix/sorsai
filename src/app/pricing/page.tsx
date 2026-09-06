"use client";

import React from 'react';
import Link from 'next/link';
import { Crown, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { GlowBadge } from '@/components/mystical/GlowBadge';
import { useAuth } from '@/lib/storage/authContext';
import { useTranslation } from '@/lib/i18n';

export default function PricingPage() {
  const { user, toggleTier } = useAuth();
  const { t } = useTranslation();

  return (
    <AppShell>
      <div className="space-y-10 max-w-5xl mx-auto text-center py-6">
        <div>
          <GlowBadge variant="gold" className="mb-3">
            <Crown className="h-3.5 w-3.5" />
            {t.common.pricing}
          </GlowBadge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            {t.landing.pricingTitle}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-ethereal-300 max-w-xl mx-auto font-light">
            {t.landing.pricingSub}
          </p>
        </div>

        {/* Current status banner */}
        <div className="rounded-2xl border border-gold-500/30 bg-gold-500/10 p-4 max-w-md mx-auto flex items-center justify-between">
          <div className="text-left">
            <span className="text-xs text-ethereal-400">Jelenlegi csomagod:</span>
            <h4 className="text-sm font-bold text-white capitalize">
              {user?.tier === 'premium' ? "Prémium Beavatott" : "Kereső (Ingyenes)"}
            </h4>
          </div>
          <button
            onClick={toggleTier}
            className="rounded-xl bg-gold-500/20 border border-gold-500/40 px-3.5 py-1.5 text-xs font-bold text-gold-300 hover:bg-gold-500/30 transition-all shadow-gold-glow"
          >
            {user?.tier === 'premium' ? "Visszaváltás Free-re (Teszt)" : "Aktiválás most (Teszt)"}
          </button>
        </div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch text-left">
          {/* Free Tier */}
          <div className="flex flex-col rounded-3xl border border-white/10 bg-card-gradient p-8 backdrop-blur-xl">
            <h3 className="text-xl font-bold text-white">{t.landing.freePlanTitle}</h3>
            <p className="mt-2 text-xs text-ethereal-400">
              Napi elcsendesedéshez és az alapvető kódok feltárásához.
            </p>
            <div className="my-6">
              <span className="text-4xl font-extrabold text-white">0 Ft</span>
              <span className="text-xs text-ethereal-400 ml-1">/ örökre</span>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {t.landing.freeFeatures.map((feat, i) => (
                <li key={i} className="flex items-center gap-2.5 text-xs text-ethereal-300">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => { if (user?.tier === 'premium') toggleTier(); }}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-semibold text-white hover:bg-white/10 transition-colors text-center"
            >
              {user?.tier === 'free' ? "Jelenlegi Csomag" : "Kiválasztás"}
            </button>
          </div>

          {/* Premium Tier */}
          <div className="relative flex flex-col rounded-3xl border-2 border-gold-500/50 bg-gradient-to-b from-space-900 via-mystic-950 to-space-950 p-8 backdrop-blur-xl shadow-gold-glow">
            <div className="absolute -top-3.5 right-8 rounded-full bg-gradient-to-r from-gold-500 to-amber-400 px-3.5 py-1 text-[11px] font-bold text-space-950 uppercase tracking-widest shadow-md">
              Teljes Hozzáférés
            </div>
            <h3 className="text-xl font-bold text-white">{t.landing.premiumPlanTitle}</h3>
            <p className="mt-2 text-xs text-gold-300/80">
              Minden Tarot kirakási mód, mély numerológia, álomelemzés és szinasztria.
            </p>
            <div className="my-6">
              <span className="text-4xl font-extrabold text-white">3 990 Ft</span>
              <span className="text-xs text-ethereal-400 ml-1">{t.landing.monthly}</span>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {t.landing.premiumFeatures.map((feat, i) => (
                <li key={i} className="flex items-center gap-2.5 text-xs text-gold-200">
                  <Check className="h-4 w-4 text-gold-400 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => { if (user?.tier !== 'premium') toggleTier(); }}
              className="w-full rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 py-3 text-xs font-bold text-space-950 hover:brightness-110 transition-all shadow-gold-glow text-center"
            >
              {user?.tier === 'premium' ? "Jelenlegi Csomag (Aktív)" : "Prémium Beavatás Aktiválása"}
            </button>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-ethereal-400">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Biztonságos fizetés, bármikor 1 kattintással lemondható tagság.</span>
        </div>
      </div>
    </AppShell>
  );
}
