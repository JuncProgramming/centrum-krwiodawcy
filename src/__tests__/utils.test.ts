import {
  calculateTaxRelief,
  getDonationsWordForm,
  normalizeType,
  calculateNextDonationDate
} from '@/utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { Donation } from '@/types';

describe('utils', () => {
  describe('normalizeType', () => {
    it.each([
      { input: 'Krew pełna', expected: 'krew_pelna' },
      { input: 'krew_pelna', expected: 'krew_pelna' },
      { input: 'Osocze', expected: 'osocze' },
      { input: 'osocze', expected: 'osocze' },
      { input: 'Płytki krwi', expected: 'plytki_krwi' },
      { input: 'plytki_krwi', expected: 'plytki_krwi' },
      { input: '', expected: 'krew_pelna' },
      { input: 'random', expected: 'krew_pelna' }
    ])(
      'should return $expected when $input is passed in',
      ({ input, expected }) => {
        expect(normalizeType(input)).toBe(expected);
      }
    );
  });

  describe('calculateNextDonationDate', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2025-01-01T12:00:00Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should apply correct wait times for same-type donations', () => {
      const krewResult = calculateNextDonationDate(
        '2025-01-01',
        'Krew pełna',
        'Krew pełna'
      );
      const osoczeResult = calculateNextDonationDate(
        '2025-01-01',
        'Osocze',
        'Osocze'
      );
      const plytkiResult = calculateNextDonationDate(
        '2025-01-01',
        'Płytki krwi',
        'Płytki krwi'
      );

      expect(krewResult.daysRemaining).toBe(56);
      expect(osoczeResult.daysRemaining).toBe(14);
      expect(plytkiResult.daysRemaining).toBe(14);
    });

    it('should apply 28-day wait time when switching from "Krew pełna" to other types', () => {
      const krewToOsoczeResult = calculateNextDonationDate(
        '2025-01-01',
        'Krew pełna',
        'Osocze'
      );
      const krewToPlytkiResult = calculateNextDonationDate(
        '2025-01-01',
        'Krew pełna',
        'Płytki krwi'
      );

      expect(krewToOsoczeResult.daysRemaining).toBe(28);
      expect(krewToPlytkiResult.daysRemaining).toBe(28);
    });

    it('should apply 2-day wait time for mixed combinations with the previous donation being "Osocze" or "Płytki krwi"', () => {
      const osoczeToKrewResult = calculateNextDonationDate(
        '2025-01-01',
        'Osocze',
        'Krew pełna'
      );
      const osoczeToPlytkiResult = calculateNextDonationDate(
        '2025-01-01',
        'Osocze',
        'Płytki krwi'
      );

      const plytkiToKrewResult = calculateNextDonationDate(
        '2025-01-01',
        'Płytki krwi',
        'Krew pełna'
      );
      const plytkiToOsoczeResult = calculateNextDonationDate(
        '2025-01-01',
        'Płytki krwi',
        'Osocze'
      );

      expect(osoczeToKrewResult.daysRemaining).toBe(2);
      expect(osoczeToPlytkiResult.daysRemaining).toBe(2);
      expect(plytkiToKrewResult.daysRemaining).toBe(2);
      expect(plytkiToOsoczeResult.daysRemaining).toBe(2);
    });

    it('should allow donation exactly on the calculated donation date (0 days remaining)', () => {
      const exactDateResult = calculateNextDonationDate(
        '2024-11-06',
        'Krew pełna',
        'Krew pełna'
      );

      expect(exactDateResult.daysRemaining).toBe(0);
      expect(exactDateResult.canDonate).toBe(true);
    });

    it('should not allow donation 1 day before the calculate donation date', () => {
      const oneDayBeforeResult = calculateNextDonationDate(
        '2024-11-07',
        'Krew pełna',
        'Krew pełna'
      );

      expect(oneDayBeforeResult.daysRemaining).toBe(1);
      expect(oneDayBeforeResult.canDonate).toBe(false);
    });

    it('should allow donation 1 day after the calculated donation date', () => {
      const oneDayAfterResult = calculateNextDonationDate(
        '2024-11-05',
        'Krew pełna',
        'Krew pełna'
      );

      expect(oneDayAfterResult.daysRemaining).toBe(0);
      expect(oneDayAfterResult.canDonate).toBe(true);
    });

    it('should calculate progress percentage correctly (0%, 50%, 100%)', () => {
      const zeroProgressResult = calculateNextDonationDate(
        '2025-01-01',
        'Krew pełna',
        'Krew pełna'
      );
      const fiftyProgressResult = calculateNextDonationDate(
        '2024-12-04',
        'Krew pełna',
        'Krew pełna'
      );
      const hundredProgressResult = calculateNextDonationDate(
        '2024-01-01',
        'Krew pełna',
        'Krew pełna'
      );

      expect(zeroProgressResult.progress).toBe(0);
      expect(fiftyProgressResult.progress).toBe(50);
      expect(hundredProgressResult.progress).toBe(100);
    });

    it.each([
      {
        params: { date: '2025-01-01', last: 'Krew pełna', next: 'Krew pełna' },
        expected: true
      },
      {
        params: { date: '2025-01-01', last: 'Krew pełna', next: 'Osocze' },
        expected: false
      },
      {
        params: { date: '2025-01-01', last: 'Krew pełna', next: 'Płytki krwi' },
        expected: false
      },
      {
        params: { date: '2025-01-01', last: 'Osocze', next: 'Krew pełna' },
        expected: false
      },
      {
        params: { date: '2025-01-01', last: 'Osocze', next: 'Osocze' },
        expected: false
      },
      {
        params: { date: '2025-01-01', last: 'Osocze', next: 'Płytki krwi' },
        expected: false
      },
      {
        params: { date: '2025-01-01', last: 'Płytki krwi', next: 'Krew pełna' },
        expected: false
      },
      {
        params: { date: '2025-01-01', last: 'Płytki krwi', next: 'Osocze' },
        expected: false
      },
      {
        params: {
          date: '2025-01-01',
          last: 'Płytki krwi',
          next: 'Płytki krwi'
        },
        expected: false
      }
    ])(
      'should display gender note only for $last to $next scenario',
      ({ params: { date, last, next }, expected }) => {
        const result = calculateNextDonationDate(date, last, next);
        expect(result.showGenderNote).toBe(expected);
      }
    );
  });
});

