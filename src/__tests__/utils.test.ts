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
    it('should return "krew_pelna" when "Krew pełna" or "krew_pelna" is passed in', () => {
      expect(normalizeType('Krew pełna')).toBe('krew_pelna');
      expect(normalizeType('krew_pelna')).toBe('krew_pelna');
    });

    it('should return "osocze" when "Osocze" or "osocze" is passed in', () => {
      expect(normalizeType('Osocze')).toBe('osocze');
      expect(normalizeType('osocze')).toBe('osocze');
    });

    it('should return "plytki_krwi" when "Płytki krwi" or "plytki_krwi" is passed in', () => {
      expect(normalizeType('Płytki krwi')).toBe('plytki_krwi');
      expect(normalizeType('plytki_krwi')).toBe('plytki_krwi');
    });

    it('should return "krew_pelna" when an empty string is passed in', () => {
      expect(normalizeType('')).toBe('krew_pelna');
    });

    it('should return "krew_pelna" when string other than the set strings is passed in', () => {
      expect(normalizeType('random')).toBe('krew_pelna');
      expect(normalizeType('abc')).toBe('krew_pelna');
      expect(normalizeType('123')).toBe('krew_pelna');
    });
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

    it('should display gender note only for "Krew pełna" to "Krew pełna" scenario', () => {
      const krewToKrewResult = calculateNextDonationDate(
        '2025-01-01',
        'Krew pełna',
        'Krew pełna'
      );
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
      const osoczeToKrewResult = calculateNextDonationDate(
        '2025-01-01',
        'Osocze',
        'Krew pełna'
      );
      const osoczeToOsoczeResult = calculateNextDonationDate(
        '2025-01-01',
        'Osocze',
        'Osocze'
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
      const plytkiToPlytkiResult = calculateNextDonationDate(
        '2025-01-01',
        'Płytki krwi',
        'Płytki krwi'
      );

      expect(krewToKrewResult.showGenderNote).toBe(true);
      expect(krewToOsoczeResult.showGenderNote).toBe(false);
      expect(krewToPlytkiResult.showGenderNote).toBe(false);
      expect(osoczeToKrewResult.showGenderNote).toBe(false);
      expect(osoczeToOsoczeResult.showGenderNote).toBe(false);
      expect(osoczeToPlytkiResult.showGenderNote).toBe(false);
      expect(plytkiToKrewResult.showGenderNote).toBe(false);
      expect(plytkiToOsoczeResult.showGenderNote).toBe(false);
      expect(plytkiToPlytkiResult.showGenderNote).toBe(false);
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
    it('should return "donacji" when the number passed in is 0', () => {
      expect(getDonationsWordForm(0)).toBe('donacji');
    });

    it('should return "donacja" when the number passed in is 1', () => {
      expect(getDonationsWordForm(1)).toBe('donacja');
    });

    it('should return "donacje" when the number passed in is 2, 3 or 4', () => {
      expect(getDonationsWordForm(2)).toBe('donacje');
      expect(getDonationsWordForm(3)).toBe('donacje');
      expect(getDonationsWordForm(4)).toBe('donacje');
    });

    it('should return "donacji" when the number passed in is between 5 and 21', () => {
      expect(getDonationsWordForm(5)).toBe('donacji');
      expect(getDonationsWordForm(12)).toBe('donacji');
      expect(getDonationsWordForm(21)).toBe('donacji');
    });

    it('should return "donacje" when the number passed in has the second digit as a 2, 3 or 4', () => {
      expect(getDonationsWordForm(22)).toBe('donacje');
      expect(getDonationsWordForm(23)).toBe('donacje');
      expect(getDonationsWordForm(24)).toBe('donacje');

      expect(getDonationsWordForm(32)).toBe('donacje');
      expect(getDonationsWordForm(43)).toBe('donacje');
      expect(getDonationsWordForm(54)).toBe('donacje');

      expect(getDonationsWordForm(62)).toBe('donacje');
      expect(getDonationsWordForm(73)).toBe('donacje');
      expect(getDonationsWordForm(84)).toBe('donacje');
    });
  });
});
