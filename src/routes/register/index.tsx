import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { CircleAlert, CircleCheck } from 'lucide-react';
import Spinner from '@/components/Spinner';
import {
  waterfallAnimationClass,
  textLinkFocusClass,
  controlFocusClass
} from '@/constants';
import { getWaterfallAnimationDelay } from '@/utils';
import { requireGuest } from '@/lib/routeGuards';

export const Route = createFileRoute('/register/')({
  beforeLoad: async () => {
    await requireGuest();
  },
  component: RegisterPage
});

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState('male');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

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

    const { error } = await signUp(email, password, firstName, gender);

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage(
        'Konto zostało utworzone! Sprawdź skrzynkę mailową, aby potwierdzić rejestrację.'
      );
    }
  };

  const handleGenderCardKeyDown = (
    e: React.KeyboardEvent,
    newGender: string
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setGender(newGender);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-sm border border-zinc-200 p-8 w-xl max-w-md'>
      <header
        className={`p-2 ${waterfallAnimationClass}`}
        style={{ animationDelay: getWaterfallAnimationDelay(0) }}
      >
        <h1 className='text-3xl font-bold text-zinc-700 text-center mb-2'>
          Rejestracja
        </h1>
        <p className='text-zinc-600 text-center mb-4'>
          Stwórz konto, aby zarządzać swoimi donacjami
        </p>
      </header>

      {message ? (
        <div
          className={`bg-green-50 text-green-600 px-4 py-5 rounded-md text-sm text-center flex flex-col items-center ${waterfallAnimationClass}`}
          style={{ animationDelay: getWaterfallAnimationDelay(1) }}
        >
          <CircleCheck className='size-8 mb-3' aria-hidden='true' />
          <span className='max-w-xs'>{message}</span>
        </div>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            className={`space-y-4 ${waterfallAnimationClass}`}
            style={{ animationDelay: getWaterfallAnimationDelay(1) }}
          >
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
                className={`w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${controlFocusClass}`}
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
                className={`w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${controlFocusClass}`}
                placeholder='Minimum 6 znaków'
              />
            </div>

            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-zinc-700 mb-1'
              >
                Potwierdź hasło
              </label>
              <input
                type='password'
                id='confirmPassword'
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${controlFocusClass}`}
                placeholder='Powtórz hasło'
              />
            </div>

            <div>
              <label
                htmlFor='firstName'
                className='block text-sm font-medium text-zinc-700 mb-1'
              >
                Imię
              </label>
              <input
                type='text'
                id='firstName'
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${controlFocusClass}`}
                placeholder='Twoje imię'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-zinc-700 mb-1'>
                Płeć
              </label>
              <div className='space-y-2'>
                <label
                  tabIndex={0}
                  role='radio'
                  aria-checked={gender === 'male'}
                  onKeyDown={(e) => handleGenderCardKeyDown(e, 'male')}
                  className={`flex items-center p-3 border border-zinc-300 rounded-md cursor-pointer hover:bg-zinc-50 transition-colors ${controlFocusClass}`}
                >
                  <input
                    type='radio'
                    name='gender'
                    value='male'
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value)}
                    tabIndex={-1}
                    className='w-4 h-4 text-red-600 focus:ring-red-500'
                  />
                  <span className='ml-3 text-zinc-700'>Mężczyzna</span>
                </label>
                <label
                  tabIndex={0}
                  role='radio'
                  aria-checked={gender === 'female'}
                  onKeyDown={(e) => handleGenderCardKeyDown(e, 'female')}
                  className={`flex items-center p-3 border border-zinc-300 rounded-md cursor-pointer hover:bg-zinc-50 transition-colors ${controlFocusClass}`}
                >
                  <input
                    type='radio'
                    name='gender'
                    value='female'
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value)}
                    tabIndex={-1}
                    className='w-4 h-4 text-red-600 focus:ring-red-500'
                  />
                  <span className='ml-3 text-zinc-700'>Kobieta</span>
                </label>
              </div>
            </div>

            {error && (
              <div className='bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm flex items-center gap-2'>
                <CircleAlert className='size-5 shrink-0' aria-hidden='true' />
                <span>{error}</span>
              </div>
            )}

            <button
              type='submit'
              disabled={loading}
              className={`w-full bg-red-600 text-white font-semibold py-3 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer ${controlFocusClass}`}
            >
              {loading && <Spinner size='sm' />}
              {loading ? 'Rejestrowanie...' : 'Zarejestruj się'}
            </button>
          </form>

          <p
            className={`mt-8 text-center text-sm text-zinc-600 ${waterfallAnimationClass}`}
            style={{ animationDelay: getWaterfallAnimationDelay(2) }}
          >
            Masz już konto?{' '}
            <Link
              to='/login'
              className={`font-semibold text-red-600 hover:text-red-700 ${textLinkFocusClass}`}
            >
              Zaloguj się
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
