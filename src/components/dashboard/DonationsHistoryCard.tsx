import { Plus } from 'lucide-react';
import { DonationItem } from './DashboardDonationItem';
import type { DonationsHistoryCardProps } from '@/types';
import { BaseDashboardCard } from '@/components/dashboard/BaseDashboardCard';
import { controlFocusClass } from '@/constants';

const DonationsHistoryCard = ({
  donations,
  onClick,
  onDelete,
  onUpload,
  onViewResult,
  listRef
}: DonationsHistoryCardProps) => {
  return (
    <BaseDashboardCard title='Historia donacji' className='min-h-0'>
      {donations.length === 0 ? (
        <div className='flex flex-col grow'>
          <p className='text-zinc-600 text-sm'>Brak zapisanych donacji.</p>
        </div>
      ) : (
        // tabIndex makes the list keyboard-scrollable once it overflows;
        // without it arrow keys cannot reach the clipped donations.
        <ul
          ref={listRef}
          tabIndex={0}
          aria-label='Lista donacji'
          className={`flex flex-col grow min-h-0 gap-3 overflow-y-auto overscroll-contain pr-1 rounded-md ${controlFocusClass}`}
        >
          {donations.map((donation) => (
            <DonationItem
              key={donation.id}
              donation={donation}
              onDelete={onDelete}
              onUpload={onUpload}
              onViewResult={onViewResult}
            />
          ))}
        </ul>
      )}

      <button
        onClick={onClick}
        className={`w-full mt-3 shrink-0 bg-red-600 text-white font-semibold py-2.5 px-6 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer ${controlFocusClass}`}
      >
        <Plus size={20} aria-hidden='true' />
        Dodaj donację
      </button>
    </BaseDashboardCard>
  );
};

export default DonationsHistoryCard;
