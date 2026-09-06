"use client";

import React from 'react';
import Link from 'next/link';
import { Sparkles, Crown } from 'lucide-react';
import { useAuth } from '@/lib/storage/authContext';
import { useTranslation } from '@/lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { GlowBadge } from '../mystical/GlowBadge';

export const Header: React.FC = () => {
  const { user, isDemoMode, toggleTier, isAdmin, toggleDemoMode } = useAuth();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/10 bg-space-950/80 px-4 sm:px-6 backdrop-blur-xl">
      {/* Brand logo (visible on mobile / tablet or as breadcrumb) */}
      <Link href="/dashboard" className="flex items-center gap-2.5 group">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-gold-500/40 bg-gradient-to-tr from-space-900 to-mystic-900 shadow-gold-glow group-hover:scale-105 transition-transform">
          <Sparkles className="h-5 w-5 text-gold-400" />
        </div>
        <div>
          <span className="text-lg font-bold tracking-wider text-white">Sors<span className="text-gold-400">AI</span></span>
          <span className="hidden lg:inline-block ml-2 text-[10px] uppercase tracking-widest text-gold-400/70 font-medium">
            Cosmic Oracle
          </span>
        </div>
      </Link>

      {/* Right side utilities */}
      <div className="flex items-center gap-3">
        {/* Live / Demo Mode Badge */}
        {isDemoMode ? (
          <button
            onClick={isAdmin ? toggleDemoMode : undefined}
            className={`hidden md:inline-flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-purple-500/15 px-3 py-1 text-[11px] font-medium text-purple-300 shadow-sm transition-all ${
              isAdmin ? 'hover:bg-purple-500/25 cursor-pointer' : 'cursor-default'
            }`}
            title={isAdmin ? "Kattints az Éles Módra váltáshoz" : undefined}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            <span>{t.common.demoModeBadge}</span>
          </button>
        ) : (
          <button
            onClick={isAdmin ? toggleDemoMode : undefined}
            className={`hidden md:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold text-emerald-300 shadow-[0_0_12px_-3px_rgba(52,211,153,0.3)] transition-all ${
              isAdmin ? 'hover:bg-emerald-500/25 cursor-pointer' : 'cursor-default'
            }`}
            title={isAdmin ? "Éles Mód aktív. Kattints a Demo Módra váltáshoz" : "Éles Produkciós Mód"}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Éles Mód (Live)</span>
          </button>
        )}

        {/* Quick Tier Switcher to easily test Free vs Premium */}
        <button
          onClick={toggleTier}
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md transition-all ${
            user?.tier === 'premium'
              ? 'border-gold-500/50 bg-gold-500/20 text-gold-200 shadow-gold-glow'
              : 'border-white/10 bg-white/5 text-ethereal-300 hover:border-gold-500/30'
          }`}
          title="Kattints a Free / Prémium mód váltásához a teszteléshez"
        >
          <Crown className={`h-3.5 w-3.5 ${user?.tier === 'premium' ? 'text-gold-400 fill-gold-400' : 'text-ethereal-400'}`} />
          <span>{user?.tier === 'premium' ? t.common.premium : t.common.free}</span>
        </button>

        {/* Language selector */}
        <LanguageSwitcher />

        {/* Profile shortcut */}
        <Link
          href="/sorsprofil"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-500/30 bg-space-800 text-xs font-bold text-gold-300 hover:border-gold-400 transition-colors shadow-sm"
        >
          {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "S"}
        </Link>
      </div>
    </header>
  );
};
