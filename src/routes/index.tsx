import { createFileRoute, Link } from '@tanstack/react-router';
import { DonationCalculator } from '@/components/DonationCalculator';
import { waterfallAnimationClass, textLinkFocusClass } from '@/constants';
import { getWaterfallAnimationDelay } from '@/utils';

export const Route = createFileRoute('/')({
  component: HomePage
});

function HomePage() {
  return (
    <div className='space-y-8 max-w-5xl w-full flex-col flex items-center'>
      <h1
        className={`text-2xl sm:text-4xl lg:text-5xl leading-tight text-center font-semibold text-zinc-700 sm:p-8 ${waterfallAnimationClass}`}
        style={{ animationDelay: getWaterfallAnimationDelay(0) }}
      >
        <span className='whitespace-nowrap'>Twoja krew może ocalić</span> <br />
        <span className='whitespace-nowrap'>
          ludzkie <span className='text-red-600'>życie</span>. Pomóż innym.
        </span>{' '}
        <br /> <span className='whitespace-nowrap'>Zostań krwiodawcą.</span>
      </h1>

      <section
        className={`w-full max-w-2xl p-8 bg-zinc-50 border border-zinc-200 rounded-xl shadow-sm ${waterfallAnimationClass}`}
        style={{ animationDelay: getWaterfallAnimationDelay(1) }}
      >
        <h2 className='font-semibold text-center mb-8 text-xl text-zinc-600'>
          Pierwszą donację masz za sobą? Sprawdź możliwy termin kolejnej.
        </h2>
        <DonationCalculator />
      </section>

      <div
        className={`text-center ${waterfallAnimationClass}`}
        style={{ animationDelay: getWaterfallAnimationDelay(2) }}
      >
        <p className='text-base text-zinc-600'>
          Jesteś tu pierwszy raz?{' '}
          <Link
            to='/faq'
            className={`font-semibold text-red-600 hover:underline ${textLinkFocusClass}`}
          >
            Dowiedz się, jak zacząć oddawać krew (FAQ)
          </Link>
        </p>
      </div>
    </div>
  );
}
