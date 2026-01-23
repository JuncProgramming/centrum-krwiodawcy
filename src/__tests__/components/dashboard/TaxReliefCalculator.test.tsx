import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaxReliefCalculator } from '@/components/dashboard/TaxReliefCalculator'; // Sprawdź ścieżkę
import { calculateTaxRelief } from '@/utils';
import type { Donation } from '@/types';

vi.mock('@/utils', () => ({
  calculateTaxRelief: vi.fn()
}));

const currentYear = new Date().getFullYear();
const previousYear = currentYear - 1;

const fakeDonations = [
  {
    id: '1',
    date: `${previousYear}-05-05`,
    type: 'krew_pelna',
    amount: 450
  }
] as unknown as Donation[];

describe('TaxReliefCalculator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with default current year and calculated amount', () => {
    (calculateTaxRelief as Mock).mockReturnValue({
      amount: 150.5,
      donationCount: 3
    });

    render(<TaxReliefCalculator donations={[]} />);

    expect(screen.getByText(/Kalkulator/i)).toBeVisible();
    expect(screen.getByText(currentYear)).toBeVisible();
    expect(screen.getByText(/150.50 zł/i)).toBeVisible();
    expect(
      screen.getByText(new RegExp(`3 donacji w ${currentYear} roku`))
    ).toBeVisible();
    expect(calculateTaxRelief).toHaveBeenCalledExactlyOnceWith([], currentYear);
  });

  it('should toggle year picker dropdown visibility on click', async () => {
    const user = userEvent.setup();

    (calculateTaxRelief as Mock).mockReturnValue({
      amount: 0,
      donationCount: 0
    });

    render(<TaxReliefCalculator donations={fakeDonations} />);

    const button = screen.getByRole('button', { name: String(currentYear) });
    await user.click(button);

    const dropdown = screen.getByRole('button', {
      name: String(previousYear)
    });
    expect(dropdown).toBeVisible();

    await user.click(button);
    expect(dropdown).not.toBeVisible();
  });

  it('should recalculate tax relief when a different year is selected', async () => {
    const user = userEvent.setup();

    (calculateTaxRelief as Mock).mockReturnValue({
      amount: 0,
      donationCount: 0
    });
    render(<TaxReliefCalculator donations={fakeDonations} />);

    (calculateTaxRelief as Mock).mockReturnValue({
      amount: 300,
      donationCount: 5
    });

    await user.click(screen.getByRole('button', { name: String(currentYear) }));

    await user.click(
      screen.getByRole('button', { name: String(previousYear) })
    );

    expect(calculateTaxRelief).toHaveBeenLastCalledWith(
      fakeDonations,
      previousYear
    );

    expect(screen.getByText(/300.00 zł/i)).toBeVisible();
  });

  it('should close dropdown when clicking outside', async () => {
    const user = userEvent.setup();

    (calculateTaxRelief as Mock).mockReturnValue({
      amount: 0,
      donationCount: 0
    });

    render(<TaxReliefCalculator donations={fakeDonations} />);

    await user.click(screen.getByRole('button', { name: String(currentYear) }));

    const dropdownOption = screen.getByRole('button', {
      name: String(previousYear)
    });
    expect(dropdownOption).toBeVisible();

    await user.click(document.body);

    expect(dropdownOption).not.toBeVisible();
  });

  it('should display correct link to government website', () => {
    (calculateTaxRelief as Mock).mockReturnValue({
      amount: 0,
      donationCount: 0
    });

    render(<TaxReliefCalculator donations={[]} />);

    const link = screen.getByRole('link', { name: /Dowiedz się więcej/i });
    expect(link).toHaveAttribute(
      'href',
      'https://www.gov.pl/web/nck/po-donacji'
    );
    expect(link).toHaveAttribute('target', '_blank');
  });
});
