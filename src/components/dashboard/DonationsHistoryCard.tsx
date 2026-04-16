import { Plus } from 'lucide-react';
import { DonationItem } from './DashboardDonationItem';
import type { DonationsHistoryCardProps } from '@/types';
import { BaseDashboardCard } from '@/components/dashboard/BaseDashboardCard';

const DonationsHistoryCard = ({
  donations,
  onClick,
  onDelete,
  onUpload,
  onViewResult
}: DonationsHistoryCardProps) => {
  return (
    <BaseDashboardCard title='Historia donacji'>
      {donations.length === 0 ? (
        <div className='flex flex-col grow'>
          <p className='text-zinc-600 text-sm'>Brak zapisanych donacji.</p>
        </div>
      ) : (
        <ul className='flex flex-col grow gap-3'>
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
        className='w-full mt-3 bg-red-600 text-white font-semibold py-2.5 px-6 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer'
      >
        <Plus size={20} aria-hidden='true' />
        Dodaj donację
      </button>
    </BaseDashboardCard>
  );
};

export default DonationsHistoryCard;
