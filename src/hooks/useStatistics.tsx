import type { useStatisticsArgs } from '@/types';
import { normalizeType } from '@/utils';
import { useMemo } from 'react';

export function useStatistics({ donations }: useStatisticsArgs) {
  const stats = useMemo(() => {
    const rawStatsByType = donations.reduce(
      (acc, curr) => {
        const type = normalizeType(curr.type);
        let volume = 0;
        volume = curr.amount / 1000;
        acc.total += volume;

        if (type === 'krew_pelna') acc.krew_pelna += volume;
        if (type === 'osocze') acc.osocze += volume;
        if (type === 'plytki_krwi') acc.plytki_krwi += volume;

        return acc;
      },
      { total: 0, krew_pelna: 0, osocze: 0, plytki_krwi: 0 }
    );

    const statsByType = {
      total: parseFloat(rawStatsByType.total.toFixed(2)),
      krew_pelna: parseFloat(rawStatsByType.krew_pelna.toFixed(2)),
      osocze: parseFloat(rawStatsByType.osocze.toFixed(2)),
      plytki_krwi: parseFloat(rawStatsByType.plytki_krwi.toFixed(2))
    };

    const totalLiters = parseFloat(statsByType.total.toFixed(2));

    const savedLives = Math.floor((totalLiters / 0.45) * 3);

    const totalDonations = donations.length;
    const lastDonationDate =
      donations.length > 0
        ? new Date(
            Math.max(...donations.map((d) => new Date(d.date).getTime()))
          )
        : null;

    return {
      statsByType,
      savedLives,
      totalDonations,
      lastDonationDate
    };
  }, [donations]);

  return stats;
}
