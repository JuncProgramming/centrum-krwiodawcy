import { useState, useEffect } from 'react';
import type { StatusCardProps } from '@/types';
import { STATUS_CARD_LABELS, DONATION_TYPES_ORDER } from '@/constants';

export default function StatusCard({
  daysRemaining,
  nextDate,
  progress,
  canDonate,
  targetDonationType,
  onTargetDonationTypeChange
}: StatusCardProps) {
  const [displayedType, setDisplayedType] = useState(targetDonationType);

  useEffect(() => {
    setDisplayedType(targetDonationType);
  }, [targetDonationType]);

  return (
    <section
      className={`p-6 rounded-lg border shadow-sm transition-all grid duration-300 ease-in-out ${
        canDonate
          ? 'bg-green-50 border-green-200 grid-rows-[1fr]'
          : 'bg-white border-zinc-200 grid-rows-[0fr]'
      }`}
    >
      <div className='flex flex-col-reverse md:flex-row md:items-center justify-between mb-1 gap-4'>
        <h2
          className={`text-lg font-semibold ${
            canDonate ? 'text-green-800' : 'text-zinc-800'
          }`}
        >
          Twój status
        </h2>

        <div
          className={`flex p-1 rounded-lg w-full md:w-auto ${
            canDonate ? 'bg-green-900/5' : 'bg-zinc-100'
          }`}
        >
          {DONATION_TYPES_ORDER.map((type) => (
            <button
              key={type}
              onClick={() => onTargetDonationTypeChange(type)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex-1 md:flex-none justify-center ${
                targetDonationType === type
                  ? `bg-white shadow-sm ${
                      canDonate ? 'text-green-700' : 'text-zinc-800'
                    }`
                  : `${
                      canDonate
                        ? 'text-green-800/60 hover:text-green-800'
                        : 'text-zinc-500 hover:text-zinc-700'
                    }`
              }`}
            >
              {STATUS_CARD_LABELS[type]}
            </button>
          ))}
        </div>
      </div>

      <div className='flex flex-col'>
        <div className='mb-4'>
          <div className='min-h-10 flex items-center'>
            {canDonate ? (
              <div className='flex items-center'>
                <span className='text-3xl font-bold text-green-600'>
                  Możesz już oddać{' '}
                  {displayedType === 'osocze'
                    ? 'osocze'
                    : displayedType === 'plytki_krwi'
                      ? 'płytki krwi'
                      : 'krew pełną'}
                </span>
              </div>
            ) : (
              <div className='flex items-center gap-3'>
                <span className='text-4xl font-bold text-red-600 whitespace-nowrap shrink-0'>
                  {daysRemaining > 1
                    ? `${daysRemaining} dni`
                    : `${daysRemaining} dzień`}
                </span>
                <span className='text-zinc-600 font-medium leading-tight text-balance'>
                  {targetDonationType === 'osocze'
                    ? 'do kolejnej donacji osocza'
                    : targetDonationType === 'plytki_krwi'
                      ? 'do kolejnej donacji płytek krwi'
                      : 'do kolejnej donacji krwi pełnej'}
                </span>
              </div>
            )}
          </div>

          <div
            className={`grid transition-all duration-600 ease-in-out ${
              canDonate
                ? 'grid-rows-[1fr] opacity-100 delay-1200'
                : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className='overflow-hidden'>
              <p
                className={`font-medium transition-colors duration-300 ${
                  canDonate ? 'text-green-700 mb-1' : 'text-red-700'
                }`}
              >
                Już teraz udaj się do punktu krwiodawstwa i uratuj ludzkie życie
              </p>
            </div>
          </div>
        </div>

        <div
          className={`w-full rounded-full h-2.5 overflow-hidden transform-gpu ${
            canDonate ? 'bg-green-200' : 'bg-zinc-100'
          }`}
        >
          <div
            className={`h-full rounded-full transition-[width] duration-600 ease-out ${
              canDonate ? 'bg-green-500' : 'bg-red-600'
            }`}
            style={{ width: canDonate ? '100%' : `${progress}%` }}
          ></div>
        </div>

        <div
          className={`grid transition-all duration-600 ease-in-out ${
            !canDonate
              ? 'grid-rows-[1fr] opacity-100 delay-1200'
              : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className='overflow-hidden'>
            <p className='text-sm text-zinc-500 mt-6 text-right'>
              Przewidywana data: <span className='font-medium'>{nextDate}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
