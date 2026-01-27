import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { type FaqCardProps } from '@/types';

function FaqCard({ question, children }: FaqCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='w-full mx-auto border-zinc-200 border bg-white rounded-md overflow-hidden'>
      <div className='w-full flex items-center justify-between gap-4 p-4 pl-6'>
        <span className='font-semibold text-zinc-700'>{question}</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='p-2 rounded-md hover:bg-zinc-100 transition-colors cursor-pointer'
          aria-label={isOpen ? 'Zwiń odpowiedź' : 'Rozwiń odpowiedź'}
        >
          <ChevronDown
            className={`shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      <div
        data-testid='faq-accordion'
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className='overflow-hidden'>
          <div className='px-8 py-6 text-zinc-600 border-t border-zinc-100'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaqCard;
