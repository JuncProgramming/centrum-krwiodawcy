import { useEffect, useState } from 'react';
import { X, AlertTriangle, Info } from 'lucide-react';
import type { ConfirmModalProps } from '@/types';
import Spinner from '@/components/Spinner';

export function ConfirmModal({
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Potwierdź',
  confirmLoadingLabel = 'Przetwarzanie',
  cancelLabel = 'Anuluj',
  variant = 'danger'
}: ConfirmModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div
        className='fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200'
        onClick={isLoading ? undefined : onClose}
        aria-hidden='true'
      />

      <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-6'>
        <div
          className='relative p-4 sm:p-6 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-lg animate-in zoom-in-95 duration-200'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex border-b border-zinc-200 pb-4 mb-4 justify-between items-center'>
            <h3 className='text-xl font-bold text-zinc-800'>{title}</h3>
            <button
              onClick={onClose}
              disabled={isLoading}
              className='p-2 rounded-md text-zinc-600 hover:text-zinc-800 transition-colors cursor-pointer'
            >
              <X size={20} />
            </button>
          </div>

          <div className='space-y-6'>
            <div className='flex items-start gap-4'>
              <div
                className={`p-3 rounded-full shrink-0 ${
                  variant === 'danger'
                    ? 'bg-red-50 text-red-600'
                    : 'bg-yellow-50 text-yellow-600'
                }`}
              >
                {variant === 'danger' ? (
                  <AlertTriangle size={24} />
                ) : (
                  <Info size={24} />
                )}
              </div>
              <p className='text-zinc-600 mt-1'>{description}</p>
            </div>

            <div className='flex gap-3 justify-end pt-2'>
              <button
                type='button'
                onClick={onClose}
                disabled={isLoading}
                className='px-4 py-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 rounded-md hover:bg-zinc-50 focus:ring-zinc-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
              >
                {cancelLabel}
              </button>
              <button
                type='button'
                onClick={() => {
                  handleConfirm();
                }}
                disabled={isLoading}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer ${
                  variant === 'danger'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-yellow-500 hover:bg-yellow-600'
                }`}
              >
                {isLoading && <Spinner size='sm' />}
                {isLoading ? confirmLoadingLabel + '...' : confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
