import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import BadgeGoalCard from '@/components/dashboard/BadgeGoalCard';
import { useBadges } from '@/hooks/useBadges';

vi.mock('@/hooks/useBadges', () => ({
  useBadges: vi.fn()
}));

const fakeNextBadge = {
  id: '3',
  name: 'III Stopnia',
  threshold: 6,
  colors: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    progress: 'bg-red-500'
  }
};

const fakeMaxBadge = {
  id: '1',
  name: 'Zasłużony dla Zdrowia Narodu',
  threshold: 20,
  colors: {
    bg: 'bg-gold-100',
    text: 'text-gold-700',
    progress: 'bg-gold-500'
  }
};

describe('BadgeGoalCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render "Next Goal" state with progress bar and missing liters', () => {
    (useBadges as Mock).mockReturnValue({
      nextBadge: fakeNextBadge,
      currentBadge: null,
      progress: 50,
      missingLiters: '0.90'
    });

    render(<BadgeGoalCard donations={[]} gender='male' />);

    expect(screen.getByText(/Następny cel/i)).toBeVisible();
    expect(screen.getByText(/III Stopnia/i)).toBeVisible();
    expect(screen.getByText(/Brakuje ci/i)).toHaveTextContent(/0.9 L/i);
    expect(screen.getByText(/ok. 2 donacje/i)).toBeVisible();
  });

  it('should render the maximum goal reached state when there is no next badge', () => {
    (useBadges as Mock).mockReturnValue({
      nextBadge: null,
      currentBadge: fakeMaxBadge,
      progress: 100,
      missingLiters: '0.00'
    });

    render(<BadgeGoalCard donations={[]} gender='male' />);

    expect(screen.getByText(/Osiągnięto cel/i)).toBeVisible();
    expect(screen.getByText(/Zasłużony dla Zdrowia Narodu/i)).toBeVisible();
    expect(screen.queryByText(/Brakuje ci/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Następny cel/i)).not.toBeInTheDocument();
  });

  it('should correctly calculate remaining donations count (rounding up)', () => {
    (useBadges as Mock).mockReturnValue({
      nextBadge: fakeNextBadge,
      currentBadge: null,
      progress: 90,
      missingLiters: '0.50'
    });

    render(<BadgeGoalCard donations={[]} gender='male' />);

    expect(screen.getByText(/ok. 2 donacje/i)).toBeVisible();
  });

  it('should render nothing if both next and current badges dont exist', () => {
    (useBadges as Mock).mockReturnValue({
      nextBadge: null,
      currentBadge: null,
      progress: 0,
      missingLiters: '0'
    });

    const { container } = render(
      <BadgeGoalCard donations={[]} gender='male' />
    );

    expect(container.firstChild).toBeNull();
  });
});
