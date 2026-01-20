import { type ReactNode } from 'react';

export type DonationType = 'krew_pelna' | 'osocze' | 'plytki_krwi';

export type RCKiKLocation = {
  name: string;
  address: string;
  phone: string;
  website: string;
  mapCoords: [number, number];
  googleMapsUrl: string;
};

export type Donation = {
  id: string;
  type: 'krew_pelna' | 'osocze' | 'plytki_krwi';
  date: string;
  location: string;
  amount: number;
  results_url?: string;
};

export type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
};

export type DonationCalculatorProps = {
  donations: Donation[];
};

export type FaqCardProps = {
  question: string;
  children: ReactNode;
};

export type BaseDashboardCardProps = {
  title: string;
  children?: ReactNode;
  donations?: Donation[];
};

export type AddDonationModalProps = {
  onClose: () => void;
  onSave: (data: {
    date: string;
    type: string;
    location: string;
    amount: number;
    file?: File | null;
  }) => Promise<void> | void;
};

export type StatusCardProps = {
  daysRemaining: number;
  progress: number;
  nextDate: string;
  canDonate: boolean;
  targetDonationType: string;
  onTargetDonationTypeChange: (type: string) => void;
};

export type StatisticsCardProps = {
  donations: Donation[];
};

export type useStatisticsArgs = {
  donations: Donation[];
};

export type useDonationsArgs = {
  userId: string | undefined;
  targetDonationType: string;
};

export type DonationsHistoryCardProps = {
  donations: Donation[];
  onClick: () => void;
  onDelete: (id: string) => void;
  onUpload: (id: string, file: File) => void;
  onViewResult: (path: string) => void;
};

export type ConfirmModalProps = {
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title: string;
  description: string;
  confirmLabel?: string;
  confirmLoadingLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'info';
};

export type BadgesCardProps = {
  donations: Donation[];
  gender: string;
};

export type useBadgesArgs = {
  donations: Donation[];
  gender: string;
};

export type BadgeColors = {
  bg: string;
  text: string;
  border: string;
  progress: string;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  colors: BadgeColors;
  thresholdLiters: (gender: string) => number;
};
