"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Download,
  Trash2,
  Globe,
  User,
  Shield,
  Check,
  AlertTriangle
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { GlowBadge } from '@/components/mystical/GlowBadge';
import { useAuth } from '@/lib/storage/authContext';
import { useTranslation, Language } from '@/lib/i18n';
import { demoStore } from '@/lib/storage/demoStore';

export default function SettingsPage() {
  const { user, updateProfile, logout } = useAuth();
  const { language, setLanguage, t } = useTranslation();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [birthPlace, setBirthPlace] = useState(user?.birthPlace || '');
  const [currentCountry, setCurrentCountry] = useState(user?.currentCountry || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      displayName,
      birthPlace,
      currentCountry,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleExportData = () => {
    const exportData = {
      profile: demoStore.getProfile(),
      journal: demoStore.getJournal(),
      memory: demoStore.getMemory(),
      chatHistory: demoStore.getChatHistory(),
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sorsai-data-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAllData = () => {
    if (confirm("FIGYELEM: Ez a művelet véglegesen törli a Sorsnaplót, az AI memóriát és a profilodat. Biztosan folytatod?")) {
      demoStore.clearAllData();
      logout();
      window.location.href = '/';
    }
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GlowBadge variant="purple">
                <Settings className="h-3.5 w-3.5" />
                Vezérlőpult & Adatvédelem
              </GlowBadge>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              {t.common.settings}
            </h1>
            <p className="text-xs sm:text-sm text-ethereal-300 mt-1">
              Kezeld a profilodat, a nyelvi beállításaidat és a személyes adataidat.
            </p>
          </div>
        </div>

        {/* Profile Settings */}
        <form onSubmit={handleSaveProfile} className="rounded-3xl border border-white/10 bg-card-gradient p-6 sm:p-8 backdrop-blur-xl shadow-glass space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <User className="h-4 w-4 text-gold-400" />
            <span>Alapadatok Módosítása</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ethereal-300 mb-1">Megjelenített Név</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-space-950/70 px-4 py-2.5 text-sm text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ethereal-300 mb-1">Születési Hely</label>
              <input
                type="text"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-space-950/70 px-4 py-2.5 text-sm text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-ethereal-300 mb-1">Jelenlegi Tartózkodási Hely</label>
              <input
                type="text"
                value={currentCountry}
                onChange={(e) => setCurrentCountry(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-space-950/70 px-4 py-2.5 text-sm text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {isSaved ? (
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <Check className="h-4 w-4" /> Módosítások mentve!
              </span>
            ) : <div />}

            <button
              type="submit"
              className="rounded-xl bg-gold-500/20 border border-gold-500/40 px-5 py-2.5 text-xs font-bold text-gold-300 hover:bg-gold-500/30 transition-all shadow-gold-glow"
            >
              Mentés
            </button>
          </div>
        </form>

        {/* Language Preference */}
        <div className="rounded-3xl border border-white/10 bg-card-gradient p-6 sm:p-8 backdrop-blur-xl shadow-glass space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="h-4 w-4 text-gold-400" />
            <span>Nyelvi Beállítások (Language)</span>
          </h3>
          <p className="text-xs text-ethereal-300 leading-relaxed font-light">
            Válaszd ki az alkalmazás felületének és az AI válaszoknak az alapértelmezett nyelvét:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { code: 'hu', label: 'Magyar', flag: '🇭🇺' },
              { code: 'en', label: 'English', flag: '🇬🇧' },
              { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
              { code: 'fr', label: 'Français', flag: '🇫🇷' },
            ].map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code as Language)}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-semibold transition-all ${
                  language === l.code
                    ? 'border-gold-500/50 bg-gold-500/20 text-gold-200 shadow-gold-glow'
                    : 'border-white/5 bg-space-950/60 text-ethereal-400 hover:text-white'
                }`}
              >
                <span>{l.flag}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Data & Privacy Controls */}
        <div className="rounded-3xl border border-white/10 bg-card-gradient p-6 sm:p-8 backdrop-blur-xl shadow-glass space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span>Adatkezelés & GDPR Export</span>
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-space-950/60 border border-white/5">
            <div>
              <h4 className="text-xs font-bold text-white">Személyes Adatok Exportálása (JSON)</h4>
              <p className="text-[11px] text-ethereal-400 mt-0.5">
                Töltsd le a naplóbejegyzéseidet, a születési adataidat és a memóriádat egyetlen gombnyomással.
              </p>
            </div>
            <button
              onClick={handleExportData}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors shrink-0"
            >
              <Download className="h-4 w-4" />
              <span>Adatexport</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
            <div>
              <h4 className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4 text-rose-400" />
                <span>Minden Adat Törlése & Fiók Törlése</span>
              </h4>
              <p className="text-[11px] text-rose-200/80 mt-0.5">
                A SorsAI nem őriz meg semmilyen adatot, ha úgy döntesz, hogy elhagyod a felületet.
              </p>
            </div>
            <button
              onClick={handleDeleteAllData}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-500/20 border border-rose-500/40 px-4 py-2 text-xs font-semibold text-rose-200 hover:bg-rose-500/30 transition-colors shrink-0"
            >
              <Trash2 className="h-4 w-4" />
              <span>Fiók Törlése</span>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
