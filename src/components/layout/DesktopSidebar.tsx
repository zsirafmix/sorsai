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
  SunMedium
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { useAuth } from '@/lib/storage/authContext';

export const DesktopSidebar: React.FC = () => {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { user } = useAuth();

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
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-white/10 bg-space-950/70 p-4 backdrop-blur-xl shrink-0">
      {/* Brand area */}
      <div className="flex items-center gap-3 px-3 py-4 border-b border-white/5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/40 bg-gradient-to-tr from-space-900 to-mystic-900 shadow-gold-glow">
          <Sparkles className="h-6 w-6 text-gold-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wider text-white">Sors<span className="text-gold-400">AI</span></h1>
          <p className="text-[10px] uppercase tracking-widest text-gold-400/80 font-medium">Sacred Oracle</p>
        </div>
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
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'border border-gold-500/30 bg-gold-500/10 text-gold-300 shadow-[0_0_15px_-4px_rgba(212,175,55,0.3)]'
                  : 'text-ethereal-300 hover:bg-white/5 hover:text-white'
              } ${item.highlight && !isActive ? 'text-mystic-300 bg-mystic-950/30' : ''}`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-gold-400' : 'text-ethereal-400'}`} />
              <span className="truncate">{item.label}</span>
              {item.highlight && (
                <span className="ml-auto rounded-full bg-mystic-500/30 px-1.5 py-0.5 text-[10px] text-mystic-200">AI</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User snippet at bottom */}
      <div className="mt-auto border-t border-white/5 pt-4">
        <Link
          href="/sorsprofil"
          className="flex items-center gap-3 rounded-xl p-2 hover:bg-white/5 transition-colors"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/30 bg-space-800 text-sm font-bold text-gold-300 shadow-sm">
            {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "S"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{user?.displayName || "Kereső Vándor"}</p>
            <p className="text-[10px] text-gold-400/90 font-medium capitalize">
              {user?.tier === 'premium' ? "Prémium Beavatott" : "Kereső (Ingyenes)"}
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
};
