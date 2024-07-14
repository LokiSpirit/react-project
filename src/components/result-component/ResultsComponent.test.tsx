import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ResultsComponent, { Result, ResultsComponentProps } from './ResultsComponent';
import '@testing-library/jest-dom';
import PageLink, { Props } from '../pagination/PageLink';

vi.mock('../../hooks/useUrlContext', () => ({
  useUrlContext: () => ({
    setSelectedUrl: vi.fn(),
  }),
}));

const renderComponent = (props: Partial<ResultsComponentProps> = {}) => {
  const defaultProps: ResultsComponentProps = {
    results: [],
    page: 1,
    total: 0,
    setPage: vi.fn(),
    pageName: 'films',
    onItemClick: vi.fn(),
    ...props,
  };

  render(
    <BrowserRouter>
      <ResultsComponent {...defaultProps} />
    </BrowserRouter>,
  );
};

describe('ResultsComponent', () => {
  it('renders the specified number of cards', () => {
    const mockResults: Result[] = [
      { url: 'https://swapi.dev/api/films/1/', name: 'A New Hope' },
      { url: 'https://swapi.dev/api/films/2/', name: 'The Empire Strikes Back' },
    ];

    renderComponent({ results: mockResults, total: 2 });

    const cards = screen.getAllByRole('heading');
    expect(cards).toHaveLength(mockResults.length);
    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument();
  });

  it('displays a notification message if no cards are present', () => {
    renderComponent({ results: null });

    expect(screen.getByText('No results found!')).toBeInTheDocument();
  });
});

describe('PageLink component', () => {
  const renderComponent = (props: Partial<Props> = {}) => {
    render(<PageLink {...props}>Test Link</PageLink>);
  };

  it('renders an anchor element when not disabled', () => {
    renderComponent();

    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveProperty('tagName', 'A');
  });

  it('renders a span element when disabled', () => {
    renderComponent({ disabled: true });

    const spanElement = screen.getByText('Test Link');
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveProperty('tagName', 'SPAN');
  });

  it('applies the active class when active prop is true', () => {
    renderComponent({ active: true });

    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toHaveClass(/active/);
  });

  it('applies the disabled class when disabled prop is true', () => {
    renderComponent({ disabled: true });

    const spanElement = screen.getByText('Test Link');
    expect(spanElement).toHaveClass(/disabled/);
  });

  it('adds aria-current attribute when active', () => {
    renderComponent({ active: true });

    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toHaveAttribute('aria-current', 'page');
  });

  it('passes other props to the anchor element', () => {
    renderComponent({ href: '/test', target: '_blank' });

    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toHaveAttribute('href', '/test');
    expect(linkElement).toHaveAttribute('target', '_blank');
  });

  it('applies custom class names', () => {
    renderComponent({ className: 'custom-class' });

    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toHaveClass('custom-class');
  });
});
