
// src/App.test.js

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main container', () => {
  render(<App />);
  const mainContainer = screen.getByTestId('main-container'); // adjust to the actual attribute or content you have
  expect(mainContainer).toBeInTheDocument();
});
