import { useState, useRef, useEffect } from 'react';
import { BaseDashboardCard } from './BaseDashboardCard';
import { calculateTaxRelief } from '@/utils';
import type { DonationCalculatorProps } from '@/types';
import { ChevronDown } from 'lucide-react';

const currentYear = new Date().getFullYear();

export function TaxReliefCalculator({ donations }: DonationCalculatorProps) {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsYearPickerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { amount, donationCount } = calculateTaxRelief(donations, selectedYear);

  const years = Array.from(
    new Set(donations.map((donation) => new Date(donation.date).getFullYear()))
  )
    .sort((a, b) => b - a)
    .filter((year) => year <= currentYear);

  if (!years.includes(currentYear)) {
    years.unshift(currentYear);
  }

  return (
    <BaseDashboardCard title='Kalkulator ulgi podatkowej'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4'>
          <div className='w-full relative' ref={pickerRef}>
            <button
              type='button'
              className='w-full bg-white border border-zinc-200 shadow-xs text-zinc-800 px-4 py-3 text-sm font-medium rounded-lg flex items-center justify-between transition-all hover:bg-zinc-50 cursor-pointer'
              onClick={() => setIsYearPickerOpen(!isYearPickerOpen)}
            >
              <span>{selectedYear}</span>
              <ChevronDown
                size={16}
                className={`text-zinc-400 transition-transform duration-200 ${
                  isYearPickerOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isYearPickerOpen && (
              <div className='absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-lg shadow-lg z-10 overflow-hidden'>
                <div className='max-h-60 overflow-y-auto p-1 no-scrollbar'>
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setSelectedYear(year);
                        setIsYearPickerOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-sm font-medium rounded-md transition-all text-left mb-1 last:mb-0 flex items-center justify-between cursor-pointer ${
                        selectedYear === year
                          ? 'bg-zinc-100 text-zinc-900'
                          : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'
                      }`}
                    >
                      {year}
                      {selectedYear === year && (
                        <div className='w-1.5 h-1.5 rounded-full bg-red-500' />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className='bg-white p-4 rounded-lg border border-zinc-200 flex flex-col items-center justify-center text-center shadow-sm'>
            <span className='text-zinc-800 font-bold text-3xl mt-2'>
              {amount.toFixed(2)} zł
            </span>
            <span className='text-zinc-500 text-sm font-medium mt-1'>
              Wysokość ulgi podatkowej
            </span>
            <span className='text-zinc-400 text-xs mt-0.5 mb-2'>
              Wyliczono na podstawie {donationCount} donacji w {selectedYear}{' '}
              roku
            </span>
          </div>
        </div>

        <a
          href='https://www.gov.pl/web/nck/po-donacji'
          target='_blank'
          rel='noopener noreferrer'
          className='font-semibold mt-2 text-red-600 hover:underline text-xs text-center block transition-colors'
        >
          Dowiedz się więcej o uldze podatkowej dla krwiodawców
        </a>
      </div>
    </BaseDashboardCard>
  );
}
