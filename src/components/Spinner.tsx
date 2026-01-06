import { type SpinnerProps } from '@/types';

function Spinner({ size = 'md' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div
      className={`${sizeClasses[size]} border-zinc-200 border-t-red-600 rounded-full animate-spin`}
      role='status'
      aria-label='Ładowanie'
    ></div>
  );
}

export default Spinner;
