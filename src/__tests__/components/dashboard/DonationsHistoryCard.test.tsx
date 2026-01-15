import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DonationsHistoryCard from '@/components/dashboard/DonationsHistoryCard'; // Sprawdź ścieżkę
import type { Donation } from '@/types';

const fakeDonations: Donation[] = [
  {
    id: '1',
    type: 'krew_pelna',
    date: '2023-01-01',
    location: 'RCKiK Warszawa',
    amount: 450
  },
  {
    id: '2',
    type: 'osocze',
    date: '2023-02-01',
    location: 'RCKiK Kraków',
    amount: 600
  }
];

describe('DonationsHistoryCard', () => {
  const mockOnClickAdd = vi.fn();
  const mockOnDelete = vi.fn();
  const mockOnUpload = vi.fn();
  const mockOnViewResult = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render empty state message when donations list is empty', () => {
    render(
      <DonationsHistoryCard
        donations={[]}
        onClick={mockOnClickAdd}
        onDelete={mockOnDelete}
        onUpload={mockOnUpload}
        onViewResult={mockOnViewResult}
      />
    );

    expect(screen.getByText(/historia/i)).toBeVisible();
    expect(screen.getByText(/brak zapisanych/i)).toBeVisible();
    expect(screen.getByRole('button', { name: /dodaj/i })).toBeVisible();

    expect(screen.queryByText(/ml/i)).not.toBeInTheDocument();
  });

  it('should render correct number of DonationItems when donations are provided', () => {
    render(
      <DonationsHistoryCard
        donations={fakeDonations}
        onClick={mockOnClickAdd}
        onDelete={mockOnDelete}
        onUpload={mockOnUpload}
        onViewResult={mockOnViewResult}
      />
    );

    // queryByText will not crash the test (getByText will, because it expects an element to exist)
    expect(screen.queryByText(/brak zapisanych/i)).not.toBeInTheDocument();
    expect(screen.getByText(/warszawa/i)).toBeVisible();
    expect(screen.getByText(/kraków/i)).toBeVisible();
    expect(screen.getAllByTitle(/Dodaj wyniki/i)).toHaveLength(2);
  });

  it('should call onClick handler when "Add donation" button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <DonationsHistoryCard
        donations={fakeDonations}
        onClick={mockOnClickAdd}
        onDelete={mockOnDelete}
        onUpload={mockOnUpload}
        onViewResult={mockOnViewResult}
      />
    );

    const addDonationButton = screen.getByRole('button', {
      name: /dodaj donację/i
    });

    await user.click(addDonationButton);
    expect(mockOnClickAdd).toHaveBeenCalledOnce();
  });

  it('should pass action handlers (delete, upload, view) down to DonationItems', async () => {
    const user = userEvent.setup();

    render(
      <DonationsHistoryCard
        donations={fakeDonations}
        onClick={mockOnClickAdd}
        onDelete={mockOnDelete}
        onUpload={mockOnUpload}
        onViewResult={mockOnViewResult}
      />
    );

    const deleteDonationButtons = screen.getAllByTitle(/usuń/i);
    const secondDeleteDonationButton = deleteDonationButtons[1];

    await user.click(secondDeleteDonationButton);
    expect(mockOnDelete).toHaveBeenCalledExactlyOnceWith('2');
  });
});
