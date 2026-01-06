import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FaqCard from '@/components/FaqCard';

describe('FaqCard', () => {
  const testQuestionText = 'Is this a test question?';
  const testAnswerText = 'This is a test answer';
  const testAnswerContent = <h1>{testAnswerText}</h1>;
  it('should render the card and check if the question and button are visible and the answer exists in the document', () => {
    render(<FaqCard question={testQuestionText}>{testAnswerContent}</FaqCard>);

    const question = screen.getByText(testQuestionText);
    expect(question).toBeInTheDocument();
    expect(question).toBeVisible();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toBeVisible();

    expect(screen.getByText(testAnswerText)).toBeInTheDocument();
  });

  it('should expand the card structure and update the button aria-label when clicked', async () => {
    const user = userEvent.setup();

    render(<FaqCard question={testQuestionText}>{testAnswerContent}</FaqCard>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute(
      'aria-label',
      expect.stringMatching(/rozwiń/i)
    );
    expect(button).toBeInTheDocument();
    expect(button).toBeVisible();

    const accordion = screen.getByTestId('faq-accordion');
    expect(accordion).toHaveClass('grid-rows-[0fr]');

    await user.click(button);

    expect(button).toHaveAttribute(
      'aria-label',
      expect.stringMatching(/zwiń/i)
    );

    expect(accordion).toHaveClass('grid-rows-[1fr]');
  });

  it('should collapse the card structure back when clicked twice and update the button aria-label accordingly', async () => {
    const user = userEvent.setup();

    render(<FaqCard question={testQuestionText}>{testAnswerContent}</FaqCard>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute(
      'aria-label',
      expect.stringMatching(/rozwiń/i)
    );
    expect(button).toBeInTheDocument();
    expect(button).toBeVisible();

    const accordion = screen.getByTestId('faq-accordion');
    expect(accordion).toHaveClass('grid-rows-[0fr]');

    await user.click(button);

    expect(button).toHaveAttribute(
      'aria-label',
      expect.stringMatching(/zwiń/i)
    );

    expect(accordion).toHaveClass('grid-rows-[1fr]');

    await user.click(button);

    expect(button).toHaveAttribute(
      'aria-label',
      expect.stringMatching(/rozwiń/i)
    );

    expect(accordion).toHaveClass('grid-rows-[0fr]');
  });
});
