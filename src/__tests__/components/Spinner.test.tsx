import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from '@/components/Spinner';

describe('Spinner', () => {
  it('renders with correct accessibility role and label', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-label', 'Ładowanie');
  });

  it('renders medium size by default', () => {
    render(<Spinner />);

    expect(screen.getByRole('status')).toHaveClass('w-8 h-8 border-3');
  });

  it('renders small size when the correct prop is passed in', () => {
    render(<Spinner size='sm' />);

    expect(screen.getByRole('status')).toHaveClass('w-4 h-4 border-2');
  });

  it('renders medium size when the correct prop is passed in', () => {
    render(<Spinner size='md' />);

    expect(screen.getByRole('status')).toHaveClass('w-8 h-8 border-3');
  });

  it('renders medium size when the correct prop is passed in', () => {
    render(<Spinner size='lg' />);

    expect(screen.getByRole('status')).toHaveClass('w-12 h-12 border-4');
  });

  it('always contains the base animation classes', () => {
    render(<Spinner size='sm' />);

    expect(screen.getByRole('status')).toHaveClass(
      'rounded-full animate-spin border-t-red-600'
    );
  });
});
