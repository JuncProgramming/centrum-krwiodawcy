'use client';

import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { parseDate, formatDateForDisplay, formatDateForStorage } from '@/utils';
import { pl } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { controlFocusClass } from '@/constants';
import type { CustomDatePickerProps } from '@/types';

export default function CustomDatePicker({
  accessibilityId,
  date,
  onDateChange,
  onOpenChange,
  background = 'bg-white'
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedDate = parseDate(date);
  const today = new Date();

  const formattedDate = formatDateForDisplay(selectedDate);

  const hoverBgClass =
    background === 'bg-zinc-50' ? 'hover:bg-white' : 'hover:bg-zinc-50';

  const handleSelect = (date?: Date) => {
    if (!date) {
      return;
    }

    onDateChange(formatDateForStorage(date));
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const handlePopoverOpenChange = (nextOpen: boolean) => {
    setIsOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={handlePopoverOpenChange}>
      <Popover.Trigger asChild>
        <button
          id={accessibilityId}
          type='button'
          aria-label='Wybierz datę donacji'
          className={`w-full cursor-pointer px-3 py-2 border border-zinc-300 rounded-md ${background} text-zinc-700 transition-colors ${hoverBgClass} flex items-center justify-between gap-3 disabled:opacity-60 disabled:cursor-not-allowed ${controlFocusClass}`}
        >
          <span className='truncate capitalize'>{formattedDate}</span>
          <CalendarIcon size={17} className='text-zinc-500 shrink-0' />
        </button>
      </Popover.Trigger>

      <Popover.Content
        side='bottom'
        align='start'
        sideOffset={8}
        onEscapeKeyDown={(event) => {
          event.stopPropagation();
        }}
        className={`z-90 rounded-xl border border-zinc-200 ${background} p-3 shadow-lg`}
      >
        <DayPicker
          mode='single'
          locale={pl}
          showOutsideDays
          selected={selectedDate}
          onSelect={handleSelect}
          defaultMonth={selectedDate ?? today}
          disabled={{ after: today }}
          classNames={{
            months: 'flex',
            month: 'relative space-y-3',
            chevron: 'h-4 w-4',
            month_caption:
              'relative top-1 flex h-9 items-center justify-center',
            caption_label:
              'pointer-events-none text-base font-semibold leading-none text-zinc-800 capitalize',
            nav: 'pointer-events-none absolute inset-x-0 top-4 z-10 flex h-9 items-center justify-between px-2.5',
            button_previous: `pointer-events-auto h-8 w-8 cursor-pointer inline-flex items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 ${controlFocusClass}`,
            button_next: `pointer-events-auto h-8 w-8 cursor-pointer inline-flex items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 ${controlFocusClass}`,
            weekdays: 'grid grid-cols-7 gap-0.5',
            weekday: 'text-center text-sm font-medium text-zinc-500 py-1',
            month_grid: 'grid gap-0.5',
            week: 'grid grid-cols-7 gap-0.5',
            day: 'h-9 w-9 text-center text-sm',
            day_button: `h-9 w-9 cursor-pointer rounded-md text-zinc-700 transition-colors hover:bg-zinc-200 ${controlFocusClass}`,
            selected:
              '[&>button]:bg-zinc-600 [&>button]:text-white [&>button]:hover:bg-zinc-600',
            today: '[&>button]:border [&>button]:border-zinc-200',
            outside: 'text-zinc-300',
            disabled: 'text-zinc-300 opacity-60'
          }}
        />
      </Popover.Content>
    </Popover.Root>
  );
}
