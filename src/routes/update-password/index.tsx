import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { CircleCheck, CircleAlert } from 'lucide-react';
import Spinner from '@/components/Spinner';

export const Route = createFileRoute('/update-password/')({
  component: UpdatePasswordPage
});

function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { updatePassword, signOut, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Hasła nie są identyczne');
      return;
    }

    if (password.length < 6) {
      setError('Hasło musi mieć co najmniej 6 znaków');
      return;
    }

    setLoading(true);

    const { error } = await updatePassword(password);

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage(
        'Hasło zostało zmienione. Za chwilę przeniesiemy Cię na stronę logowania.'
      );
      await signOut();
      setTimeout(() => {
        navigate({ to: '/login' });
      }, 5000);
    }
  };

  if (authLoading) {
    return (
      <div className='flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (!user) {
    return (
      <div className='w-xl max-w-md bg-white rounded-lg shadow-sm border border-zinc-200 p-8 flex flex-col items-center'>
        <h1 className='text-3xl font-bold text-zinc-700 text-center mb-2'>
          Link wygasł
        </h1>
        <p className='text-zinc-600 text-center max-w-3xs'>
          Aby uzyskać nowy link, przejdź do strony resetowania hasła.
        </p>
        <Link
          to='/forgot-password'
          className='font-semibold text-sm mt-6 text-red-600 hover:text-red-700'
        >
          Zresetuj swoje hasło
        </Link>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg shadow-sm border border-zinc-200 p-8 w-xl max-w-md'>
      <div className='p-2'>
        <h1 className='text-3xl font-bold text-zinc-700 text-center mb-2'>
          Ustaw nowe hasło
        </h1>
        <p className='text-zinc-600 text-center mb-4'>
          Wprowadź swoje nowe hasło.
        </p>
      </div>

      {message ? (
        <div className='bg-green-50 text-green-600 px-4 py-5 rounded-md text-sm text-center flex flex-col items-center'>
          <CircleCheck className='size-8 mb-3' />
          <span className='max-w-xs'>{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-zinc-700 mb-1'
            >
              Nowe hasło
            </label>
            <input
              type='password'
              id='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
              placeholder='Minimum 6 znaków'
            />
          </div>

          <div>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-zinc-700 mb-1'
            >
              Potwierdź nowe hasło
            </label>
            <input
              type='password'
              id='confirmPassword'
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
              placeholder='Powtórz nowe hasło'
            />
          </div>

          {error && (
            <div className='bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm flex items-center gap-2'>
              <CircleAlert className='size-5 shrink-0' />
              <span>{error}</span>
            </div>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-red-600 text-white font-semibold py-3 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer'
          >
            {loading && <Spinner size='sm' />}
            {loading ? 'Zapisywanie hasła...' : 'Zapisz nowe hasło'}
          </button>
        </form>
      )}
    </div>
  );
}
