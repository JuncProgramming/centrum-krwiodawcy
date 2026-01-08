import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
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
import { useDonations } from '@/hooks/useDonations';

export const Route = createFileRoute('/dashboard/')({
  beforeLoad: async ({ location }) => {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    if (!session) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href }
      });
    }
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
      <h1 className='text-3xl font-bold text-zinc-800'>
        Hej,{' '}
        <span className='text-red-600'>
          {user?.user_metadata.first_name || 'krwiodawco'}
        </span>
        . Dziękujemy za ratowanie życia.
      </h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 space-y-6'>
          <StatusCard
            nextDate={nextDate}
            progress={progress}
            daysRemaining={daysRemaining}
            canDonate={canDonate}
            targetDonationType={targetDonationType}
            onTargetDonationTypeChange={setTargetDonationType}
          />

          <DonationsHistoryCard
            donations={donations}
            onClick={() => setIsModalOpen(true)}
            onDelete={(id) => setDonationToDelete(id)}
            onUpload={handleUploadResults}
            onViewResult={handleViewResult}
          />
        </div>

        <div className='space-y-6'>
          <BaseDashboardCard title='Odznaki'>
            <BadgeGoalCard
              donations={donations}
              gender={user?.user_metadata?.gender}
            />
            <div className='my-4 border-t border-zinc-200'></div>
            <BadgesGalleryCard
              donations={donations}
              gender={user?.user_metadata?.gender}
            />
          </BaseDashboardCard>

          <StatisticsCard donations={donations} />

          <TaxReliefCalculator donations={donations} />
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
