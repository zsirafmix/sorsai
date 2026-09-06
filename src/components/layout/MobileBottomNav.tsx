"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageSquare, Sparkles, BookOpen, User } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = [
    { href: "/dashboard", label: "Szentély", icon: LayoutDashboard },
    { href: "/chat", label: "Orákulum", icon: MessageSquare },
    { href: "/tarot", label: "Tarot", icon: Sparkles },
    { href: "/journal", label: "Napló", icon: BookOpen },
    { href: "/sorsprofil", label: "Profil", icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-gold-500/25 bg-[#06040d]/90 px-2 backdrop-blur-2xl shadow-[0_-5px_25px_rgba(0,0,0,0.8)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex flex-col items-center justify-center py-1 px-3 transition-all ${
              isActive ? 'text-gold-300' : 'text-ethereal-400 hover:text-white'
            }`}
          >
            {isActive && (
              <span className="absolute -top-1.5 h-1 w-6 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
            )}
            <Icon className={`h-5 w-5 mb-0.5 transition-transform ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]' : ''}`} />
            <span className={`text-[10px] font-serif uppercase tracking-wider ${isActive ? 'font-bold text-gold-300' : 'font-medium'}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
