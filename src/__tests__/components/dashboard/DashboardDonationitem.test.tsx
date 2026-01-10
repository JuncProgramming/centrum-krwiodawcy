import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DonationItem } from '@/components/dashboard/DashboardDonationItem';
import type { Donation } from '@/types';

describe('DashboardDonationItem', () => {
  const mockOnDelete = vi.fn();
  const mockOnUpload = vi.fn();
  const mockOnViewResult = vi.fn();

  const donation: Donation = {
    id: '123',
    type: 'krew_pelna',
    date: '2023-05-15',
    location: 'RCKiK Warszawa',
    amount: 450
  };

  it('should render donation details correctly (type, amount, date, location)', () => {
    render(
      <DonationItem
        donation={donation}
        onDelete={mockOnDelete}
        onUpload={mockOnUpload}
        onViewResult={mockOnViewResult}
      />
    );

    const bloodLabel = screen.getByText('Krew pełna');
    expect(bloodLabel).toBeVisible();

    const amountLabel = screen.getByText('450 ml');
    expect(amountLabel).toBeVisible();

    const locationLabel = screen.getByText('RCKiK Warszawa');
    expect(locationLabel).toBeVisible();

    const dateLabel = screen.getByText('15.05.2023');
    expect(dateLabel).toBeVisible();
  });

  it('should call onDelete when the trash button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <DonationItem
        donation={donation}
        onDelete={mockOnDelete}
        onUpload={mockOnUpload}
        onViewResult={mockOnViewResult}
      />
    );

    const deleteBtn = screen.getByTitle(/usuń/i);

    await user.click(deleteBtn);

    expect(mockOnDelete).toHaveBeenCalledExactlyOnceWith('123');
  });

  it('should click on the hidden input when the upload button is clicked', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <DonationItem
        donation={donation}
        onDelete={mockOnDelete}
        onUpload={mockOnUpload}
        onViewResult={mockOnViewResult}
      />
    );

    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const uploadBtn = screen.getByTitle('Dodaj wyniki badań');

    const clickSpy = vi.spyOn(input, 'click');

    await user.click(uploadBtn);

    expect(clickSpy).toHaveBeenCalled();
  });
});
