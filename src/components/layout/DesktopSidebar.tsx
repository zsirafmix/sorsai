"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  Sparkles,
  Binary,
  Compass,
  HeartHandshake,
  MoonStar,
  BookOpen,
  User,
  Crown,
  Settings,
  Brain,
  SunMedium,
  ShieldAlert
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { useAuth } from '@/lib/storage/authContext';

export const DesktopSidebar: React.FC = () => {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { user, isAdmin } = useAuth();

  const navigationItems = [
    { href: "/dashboard", label: t.common.dashboard, icon: LayoutDashboard },
    { href: "/chat", label: t.common.askDestiny, icon: MessageSquare, highlight: true },
    { href: "/tarot", label: t.common.tarot, icon: Sparkles },
    { href: "/numerology", label: t.common.numerology, icon: Binary },
    { href: "/daily", label: t.common.dailyMessage, icon: SunMedium },
    { href: "/relationships", label: t.common.relationships, icon: HeartHandshake },
    { href: "/dreams", label: t.common.dreams, icon: MoonStar },
    { href: "/journal", label: t.common.journal, icon: BookOpen },
    { href: "/memory", label: t.memory.title, icon: Brain },
    { href: "/sorsprofil", label: t.common.destinyProfile, icon: User },
    { href: "/pricing", label: t.common.pricing, icon: Crown },
    { href: "/settings", label: t.common.settings, icon: Settings },
    ...(isAdmin ? [
      { href: "/admin", label: t.common.admin, icon: ShieldAlert, highlight: true, adminBadge: true }
    ] : [])
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-gold-500/20 bg-gradient-to-b from-space-950/90 via-mystic-950/60 to-space-950/95 p-4 backdrop-blur-2xl shrink-0 shadow-[10px_0_30px_-15px_rgba(0,0,0,0.8)] z-20">
      {/* Mystical Brand area */}
      <div className="px-2 py-4 border-b border-gold-500/20">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-gold-500/60 bg-gradient-to-tr from-space-900 via-mystic-950 to-gold-950 shadow-gold-glow group-hover:scale-105 transition-transform">
            <Sparkles className="h-6 w-6 text-gold-400 animate-pulse-slow" />
            <div className="absolute -inset-0.5 rounded-2xl border border-gold-400/30 opacity-70 animate-spin-slow pointer-events-none" />
          </div>
          <div>
            <h1 className="text-xl font-black font-serif tracking-widest text-white">
              SORS<span className="gold-text-gradient">AI</span>
            </h1>
            <p className="text-[9px] uppercase tracking-[0.25em] text-gold-400/90 font-medium">
              ✦ SACRED ORACLE ✦
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation links */}
      <nav className="mt-4 flex-1 space-y-1 overflow-y-auto pr-1">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all ${
                isActive
                  ? 'border border-gold-500/40 bg-gradient-to-r from-gold-500/20 via-mystic-950/60 to-transparent text-gold-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_0_20px_-3px_rgba(212,175,55,0.25)] font-semibold'
                  : 'text-ethereal-300 hover:bg-gold-500/5 hover:text-gold-200 hover:border-gold-500/20 border border-transparent'
              } ${item.highlight && !isActive ? 'text-mystic-300 bg-mystic-950/40 border-mystic-500/20' : ''}`}
            >
              <Icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? 'text-gold-400' : 'text-ethereal-400 group-hover:text-gold-400'}`} />
              <span className="truncate">{item.label}</span>
              {item.adminBadge ? (
                <span className="ml-auto rounded-full bg-amber-500/20 border border-amber-500/40 px-1.5 py-0.5 text-[9px] text-amber-300 font-bold uppercase tracking-wider">Admin</span>
              ) : item.highlight ? (
                <span className="ml-auto rounded-full bg-mystic-500/30 border border-mystic-500/40 px-1.5 py-0.5 text-[9px] text-mystic-200 font-bold">ORACLE</span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      {/* User snippet at bottom styled as mystical card */}
      <div className="mt-auto border-t border-gold-500/20 pt-4">
        <Link
          href="/sorsprofil"
          className="flex items-center gap-3 rounded-2xl p-2.5 border border-gold-500/25 bg-gradient-to-r from-space-900/90 to-mystic-950/80 hover:border-gold-400/50 hover:shadow-gold-glow transition-all group"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/50 bg-gradient-to-tr from-space-950 to-mystic-900 text-sm font-bold text-gold-300 shadow-sm group-hover:scale-105 transition-transform">
            {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "S"}
            <div className="absolute -top-1 -right-1 text-gold-400 text-[10px]">✧</div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate group-hover:text-gold-200 transition-colors">
              {user?.displayName || "Kereső Vándor"}
            </p>
            <p className="text-[10px] text-gold-400 font-medium capitalize flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
              {isAdmin ? "👑 Főadmin" : (user?.tier === 'premium' ? "Prémium Beavatott" : "Kereső Lélek")}
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
};
