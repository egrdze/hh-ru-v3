import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MantineProvider } from '@mantine/core';
import type { Vacancy } from '../../types.ts';
import { VacancyCard } from './VacancyCard.tsx';

const mockVacancy: Vacancy = {
  id: '1',
  name: 'Frontend Developer',
  employer: {
    name: 'Tech Corp',
  },
  salary: {
    from: 100000,
    to: 150000,
    currency: 'RUR',
  },
  experience: {
    name: '1–3 года',
  },
  area: {
    name: 'Москва',
  },
  schedule: {
    name: 'удалённо',
  },
  alternate_url: 'https://example.com/vacancy/1',
};

const renderWithMantine = (ui: React.ReactNode) => {
  return render(<MantineProvider>{ui}</MantineProvider>);
};

describe('VacancyCard', () => {
  it('renders vacancy title, salary and employer', () => {
    renderWithMantine(<VacancyCard vacancy={mockVacancy} />);
    expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/100.*150.*₽/)).toBeInTheDocument();
    expect(screen.getByText(/Tech Corp/)).toBeInTheDocument();
  });

  it('renders location and experience', () => {
    renderWithMantine(<VacancyCard vacancy={mockVacancy} />);
    expect(screen.getByText(/Москва/)).toBeInTheDocument();
    expect(screen.getByText(/1–3 года/)).toBeInTheDocument();
  });

  it('shows remote tag when schedule includes "удалённо"', () => {
    renderWithMantine(<VacancyCard vacancy={mockVacancy} />);
    expect(screen.getByText(/МОЖНО УДАЛЁННО/)).toBeInTheDocument();
  });

  it('has buttons for viewing and applying', () => {
    renderWithMantine(<VacancyCard vacancy={mockVacancy} />);
    expect(screen.getByRole('button', { name: /Смотреть вакансию/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Откликнуться/i })).toHaveAttribute(
      'href',
      mockVacancy.alternate_url
    );
  });
});
