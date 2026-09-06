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
    { href: "/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/chat", label: "AI", icon: MessageSquare },
    { href: "/tarot", label: "Tarot", icon: Sparkles },
    { href: "/journal", label: "Napló", icon: BookOpen },
    { href: "/sorsprofil", label: "Profil", icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-white/10 bg-space-950/90 px-2 backdrop-blur-xl shadow-2xl">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-3 transition-colors ${
              isActive ? 'text-gold-400' : 'text-ethereal-400 hover:text-white'
            }`}
          >
            <Icon className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
