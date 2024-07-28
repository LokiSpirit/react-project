import { render, screen } from '@testing-library/react';
import Header from './Header';
import { ThemeProvider } from '../theme/ThemeContext';

describe('Header', () => {
  it('renders children', () => {
    render(
      <ThemeProvider>
        <Header>
          <div>Header Content</div>
        </Header>
      </ThemeProvider>,
    );
    expect(screen.getByText('Header Content')).toBeInTheDocument();
  });
});
