import { render, screen } from '@testing-library/react';
import PageLink from './PageLink';
import { ThemeProvider } from '../theme/ThemeContext';

describe('PageLink', () => {
  it('renders as link when not disabled', () => {
    render(
      <ThemeProvider>
        <PageLink href="/">Link</PageLink>
      </ThemeProvider>,
    );
    expect(screen.getByText('Link').closest('a')).toBeInTheDocument();
  });

  it('renders as span when disabled', () => {
    render(
      <ThemeProvider>
        <PageLink disabled>Disabled Link</PageLink>
      </ThemeProvider>,
    );
    expect(screen.getByText('Disabled Link').closest('span')).toBeInTheDocument();
  });
});
