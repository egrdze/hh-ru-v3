import type { Store } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';

export function renderWithProviders(ui: React.ReactElement, store: Store) {
  return render(
    <Provider store={store}>
      <MantineProvider>{ui}</MantineProvider>
    </Provider>
  );
}
