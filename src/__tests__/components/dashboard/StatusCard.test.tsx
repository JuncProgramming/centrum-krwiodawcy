import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StatusCard from '@/components/dashboard/StatusCard';
import type { DonationType } from '@/types';

const fakeProps = {
  daysRemaining: 5,
  nextDate: '20.01.2026',
  progress: 80,
  canDonate: false,
  targetDonationType: 'krew_pelna' as DonationType
};

describe('StatusCard', () => {
  const mockOnTargetDonationTypeChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render pending state correctly (days remaining, next date)', () => {
    render(
      <StatusCard
        {...fakeProps}
        onTargetDonationTypeChange={mockOnTargetDonationTypeChange}
      />
    );

    expect(screen.getByText(/5 dni/i)).toBeVisible();
    expect(screen.getByText(/20.01.2026/i)).toBeVisible();
    expect(screen.queryByText(/Możesz już oddać/i)).not.toBeInTheDocument();
  });

  it('should render ready state correctly (success message, no countdown)', () => {
    render(
      <StatusCard
        {...fakeProps}
        canDonate={true}
        daysRemaining={0}
        progress={100}
        onTargetDonationTypeChange={mockOnTargetDonationTypeChange}
      />
    );
    expect(screen.getByText(/Możesz już oddać/i)).toBeVisible();
    expect(screen.getByText(/Udaj się/i)).toBeVisible();
    expect(screen.queryByText(/dni/i)).not.toBeInTheDocument();
  });

  it('should call onTargetDonationTypeChange when a different donation type button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <StatusCard
        {...fakeProps}
        onTargetDonationTypeChange={mockOnTargetDonationTypeChange}
      />
    );

    const osoczeButton = screen.getByRole('button', { name: /osocze/i });
    await user.click(osoczeButton);
    expect(mockOnTargetDonationTypeChange).toHaveBeenCalledExactlyOnceWith(
      'osocze'
    );
  });

  it('should display correct text description depending on target donation type', () => {
    const { rerender } = render(
      <StatusCard
        {...fakeProps}
        canDonate={false}
        onTargetDonationTypeChange={mockOnTargetDonationTypeChange}
      />
    );

    expect(screen.getByText(/do kolejnej donacji krwi pełnej/i));

    rerender(
      <StatusCard
        {...fakeProps}
        targetDonationType='plytki_krwi'
        canDonate={false}
        onTargetDonationTypeChange={mockOnTargetDonationTypeChange}
      />
    );

    expect(screen.getByText(/do kolejnej donacji płytek krwi/i));

    rerender(
      <StatusCard
        {...fakeProps}
        targetDonationType='osocze'
        canDonate={false}
        onTargetDonationTypeChange={mockOnTargetDonationTypeChange}
      />
    );

    expect(screen.getByText(/do kolejnej donacji osocza/i));
  });
});
