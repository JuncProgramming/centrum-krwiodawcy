import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BadgesGalleryCard from '@/components/dashboard/BadgesGalleryCard'; // Sprawdź ścieżkę
import { useBadges } from '@/hooks/useBadges';

vi.mock('@/hooks/useBadges', () => ({
  useBadges: vi.fn()
}));

const fakeBadges = [
  {
    id: '1',
    name: 'III Stopnia',
    threshold: 6,
    isUnlocked: true,
    colors: { bg: 'bg-red-100', border: 'border-red-200', text: 'text-red-700' }
  },
  {
    id: '2',
    name: 'II Stopnia',
    threshold: 12,
    isUnlocked: false,
    colors: { bg: 'bg-red-100', border: 'border-red-200', text: 'text-red-700' }
  }
];

describe('BadgesGalleryCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be collapsed by default', () => {
    (useBadges as Mock).mockReturnValue({
      badges: fakeBadges
    });

    const { container } = render(
      <BadgesGalleryCard donations={[]} gender='male' />
    );

    const toggleButton = screen.getByRole('button', {
      name: /Rozwiń galerię/i
    });
    expect(toggleButton).toHaveAttribute('aria-label', 'Rozwiń galerię');

    const animatingDiv = container.querySelector('.transition-all');
    expect(animatingDiv).toHaveClass('grid-rows-[0fr]');
    expect(animatingDiv).toHaveClass('opacity-0');
  });

  it('should expand gallery when toggle button is clicked', async () => {
    const user = userEvent.setup();
    (useBadges as Mock).mockReturnValue({
      badges: fakeBadges
    });

    const { container } = render(
      <BadgesGalleryCard donations={[]} gender='male' />
    );

    const toggleButton = screen.getByRole('button', {
      name: /Rozwiń galerię/i
    });
    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-label', 'Zwiń galerię');

    const animatingDiv = container.querySelector('.transition-all');
    expect(animatingDiv).toHaveClass('grid-rows-[1fr]');
    expect(animatingDiv).toHaveClass('opacity-100');
  });

  it('should render badges with correct styles (grayscale for locked badges)', async () => {
    const user = userEvent.setup();
    (useBadges as Mock).mockReturnValue({
      badges: fakeBadges
    });

    render(<BadgesGalleryCard donations={[]} gender='male' />);

    const toggleButton = screen.getByRole('button');
    await user.click(toggleButton);

    const unlockedBadge = screen.getByText('III Stopnia').closest('.relative');
    expect(unlockedBadge).not.toHaveClass('grayscale');
    expect(unlockedBadge).toHaveClass('bg-red-100');

    const lockedBadge = screen.getByText('II Stopnia').closest('.relative');
    expect(lockedBadge).toHaveClass('grayscale');
    expect(lockedBadge).toHaveClass('opacity-60');
  });

  it('should display badge names and thresholds correctly', async () => {
    const user = userEvent.setup();
    (useBadges as Mock).mockReturnValue({
      badges: fakeBadges
    });

    render(<BadgesGalleryCard donations={[]} gender='male' />);
    await user.click(screen.getByRole('button'));

    expect(screen.queryByText('III Stopnia')).toBeVisible();
    expect(screen.queryByText('II Stopnia')).toBeVisible();
    expect(screen.queryByText('6 litrów')).toBeVisible();
    expect(screen.queryByText('12 litrów')).toBeVisible();
  });
});
