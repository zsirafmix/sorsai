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
  Sun,
  Crown
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
    <div className="flex flex-col min-h-screen text-white bg-transparent">
      {/* Top Sacred Navigation */}
      <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-gold-500/20 bg-[#06040d]/85 px-6 sm:px-12 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-gold-500/50 bg-gradient-to-tr from-[#150d2a] to-[#0a0614] shadow-[0_0_18px_rgba(212,175,55,0.35)]">
            <Sun className="h-5 w-5 text-gold-300 animate-spin-slow" />
            <div className="absolute inset-0 rounded-2xl border border-gold-400/30 animate-pulse pointer-events-none" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-[0.15em] text-white">
              SORS<span className="gold-text-gradient">AI</span>
            </span>
            <span className="hidden sm:block text-[9px] uppercase tracking-[0.3em] font-serif text-gold-400/70">
              ✦ SACRED ORACLE ✦
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-2xl border border-gold-500/40 bg-gradient-to-r from-gold-500/15 to-amber-500/15 px-5 py-2.5 text-xs font-serif font-bold uppercase tracking-widest text-gold-200 backdrop-blur-md hover:bg-gold-500/25 transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)]"
          >
            <span>{t.common.dashboard}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section: Celestial Oracle Portal */}
      <section className="relative overflow-hidden pt-24 pb-32 px-6 sm:px-12 flex flex-col items-center text-center">
        {/* Animated Sacred Astrolabe Portal Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-25">
          <svg className="w-full h-full text-gold-400 animate-spin-slow" viewBox="0 0 500 500" fill="none">
            <circle cx="250" cy="250" r="240" stroke="currentColor" strokeWidth="0.75" strokeDasharray="6 6" />
            <circle cx="250" cy="250" r="210" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="250" cy="250" r="160" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
            <circle cx="250" cy="250" r="100" stroke="currentColor" strokeWidth="1.5" />
            <polygon points="250,90 380,330 120,330" stroke="currentColor" strokeWidth="0.75" fill="none" />
            <polygon points="250,410 380,170 120,170" stroke="currentColor" strokeWidth="0.75" fill="none" />
          </svg>
        </div>

        {/* Ambient Cosmic Lights */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-[600px] rounded-full bg-gradient-to-r from-purple-900/30 via-gold-500/15 to-indigo-900/30 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/40 bg-space-950/80 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Sparkles className="h-4 w-4 text-gold-400 animate-pulse-slow" />
            <span className="font-serif text-xs uppercase tracking-[0.25em] text-gold-300 font-semibold">
              ✦ {t.common.tagline} ✦
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-lg">
            Ismerd meg a <span className="gold-text-gradient">Sorsod Titkait</span>
          </h1>

          <p className="mt-6 font-serif text-base sm:text-xl text-ethereal-200 max-w-2xl font-light leading-relaxed italic">
            „Ahol az ősi archetípusok, a csillagok geometriája és a mesterséges intelligencia mély önismeretté formálódik.”
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 px-9 py-4 font-serif text-base font-bold uppercase tracking-wider text-space-950 hover:brightness-110 transition-all shadow-[0_0_35px_rgba(212,175,55,0.4)] transform hover:-translate-y-0.5"
            >
              <span>{t.landing.ctaPrimary}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/daily"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl border border-gold-500/40 bg-[#120b22]/70 px-8 py-4 font-serif text-base font-semibold text-gold-200 hover:bg-[#1a0f33] transition-all backdrop-blur-md shadow-sm"
            >
              <SunMedium className="h-5 w-5 text-gold-400" />
              <span>{t.landing.ctaSecondary}</span>
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs text-ethereal-400 font-serif">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>{t.common.disclaimer}</span>
          </div>
        </div>
      </section>

      {/* How it Works: 3 Steps to Clarity */}
      <section className="py-24 px-6 sm:px-12 border-t border-gold-500/15 bg-[#080512]/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-serif text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold block mb-2">
              ✦ BEAVATÁSI FOLYAMAT ✦
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide">
              Három lépés a belső tisztánlátáshoz
            </h2>
            <p className="mt-4 font-serif text-ethereal-300 text-sm sm:text-base italic">
              {t.landing.howItWorksSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative rounded-3xl mystic-card p-8 backdrop-blur-2xl shadow-sm hover:border-gold-500/60 transition-all">
              <div className="mystic-corner-tl" />
              <div className="mystic-corner-br" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-300 font-serif font-bold text-lg mb-6 border border-gold-500/40 shadow-gold-glow">
                I
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3 tracking-wide">{t.landing.step1Title}</h3>
              <p className="text-ethereal-300 text-sm leading-relaxed font-light">{t.landing.step1Desc}</p>
            </div>

            <div className="relative rounded-3xl mystic-card p-8 backdrop-blur-2xl shadow-sm hover:border-mystic-400/60 transition-all">
              <div className="mystic-corner-tl" />
              <div className="mystic-corner-br" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mystic-500/15 text-mystic-300 font-serif font-bold text-lg mb-6 border border-mystic-500/40 shadow-mystic-glow">
                II
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3 tracking-wide">{t.landing.step2Title}</h3>
              <p className="text-ethereal-300 text-sm leading-relaxed font-light">{t.landing.step2Desc}</p>
            </div>

            <div className="relative rounded-3xl mystic-card p-8 backdrop-blur-2xl shadow-sm hover:border-gold-500/60 transition-all">
              <div className="mystic-corner-tl" />
              <div className="mystic-corner-br" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-300 font-serif font-bold text-lg mb-6 border border-gold-500/40 shadow-gold-glow">
                III
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3 tracking-wide">{t.landing.step3Title}</h3>
              <p className="text-ethereal-300 text-sm leading-relaxed font-light">{t.landing.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="py-24 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-serif text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold block mb-2">
              ✦ SZENT ESZKÖZTÁR ✦
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide">
              {t.landing.featuresTitle}
            </h2>
            <p className="mt-4 font-serif text-ethereal-300 text-sm sm:text-base italic">
              {t.landing.featuresSub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tarot */}
            <div className="relative rounded-3xl mystic-card p-6 backdrop-blur-2xl hover:border-gold-500/60 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 mb-4 text-gold-400 group-hover:scale-110 transition-transform border border-gold-500/30 shadow-gold-glow">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2 tracking-wide group-hover:text-gold-300 transition-colors">
                {t.common.tarot}
              </h3>
              <p className="text-xs text-ethereal-300 leading-relaxed font-light">
                78 lapos teljes Rider-Waite rendszer backend véletlenszerűsítéssel és 8 különböző kirakási formával az 1 lapos fókuszponttól a Kelta Keresztig.
              </p>
            </div>

            {/* Numerology */}
            <div className="relative rounded-3xl mystic-card p-6 backdrop-blur-2xl hover:border-blue-500/60 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 mb-4 text-blue-300 group-hover:scale-110 transition-transform border border-blue-500/30">
                <Binary className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2 tracking-wide group-hover:text-blue-200 transition-colors">
                {t.common.numerology}
              </h3>
              <p className="text-xs text-ethereal-300 leading-relaxed font-light">
                Determinisztikus életút, születésnapi rezgés, személyes év/hónap és pitagoraszi névszámítás a 11, 22, 33 mesterszámok precíz kezelésével.
              </p>
            </div>

            {/* Astrology */}
            <div className="relative rounded-3xl mystic-card p-6 backdrop-blur-2xl hover:border-gold-500/60 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 mb-4 text-gold-400 group-hover:scale-110 transition-transform border border-gold-500/30 shadow-gold-glow">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2 tracking-wide group-hover:text-gold-300 transition-colors">
                {t.common.astrology}
              </h3>
              <p className="text-xs text-ethereal-300 leading-relaxed font-light">
                Valós Napjegy, uralkodó elem és modalitás szintézis, őszinte tájékoztatással a komplex efemerida fejlesztéséről.
              </p>
            </div>

            {/* Relationships */}
            <div className="relative rounded-3xl mystic-card p-6 backdrop-blur-2xl hover:border-rose-500/60 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/15 mb-4 text-rose-400 group-hover:scale-110 transition-transform border border-rose-500/30">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2 tracking-wide group-hover:text-rose-200 transition-colors">
                {t.common.relationships}
              </h3>
              <p className="text-xs text-ethereal-300 leading-relaxed font-light">
                Két ember szellemi és érzelmi dinamikájának szimbolikus szinasztriája érzelmi, kommunikációs és spirituális harmóniamutatókkal.
              </p>
            </div>

            {/* Dreams */}
            <div className="relative rounded-3xl mystic-card p-6 backdrop-blur-2xl hover:border-indigo-500/60 transition-all group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 mb-4 text-indigo-300 group-hover:scale-110 transition-transform border border-indigo-500/30">
                <MoonStar className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2 tracking-wide group-hover:text-indigo-200 transition-colors">
                {t.common.dreams}
              </h3>
              <p className="text-xs text-ethereal-300 leading-relaxed font-light">
                Tudattalan üzenetek és archetípusos szimbólumok Carl Jung-i mélylélektani és spirituális dekódolása.
              </p>
            </div>

            {/* Full Synthesis */}
            <div className="relative rounded-3xl mystic-card p-6 backdrop-blur-2xl border-2 border-gold-500/60 shadow-[0_0_35px_rgba(212,175,55,0.25)] group">
              <div className="mystic-corner-tl" />
              <div className="mystic-corner-br" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-gold-500/30 to-amber-500/30 mb-4 text-gold-300 group-hover:scale-110 transition-transform border border-gold-500/50 shadow-gold-glow">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-bold gold-text-gradient mb-2 tracking-wide">
                ✦ Teljes Sorszintézis
              </h3>
              <p className="text-xs text-gold-200/90 leading-relaxed font-light">
                Egyesíti a felhasználói profilt, a tarot lapokat, a numerológiát és a csillagképi elemeket egyetlen 7-részes orákulum revelációban.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section: Sacred Initiation Tiers */}
      <section className="py-24 px-6 sm:px-12 border-t border-gold-500/15 bg-[#080512]/50 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-serif text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold block mb-2">
              ✦ BEAVATÁSI KÖRÖK ✦
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide">
              Válaszd a számodra megfelelő utat
            </h2>
            <p className="mt-4 font-serif text-ethereal-300 text-sm sm:text-base italic">
              {t.landing.pricingSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Free Tier */}
            <div className="relative flex flex-col rounded-3xl mystic-card p-8 backdrop-blur-2xl">
              <div className="mystic-corner-tl" />
              <h3 className="font-serif text-2xl font-bold text-white">{t.landing.freePlanTitle}</h3>
              <p className="mt-2 text-xs text-ethereal-400 font-serif italic">Ideális az induló önreflexióhoz és a napi szimbolikus üzenetekhez.</p>
              <div className="my-6">
                <span className="font-serif text-4xl font-extrabold text-white">0 Ft</span>
                <span className="text-xs text-ethereal-400 ml-1 font-mono">/ örökre</span>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {t.landing.freeFeatures.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-ethereal-300 font-serif">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className="w-full text-center rounded-2xl border border-gold-500/30 bg-gold-500/10 py-3.5 font-serif text-xs font-bold uppercase tracking-wider text-gold-200 hover:bg-gold-500/20 transition-all"
              >
                Kezdés Ingyenesen
              </Link>
            </div>

            {/* Premium Tier */}
            <div className="relative flex flex-col rounded-3xl mystic-card p-8 backdrop-blur-2xl border-2 border-gold-500/60 shadow-[0_0_40px_rgba(212,175,55,0.3)]">
              <div className="mystic-corner-tl" />
              <div className="mystic-corner-br" />
              <div className="absolute -top-3.5 right-8 rounded-full bg-gradient-to-r from-gold-500 to-amber-400 px-4 py-1 text-[11px] font-serif font-bold text-space-950 uppercase tracking-widest shadow-lg flex items-center gap-1">
                <Crown className="h-3 w-3" />
                <span>Legnépszerűbb</span>
              </div>
              <h3 className="font-serif text-2xl font-bold gold-text-gradient">{t.landing.premiumPlanTitle}</h3>
              <p className="mt-2 text-xs text-gold-300/90 font-serif italic">Korlátlan hozzáférés a teljes spirituális és önismereti arzenálhoz.</p>
              <div className="my-6">
                <span className="font-serif text-4xl font-extrabold text-white">3 990 Ft</span>
                <span className="text-xs text-ethereal-400 ml-1 font-mono">{t.landing.monthly}</span>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {t.landing.premiumFeatures.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-gold-200 font-serif">
                    <Check className="h-4 w-4 text-gold-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className="w-full text-center rounded-2xl bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 py-3.5 font-serif text-xs font-bold uppercase tracking-wider text-space-950 hover:brightness-110 transition-all shadow-gold-glow"
              >
                ✦ Beavatás Megkezdése ✦
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials: Chronicles of the Initiates */}
      <section className="py-24 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-serif text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold block mb-2">
              ✦ BEAVATOTTAK VALLOMÁSAI ✦
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide">
              {t.landing.testimonialsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative rounded-3xl mystic-card p-6 backdrop-blur-2xl">
              <div className="mystic-corner-tl" />
              <p className="font-serif text-xs text-ethereal-200 italic leading-relaxed">
                „A SorsAI nem mondja meg, mit tegyek, de a Kelta Kereszt és a numerológiai szintézis pontosan rámutatott azokra a belső kérdésekre, amiket hetek óta halogattam.”
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-gold-500/15 pt-3">
                <div className="h-9 w-9 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center font-serif text-xs font-bold text-gold-300">
                  A
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-white">Anna M.</h4>
                  <p className="text-[10px] text-gold-400/80 font-serif">Életútszám: 7 (Misztikus)</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl mystic-card p-6 backdrop-blur-2xl">
              <div className="mystic-corner-tl" />
              <p className="font-serif text-xs text-ethereal-200 italic leading-relaxed">
                „A kapcsolati elemzés rendkívül tapintatos és mély volt. Nem olcsó horoszkóp-szövegeket kaptunk, hanem igazi kommunikációs fejlődési pontokat a párommal.”
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-gold-500/15 pt-3">
                <div className="h-9 w-9 rounded-full bg-mystic-500/20 border border-mystic-400/40 flex items-center justify-center font-serif text-xs font-bold text-mystic-200">
                  P
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-white">Péter K.</h4>
                  <p className="text-[10px] text-mystic-400/80 font-serif">Életútszám: 11 (Mester)</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl mystic-card p-6 backdrop-blur-2xl">
              <div className="mystic-corner-tl" />
              <p className="font-serif text-xs text-ethereal-200 italic leading-relaxed">
                „A reggeli kávém mellett a Napi Tarot és az asztrolábium energia pontszám lett az új reggeli rituálém. Békét és tisztaságot ad a nap elindításához.”
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-gold-500/15 pt-3">
                <div className="h-9 w-9 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center font-serif text-xs font-bold text-gold-300">
                  D
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-white">Dóra B.</h4>
                  <p className="text-[10px] text-gold-400/80 font-serif">Életútszám: 3 (Alkotó)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 sm:px-12 border-t border-gold-500/15 bg-[#080512]/50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-serif text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold block mb-2">
              ✦ TUDÁSTÁR & REFLEXIÓ ✦
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide">
              {t.landing.faqTitle}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl mystic-card overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-serif text-sm sm:text-base font-semibold text-white hover:text-gold-300 transition-colors"
                >
                  <span>✦ {faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gold-400 transition-transform duration-300 shrink-0 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-ethereal-200 leading-relaxed border-t border-gold-500/15 pt-3 font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sacred Footer */}
      <footer className="border-t border-gold-500/20 bg-[#06040d] py-12 px-6 sm:px-12 text-xs text-ethereal-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-gold-500/40 bg-[#140c24]">
              <Sparkles className="h-4 w-4 text-gold-400" />
            </div>
            <span className="font-serif font-bold text-white text-base tracking-wider">
              SORS<span className="gold-text-gradient">AI</span>
            </span>
            <span className="text-[11px] text-ethereal-500 font-mono">© 2026 Minden jog fenntartva.</span>
          </div>

          <div className="flex items-center gap-6 font-serif">
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
