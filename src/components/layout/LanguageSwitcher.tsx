"use client";

import React, { useState } from 'react';
import { useTranslation, Language } from '@/lib/i18n';
import { Globe, Check } from 'lucide-react';

const LANGUAGES: Array<{ code: Language; label: string; flag: string }> = [
  { code: 'hu', label: 'Magyar', flag: '🇭🇺' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-space-900/60 px-3 py-1.5 text-xs font-medium text-ethereal-300 backdrop-blur-md hover:border-gold-500/40 hover:text-white transition-all shadow-sm"
      >
        <Globe className="h-3.5 w-3.5 text-gold-400" />
        <span className="hidden sm:inline">{current.flag} {current.label}</span>
        <span className="sm:hidden">{current.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 z-50 w-36 rounded-xl border border-gold-500/30 bg-space-950/95 p-1 shadow-2xl backdrop-blur-xl">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  language === lang.code
                    ? 'bg-gold-500/20 text-gold-200'
                    : 'text-ethereal-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </span>
                {language === lang.code && <Check className="h-3.5 w-3.5 text-gold-400" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
