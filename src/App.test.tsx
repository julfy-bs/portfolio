import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('<App />', () => {
  describe('Rendering', () => {
    it('Should render without throwing', () => {
      render(<App />);
      expect(screen.getByText('Vite + React')).toBeInTheDocument();
    });
  });
});
