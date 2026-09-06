"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, Check, Compass, Heart, Briefcase, Coins, ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { useAuth } from '@/lib/storage/authContext';
import { GlowBadge } from '@/components/mystical/GlowBadge';

const INTEREST_OPTIONS = [
  { id: "szerelem", label: "Szerelem & Párkapcsolat", icon: "❤️" },
  { id: "karrier", label: "Karrier & Hivatás", icon: "💼" },
  { id: "penzugyek", label: "Pénzügyek & Bőség", icon: "🪙" },
  { id: "onismeret", label: "Mély Önismeret", icon: "🪞" },
  { id: "csalad", label: "Család & Gyökerek", icon: "🏡" },
  { id: "spiritualitas", label: "Spiritualitás & Lélekút", icon: "✨" },
  { id: "jovo", label: "Jövőkép & Célok", icon: "🔭" },
  { id: "dontesek", label: "Fontos Döntések", icon: "⚖️" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, updateProfile } = useAuth();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    birthDate: user?.birthDate || "1994-07-14",
    birthTime: user?.birthTime || "12:00",
    birthPlace: user?.birthPlace || "Budapest, Magyarország",
    currentCountry: user?.currentCountry || "Magyarország",
    relationshipStatus: user?.relationshipStatus || "Egyedülálló",
    interests: user?.interests || ["onismeret", "spiritualitas"],
  });

  const toggleInterest = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      updateProfile({
        ...formData,
        isOnboarded: true,
      });
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 bg-space-950">
      <div className="w-full max-w-xl rounded-3xl border border-gold-500/30 bg-card-gradient p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-mystic-500/15 blur-3xl pointer-events-none" />

        {/* Header and Progress */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold-500/40 bg-space-900 shadow-gold-glow">
              <Sparkles className="h-4 w-4 text-gold-400" />
            </div>
            <span className="font-bold text-white text-base">SorsAI Onboarding</span>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  s === step
                    ? 'w-6 bg-gold-400'
                    : s < step
                    ? 'w-3 bg-emerald-400'
                    : 'w-3 bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Steps Content */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <GlowBadge variant="gold" className="mb-2">1. Lépés</GlowBadge>
                <h2 className="text-2xl font-bold text-white">{t.onboarding.step1Title}</h2>
                <p className="mt-1 text-xs text-ethereal-300">{t.onboarding.step1Desc}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">
                  {t.onboarding.displayName}
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  placeholder="pl. Csillagvándor vagy Kata"
                  className="w-full rounded-xl border border-white/10 bg-space-900/80 px-4 py-3 text-sm text-white placeholder-ethereal-500 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <GlowBadge variant="gold" className="mb-2">2. Lépés</GlowBadge>
                <h2 className="text-2xl font-bold text-white">{t.onboarding.step2Title}</h2>
                <p className="mt-1 text-xs text-ethereal-300">{t.onboarding.step2Desc}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">
                    {t.onboarding.birthDate}
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-space-900/80 px-4 py-3 text-sm text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ethereal-300 uppercase tracking-wider mb-2">
                    {t.onboarding.birthTime} <span className="text-ethereal-500 text-[10px]">{t.onboarding.optional}</span>
                  </label>
                  <input
                    type="time"
                    value={formData.birthTime}
                    onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-space-900/80 px-4 py-3 text-sm text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <GlowBadge variant="gold" className="mb-2">3. Lépés</GlowBadge>
                <h2 className="text-2xl font-bold text-white">{t.onboarding.step3Title}</h2>
                <p className="mt-1 text-xs text-ethereal-300">{t.onboarding.step3Desc}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">
                    {t.onboarding.birthPlace}
                  </label>
                  <input
                    type="text"
                    value={formData.birthPlace}
                    onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                    placeholder="pl. Debrecen, Magyarország"
                    className="w-full rounded-xl border border-white/10 bg-space-900/80 px-4 py-3 text-sm text-white placeholder-ethereal-500 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">
                    {t.onboarding.currentCountry}
                  </label>
                  <input
                    type="text"
                    value={formData.currentCountry}
                    onChange={(e) => setFormData({ ...formData, currentCountry: e.target.value })}
                    placeholder="pl. Magyarország"
                    className="w-full rounded-xl border border-white/10 bg-space-900/80 px-4 py-3 text-sm text-white placeholder-ethereal-500 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ethereal-300 uppercase tracking-wider mb-2">
                    {t.onboarding.relationshipStatus} <span className="text-ethereal-500 text-[10px]">{t.onboarding.optional}</span>
                  </label>
                  <select
                    value={formData.relationshipStatus}
                    onChange={(e) => setFormData({ ...formData, relationshipStatus: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-space-900/80 px-4 py-3 text-sm text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all"
                  >
                    <option value="Egyedülálló">Egyedülálló / Kereső</option>
                    <option value="Kapcsolatban">Kapcsolatban</option>
                    <option value="Házas">Házas / Elkötelezett</option>
                    <option value="Bonyolult">Átmeneti / Bonyolult helyzet</option>
                    <option value="Inkább nem mondom meg">Inkább nem adom meg</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <GlowBadge variant="gold" className="mb-2">4. Lépés</GlowBadge>
                <h2 className="text-2xl font-bold text-white">{t.onboarding.interestsTitle}</h2>
                <p className="mt-1 text-xs text-ethereal-300">{t.onboarding.interestsDesc}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {INTEREST_OPTIONS.map((item) => {
                  const isSelected = formData.interests.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleInterest(item.id)}
                      className={`flex items-center gap-2.5 rounded-xl border p-3 text-left text-xs font-semibold transition-all ${
                        isSelected
                          ? 'border-gold-500/50 bg-gold-500/20 text-white shadow-gold-glow'
                          : 'border-white/5 bg-space-900/60 text-ethereal-300 hover:border-white/20'
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                      {isSelected && <Check className="h-3.5 w-3.5 ml-auto text-gold-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-ethereal-300 hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t.common.back}</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 px-6 py-2.5 text-xs font-bold text-space-950 hover:brightness-110 transition-all shadow-gold-glow"
          >
            <span>{step === 4 ? t.common.finish : t.common.next}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
