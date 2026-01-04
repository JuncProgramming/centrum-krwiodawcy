import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BaseDashboardCard } from '@/components/dashboard/BaseDashboardCard';

describe('BaseDashboardCard', () => {
  it('should render the children and the correct title (as a <h3>)', () => {
    const dashboardCardContent = 'This is the test content';
    render(
      <BaseDashboardCard title='This is the test title'>
        {dashboardCardContent}
      </BaseDashboardCard>
    );

    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toBeInTheDocument();
    expect(title).toBeVisible();

    const content = screen.getByText(dashboardCardContent);
    expect(content).toBeInTheDocument();
    expect(content).toBeVisible();
  });
});
