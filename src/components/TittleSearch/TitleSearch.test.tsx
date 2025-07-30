import { fireEvent, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { describe, expect, it, vi } from 'vitest';
import { setText } from '../../store/vacanciesSlice.ts';
import { renderWithProviders } from '../../test-utils.tsx';
import TitleSearch from './TitleSearch.tsx';

const mockStore = configureStore();

describe('TitleSearch', () => {
  it('renders title and search input', () => {
    const store = mockStore({ vacancies: { text: '' } });
    renderWithProviders(<TitleSearch />, store);

    expect(screen.getByText('Список вакансий')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Должность или название компании')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /найти/i })).toBeInTheDocument();
  });

  it('dispatches setText on input change', () => {
    const store = mockStore({ vacancies: { text: '' } });
    store.dispatch = vi.fn();

    renderWithProviders(<TitleSearch />, store);

    const input = screen.getByPlaceholderText('Должность или название компании');
    fireEvent.change(input, { target: { value: 'React' } });

    expect(store.dispatch).toHaveBeenCalledWith(setText('React'));
  });

  it('dispatches loadVacancies on Enter key', () => {
    const store = mockStore({ vacancies: { text: 'React' } });
    store.dispatch = vi.fn();

    renderWithProviders(<TitleSearch />, store);

    const input = screen.getByPlaceholderText('Должность или название компании');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(store.dispatch).toHaveBeenCalled();
  });

  it('dispatches loadVacancies on button click', () => {
    const store = mockStore({ vacancies: { text: 'React' } });
    store.dispatch = vi.fn();

    renderWithProviders(<TitleSearch />, store);

    const button = screen.getByRole('button', { name: /найти/i });
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalled();
  });
});
