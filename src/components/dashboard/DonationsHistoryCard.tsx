import { Plus } from 'lucide-react';
import { DonationItem } from './DashboardDonationItem';
import type { DonationsHistoryCardProps } from '@/types';
import { BaseDashboardCard } from './BaseDashboardCard';

const DonationsHistoryCard = ({
  donations,
  onClick,
  onDelete,
  onUpload,
  onViewResult
}: DonationsHistoryCardProps) => {
  return (
    <BaseDashboardCard title='Historia donacji'>
      <div className='flex flex-col grow'>
        {donations.length === 0 ? (
          <p className='text-zinc-500 text-sm mb-2'>Brak zapisanych donacji.</p>
        ) : (
          donations.map((donation, index) => (
            <div
              key={donation.id}
              className={index === donations.length - 1 ? '' : 'mb-3'}
            >
              <DonationItem
                donation={donation}
                onDelete={onDelete}
                onUpload={onUpload}
                onViewResult={onViewResult}
              />
            </div>
          ))
        )}
      </div>
      <button
        onClick={onClick}
        className='w-full mt-3 bg-red-600 text-white font-semibold py-2.5 px-6 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer'
      >
        <Plus size={20} />
        Dodaj donację
      </button>
    </BaseDashboardCard>
  );
};

export default DonationsHistoryCard;
