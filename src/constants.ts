import type { DonationType } from './types';

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
