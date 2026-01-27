import { useState } from 'react';
import type { BadgesCardProps } from '@/types';
import { Medal, ChevronDown } from 'lucide-react';
import { useBadges } from '@/hooks/useBadges';

const BadgesGalleryCard = ({ donations, gender }: BadgesCardProps) => {
  const { badges } = useBadges({ donations, gender });
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between'>
        <span className='font-medium text-zinc-700'>Galeria odznak</span>
        <button
          onClick={() => setIsGalleryOpen(!isGalleryOpen)}
          className='p-2 rounded-md hover:bg-zinc-100 transition-colors cursor-pointer'
          aria-label={isGalleryOpen ? 'Zwiń galerię' : 'Rozwiń galerię'}
        >
          <ChevronDown
            className={`shrink-0 transition-transform duration-200 ${
              isGalleryOpen ? 'rotate-180' : ''
            }`}
            size={20}
          />
        </button>
      </div>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isGalleryOpen
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className='overflow-hidden'>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-2 pt-4'>
            {badges.map((badge) => {
              const isUnlocked = badge.isUnlocked;

              return (
                <div
                  key={badge.id}
                  className={`
                    relative flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all
                    ${isUnlocked ? `${badge.colors.bg} ${badge.colors.border}` : 'bg-zinc-50 border-zinc-200 grayscale opacity-60'}
                  `}
                >
                  <div
                    className={`p-2 rounded-full mb-2 ${isUnlocked ? 'bg-white/50' : 'bg-zinc-200'}`}
                  >
                    <Medal
                      className={`w-6 h-6 ${isUnlocked ? badge.colors.text : 'text-zinc-500'}`}
                    />
                  </div>

                  <div className='space-y-0.5'>
                    <p
                      className={`text-xs font-bold uppercase tracking-wider ${isUnlocked ? badge.colors.text : 'text-zinc-500'}`}
                    >
                      {badge.name}
                    </p>
                    <p className='text-[10px] font-medium text-zinc-500'>
                      {badge.threshold} litrów
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgesGalleryCard;