describe('calculateTaxRelief', () => {
  const fakeDonations = [
    { date: '2025-01-10', type: 'Krew pełna', amount: 450 },
    { date: '2025-05-12', type: 'Osocze', amount: 650 },
    { date: '2025-05-12', type: 'Płytki krwi', amount: 500 },
    { date: '2024-12-20', type: 'Krew pełna', amount: 450 },
    { date: '2023-07-02', type: 'Krew pełna', amount: 225 },
    { date: '2022-01-01', type: 'Krew pełna' } as unknown as Donation,
    { date: '2022-01-01', type: 'Osocze' } as unknown as Donation,
    { date: '2022-01-01', type: 'Płytki krwi' } as unknown as Donation
  ] as unknown as Donation[];

  it('should return 0 for both the count and taxRelief when there are no donations in a certain year', () => {
    expect(calculateTaxRelief(fakeDonations, 2020)).toEqual({
      amount: 0,
      donationCount: 0
    });
  });

  it('should return correct count and taxRelief only for the selected year', () => {
    expect(calculateTaxRelief(fakeDonations, 2025)).toEqual({
      amount: 208,
      donationCount: 3
    });
  });

  it('should return correct count and taxRelief when the amount is not the default amount', () => {
    expect(calculateTaxRelief(fakeDonations, 2023)).toEqual({
      amount: 29.25,
      donationCount: 1
    });
  });

  it('should return correct count and taxRelief when there is no amount provided (fallback to default values)', () => {
    expect(calculateTaxRelief(fakeDonations, 2022)).toEqual({
      amount: 175.5,
      donationCount: 3
    });
  });
});

describe('getDonationsWordForm', () => {
  it.each([
    { count: 0, expected: 'donacji' },
    { count: 1, expected: 'donacja' },
    { count: 2, expected: 'donacje' },
    { count: 5, expected: 'donacji' },
    { count: 12, expected: 'donacji' },
    { count: 22, expected: 'donacje' },
    { count: 25, expected: 'donacji' }
  ])('should return $expected for number $count', ({ count, expected }) => {
    expect(getDonationsWordForm(count)).toBe(expected);
  });
});
