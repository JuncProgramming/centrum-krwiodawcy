import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { CircleAlert, CircleCheck } from 'lucide-react';
import Spinner from '@/components/Spinner';

export const Route = createFileRoute('/login/')({
  component: LoginPage
});

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  if (authLoading) {
    return (
      <div className='flex items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (user) {
    navigate({ to: '/dashboard' });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    setLoading(true);

    const { error } = await signIn(email, password);

    setLoading(false);

    if (error) {
      setError('Nieprawidłowy email lub hasło');
    } else {
      setMessage('Zalogowano pomyślnie. Za chwilę przeniesiemy Cię do panelu.');
      setTimeout(() => {
        navigate({ to: '/dashboard' });
      }, 5000);
    }
  };

  return (
    <div className='bg-white w-xl max-w-md rounded-lg shadow-sm border border-zinc-200 p-8'>
      <div className='p-2'>
        <h1 className='text-3xl font-bold text-zinc-700 text-center mb-2'>
          Logowanie
        </h1>
        <p className='text-zinc-600 text-center mb-4'>
          Witaj ponownie! Zaloguj się do swojego konta
        </p>
      </div>

      {message ? (
        <div className='bg-green-50 text-green-600 px-4 py-5 rounded-md text-sm text-center flex flex-col items-center'>
          <CircleCheck className='size-8 mb-3' />
          <span className='max-w-xs'>{message}</span>
        </div>
      ) : (
        <>
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

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-zinc-700 mb-1'
              >
                Hasło
              </label>
              <input
                type='password'
                id='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
                placeholder='Twoje hasło'
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
              {loading ? 'Logowanie...' : 'Zaloguj się'}
            </button>
          </form>

          <p className='mt-8 text-center text-sm text-zinc-600'>
            Nie pamiętasz hasła?{' '}
            <Link
              to='/forgot-password'
              className='font-semibold text-red-600 hover:text-red-700'
            >
              Zresetuj hasło
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
