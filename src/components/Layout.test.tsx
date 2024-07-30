import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Layout from './Layout';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeContext';

describe('Layout', () => {
  it('renders children correctly', () => {
    render(
      <Router>
        <ThemeProvider>
          <Layout />
        </ThemeProvider>
      </Router>,
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
