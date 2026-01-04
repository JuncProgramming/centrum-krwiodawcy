import type { BadgesCardProps } from '@/types';
import { Medal } from 'lucide-react';
import { useBadges } from '@/hooks/useBadges';
import { getDonationsWordForm } from '@/utils';

const BadgeGoalCard = ({ donations, gender }: BadgesCardProps) => {
  const { nextBadge, currentBadge, progress, missingLiters } = useBadges({
    donations,
    gender
  });

  const missingDonations = Math.ceil(parseFloat(missingLiters) / 0.45);

  const formattedLiters = Number(Number(missingLiters).toFixed(2));
  const donationsWord = getDonationsWordForm(missingDonations);

  if (!nextBadge && currentBadge) {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-3'>
          <div className={`p-2 rounded-full ${currentBadge.colors.bg}`}>
            <Medal className={`w-6 h-6 ${currentBadge.colors.text}`} />
          </div>
          <div>
            <p className='text-sm font-medium text-zinc-500'>Osiągnięto cel</p>
            <h3 className='text-lg font-bold text-zinc-800'>
              {currentBadge.name}
            </h3>
          </div>
        </div>
      </div>
    );
  }

  const targetBadge = nextBadge || currentBadge;
  if (!targetBadge) return null;

  return (
    <div className='flex flex-col gap-4 mt-2'>
      <div className='flex items-center gap-3'>
        <div className={`p-2 rounded-full ${targetBadge.colors.bg}`}>
          <Medal className={`w-6 h-6 ${targetBadge.colors.text}`} />
        </div>
        <div>
          <p className='text-sm font-medium text-zinc-500'>Następny cel</p>
          <h3 className='text-lg font-bold text-zinc-800'>
            {targetBadge.name}
          </h3>
        </div>
      </div>

      <div className='space-y-2'>
        <div className='w-full bg-zinc-100 rounded-full h-4 overflow-hidden'>
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${targetBadge.colors.progress}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className='text-sm text-zinc-600'>
          Brakuje Ci <span className='font-bold'>{formattedLiters} L</span> (ok.{' '}
          {missingDonations} {donationsWord})
        </p>
      </div>
    </div>
  );
};

export default BadgeGoalCard;
