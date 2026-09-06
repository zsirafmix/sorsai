import { describe, it, expect } from 'vitest';
import { canUseFeature, getUsageLimit } from '../src/lib/entitlements';

describe('Entitlements System Tests', () => {
  it('should grant Free tier access only to basic features', () => {
    expect(canUseFeature('free', 'daily_reading')).toBe(true);
    expect(canUseFeature('free', 'tarot_single')).toBe(true);
    expect(canUseFeature('free', 'numerology_basic')).toBe(true);
    expect(canUseFeature('free', 'destiny_journal')).toBe(true);

    // Premium features should be denied for Free tier
    expect(canUseFeature('free', 'tarot_all_spreads')).toBe(false);
    expect(canUseFeature('free', 'numerology_full')).toBe(false);
    expect(canUseFeature('free', 'relationship_analysis')).toBe(false);
    expect(canUseFeature('free', 'dream_analysis')).toBe(false);
    expect(canUseFeature('free', 'ai_memory')).toBe(false);
    expect(canUseFeature('free', 'destiny_synthesis')).toBe(false);
  });

  it('should grant Premium tier access to all features', () => {
    expect(canUseFeature('premium', 'daily_reading')).toBe(true);
    expect(canUseFeature('premium', 'tarot_single')).toBe(true);
    expect(canUseFeature('premium', 'tarot_all_spreads')).toBe(true);
    expect(canUseFeature('premium', 'numerology_full')).toBe(true);
    expect(canUseFeature('premium', 'relationship_analysis')).toBe(true);
    expect(canUseFeature('premium', 'dream_analysis')).toBe(true);
    expect(canUseFeature('premium', 'ai_memory')).toBe(true);
    expect(canUseFeature('premium', 'destiny_synthesis')).toBe(true);
  });

  it('should return correct daily limits for tiers', () => {
    expect(getUsageLimit('free', 'tarot_single')).toBe(1);
    expect(getUsageLimit('free', 'ai_chat_basic')).toBe(3);
    expect(getUsageLimit('free', 'tarot_all_spreads')).toBe(0);

    expect(getUsageLimit('premium', 'tarot_all_spreads')).toBe('unlimited');
    expect(getUsageLimit('premium', 'daily_reading')).toBe('unlimited');
  });
});
