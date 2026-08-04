import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/supabaseClient';
import { toast } from 'react-toastify';
import type { Donation } from '@/types';
import { MAX_FILE_SIZE } from '@/constants';
import { calculateNextDonationDate } from '@/utils';
import type { useDonationsArgs } from '@/types';

const createResultsFilePath = (userId: string | undefined, file: File) => {
  const extension = file.name.includes('.')
    ? `.${file.name.split('.').pop()}`
    : '';
  return `${userId}/${Date.now()}_${crypto.randomUUID()}${extension}`;
};

export function useDonations({
  userId,
  targetDonationType = 'krew_pelna'
}: useDonationsArgs) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getDonations = useCallback(async () => {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Donation[];
  }, [userId]);

  const fetchDonations = useCallback(async () => {
    try {
      setDonations(await getDonations());
    } catch (error) {
      console.error(error);
      toast.error('Nie udało się pobrać historii donacji.');
    }
  }, [getDonations]);

  useEffect(() => {
    if (!userId) return;

    let ignore = false;

    getDonations()
      .then((data) => {
        if (!ignore) setDonations(data);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Nie udało się pobrać historii donacji.');
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [userId, getDonations]);

  const lastDonation = donations[0];
  // If there is a lastDonation, destructure the thing and calculate the next donation date, else default
  const { daysRemaining, nextDate, progress, canDonate } = lastDonation
    ? calculateNextDonationDate(
        lastDonation.date,
        lastDonation.type,
        targetDonationType
      )
    : {
        daysRemaining: 0,
        nextDate: new Date().toLocaleDateString('pl-PL'),
        progress: 100,
        canDonate: true
      };

  const handleAddDonation = async (newData: {
    date: string;
    type: string;
    location: string;
    amount: number;
    file?: File | null;
  }) => {
    try {
      let resultsUrl = null;

      if (newData.file) {
        if (newData.file.size > MAX_FILE_SIZE) {
          toast.error('Plik jest za duży (max. 2 MB)');
          return;
        }

        const filePath = createResultsFilePath(userId, newData.file);

        const { error: uploadError } = await supabase.storage
          .from('donation-results')
          .upload(filePath, newData.file);

        if (uploadError) throw uploadError;

        resultsUrl = filePath;
      }

      const { error: dbError } = await supabase.from('donations').insert([
        {
          user_id: userId,
          date: newData.date,
          type: newData.type,
          location: newData.location,
          amount: newData.amount,
          results_url: resultsUrl
        }
      ]);

      if (dbError) throw dbError;

      await fetchDonations();
      toast.success('Dodano nową donację');
    } catch (error) {
      console.error(error);
      toast.error('Nie udało się zapisać donacji. Spróbuj ponownie.');
      throw error;
    }
  };

  const handleDeleteDonation = async (id: string) => {
    const resultsPath = donations.find(
      (donation) => donation.id === id
    )?.results_url;

    try {
      const { error } = await supabase.from('donations').delete().eq('id', id);

      if (error) throw error;

      if (resultsPath) {
        const { error: storageError } = await supabase.storage
          .from('donation-results')
          .remove([resultsPath]);

        if (storageError) {
          console.error(
            `Failed to remove results file for donation ${id} at ${resultsPath}`,
            storageError
          );
        }
      }

      await fetchDonations();
      toast.success('Donacja została usunięta');
    } catch (error) {
      console.error(error);
      toast.error('Nie udało się usunąć donacji. Spróbuj ponownie');
      throw error;
    }
  };

  const handleUploadResults = async (id: string, file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error('Plik jest za duży (max. 2 MB)');
      return;
    }

    try {
      const filePath = createResultsFilePath(userId, file);

      const { error: uploadError } = await supabase.storage
        .from('donation-results')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: updateError } = await supabase
        .from('donations')
        .update({ results_url: filePath })
        .eq('id', id);

      if (updateError) throw updateError;

      await fetchDonations();
      toast.success('Wyniki badań zostały zapisane');
    } catch (error) {
      console.error(error);
      toast.error('Nie udało się przesłać pliku. Spróbuj ponownie.');
      throw error;
    }
  };

  const handleViewResult = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('donation-results')
        .createSignedUrl(path, 60);

      if (error) throw error;
      if (data) {
        window.open(data.signedUrl, '_blank');
      }
    } catch (error) {
      console.error(error);
      toast.error('Nie udało się otworzyć pliku. Spróbuj ponownie');
    }
  };

  return {
    donations,
    isLoading,
    fetchDonations,
    handleAddDonation,
    handleDeleteDonation,
    handleUploadResults,
    handleViewResult,
    daysRemaining,
    nextDate,
    progress,
    canDonate
  };
}
