import type { DonationType } from '@/types';

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
