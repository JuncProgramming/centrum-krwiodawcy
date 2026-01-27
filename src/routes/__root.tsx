import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Header } from '../components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { X } from 'lucide-react';

export const Route = createRootRoute({
  component: RootLayout
});

function RootLayout() {
  return (
    <div className='min-h-screen bg-zinc-50'>
      <Header></Header>
      <main className='flex justify-center p-12'>
        <Outlet />
      </main>
      <ToastContainer
        position='bottom-right'
        pauseOnHover={false}
        toastClassName='!rounded-md !shadow-sm !border !border-zinc-200 !p-4 !pr-10 !bg-white !relative !flex !items-center !gap-3 !min-h-[60px]'
        className='text-sm! font-medium! text-zinc-700! m-0! p-0!'
        style={
          {
            '--toastify-icon-color-success': '#16a34a',
            '--toastify-icon-color-error': '#dc2626'
          } as React.CSSProperties
        }
        closeButton={({ closeToast }) => (
          <button
            onClick={closeToast}
            className='absolute top-2 right-2 p-1 rounded-md text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer'
          >
            <X size={16} />
          </button>
        )}
      />
    </div>
  );
}
