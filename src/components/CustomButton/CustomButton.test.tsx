import { render, screen, fireEvent } from '@testing-library/react';
import CustomButton from './CustomButton';
import { ThemeProvider } from '../theme/ThemeContext';

describe('CustomButton', () => {
  it('renders with children', () => {
    render(
      <ThemeProvider>
        <CustomButton type="button">Click me</CustomButton>
      </ThemeProvider>,
    );
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies the theme class', () => {
    render(
      <ThemeProvider>
        <CustomButton type="button">Click me</CustomButton>
      </ThemeProvider>,
    );
    const button = screen.getByText('Click me');
    expect(button).toHaveClass(/button/);
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(
      <ThemeProvider>
        <CustomButton type="button" onClick={handleClick}>
          Click me
        </CustomButton>
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
