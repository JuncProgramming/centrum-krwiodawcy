import { type BaseDashboardCardProps } from '@/types';

export function BaseDashboardCard({
  title,
  children,
  className = ''
}: BaseDashboardCardProps) {
  return (
    <section
      className={`p-6 border border-zinc-200 shadow-sm rounded-lg bg-zinc-50 flex flex-col ${className}`}
    >
      <div className='flex justify-between items-center mb-3 shrink-0'>
        <h3 className='text-xl font-semibold text-zinc-800'>{title}</h3>
      </div>
      {children}
    </section>
  );
}
