import { useEffect, useRef, useState } from 'react';
import { Droplet, Plus } from 'lucide-react';
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
  const internalListRef = useRef<HTMLUListElement | null>(null);
  const listEndRef = useRef<HTMLLIElement | null>(null);
  const [hasMoreBelow, setHasMoreBelow] = useState(false);
  const lastKeydownAt = useRef(0);
  const [showFocusRing, setShowFocusRing] = useState(false);

  useEffect(() => {
    const trackKeydown = () => {
      lastKeydownAt.current = performance.now();
    };
    document.addEventListener('keydown', trackKeydown, true);
    return () => document.removeEventListener('keydown', trackKeydown, true);
  }, []);

  useEffect(() => {
    const list = internalListRef.current;
    const listEnd = listEndRef.current;
    if (!list || !listEnd || typeof IntersectionObserver === 'undefined')
      return;

    const observer = new IntersectionObserver(
      ([entry]) => setHasMoreBelow(!entry.isIntersecting),
      { root: list }
    );
    observer.observe(listEnd);

    return () => observer.disconnect();
  }, [donations]);

  return (
    <BaseDashboardCard title='Historia donacji' className='min-h-0'>
      {donations.length === 0 ? (
        <div className='mx-3 flex flex-col grow items-center justify-center gap-3 rounded-md border border-dashed border-zinc-300 px-6 py-10 text-center'>
          <div className='flex h-12 w-12 items-center justify-center rounded-full bg-red-50'>
            <Droplet className='text-red-600' size={24} aria-hidden='true' />
          </div>
          <div>
            <p className='font-semibold text-zinc-800'>
              Brak zapisanych donacji
            </p>
            <p className='mt-1 text-sm text-zinc-600'>
              Dodaj swoją pierwszą donację, aby śledzić terminy kolejnych wizyt
              i zdobywać odznaki.
            </p>
          </div>
        </div>
      ) : (
        <div className='relative flex min-h-0 grow flex-col'>
          {/* tabIndex makes the list keyboard-scrollable once it overflows;
              without it arrow keys cannot reach the clipped donations. */}
          <ul
            ref={(node) => {
              internalListRef.current = node;
              if (listRef) listRef.current = node;
            }}
            tabIndex={0}
            aria-label='Lista donacji'
            onFocus={(e) => {
              if (e.target === e.currentTarget)
                setShowFocusRing(
                  performance.now() - lastKeydownAt.current < 150
                );
            }}
            onBlur={(e) => {
              if (e.target === e.currentTarget) setShowFocusRing(false);
            }}
            onPointerDown={() => setShowFocusRing(false)}
            className='flex flex-col grow min-h-0 gap-3 overflow-y-auto overscroll-contain px-3 rounded-md outline-none'
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
            <li
              ref={listEndRef}
              aria-hidden='true'
              className='h-px shrink-0 -mt-3'
            />
          </ul>

          <div
            aria-hidden='true'
            className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-linear-to-t from-zinc-50 to-transparent transition-opacity duration-300 ${
              hasMoreBelow ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div
            aria-hidden='true'
            className={`pointer-events-none absolute inset-x-3 inset-y-0 z-20 rounded-md outline-2 outline-offset-2 ${
              showFocusRing ? 'outline-zinc-800' : 'outline-transparent'
            }`}
          />
        </div>
      )}

      <button
        onClick={onClick}
        className={`mx-3 mt-3 shrink-0 bg-red-600 text-white font-semibold py-2.5 px-6 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer ${controlFocusClass}`}
      >
        <Plus size={20} aria-hidden='true' />
        Dodaj donację
      </button>
    </BaseDashboardCard>
  );
};

export default DonationsHistoryCard;
