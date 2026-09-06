"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  SunMedium,
  Compass,
  Binary,
  HeartHandshake,
  MoonStar,
  ShieldCheck,
  Check,
  ChevronDown,
  Globe
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { GlowBadge } from '@/components/mystical/GlowBadge';

export default function LandingPage() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Hogyan jósol a SorsAI? Valóban látja a jövőt?",
      a: "Nem, a SorsAI soha nem állítja, hogy megmásíthatatlanul látja a jövőt. Az alkalmazás ősi szimbolikus rendszereket (Tarot archetípusok, pitagoraszi numerológia, asztrológiai mintázatok) kapcsol össze a modern mesterséges intelligenciával, hogy mély önismereti tükröt és szimbolikus reflexiós teret nyújtson döntéseidhez."
    },
    {
      q: "Valódi kártyahúzás történik a Tarot modulban?",
      a: "Igen! A Tarot kártyahúzást nem az LLM generálja szövegként, hanem egy determinisztikus, kriptográfiailag biztonságos backend véletlenszerűsítő motor végzi 78 autentikus Rider-Waite lapból (álló és fordított állásban). Az AI feladata kizárólag a kihúzott lapok szimbolikus kapcsolatainak mély, kontextuális értelmezése."
    },
    {
      q: "Biztonságban vannak a személyes születési adataim?",
      a: "Maximálisan. Csak a számításokhoz elengedhetetlen adatokat kezeljük, a privacy by design elvét követve. Semmilyen harmadik félnek nem adjuk át az adataidat, és a beállításokban bármikor egyetlen kattintással törölheted vagy exportálhatod a teljes előzményedet."
    },
    {
      q: "Miben különbözik a SorsAI az ingyenes AI chat-ektől?",
      a: "A SorsAI egy integrált spirituális architektúra. Nem egyetlen sablon promptot használ, hanem modularizált, etikai korlátokkal védett rétegeket, valós numerológiai motort, 8-féle Tarot kirakási rendszert, kapcsolati szinasztria kalkulátort és egy személyes Sorsnaplót egyesít egy prémium élményben."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen text-white bg-space-950">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-white/10 bg-space-950/80 px-6 sm:px-12 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/40 bg-gradient-to-tr from-space-900 to-mystic-900 shadow-gold-glow">
            <Sparkles className="h-6 w-6 text-gold-400" />
          </div>
          <span className="text-2xl font-bold tracking-wider text-white">
            Sors<span className="text-gold-400">AI</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-gold-500/40 bg-gold-500/10 px-5 py-2.5 text-sm font-semibold text-gold-200 backdrop-blur-md hover:bg-gold-500/20 transition-all shadow-gold-glow"
          >
            <span>{t.common.dashboard}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 px-6 sm:px-12 flex flex-col items-center text-center">
        {/* Glow backdrop effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-[600px] rounded-full bg-cosmic-gradient blur-3xl pointer-events-none opacity-70" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <GlowBadge variant="gold" className="mb-6">
            ✨ {t.common.tagline}
          </GlowBadge>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            {t.landing.heroTitle}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-ethereal-300 max-w-2xl font-light leading-relaxed">
            {t.landing.heroSubtitle}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gold-500 to-amber-400 px-8 py-4 text-base font-bold text-space-950 hover:brightness-110 transition-all shadow-[0_0_30px_-5px_rgba(212,175,55,0.5)] transform hover:-translate-y-0.5"
            >
              <span>{t.landing.ctaPrimary}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/daily"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-white hover:bg-white/10 transition-all backdrop-blur-md"
            >
              <SunMedium className="h-5 w-5 text-gold-400" />
              <span>{t.landing.ctaSecondary}</span>
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs text-ethereal-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>{t.common.disclaimer}</span>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-6 sm:px-12 border-t border-white/5 bg-space-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <GlowBadge variant="purple" className="mb-3">
              {t.landing.howItWorksTitle}
            </GlowBadge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Három lépés a belső tisztánlátáshoz
            </h2>
            <p className="mt-4 text-ethereal-400 text-sm sm:text-base">
              {t.landing.howItWorksSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-white/10 bg-card-gradient p-8 backdrop-blur-xl hover:border-gold-500/40 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-300 font-bold text-xl mb-6 border border-gold-500/20">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.landing.step1Title}</h3>
              <p className="text-ethereal-300 text-sm leading-relaxed">{t.landing.step1Desc}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-card-gradient p-8 backdrop-blur-xl hover:border-mystic-400/40 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mystic-500/10 text-mystic-300 font-bold text-xl mb-6 border border-mystic-500/20">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.landing.step2Title}</h3>
              <p className="text-ethereal-300 text-sm leading-relaxed">{t.landing.step2Desc}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-card-gradient p-8 backdrop-blur-xl hover:border-gold-500/40 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-300 font-bold text-xl mb-6 border border-gold-500/20">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.landing.step3Title}</h3>
              <p className="text-ethereal-300 text-sm leading-relaxed">{t.landing.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="py-24 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {t.landing.featuresTitle}
            </h2>
            <p className="mt-4 text-ethereal-400 text-sm sm:text-base">
              {t.landing.featuresSub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tarot */}
            <div className="rounded-2xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl hover:border-gold-500/30 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 mb-4 text-gold-400 group-hover:scale-105 transition-transform border border-gold-500/20">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{t.common.tarot}</h3>
              <p className="text-xs text-ethereal-300 leading-relaxed">
                78 lapos teljes Rider-Waite rendszer backend randomizációval és 8 különböző kirakással a Kelta Kereszttől az 1 lapos fókuszpontig.
              </p>
            </div>

            {/* Numerology */}
            <div className="rounded-2xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl hover:border-mystic-400/30 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mystic-500/10 mb-4 text-mystic-300 group-hover:scale-105 transition-transform border border-mystic-400/20">
                <Binary className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{t.common.numerology}</h3>
              <p className="text-xs text-ethereal-300 leading-relaxed">
                Determinisztikus életút, születésnapi rezgés, személyes év/hónap és pitagoraszi névszámítás a 11, 22, 33 mesterszámok precíz kezelésével.
              </p>
            </div>

            {/* Astrology */}
            <div className="rounded-2xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl hover:border-gold-500/30 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 mb-4 text-gold-400 group-hover:scale-105 transition-transform border border-gold-500/20">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{t.common.astrology}</h3>
              <p className="text-xs text-ethereal-300 leading-relaxed">
                Valós Napjegy, uralkodó elem és modalitás szintézis, őszinte tájékoztatással a komplex efemerida fejlesztéséről.
              </p>
            </div>

            {/* Relationships */}
            <div className="rounded-2xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl hover:border-rose-400/30 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 mb-4 text-rose-400 group-hover:scale-105 transition-transform border border-rose-500/20">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{t.common.relationships}</h3>
              <p className="text-xs text-ethereal-300 leading-relaxed">
                Két ember szellemi és érzelmi dinamikájának szimbolikus kompatibilitása érzelmi, kommunikációs és szenvedélyindikátorokkal.
              </p>
            </div>

            {/* Dreams */}
            <div className="rounded-2xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl hover:border-indigo-400/30 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 mb-4 text-indigo-300 group-hover:scale-105 transition-transform border border-indigo-400/20">
                <MoonStar className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{t.common.dreams}</h3>
              <p className="text-xs text-ethereal-300 leading-relaxed">
                Tudattalan üzenetek és archetípusos szimbólumok Carl Jung-i mélylélektani és spirituális dekódolása.
              </p>
            </div>

            {/* Full Synthesis */}
            <div className="rounded-2xl border border-gold-500/30 bg-gradient-to-br from-space-900 via-mystic-950 to-space-950 p-6 backdrop-blur-xl shadow-gold-glow group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/20 mb-4 text-gold-300 group-hover:scale-105 transition-transform border border-gold-500/40">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">✨ Teljes Sorszintézis</h3>
              <p className="text-xs text-gold-200/90 leading-relaxed">
                Egyesíti a felhasználói profilt, a tarot lapokat, a numerológiát és az elemeket egyetlen strukturált, 7-részes válaszban.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 sm:px-12 border-t border-white/5 bg-space-900/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <GlowBadge variant="gold" className="mb-3">
              {t.landing.pricingTitle}
            </GlowBadge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Válaszd a számodra megfelelő utat
            </h2>
            <p className="mt-4 text-ethereal-400 text-sm sm:text-base">
              {t.landing.pricingSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Free Tier */}
            <div className="flex flex-col rounded-3xl border border-white/10 bg-card-gradient p-8 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white">{t.landing.freePlanTitle}</h3>
              <p className="mt-2 text-xs text-ethereal-400">Ideális az induló önreflexióhoz és a napi szimbolikus üzenetekhez.</p>
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
              <Link
                href="/dashboard"
                className="w-full text-center rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Kezdés Ingyenesen
              </Link>
            </div>

            {/* Premium Tier */}
            <div className="relative flex flex-col rounded-3xl border-2 border-gold-500/50 bg-gradient-to-b from-space-900 via-mystic-950 to-space-950 p-8 backdrop-blur-xl shadow-gold-glow">
              <div className="absolute -top-3.5 right-8 rounded-full bg-gradient-to-r from-gold-500 to-amber-400 px-3.5 py-1 text-[11px] font-bold text-space-950 uppercase tracking-widest shadow-md">
                Legnépszerűbb
              </div>
              <h3 className="text-xl font-bold text-white">{t.landing.premiumPlanTitle}</h3>
              <p className="mt-2 text-xs text-gold-300/80">Korlátlan hozzáférés a teljes spirituális és önismereti arzenálhoz.</p>
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
              <Link
                href="/pricing"
                className="w-full text-center rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 py-3 text-sm font-bold text-space-950 hover:brightness-110 transition-all shadow-gold-glow"
              >
                Beavatás Megkezdése
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {t.landing.testimonialsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl">
              <p className="text-xs text-ethereal-200 italic leading-relaxed">
                „A SorsAI nem mondja meg, mit tegyek, de a Kelta Kereszt és a numerológiai szintézis pontosan rámutatott azokra a belső kérdésekre, amiket hetek óta halogattam.”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-xs font-bold text-gold-300">
                  A
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Anna M.</h4>
                  <p className="text-[10px] text-ethereal-400">Életútszám: 7 (Misztikus)</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl">
              <p className="text-xs text-ethereal-200 italic leading-relaxed">
                „A kapcsolati elemzés rendkívül tapintatos és mély volt. Nem olcsó horoszkóp-szövegeket kaptunk, hanem igazi kommunikációs fejlődési pontokat a párommal.”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-mystic-500/20 border border-mystic-400/40 flex items-center justify-center text-xs font-bold text-mystic-200">
                  P
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Péter K.</h4>
                  <p className="text-[10px] text-ethereal-400">Életútszám: 11 (Mester)</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-card-gradient p-6 backdrop-blur-xl">
              <p className="text-xs text-ethereal-200 italic leading-relaxed">
                „A reggeli kávém mellett a Napi Tarot és az energia pontszám lett az új reggeli rituálém. Békét és tisztaságot ad a nap elindításához.”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-xs font-bold text-gold-300">
                  D
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Dóra B.</h4>
                  <p className="text-[10px] text-ethereal-400">Életútszám: 3 (Alkotó)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 sm:px-12 border-t border-white/5 bg-space-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {t.landing.faqTitle}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-card-gradient overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-white hover:text-gold-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gold-400 transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-ethereal-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-space-950 py-12 px-6 sm:px-12 text-xs text-ethereal-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gold-500/40 bg-gradient-to-tr from-space-900 to-mystic-900">
              <Sparkles className="h-4 w-4 text-gold-400" />
            </div>
            <span className="font-bold text-white text-base">SorsAI</span>
            <span className="text-[11px] text-ethereal-500">© 2026 Minden jog fenntartva.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gold-300 transition-colors">Adatvédelem</Link>
            <Link href="/terms" className="hover:text-gold-300 transition-colors">Feltételek</Link>
            <Link href="/about-ai" className="hover:text-gold-300 transition-colors">AI Filozófia</Link>
          </div>

          <div>
            <LanguageSwitcher />
          </div>
        </div>
      </footer>
    </div>
  );
}
