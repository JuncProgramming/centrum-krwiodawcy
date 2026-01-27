import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { CircleCheck, CircleAlert } from 'lucide-react';
import Spinner from '@/components/Spinner';

export const Route = createFileRoute('/forgot-password/')({
  component: ForgotPasswordPage
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email || email.length < 1) {
      setError('E-mail musi być prawidłowy');
      return;
    }

    setLoading(true);

    const { error } = await resetPassword(email);

    setLoading(false);

    if (error) {
      setError('Nieprawidłowy email');
    } else {
      setMessage(
        'Jeśli podany adres istnieje w naszej bazie, wysłaliśmy na niego link do zmiany hasła.'
      );
    }
  };

  return (
    <div className='bg-white rounded-lg w-xl max-w-md shadow-sm border border-zinc-200 p-8'>
      <div className='p-2 flex flex-col items-center'>
        <h1 className='text-3xl font-bold text-zinc-700 text-center mb-2'>
          Resetowanie hasła
        </h1>
        <p className='text-zinc-600 text-center mb-4 max-w-xs'>
          Podaj swój e-mail, aby otrzymać link do zmiany hasła
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
              htmlFor='email'
              className='block text-sm font-medium text-zinc-700 mb-1'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
              placeholder='twoj@email.pl'
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
            {loading ? 'Wysyłanie linku...' : 'Wyślij link'}
          </button>
        </form>
      )}
    </div>
  );
}
