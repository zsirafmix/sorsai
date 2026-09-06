"use client";

import React from 'react';
import Link from 'next/link';
import { Sparkles, Crown } from 'lucide-react';
import { useAuth } from '@/lib/storage/authContext';
import { useTranslation } from '@/lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { GlowBadge } from '../mystical/GlowBadge';

export const Header: React.FC = () => {
  const { user, isDemoMode, toggleTier } = useAuth();
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
        {isDemoMode && (
          <GlowBadge variant="purple" className="hidden md:inline-flex text-[11px]">
            {t.common.demoModeBadge}
          </GlowBadge>
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
