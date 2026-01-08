import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatisticsCard from '@/components/dashboard/StatisticsCard';
import type { Donation } from '@/types';

describe('StatisticsCard', () => {
  it('should render only base sections (Lives, Full Blood, Count) with zero values when donations list is empty', () => {
    render(<StatisticsCard donations={[]} />);

    const savedLivesLabel = screen.getByText(/uratowane życia/i);
    expect(savedLivesLabel).toBeVisible();
    expect(savedLivesLabel.nextElementSibling).toHaveTextContent(/^0$/);

    const donatedBloodLabel = screen.getByText(/oddana krew pełna/i);
    expect(donatedBloodLabel).toBeVisible();
    expect(donatedBloodLabel.parentElement).toHaveTextContent(/0\s*L/);

    const donationsCountLabel = screen.getByText(/liczba donacji/i);
    expect(donationsCountLabel).toBeVisible();
    expect(donationsCountLabel.nextElementSibling).toHaveTextContent(/^0$/);

    expect(screen.queryByText(/oddane osocze/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/oddane płytki krwi/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ostatnia donacja/i)).not.toBeInTheDocument();
  });

  it('should render all standard and conditional sections with the correct values when all donation types are present', () => {
    const fakeDonations = [
      {
        id: '1',
        type: 'krew_pelna',
        amount: 450,
        date: '2023-01-15T10:00:00.000Z'
      },
      {
        id: '2',
        type: 'osocze',
        amount: 650,
        date: '2023-02-20T12:00:00.000Z'
      },
      {
        id: '3',
        type: 'plytki_krwi',
        amount: 500,
        date: '2023-05-20T08:30:00.000Z'
      }
    ] as unknown as Donation[];

    render(<StatisticsCard donations={fakeDonations} />);

    const savedLivesLabel = screen.getByText(/uratowane życia/i);
    expect(savedLivesLabel).toBeVisible();
    expect(savedLivesLabel.nextElementSibling).toHaveTextContent(/^10$/);

    const donatedBloodLabel = screen.getByText(/oddana krew pełna/i);
    expect(donatedBloodLabel).toBeVisible();
    expect(donatedBloodLabel.parentElement).toHaveTextContent(/0.45\s*L/);

    const donatedOsoczeLabel = screen.getByText(/oddane osocze/i);
    expect(donatedOsoczeLabel).toBeVisible();
    expect(donatedOsoczeLabel.parentElement).toHaveTextContent(/0.65\s*L/);

    const donatedPlytkiLabel = screen.getByText(/oddane płytki krwi/i);
    expect(donatedPlytkiLabel).toBeVisible();
    expect(donatedPlytkiLabel.parentElement).toHaveTextContent(/0.50\s*L/);

    const donationsCountLabel = screen.getByText(/liczba donacji/i);
    expect(donationsCountLabel).toBeVisible();
    expect(donationsCountLabel.nextElementSibling).toHaveTextContent(/^3$/);

    const lastDonationLabel = screen.getByText(/ostatnia donacja/i);
    expect(lastDonationLabel).toBeVisible();
    expect(lastDonationLabel.nextElementSibling).toHaveTextContent(
      /^20.05.2023$/
    );
  });
});
