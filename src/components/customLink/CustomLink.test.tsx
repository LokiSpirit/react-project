import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter, useMatch } from 'react-router-dom';
import { CustomLink, CustomLinkProps } from './CustomLink';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useMatch: vi.fn(),
  };
});

describe('CustomLink', () => {
  const mockUseMatch = vi.mocked(useMatch);
  const mockChangeSearchCategory = vi.fn();

  const renderComponent = (props: Partial<CustomLinkProps> = {}) => {
    const defaultProps: CustomLinkProps = {
      id: 'test-link',
      to: '/',
      changeSearchCategory: mockChangeSearchCategory,
      children: 'Test Link',
      ...props,
    };

    return render(
      <BrowserRouter>
        <CustomLink {...defaultProps} />
      </BrowserRouter>,
    );
  };

  it('renders children correctly', () => {
    renderComponent();
    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });

  it('calls changeSearchCategory on click', () => {
    renderComponent();
    fireEvent.click(screen.getByText('Test Link'));
    expect(mockChangeSearchCategory).toHaveBeenCalled();
  });

  it('applies active style when useMatch matches', () => {
    mockUseMatch.mockReturnValue(true);

    renderComponent({ to: '/test' });

    expect(screen.getByText('Test Link')).toHaveStyle('color: rgb(0, 0, 255)');
  });

  it('does not apply active style when useMatch does not match', () => {
    mockUseMatch.mockReturnValue(false);

    renderComponent({ to: '/test' });

    expect(screen.getByText('Test Link')).toHaveStyle('color: rgb(255, 255, 255)');
  });
});
