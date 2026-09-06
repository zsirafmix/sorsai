import React, { ReactNode } from 'react';
import { clsx } from 'clsx';

interface GlowBadgeProps {
  children: ReactNode;
  variant?: 'gold' | 'purple' | 'subtle';
  className?: string;
  icon?: ReactNode;
}

export const GlowBadge: React.FC<GlowBadgeProps> = ({
  children,
  variant = 'gold',
  className,
  icon,
}) => {
  const variantStyles = {
    gold: 'border-gold-500/40 bg-gold-500/10 text-gold-300 shadow-[0_0_15px_-3px_rgba(212,175,55,0.3)]',
    purple: 'border-mystic-500/40 bg-mystic-500/10 text-mystic-300 shadow-[0_0_15px_-3px_rgba(131,66,214,0.3)]',
    subtle: 'border-white/10 bg-white/5 text-ethereal-300',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md transition-all',
        variantStyles[variant],
        className
      )}
    >
      {icon && <span className="text-sm">{icon}</span>}
      {children}
    </span>
  );
};
