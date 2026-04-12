import type { Session } from '@supabase/supabase-js';
import { redirect } from '@tanstack/react-router';
import { supabase } from '@/supabaseClient';
import { AUTHENTICATED_HOME_ROUTE } from '@/constants';

export const requireSession = async (): Promise<Session> => {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    throw redirect({
      to: '/login',
      search: { redirect: AUTHENTICATED_HOME_ROUTE } // This will redirect to the page after logging in
    });
  }

  return session;
};

export const requireGuest = async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    throw redirect({ to: AUTHENTICATED_HOME_ROUTE });
  }
};
