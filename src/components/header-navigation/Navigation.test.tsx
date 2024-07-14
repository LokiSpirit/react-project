import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from './Navigation';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { CustomLinkProps } from '../customLink/CustomLink';

vi.mock('../customLink/CustomLink', () => ({
  CustomLink: ({ children, id, to, changeSearchCategory, ...props }: CustomLinkProps) => (
    <a id={id} href={to} onClick={changeSearchCategory} {...props}>
      {children}
    </a>
  ),
}));

describe('Navigation', () => {
  const mockSetPageName = vi.fn();
  const mockSetPage = vi.fn();
  const endpoints = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];

  beforeEach(() => {
    mockSetPageName.mockClear();
    mockSetPage.mockClear();
  });

  it('renders all navigation links', () => {
    render(
      <BrowserRouter>
        <Navigation setPageName={mockSetPageName} endpoints={endpoints} setPage={mockSetPage} />
      </BrowserRouter>,
    );

    endpoints.forEach((endpoint) => {
      expect(screen.getByText(endpoint.toUpperCase())).toBeInTheDocument();
    });
  });

  it('calls setPageName and setPage when a link is clicked', () => {
    render(
      <BrowserRouter>
        <Navigation setPageName={mockSetPageName} endpoints={endpoints} setPage={mockSetPage} />
      </BrowserRouter>,
    );

    const firstLink = screen.getByText(endpoints[0].toUpperCase());
    fireEvent.click(firstLink);

    expect(mockSetPageName).toHaveBeenCalledWith(endpoints[0]);
    expect(mockSetPage).toHaveBeenCalledWith(1);
  });

  it('calls setPageName and setPage when another link is clicked', () => {
    render(
      <BrowserRouter>
        <Navigation setPageName={mockSetPageName} endpoints={endpoints} setPage={mockSetPage} />
      </BrowserRouter>,
    );

    const lastLink = screen.getByText(endpoints[endpoints.length - 1].toUpperCase());
    fireEvent.click(lastLink);

    expect(mockSetPageName).toHaveBeenCalledWith(endpoints[endpoints.length - 1]);
    expect(mockSetPage).toHaveBeenCalledWith(1);
  });
});
