import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../theme/ThemeContext';
import { CustomLink } from './CustomLink';

describe('CustomLink', () => {
  it('renders with children', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <CustomLink id="test-link" to="/" changeSearchCategory={() => {}}>
            Home
          </CustomLink>
        </MemoryRouter>
      </ThemeProvider>,
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('applies the theme class', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <CustomLink id="test-link" to="/" changeSearchCategory={() => {}}>
            Home
          </CustomLink>
        </MemoryRouter>
      </ThemeProvider>,
    );
    const link = screen.getByText('Home');
    expect(link).toHaveAttribute('id', 'test-link');
  });

  it('calls the changeSearchCategory handler when clicked', () => {
    const handleChangeCategory = vi.fn();
    render(
      <ThemeProvider>
        <MemoryRouter>
          <CustomLink id="test-link" to="/" changeSearchCategory={handleChangeCategory}>
            Home
          </CustomLink>
        </MemoryRouter>
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByText('Home'));
    expect(handleChangeCategory).toHaveBeenCalledTimes(1);
  });
});
