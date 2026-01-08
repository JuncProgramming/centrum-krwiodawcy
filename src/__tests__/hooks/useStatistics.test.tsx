import { useStatistics } from '@/hooks/useStatistics';
import { renderHook } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import type { Donation } from '@/types';

describe('useStatistics', () => {
  it('should return default zero values and null date when the donations list is empty', () => {
    const { result } = renderHook(() => useStatistics({ donations: [] }));

    expect(result.current.statsByType.total).toBe(0);
    expect(result.current.statsByType.krew_pelna).toBe(0);
    expect(result.current.statsByType.osocze).toBe(0);
    expect(result.current.statsByType.plytki_krwi).toBe(0);
    expect(result.current.totalDonations).toBe(0);
    expect(result.current.savedLives).toBe(0);
    expect(result.current.lastDonationDate).toBeNull();
  });

  it('should calculate all statistics (total, types, saved lives) correctly', () => {
    const fakeDonations = [
      {
        id: '1',
        date: '2023-01-15T10:00:00.000Z',
        amount: 450,
        type: 'krew_pelna'
      },
      {
        id: '2',
        date: '2023-02-15T10:00:00.000Z',
        amount: 600,
        type: 'osocze'
      },
      {
        id: '3',
        date: '2023-03-15T10:00:00.000Z',
        amount: 500,
        type: 'plytki_krwi'
      },
      {
        id: '4',
        date: '2023-05-15T10:00:00.000Z',
        amount: 250,
        type: 'plytki_krwi'
      },
      {
        id: '4',
        date: '2023-01-15T10:00:00.000Z',
        amount: 400,
        type: 'krew_pelna'
      }
    ];

    const { result } = renderHook(() =>
      useStatistics({ donations: fakeDonations as unknown as Donation[] })
    );

    expect(result.current.statsByType.total).toBe(2.2);
    expect(result.current.statsByType.krew_pelna).toBe(0.85);
    expect(result.current.statsByType.osocze).toBe(0.6);
    expect(result.current.statsByType.plytki_krwi).toBe(0.75);
    expect(result.current.totalDonations).toBe(5);
    expect(result.current.savedLives).toBe(14);
  });

  it('should identify the most recent donation date regardless of the array order', () => {
    const unsortedDonations = [
      {
        id: '1',
        date: '2020-01-01T10:00:00.000Z',
        amount: 450,
        type: 'krew_pelna'
      },
      {
        id: '2',
        date: '2025-05-20T12:00:00.000Z',
        amount: 450,
        type: 'krew_pelna'
      },
      {
        id: '3',
        date: '2022-11-15T08:30:00.000Z',
        amount: 450,
        type: 'krew_pelna'
      }
    ];

    const { result } = renderHook(() =>
      useStatistics({ donations: unsortedDonations as unknown as Donation[] })
    );

    expect(result.current.lastDonationDate).toEqual(
      new Date('2025-05-20T12:00:00.000Z')
    );
  });
});
