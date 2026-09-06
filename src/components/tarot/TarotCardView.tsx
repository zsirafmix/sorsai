"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TarotCard } from '@/lib/tarot';
import { Sparkles, Compass, Eye } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface TarotCardViewProps {
  card: TarotCard;
  positionName?: string;
  isReversed?: boolean;
  isFlipped?: boolean;
  onFlip?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

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
    sm: "w-28 h-44 text-xs",
    md: "w-40 h-64 text-sm",
    lg: "w-52 h-80 text-base",
  };

  return (
    <div className="flex flex-col items-center">
      {positionName && (
        <span className="mb-2 text-center text-xs font-medium uppercase tracking-wider text-gold-400/90 max-w-[160px] truncate">
          {positionName}
        </span>
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
          className="relative h-full w-full rounded-xl transition-all duration-500 transform-style-3d shadow-2xl"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Card Back */}
          <div className="absolute inset-0 backface-hidden rounded-xl border-2 border-gold-500/40 bg-gradient-to-br from-space-900 via-mystic-900 to-space-950 p-2 flex flex-col items-center justify-center overflow-hidden shadow-mystic-glow">
            <div className="absolute inset-1 rounded-lg border border-gold-500/20 flex items-center justify-center">
              <div className="relative flex flex-col items-center justify-center">
                <div className="h-14 w-14 rounded-full border border-gold-500/40 flex items-center justify-center shadow-gold-glow">
                  <Sparkles className="h-6 w-6 text-gold-400 animate-pulse-slow" />
                </div>
                <div className="mt-2 text-[10px] tracking-widest uppercase font-semibold text-gold-400/80">
                  SorsAI
                </div>
              </div>
            </div>
            {/* Corner ornaments */}
            <div className="absolute top-2 left-2 text-gold-500/40 text-[10px]">✦</div>
            <div className="absolute top-2 right-2 text-gold-500/40 text-[10px]">✦</div>
            <div className="absolute bottom-2 left-2 text-gold-500/40 text-[10px]">✦</div>
            <div className="absolute bottom-2 right-2 text-gold-500/40 text-[10px]">✦</div>
          </div>

          {/* Card Front */}
          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl border-2 border-gold-500/60 bg-gradient-to-b from-space-900 via-space-950 to-mystic-950 p-3 flex flex-col justify-between overflow-hidden shadow-gold-glow ${
              isReversed ? 'rotate-180' : ''
            }`}
          >
            {/* Header / Number */}
            <div className="flex items-center justify-between text-xs text-gold-300/80 border-b border-gold-500/20 pb-1">
              <span className="font-semibold">{card.arcana === 'major' ? `No. ${card.number}` : card.number}</span>
              <span className="text-[10px] uppercase tracking-wider text-ethereal-400">{card.arcana}</span>
            </div>

            {/* Central Mystical Artwork Placeholder */}
            <div className="my-auto flex flex-col items-center justify-center text-center p-2 rounded-lg bg-white/[0.02] border border-white/5">
              <div className="relative h-16 w-16 mb-2 rounded-full border border-gold-400/30 flex items-center justify-center bg-gradient-to-tr from-gold-500/10 to-mystic-500/20">
                {card.arcana === 'major' ? (
                  <Sparkles className="h-8 w-8 text-gold-400" />
                ) : (
                  <Compass className="h-8 w-8 text-mystic-300" />
                )}
              </div>
              <h4 className="font-bold text-white text-xs leading-snug line-clamp-2">
                {getLocalizedName()}
              </h4>
              <p className="text-[10px] text-ethereal-400 mt-1 line-clamp-1">
                {card.keywords.slice(0, 2).join(" • ")}
              </p>
            </div>

            {/* Orientation badge & Hint */}
            <div className="flex items-center justify-between pt-1 border-t border-gold-500/20 text-[10px]">
              <span className={`px-1.5 py-0.5 rounded font-medium ${isReversed ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                {isReversed ? t.tarot.reversed : t.tarot.upright}
              </span>
              <Eye className="h-3.5 w-3.5 text-ethereal-400 hover:text-gold-300 transition-colors" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal / Popover Detail */}
      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-space-950/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md rounded-2xl border border-gold-500/30 bg-card-gradient p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-xl font-bold text-white">{getLocalizedName()}</h3>
                <p className="text-xs text-gold-400 uppercase tracking-wider">{card.name} ({card.arcana})</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${isReversed ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                {isReversed ? t.tarot.reversed : t.tarot.upright}
              </span>
            </div>

            <div className="mt-4 space-y-3 text-sm text-ethereal-300">
              <div>
                <span className="font-semibold text-white">Kulcsszavak: </span>
                <span className="text-gold-300">{card.keywords.join(", ")}</span>
              </div>
              <div>
                <span className="font-semibold text-white">Értelmezés: </span>
                <p className="mt-1 leading-relaxed text-ethereal-200">
                  {isReversed ? card.reversedMeaning : card.uprightMeaning}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowDetail(false)}
              className="mt-6 w-full rounded-xl bg-gold-500/20 border border-gold-500/40 py-2.5 text-sm font-semibold text-gold-200 hover:bg-gold-500/30 transition-all shadow-gold-glow"
            >
              {t.common.confirm}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
