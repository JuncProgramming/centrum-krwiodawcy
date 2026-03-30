import { createFileRoute } from '@tanstack/react-router';
import FaqCard from '@/components/FaqCard';
import { faqData } from '@/data/faqData';

export const Route = createFileRoute('/faq/')({
  component: FaqPage
});

function FaqPage() {
  return (
    <div className='w-full space-y-8 flex-col flex items-center'>
      <h1 className='text-2xl sm:text-5xl leading-tight text-center font-semibold text-zinc-700 sm:p-8'>
        Jak zacząć oddawać krew?
      </h1>
      <div className='w-full max-w-3xl space-y-3'>
        {faqData.map((card) => (
          <FaqCard key={card.id} question={card.question}>
            {card.answer}
          </FaqCard>
        ))}
      </div>

      <div className='text-center'>
        <p className='text-base text-zinc-600'>
          Nie wyczerpaliśmy wszystkich pytań?{' '}
          <a
            href='https://www.gov.pl/web/nck'
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold text-red-600 hover:underline'
          >
            Odwiedź portal Narodowego Centrum Krwi
          </a>
        </p>
      </div>
    </div>
  );
}
