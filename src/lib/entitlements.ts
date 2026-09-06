export type SubscriptionTier = 'free' | 'premium';

export type FeatureKey =
  | 'daily_reading'
  | 'tarot_single'
  | 'tarot_all_spreads'
  | 'numerology_basic'
  | 'numerology_full'
  | 'ai_chat_basic'
  | 'ai_chat_unlimited'
  | 'relationship_analysis'
  | 'dream_analysis'
  | 'destiny_journal'
  | 'ai_memory'
  | 'destiny_synthesis';

export interface UserSubscriptionContext {
  id?: string;
  tier: SubscriptionTier;
  status?: 'active' | 'canceled' | 'past_due';
}

const FEATURE_ENTITLEMENTS: Record<FeatureKey, { free: boolean; premium: boolean }> = {
  daily_reading: { free: true, premium: true },
  tarot_single: { free: true, premium: true },
  tarot_all_spreads: { free: false, premium: true },
  numerology_basic: { free: true, premium: true },
  numerology_full: { free: false, premium: true },
  ai_chat_basic: { free: true, premium: true },
  ai_chat_unlimited: { free: false, premium: true },
  relationship_analysis: { free: false, premium: true },
  dream_analysis: { free: false, premium: true },
  destiny_journal: { free: true, premium: true },
  ai_memory: { free: false, premium: true },
  destiny_synthesis: { free: false, premium: true }
};

const FEATURE_DAILY_LIMITS: Record<FeatureKey, { free: number | 'unlimited'; premium: number | 'unlimited' }> = {
  daily_reading: { free: 1, premium: 'unlimited' },
  tarot_single: { free: 1, premium: 'unlimited' },
  tarot_all_spreads: { free: 0, premium: 'unlimited' },
  numerology_basic: { free: 3, premium: 'unlimited' },
  numerology_full: { free: 0, premium: 'unlimited' },
  ai_chat_basic: { free: 3, premium: 100 },
  ai_chat_unlimited: { free: 0, premium: 100 },
  relationship_analysis: { free: 0, premium: 50 },
  dream_analysis: { free: 0, premium: 50 },
  destiny_journal: { free: 5, premium: 'unlimited' },
  ai_memory: { free: 0, premium: 'unlimited' },
  destiny_synthesis: { free: 0, premium: 50 }
};

/**
 * Check whether a user tier can access a given feature
 */
export function canUseFeature(
  userOrTier: UserSubscriptionContext | SubscriptionTier | null | undefined,
  feature: FeatureKey
): boolean {
  const tier: SubscriptionTier = typeof userOrTier === 'string'
    ? userOrTier
    : (userOrTier?.tier || 'free');

  const entitlement = FEATURE_ENTITLEMENTS[feature];
  if (!entitlement) return false;
  return entitlement[tier] ?? false;
}

/**
 * Get daily limit for a feature
 */
export function getUsageLimit(
  userOrTier: UserSubscriptionContext | SubscriptionTier | null | undefined,
  feature: FeatureKey
): number | 'unlimited' {
  const tier: SubscriptionTier = typeof userOrTier === 'string'
    ? userOrTier
    : (userOrTier?.tier || 'free');

  const limits = FEATURE_DAILY_LIMITS[feature];
  if (!limits) return 0;
  return limits[tier];
}
