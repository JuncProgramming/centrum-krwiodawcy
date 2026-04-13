import { useState, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { type FaqCardProps } from '@/types';
import { controlFocusClass } from '@/constants';

function FaqCard({ question, children }: FaqCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  const toggleCard = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Handle keys only when the card container has focus
    if (e.currentTarget !== e.target) {
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCard();
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      (e.target as HTMLElement).blur();
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleCardKeyDown}
      className={`w-full mx-auto border-zinc-200 border bg-white rounded-md ${controlFocusClass}`}
    >
      <div className='overflow-hidden'>
        <button
          type='button'
          tabIndex={-1}
          onClick={toggleCard}
          aria-expanded={isOpen}
          aria-controls={contentId}
          className='w-full flex items-center justify-between gap-4 p-4 pl-6 hover:bg-zinc-50 transition-colors cursor-pointer text-left'
        >
          <h3 className='font-semibold text-zinc-700 m-0 text-base'>
            {question}
          </h3>

          <div className='p-2 rounded-md shrink-0 text-zinc-500'>
            <ChevronDown
              aria-hidden='true'
              className={`transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        <div
          id={contentId}
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
    </div>
  );
}

export default FaqCard;
