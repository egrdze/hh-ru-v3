import { fireEvent, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { describe, expect, it, vi } from 'vitest';
import { setArea } from '../../store/vacanciesSlice.ts';
import { renderWithProviders } from '../../test-utils.tsx';
import { CitySelect } from './CitySelect.tsx';

const mockStore = configureStore();
const initialState = {
  vacancies: {
    area: '',
  },
};

describe('CitySelect', () => {
  it('renders with placeholder and icon', () => {
    const store = mockStore(initialState);
    renderWithProviders(<CitySelect />, store);

    expect(screen.getByPlaceholderText('Все города')).toBeInTheDocument();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('opens dropdown and shows cities', async () => {
    const store = mockStore(initialState);
    renderWithProviders(<CitySelect />, store);

    const select = screen.getByPlaceholderText('Все города');
    fireEvent.mouseDown(select);

    expect(await screen.findByText('Москва')).toBeInTheDocument();
    expect(screen.getByText('Санкт-Петербург')).toBeInTheDocument();
  });

  it('dispatches setArea on change', async () => {
    const store = mockStore(initialState);
    store.dispatch = vi.fn();

    renderWithProviders(<CitySelect />, store);

    const select = screen.getByPlaceholderText('Все города');
    fireEvent.mouseDown(select);

    const option = await screen.findByText('Москва');
    fireEvent.click(option);

    expect(store.dispatch).toHaveBeenCalledWith(setArea('1'));
  });
});
