import type { DonationType } from '@/types';

export const STORAGE_DATE_FORMAT = 'yyyy-MM-dd'; // 2026-04-21
export const DISPLAY_DATE_FORMAT = 'd MMMM yyyy'; // 21 April 2026

export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
export const TAX_RELIEF_PER_LITER = 130; /// 130zł

export const TYPE_VOLUME_MULTIPLIER = {
  krew_pelna: 0.45,
  osocze: 0.65,
  plytki_krwi: 0.25
};

export const DONATION_LABELS = {
  krew_pelna: 'Krew pełna',
  osocze: 'Osocze',
  plytki_krwi: 'Płytki krwi'
};

export const DONATION_TYPES_ORDER: DonationType[] = [
  'krew_pelna',
  'osocze',
  'plytki_krwi'
];

export const STATUS_CARD_LABELS = {
  krew_pelna: 'Krew',
  osocze: 'Osocze',
  plytki_krwi: 'Płytki'
};

export const WATERFALL_ANIMATION_DELAY = 100; // ms
export const AUTH_LOADING_SPINNER_DELAY = 100; // ms

export const waterfallAnimationClass =
  'opacity-0 motion-safe:animate-[waterfall-enter_500ms_ease-out_both] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-y-0';

export const baseControlFocusClass =
  'z-0 no-underline outline-2 outline-transparent outline-offset-2 focus-visible:outline-zinc-800 focus-visible:z-20 focus-within:z-20';

export const controlFocusClass = `relative ${baseControlFocusClass}`;

export const textLinkFocusClass =
  'no-underline outline-2 outline-transparent rounded outline-offset-4 focus-visible:outline-zinc-800';

export const AUTHENTICATED_HOME_ROUTE = '/dashboard';

// Smallest the map CARD may be squeezed to when it sits inline in the left
// column. The card spends roughly 120px on its title, description and footer, so
// this leaves ~360px of actual map — below that it stops being usable.
export const MIN_INLINE_MAP_HEIGHT = 480;

// Largest the map card may grow to when the column has slack — with a
// near-empty history and an expanded badge gallery the map would otherwise
// swallow the whole column. Past this the left column just ends early.
export const MAX_INLINE_MAP_HEIGHT = 720;
