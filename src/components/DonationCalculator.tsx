import { useState } from 'react';
import { type DonationType } from '@/types';
import { calculateNextDonationDate } from '@/utils';
import { DONATION_LABELS } from '@/constants';

export function DonationCalculator() {
  const [lastDonationDate, setLastDonationDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [lastDonationType, setLastDonationType] =
    useState<DonationType>('krew_pelna');
  const [nextDonationType, setNextDonationType] =
    useState<DonationType>('krew_pelna');
  const [calculatedNextDonationType, setCalculatedNextDonationType] =
    useState<DonationType | null>(null);
  const [nextDonationDate, setNextDonationDate] = useState<Date | null>(null);
  const [showGenderNote, setShowGenderNote] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { nextDonationDate, showGenderNote } = calculateNextDonationDate(
      lastDonationDate,
      lastDonationType,
      nextDonationType
    );

    setNextDonationDate(nextDonationDate);
    setShowGenderNote(showGenderNote);
    setCalculatedNextDonationType(nextDonationType);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='space-y-6'>
        <div className='flex flex-col'>
          <label htmlFor='date' className='mb-1 font-medium text-zinc-600'>
            Data ostatniej donacji:
          </label>
          <input
            type='date'
            id='date'
            required
            value={lastDonationDate}
            onChange={(e) => setLastDonationDate(e.target.value)}
            className='p-2 border border-zinc-300 rounded-md w-full'
          />
        </div>

        <div className='flex flex-col'>
          <label className='mb-2 font-medium text-zinc-600'>
            Co oddano (ostatnio):
          </label>
          <div className='space-y-2'>
            <label className='flex items-center p-3 border border-zinc-300 rounded-md cursor-pointer hover:bg-zinc-50 transition-colors'>
              <input
                type='radio'
                name='lastDonationType'
                value='krew_pelna'
                checked={lastDonationType === 'krew_pelna'}
                onChange={(e) =>
                  setLastDonationType(e.target.value as DonationType)
                }
                className='w-4 h-4 text-red-600 focus:ring-red-500'
              />
              <span className='ml-3 text-zinc-700'>
                {DONATION_LABELS.krew_pelna}
              </span>
            </label>
            <label className='flex items-center p-3 border border-zinc-300 rounded-md cursor-pointer hover:bg-zinc-50 transition-colors'>
              <input
                type='radio'
                name='lastDonationType'
                value='osocze'
                checked={lastDonationType === 'osocze'}
                onChange={(e) =>
                  setLastDonationType(e.target.value as DonationType)
                }
                className='w-4 h-4 text-red-600 focus:ring-red-500'
              />
              <span className='ml-3 text-zinc-700'>
                {DONATION_LABELS.osocze} (Plazma)
              </span>
            </label>
            <label className='flex items-center p-3 border border-zinc-300 rounded-md cursor-pointer hover:bg-zinc-50 transition-colors'>
              <input
                type='radio'
                name='lastDonationType'
                value='plytki_krwi'
                checked={lastDonationType === 'plytki_krwi'}
                onChange={(e) =>
                  setLastDonationType(e.target.value as DonationType)
                }
                className='w-4 h-4 text-red-600 focus:ring-red-500'
              />
              <span className='ml-3 text-zinc-700'>
                {DONATION_LABELS.plytki_krwi} (Trombocyty)
              </span>
            </label>
          </div>
        </div>

        <div className='flex flex-col'>
          <label className='mb-2 font-medium text-zinc-600'>
            Co chcesz oddać (teraz):
          </label>
          <div className='space-y-2'>
            <label className='flex items-center p-3 border border-zinc-300 rounded-md cursor-pointer hover:bg-zinc-50 transition-colors'>
              <input
                type='radio'
                name='nextDonationType'
                value='krew_pelna'
                checked={nextDonationType === 'krew_pelna'}
                onChange={(e) =>
                  setNextDonationType(e.target.value as DonationType)
                }
                className='w-4 h-4 text-red-600 focus:ring-red-500'
              />
              <span className='ml-3 text-zinc-700'>
                {DONATION_LABELS.krew_pelna}
              </span>
            </label>
            <label className='flex items-center p-3 border border-zinc-300 rounded-md cursor-pointer hover:bg-zinc-50 transition-colors'>
              <input
                type='radio'
                name='nextDonationType'
                value='osocze'
                checked={nextDonationType === 'osocze'}
                onChange={(e) =>
                  setNextDonationType(e.target.value as DonationType)
                }
                className='w-4 h-4 text-red-600 focus:ring-red-500'
              />
              <span className='ml-3 text-zinc-700'>
                {DONATION_LABELS.osocze} (Plazma)
              </span>
            </label>
            <label className='flex items-center p-3 border border-zinc-300 rounded-md cursor-pointer hover:bg-zinc-50 transition-colors'>
              <input
                type='radio'
                name='nextDonationType'
                value='plytki_krwi'
                checked={nextDonationType === 'plytki_krwi'}
                onChange={(e) =>
                  setNextDonationType(e.target.value as DonationType)
                }
                className='w-4 h-4 text-red-600 focus:ring-red-500'
              />
              <span className='ml-3 text-zinc-700'>
                {DONATION_LABELS.plytki_krwi} (Trombocyty)
              </span>
            </label>
          </div>
        </div>
      </div>

      <button
        type='submit'
        className='w-full mt-3 bg-red-600 text-white font-semibold py-3 rounded-md hover:bg-red-700 transition-colors cursor-pointer'
      >
        Sprawdź termin
      </button>

      <div className='space-y-3 mt-3'>
        {nextDonationDate && calculatedNextDonationType && (
          <div className='text-center bg-green-100 p-4 rounded-md'>
            <p className='font-medium text-green-800'>
              Możesz znów oddać{' '}
              {calculatedNextDonationType === 'krew_pelna'
                ? 'krew pełną'
                : calculatedNextDonationType === 'osocze'
                  ? 'osocze'
                  : 'płytki krwi'}{' '}
              od:
            </p>
            <p className='text-2xl font-bold text-green-900'>
              {nextDonationDate.toLocaleDateString('pl-PL')}
            </p>
          </div>
        )}

        {showGenderNote && (
          <div className='bg-yellow-100 p-3 rounded-md w-full'>
            <p className='text-sm text-yellow-800 text-center wrap-break-word whitespace-normal'>
              <strong>Ważne:</strong> Minimalna przerwa pomiędzy donacjami to 56
              dni. Ze względu na roczne limity (6 donacji dla mężczyzn, 4 dla
              kobiet), kobietom zaleca się dłuższą przerwę - 84 dni.
            </p>
          </div>
        )}

        <p className='text-xs text-zinc-500 text-center mt-6'>
          Pamiętaj, że jest to data orientacyjna. Ostateczną decyzję o Twojej
          zdolności do oddania krwi zawsze podejmuje lekarz.
        </p>
      </div>
    </form>
  );
}
