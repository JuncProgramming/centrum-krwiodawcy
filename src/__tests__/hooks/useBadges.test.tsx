import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBadges } from '@/hooks/useBadges';
import type { Donation } from '@/types';
import { TYPE_VOLUME_MULTIPLIER } from '@/constants';

const fakeDonation: Donation = {
  id: '1',
  date: '2023-01-01',
  location: 'Warszawa',
  type: 'krew_pelna',
  amount: 450
};

describe('useBadges Hook', () => {
  it('should return zero stats and first badge as next goal when user has no donations', () => {
    const { result } = renderHook(() =>
      useBadges({ donations: [], gender: 'male' })
    );

    expect(result.current.totalLiters).toBe(0);
    expect(result.current.currentBadge).toBeNull();
    expect(result.current.nextBadge).toBeDefined();
    expect(result.current.progress).toBe(0);
  });

  it('should correctly calculate total liters from donation amounts', () => {
    const donations: Donation[] = [fakeDonation, fakeDonation];

    const { result } = renderHook(() =>
      useBadges({ donations, gender: 'male' })
    );

    expect(result.current.totalLiters).toBe(0.9);
    expect(result.current.missingLiters).toBe('5.10');
  });

  it('should unlock badge when threshold is reached', () => {
    const manyDonations: Donation[] = Array(14).fill(fakeDonation);

    const { result } = renderHook(() =>
      useBadges({ donations: manyDonations, gender: 'male' })
    );

    expect(result.current.currentBadge).not.toBeNull();
    expect(result.current.currentBadge?.id).toMatch(/bronze/i);
    expect(result.current.progress).toBeGreaterThan(0);
  });

  it('should apply different thresholds for female gender', () => {
    const donationsFor5Liters: Donation[] = Array(12).fill(fakeDonation);

    const { result: resultMale } = renderHook(() =>
      useBadges({ donations: donationsFor5Liters, gender: 'male' })
    );

    const { result: resultFemale } = renderHook(() =>
      useBadges({ donations: donationsFor5Liters, gender: 'female' })
    );

    expect(resultMale.current.currentBadge?.id).toBeFalsy();
    expect(resultFemale.current.currentBadge?.id).not.toBeNull();
    expect(resultFemale.current.currentBadge?.id).toMatch(/bronze/i);
  });

  it('should handle max level correctly', () => {
    const hugeDonation: Donation = { ...fakeDonation, amount: 100000 };

    const { result } = renderHook(() =>
      useBadges({ donations: [hugeDonation], gender: 'male' })
    );

    expect(result.current.nextBadge).toBeFalsy();
    expect(result.current.progress).toBe(100);
    expect(Number(result.current.missingLiters)).toBe(0);
  });

  it('should correctly sum up volumes from different donation types', () => {
    const mixedDonations: Donation[] = [
      { ...fakeDonation },
      { ...fakeDonation, type: 'osocze' }
    ];

    const { result } = renderHook(() =>
      useBadges({ donations: mixedDonations, gender: 'male' })
    );

    expect(result.current.totalLiters).toBe(1.05);
  });

  it('should use default multiplier when donation amount is missing or zero', () => {
    const donationWithoutAmount: Donation = {
      ...fakeDonation,
      amount: 0
    };

    const { result } = renderHook(() =>
      useBadges({ donations: [donationWithoutAmount], gender: 'male' })
    );

    expect(result.current.totalLiters).toBe(
      TYPE_VOLUME_MULTIPLIER['krew_pelna']
    );
  });
});
