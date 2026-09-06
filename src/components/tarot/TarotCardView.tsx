"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TarotCard } from '@/lib/tarot';
import { Sparkles, Compass, Eye, Sun, X } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface TarotCardViewProps {
  card: TarotCard;
  positionName?: string;
  isReversed?: boolean;
  isFlipped?: boolean;
  onFlip?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

// Convert major arcana number to Roman numeral
const toRoman = (num: number): string => {
  if (num === 0) return "0 • THE FOOL";
  const romanMap: [number, string][] = [
    [21, "XXI"], [20, "XX"], [19, "XIX"], [18, "XVIII"], [17, "XVII"],
    [16, "XVI"], [15, "XV"], [14, "XIV"], [13, "XIII"], [12, "XII"],
    [11, "XI"], [10, "X"], [9, "IX"], [8, "VIII"], [7, "VII"],
    [6, "VI"], [5, "V"], [4, "IV"], [3, "III"], [2, "II"], [1, "I"]
  ];
  for (const [val, roman] of romanMap) {
    if (num === val) return roman;
  }
  return String(num);
};

export const TarotCardView: React.FC<TarotCardViewProps> = ({
  card,
  positionName,
  isReversed = false,
  isFlipped = true,
  onFlip,
  size = 'md',
}) => {
  const { language, t } = useTranslation();
  const [showDetail, setShowDetail] = useState(false);

  const getLocalizedName = () => {
    switch (language) {
      case 'hu': return card.name_hu;
      case 'de': return card.name_de;
      case 'fr': return card.name_fr;
      default: return card.name;
    }
  };

  const sizeClasses = {
    sm: "w-32 h-52 text-xs",
    md: "w-44 h-72 text-sm",
    lg: "w-56 h-88 text-base",
  };

  const romanNumber = card.arcana === 'major' ? toRoman(card.number) : `#${card.number}`;

  return (
    <div className="flex flex-col items-center">
      {positionName && (
        <div className="mb-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-gold-500/30 bg-space-950/80 backdrop-blur-sm shadow-sm">
          <span className="text-[10px] text-gold-400">✦</span>
          <span className="text-center text-[11px] font-medium uppercase tracking-widest text-gold-300 max-w-[180px] truncate">
            {positionName}
          </span>
          <span className="text-[10px] text-gold-400">✦</span>
        </div>
      )}

      <div
        className={`relative cursor-pointer select-none perspective-1000 ${sizeClasses[size]}`}
        onClick={() => {
          if (!isFlipped && onFlip) {
            onFlip();
          } else {
            setShowDetail(!showDetail);
          }
        }}
      >
        <motion.div
          className="relative h-full w-full rounded-2xl transition-all duration-700 transform-style-3d shadow-2xl hover:shadow-[0_0_25px_rgba(212,175,55,0.35)]"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* ================= CARD BACK ================= */}
          <div className="absolute inset-0 backface-hidden rounded-2xl border-2 border-gold-500/60 bg-gradient-to-br from-[#0b0817] via-[#160e29] to-[#080512] p-2.5 flex flex-col items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(157,78,221,0.3)]">
            {/* Inner filigree border */}
            <div className="absolute inset-1.5 rounded-xl border border-gold-500/30 flex items-center justify-center pointer-events-none">
              <div className="absolute inset-1 rounded-lg border border-gold-500/15" />
            </div>

            {/* Sacred Geometry SVG: Metatron / Astrolabe back pattern */}
            <svg
              className="absolute inset-0 h-full w-full pointer-events-none opacity-40 text-gold-400"
              viewBox="0 0 200 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="160" r="70" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
              <circle cx="100" cy="160" r="54" stroke="currentColor" strokeWidth="1" />
              <circle cx="100" cy="160" r="38" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="100" cy="160" r="22" stroke="currentColor" strokeWidth="1.2" />

              {/* 8-pointed sacred star lines */}
              <line x1="100" y1="90" x2="100" y2="230" stroke="currentColor" strokeWidth="0.8" />
              <line x1="30" y1="160" x2="170" y2="160" stroke="currentColor" strokeWidth="0.8" />
              <line x1="50" y1="110" x2="150" y2="210" stroke="currentColor" strokeWidth="0.6" />
              <line x1="50" y1="210" x2="150" y2="110" stroke="currentColor" strokeWidth="0.6" />

              {/* Hexagram interlaced */}
              <polygon points="100,106 147,187 53,187" stroke="currentColor" strokeWidth="0.7" fill="none" />
              <polygon points="100,214 147,133 53,133" stroke="currentColor" strokeWidth="0.7" fill="none" />

              {/* Outer corner ticks */}
              <circle cx="30" cy="40" r="12" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="170" cy="40" r="12" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="30" cy="280" r="12" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="170" cy="280" r="12" stroke="currentColor" strokeWidth="0.5" />
            </svg>

            {/* Central Talisman Emblem */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold-400/70 bg-[#120a24]/90 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                <Sun className="h-6 w-6 text-gold-300 animate-spin-slow" />
                <div className="absolute inset-0 rounded-full border border-gold-300/40 animate-ping opacity-25 pointer-events-none" />
              </div>
              <div className="mt-2.5 font-serif text-[11px] tracking-[0.25em] uppercase font-bold text-gold-300 drop-shadow">
                SorsAI
              </div>
              <div className="text-[8px] tracking-[0.3em] uppercase text-gold-400/60 mt-0.5">
                ✦ ORACLE ✦
              </div>
            </div>

            {/* Four Corner Celestial Glyphs */}
            <span className="absolute top-2.5 left-2.5 text-gold-400 text-xs font-serif">☾</span>
            <span className="absolute top-2.5 right-2.5 text-gold-400 text-xs font-serif">☉</span>
            <span className="absolute bottom-2.5 left-2.5 text-gold-400 text-xs font-serif">✦</span>
            <span className="absolute bottom-2.5 right-2.5 text-gold-400 text-xs font-serif">✧</span>
          </div>

          {/* ================= CARD FRONT ================= */}
          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 border-gold-500/70 bg-gradient-to-b from-[#0e0a1f] via-[#090714] to-[#120a24] p-3 flex flex-col justify-between overflow-hidden shadow-[0_0_25px_rgba(212,175,55,0.35)] ${
              isReversed ? 'rotate-180' : ''
            }`}
          >
            {/* Inner Double Hairline Gold Border */}
            <div className="absolute inset-1.5 rounded-xl border border-gold-500/40 pointer-events-none">
              <div className="absolute inset-1 rounded-lg border border-gold-500/20" />
              {/* Corner golden dots */}
              <span className="absolute top-1 left-1 h-1 w-1 rounded-full bg-gold-400" />
              <span className="absolute top-1 right-1 h-1 w-1 rounded-full bg-gold-400" />
              <span className="absolute bottom-1 left-1 h-1 w-1 rounded-full bg-gold-400" />
              <span className="absolute bottom-1 right-1 h-1 w-1 rounded-full bg-gold-400" />
            </div>

            {/* Card Header: Roman Numeral & Arcana Badge */}
            <div className="relative z-10 flex items-center justify-between border-b border-gold-500/20 pb-1 px-1">
              <span className="font-serif text-[11px] font-bold tracking-widest text-gold-300">
                {romanNumber}
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-gold-400/70">
                {card.arcana}
              </span>
            </div>

            {/* Central Mystical Artwork Presentation */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center p-2 rounded-xl bg-space-950/70 border border-gold-500/20 shadow-inner">
              {/* Radiant celestial halo */}
              <div className="relative mb-2 flex h-16 w-16 items-center justify-center rounded-full border border-gold-400/50 bg-gradient-to-tr from-gold-500/20 via-mystic-500/20 to-purple-500/20 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                {card.arcana === 'major' ? (
                  <Sparkles className="h-8 w-8 text-gold-300 animate-pulse-slow" />
                ) : (
                  <Compass className="h-8 w-8 text-mystic-300" />
                )}
                {/* Circular halo ring */}
                <div className="absolute inset-[-4px] rounded-full border border-dashed border-gold-400/30 animate-spin-slow pointer-events-none" />
              </div>

              {/* Card Name */}
              <h4 className="font-serif font-bold text-white text-xs leading-snug tracking-wide line-clamp-2 drop-shadow">
                {getLocalizedName()}
              </h4>

              {/* Keywords */}
              <p className="text-[10px] text-gold-300/80 mt-1 line-clamp-1 italic font-serif">
                {card.keywords.slice(0, 2).join(" • ")}
              </p>
            </div>

            {/* Card Footer: Upright/Reversed Tag & Inspector Eye */}
            <div className="relative z-10 flex items-center justify-between pt-1.5 border-t border-gold-500/20 px-1 text-[10px]">
              <span
                className={`px-2 py-0.5 rounded-full font-serif text-[9px] uppercase tracking-wider font-semibold border ${
                  isReversed
                    ? 'border-rose-500/40 bg-rose-500/15 text-rose-300'
                    : 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                }`}
              >
                {isReversed ? t.tarot.reversed : t.tarot.upright}
              </span>
              <div className="flex items-center gap-1 text-gold-400/80 hover:text-gold-200 transition-colors">
                <Eye className="h-3 w-3" />
                <span className="text-[9px] uppercase tracking-wider font-mono">Info</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ================= MODAL / DETAILED REVELATION ================= */}
      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-space-950/85 backdrop-blur-md p-4 animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl mystic-card p-6 sm:p-8 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
            <div className="mystic-corner-tl" />
            <div className="mystic-corner-br" />

            {/* Close button */}
            <button
              onClick={() => setShowDetail(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full border border-white/10 bg-white/5 text-ethereal-400 hover:text-white hover:border-gold-400 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-start justify-between border-b border-gold-500/20 pb-4 pr-8">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-xs font-bold text-gold-400 tracking-widest">{romanNumber}</span>
                  <span className="text-xs uppercase tracking-widest text-ethereal-400">• {card.arcana}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold gold-text-gradient mt-1">{getLocalizedName()}</h3>
                <p className="text-xs text-ethereal-400 italic font-serif">{card.name}</p>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-serif font-bold uppercase tracking-wider border ${
                  isReversed
                    ? 'border-rose-500/40 bg-rose-500/15 text-rose-300'
                    : 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                }`}
              >
                {isReversed ? t.tarot.reversed : t.tarot.upright}
              </span>
            </div>

            <div className="mt-5 space-y-4 text-sm text-ethereal-300">
              <div className="p-3 rounded-xl bg-space-950/70 border border-gold-500/20">
                <span className="font-serif text-xs uppercase tracking-widest text-gold-400 block mb-1">
                  ✦ Szimbolikus Kulcsszavak
                </span>
                <span className="text-white font-medium">{card.keywords.join(" • ")}</span>
              </div>

              <div className="p-4 rounded-xl bg-space-950/70 border border-gold-500/20">
                <span className="font-serif text-xs uppercase tracking-widest text-gold-400 block mb-1.5">
                  ✦ Orákulum Értelmezés ({isReversed ? t.tarot.reversed : t.tarot.upright})
                </span>
                <p className="leading-relaxed text-ethereal-100 font-light">
                  {isReversed ? card.reversedMeaning : card.uprightMeaning}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowDetail(false)}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-gold-500 to-amber-400 py-3 text-sm font-bold text-space-950 hover:brightness-110 transition-all shadow-gold-glow"
            >
              {t.common.confirm}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
