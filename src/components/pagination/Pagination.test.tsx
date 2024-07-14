import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for matchers
import { describe, it, expect } from 'vitest';
import PageLink, { Props } from './PageLink';

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
