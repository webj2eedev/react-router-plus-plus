import React from 'react';
import { render, screen } from '@testing-library/react';

import X from "./index"

describe('react-sketch-ruler', () => {
    test('renders App component', async () => {
      render(<X />);

      expect(await screen.findByText(/hello/)).toBeInTheDocument();

      screen.debug();
    });
  });


  