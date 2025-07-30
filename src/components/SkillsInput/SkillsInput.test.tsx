import { fireEvent, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { describe, expect, it, vi } from 'vitest';
import { addSkill, removeSkill } from '../../store/vacanciesSlice.ts';
import { renderWithProviders } from '../../test-utils.tsx';
import { SkillsInput } from './SkillsInput.tsx';

const mockStore = configureStore();

describe('SkillsInput', () => {
  it('renders input and title', () => {
    const store = mockStore({ vacancies: { skills: [] } });
    renderWithProviders(<SkillsInput />, store);

    expect(screen.getByPlaceholderText('Навык')).toBeInTheDocument();
    expect(screen.getByText('Ключевые навыки')).toBeInTheDocument();
  });

  it('adds skill on button click', () => {
    const store = mockStore({ vacancies: { skills: [] } });
    store.dispatch = vi.fn();

    renderWithProviders(<SkillsInput />, store);

    const input = screen.getByPlaceholderText('Навык');
    fireEvent.change(input, { target: { value: 'React' } });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith(addSkill('React'));
  });

  it('adds skill on Enter key', () => {
    const store = mockStore({ vacancies: { skills: [] } });
    store.dispatch = vi.fn();

    renderWithProviders(<SkillsInput />, store);

    const input = screen.getByPlaceholderText('Навык');
    fireEvent.change(input, { target: { value: 'Redux' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(store.dispatch).toHaveBeenCalledWith(addSkill('Redux'));
  });

  it('removes skill on pill remove', () => {
    const store = mockStore({ vacancies: { skills: ['TypeScript'] } });
    store.dispatch = vi.fn();

    renderWithProviders(<SkillsInput />, store);

    const pillText = screen.getByText('TypeScript');
    expect(pillText).toBeInTheDocument();
    const removeButton = pillText.parentElement?.querySelector('button');
    expect(removeButton).toBeTruthy();

    if (removeButton) {
      fireEvent.click(removeButton);
    }

    expect(store.dispatch).toHaveBeenCalledWith(removeSkill('TypeScript'));
  });
});
