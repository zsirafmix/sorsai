"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MysticalLoaderProps {
  statusText?: string;
}

export const MysticalLoader: React.FC<MysticalLoaderProps> = ({
  statusText = "A szimbólumok értelmezése folyamatban...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="relative h-24 w-24 flex items-center justify-center">
        {/* Outer rotating ring with gold glow */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-dashed border-gold-500/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        {/* Middle reverse rotating ring */}
        <motion.div
          className="absolute inset-2 rounded-full border border-mystic-400/50"
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        {/* Core pulsing star */}
        <motion.div
          className="h-6 w-6 rounded-full bg-gradient-to-tr from-gold-400 to-amber-200 shadow-gold-glow"
          animate={{ scale: [0.85, 1.2, 0.85], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.p
        className="mt-6 text-sm font-medium text-gold-300/90 tracking-wide"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {statusText}
      </motion.p>
    </div>
  );
};
