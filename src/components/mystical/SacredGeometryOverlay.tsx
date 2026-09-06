"use client";

import React from 'react';

export const SacredGeometryOverlay: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Primary Centered Rotating Sacred Zodiac Wheel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-[0.035] animate-spin-slow">
        <svg viewBox="0 0 500 500" className="w-full h-full stroke-gold-400 fill-none">
          {/* Outer Astrolabe Rings */}
          <circle cx="250" cy="250" r="240" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="250" cy="250" r="230" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="215" strokeWidth="0.8" strokeDasharray="2 4" />
          <circle cx="250" cy="250" r="185" strokeWidth="1" />
          <circle cx="250" cy="250" r="140" strokeWidth="0.8" strokeDasharray="6 6" />
          <circle cx="250" cy="250" r="95" strokeWidth="1" />
          <circle cx="250" cy="250" r="50" strokeWidth="1.2" />

          {/* 12 Zodiac Radial Sectors */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 250 + Math.cos(angle) * 95;
            const y1 = 250 + Math.sin(angle) * 95;
            const x2 = 250 + Math.cos(angle) * 230;
            const y2 = 250 + Math.sin(angle) * 230;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.6" />;
          })}

          {/* Sacred Hexagram / Seal of Solomon geometry */}
          <polygon
            points="250,65 410,342 90,342"
            strokeWidth="0.8"
          />
          <polygon
            points="250,435 410,158 90,158"
            strokeWidth="0.8"
          />

          {/* Octagram Stars */}
          <polygon
            points="250,110 349,151 390,250 349,349 250,390 151,349 110,250 151,151"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
        </svg>
      </div>

      {/* Secondary Counter-Rotating Inner Sacred Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] opacity-[0.025] animate-spin-reverse-slow">
        <svg viewBox="0 0 300 300" className="w-full h-full stroke-mystic-400 fill-none">
          <circle cx="150" cy="150" r="140" strokeWidth="1" strokeDasharray="1 5" />
          <circle cx="150" cy="150" r="110" strokeWidth="0.8" />
          <circle cx="150" cy="150" r="70" strokeWidth="0.8" strokeDasharray="4 8" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x1 = 150 + Math.cos(angle) * 30;
            const y1 = 150 + Math.sin(angle) * 30;
            const x2 = 150 + Math.cos(angle) * 140;
            const y2 = 150 + Math.sin(angle) * 140;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.6" />;
          })}
        </svg>
      </div>

      {/* Soft Vignette Overlay to frame content with ancient darkness */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(6,8,17,0.75)_100%)]" />
    </div>
  );
};
