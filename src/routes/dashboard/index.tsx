import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { supabase } from '@/supabaseClient';
import Spinner from '@/components/Spinner';
import { BaseDashboardCard } from '@/components/dashboard/BaseDashboardCard';
import { AddDonationModal } from '@/components/AddDonationModal';
import { ConfirmModal } from '@/components/ConfirmModal';
import { useState, useEffect } from 'react';
import DonationsHistoryCard from '@/components/dashboard/DonationsHistoryCard';
import StatusCard from '@/components/dashboard/StatusCard';
import StatisticsCard from '@/components/dashboard/StatisticsCard';
import { TaxReliefCalculator } from '@/components/dashboard/TaxReliefCalculator';
import BadgeGoalCard from '@/components/dashboard/BadgeGoalCard';
import BadgesGalleryCard from '@/components/dashboard/BadgesGalleryCard';
import { RCKiKMapCard } from '@/components/dashboard/RCKiKMapCard';
import { useDonations } from '@/hooks/useDonations';
import {
  waterfallAnimationClass,
  MIN_INLINE_MAP_HEIGHT,
  MAX_INLINE_MAP_HEIGHT
} from '@/constants';
import { getWaterfallAnimationDelay } from '@/utils';
import { requireSession } from '@/lib/routeGuards';

export const Route = createFileRoute('/dashboard/')({
  beforeLoad: async () => {
    const session = await requireSession();
    return { session };
  },
  pendingComponent: () => (
    <div className='flex justify-center items-center'>
      <Spinner size='lg' />
    </div>
  ),
  component: Dashboard
});

function Dashboard() {
  const { session } = Route.useRouteContext();
  const user = session.user;
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [donationToDelete, setDonationToDelete] = useState<string | null>(null);
  const [targetDonationType, setTargetDonationType] = useState('krew_pelna');

  const {
    donations,
    isLoading,
    handleAddDonation,
    handleDeleteDonation,
    handleUploadResults,
    handleViewResult,
    nextDate,
    daysRemaining,
    canDonate,
    progress
  } = useDonations({ userId: user.id, targetDonationType });

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        navigate({ to: '/login' });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-[50vh]'>
        <Spinner size='lg' />
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto space-y-8 pb-12'>
      <h1
        className={`text-3xl font-bold text-zinc-800 ${waterfallAnimationClass}`}
        style={{ animationDelay: getWaterfallAnimationDelay(0) }}
      >
        Hej,{' '}
        <span className='text-red-600'>
          {user?.user_metadata.first_name || 'krwiodawco'}
        </span>
        . Dziękujemy za ratowanie życia.
      </h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* h-0 + min-h-full keeps this column from setting the row height, so it
            always matches the sidebar block and the history list scrolls
            internally instead of stretching the page. The 83rem floor is sized so
            the status card, ~4.5 history rows and the map at its minimum height
            all fit even when the sidebar is shorter. */}
        <div className='lg:col-span-2 flex flex-col gap-6 lg:h-0 lg:min-h-[max(100%,83rem)]'>
          <div
            className={`shrink-0 ${waterfallAnimationClass}`}
            style={{ animationDelay: getWaterfallAnimationDelay(1) }}
          >
            <StatusCard
              nextDate={nextDate}
              progress={progress}
              daysRemaining={daysRemaining}
              canDonate={canDonate}
              targetDonationType={targetDonationType}
              onTargetDonationTypeChange={setTargetDonationType}
            />
          </div>

          <div
            className={`min-h-0 flex flex-col ${waterfallAnimationClass}`}
            style={{ animationDelay: getWaterfallAnimationDelay(2) }}
          >
            <DonationsHistoryCard
              donations={donations}
              onClick={() => setIsModalOpen(true)}
              onDelete={(id) => setDonationToDelete(id)}
              onUpload={handleUploadResults}
              onViewResult={handleViewResult}
            />
          </div>

          {/* Fills whatever the history leaves over rather than letting it sit
              empty. grow + a flex-basis floor means the map absorbs the slack
              while the history keeps its natural height. The max-height ceiling
              stops a near-empty history from handing the map the whole column —
              past it the column simply ends early. */}
          <div
            className={`grow shrink-0 min-h-0 flex flex-col ${waterfallAnimationClass}`}
            style={{
              flexBasis: MIN_INLINE_MAP_HEIGHT,
              maxHeight: MAX_INLINE_MAP_HEIGHT,
              animationDelay: getWaterfallAnimationDelay(6)
            }}
          >
            <RCKiKMapCard fill />
          </div>
        </div>

        {/* self-start keeps this at its natural height; it defines the row
            height the left column stretches to match. */}
        <div className='flex flex-col gap-6 lg:self-start'>
          <div
            className={waterfallAnimationClass}
            style={{ animationDelay: getWaterfallAnimationDelay(3) }}
          >
            <BaseDashboardCard title='Odznaki'>
              <BadgeGoalCard
                donations={donations}
                gender={user?.user_metadata?.gender}
              />
              <hr className='my-4 border-t border-zinc-200' />
              <BadgesGalleryCard
                donations={donations}
                gender={user?.user_metadata?.gender}
              />
            </BaseDashboardCard>
          </div>

          <div
            className={waterfallAnimationClass}
            style={{ animationDelay: getWaterfallAnimationDelay(4) }}
          >
            <StatisticsCard donations={donations} />
          </div>

          <div
            className={waterfallAnimationClass}
            style={{ animationDelay: getWaterfallAnimationDelay(5) }}
          >
            <TaxReliefCalculator donations={donations} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddDonationModal
          onClose={() => setIsModalOpen(false)}
          onSave={async (data) => {
            await handleAddDonation(data);
            setIsModalOpen(false);
          }}
        />
      )}

      {donationToDelete !== null && (
        <ConfirmModal
          onClose={() => setDonationToDelete(null)}
          onConfirm={async () => {
            if (donationToDelete) {
              await handleDeleteDonation(donationToDelete);
              setDonationToDelete(null);
            }
          }}
          title='Usuń donację'
          description='Czy na pewno chcesz usunąć tę donację? Tej operacji nie można cofnąć'
          confirmLabel='Usuń'
          confirmLoadingLabel='Usuwanie'
          cancelLabel='Anuluj'
          variant='danger'
        />
      )}
    </div>
  );
}
