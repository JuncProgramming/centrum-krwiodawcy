import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import FaqCard from '@/components/FaqCard';
import { faqData } from '@/data/faqData';
import { waterfallAnimationClass, textLinkFocusClass } from '@/constants';
import { getWaterfallAnimationDelay } from '@/utils';

const RCKiKMapCard = lazy(() => import('@/components/dashboard/RCKiKMapCard'));

export const Route = createFileRoute('/faq/')({
  component: FaqPage
});

function FaqPage() {
  return (
    <div className='w-full space-y-8 flex-col flex items-center'>
      <h1
        className={`text-2xl sm:text-5xl leading-tight text-center font-semibold text-zinc-700 sm:p-8 ${waterfallAnimationClass}`}
        style={{ animationDelay: getWaterfallAnimationDelay(0) }}
      >
        Jak zacząć oddawać krew?
      </h1>

      <div className='w-full max-w-3xl space-y-3'>
        <ul className='space-y-3'>
          {faqData.map((card, index) => {
            return (
              <li
                key={card.id}
                className={waterfallAnimationClass}
                style={{
                  animationDelay: getWaterfallAnimationDelay(index + 1)
                }}
              >
                <FaqCard question={card.question}>{card.answer}</FaqCard>
              </li>
            );
          })}
        </ul>

        <section
          className={waterfallAnimationClass}
          style={{
            animationDelay: getWaterfallAnimationDelay(faqData.length + 1)
          }}
        >
          <Suspense
            fallback={
              <div className='w-full h-[320px] sm:h-[400px] lg:h-[500px] rounded-lg bg-zinc-100 animate-pulse' />
            }
          >
            <RCKiKMapCard />
          </Suspense>
        </section>
      </div>

      <div
        className={`text-center ${waterfallAnimationClass}`}
        style={{
          animationDelay: getWaterfallAnimationDelay(faqData.length + 2)
        }}
      >
        <p className='text-base text-zinc-600'>
          Nie wyczerpaliśmy wszystkich pytań?{' '}
          <a
            href='https://www.gov.pl/web/nck'
            target='_blank'
            rel='noopener noreferrer'
            className={`font-semibold text-red-600 hover:underline ${textLinkFocusClass}`}
          >
            Odwiedź portal Narodowego Centrum Krwi
          </a>
        </p>
      </div>
    </div>
  );
}
