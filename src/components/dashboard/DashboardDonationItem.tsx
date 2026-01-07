import { Paperclip, Trash2, Calendar, MapPin, FileText } from 'lucide-react';
import { type Donation } from '@/types';
import { useRef } from 'react';
import { DONATION_LABELS } from '@/constants';

export function DonationItem({
  donation,
  onDelete,
  onUpload,
  onViewResult
}: {
  donation: Donation;
  onDelete: (id: string) => void;
  onUpload: (id: string, file: File) => void;
  onViewResult: (path: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(donation.id, file);
    }
  };

  return (
    <div className='p-3 sm:p-4 bg-white border border-zinc-200 rounded-md transition-shadow hover:shadow-sm flex justify-between items-start gap-3 sm:gap-4'>
      <div className='min-w-0 flex-1'>
        <div className='flex flex-wrap items-center gap-x-2 gap-y-1 mb-1.5'>
          <p className='font-semibold text-zinc-800'>
            {DONATION_LABELS[donation.type]}
          </p>
          {donation.amount > 0 && (
            <span className='text-xs text-red-700 bg-red-100 px-2 py-0.5 rounded-full whitespace-nowrap'>
              {donation.amount} ml
            </span>
          )}
        </div>
        <div className='flex items-center gap-1.5 text-sm text-zinc-600 mb-1'>
          <Calendar size={14} className='shrink-0' />
          <span className='mt-0.5'>
            {new Date(donation.date).toLocaleDateString('pl-PL')}
          </span>
        </div>
        <div className='flex items-center gap-1.5 text-xs text-zinc-500'>
          <MapPin size={14} className='shrink-0' />
          <span className='mt-0.5'>{donation.location}</span>
        </div>
      </div>

      <div className='flex flex-col min-[360px]:flex-row gap-2 shrink-0'>
        {donation.results_url ? (
          <button
            onClick={() => onViewResult(donation.results_url!)}
            className='p-2 border cursor-pointer border-blue-200 rounded-md text-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors'
            title='Zobacz wyniki badań'
          >
            <FileText size={20} />
          </button>
        ) : (
          <>
            <input
              type='file'
              // Doing this, because the default shit is ugly and it needs to get clicked programmatically
              ref={fileInputRef}
              className='hidden'
              accept='.pdf,.jpg,.jpeg,.png'
              onChange={handleFileChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className='p-2 border cursor-pointer border-zinc-200 rounded-md text-zinc-500 hover:text-zinc-600 hover:bg-zinc-50 transition-colors'
              title='Dodaj wyniki badań'
            >
              <Paperclip size={20} />
            </button>
          </>
        )}
        <button
          onClick={() => onDelete(donation.id)}
          className='p-2 border cursor-pointer border-zinc-200 rounded-md text-zinc-500 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors'
          title='Usuń donację'
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
