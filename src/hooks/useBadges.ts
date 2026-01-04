import { useMemo } from 'react';
import type { useBadgesArgs } from '@/types';
import { badges } from '@/data/badges';
import { normalizeType } from '@/utils';
import { TYPE_VOLUME_MULTIPLIER } from '@/constants';

export const useBadges = ({ donations, gender }: useBadgesArgs) => {
  const stats = useMemo(() => {
    // To confirm with the RCKiK, don't know the convertion
    const totalLiters = donations.reduce((acc, curr) => {
      let volume = 0;
      if (curr.amount) {
        volume = curr.amount / 1000;
      } else {
        const type = normalizeType(
          curr.type
        ) as keyof typeof TYPE_VOLUME_MULTIPLIER;
        volume = TYPE_VOLUME_MULTIPLIER[type] || 0;
      }
      return acc + volume;
    }, 0);

    const badgesWithStatus = badges.map((badge) => {
      const threshold = badge.thresholdLiters(gender);
      const isUnlocked = totalLiters >= threshold;
      return { ...badge, isUnlocked, threshold };
    });

    const unlockedBadges = badgesWithStatus.filter((badge) => badge.isUnlocked);
    const nextBadge = badgesWithStatus.find((badge) => !badge.isUnlocked);
    const latestUnlockedBadge = unlockedBadges.at(-1) || null;

    let progress = 0;
    let missingLiters = 0;
    let nextGoalValue = 0;

    if (nextBadge) {
      nextGoalValue = nextBadge.threshold;
      const prevThreshold = latestUnlockedBadge
        ? latestUnlockedBadge.threshold
        : 0;
      const range = nextGoalValue - prevThreshold;
      const currentProgress = totalLiters - prevThreshold;
      progress = Math.min(Math.max((currentProgress / range) * 100, 0), 100);
      missingLiters = Math.max(0, nextGoalValue - totalLiters);
    } else if (latestUnlockedBadge) {
      progress = 100;
      nextGoalValue = latestUnlockedBadge.threshold;
    }

    return {
      totalLiters,
      badges: badgesWithStatus,
      currentBadge: latestUnlockedBadge,
      nextBadge,
      progress,
      missingLiters: missingLiters.toFixed(2),
      nextGoalValue
    };
  }, [donations, gender]);

  return stats;
};
