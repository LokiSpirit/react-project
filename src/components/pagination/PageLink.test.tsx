// src/components/pageLink/PageLink.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageLink, { Props } from './PageLink';
import { describe, it, expect } from 'vitest';

describe('PageLink Component', () => {
  const defaultProps: Props = {
    children: 'Page Link',
    className: '',
    active: false,
    disabled: false,
  };

  it('renders the component with the correct text', () => {
    render(<PageLink {...defaultProps} />);
    expect(screen.getByText('Page Link')).toBeInTheDocument();
  });

  it('applies the active class when the active prop is true', () => {
    render(<PageLink {...defaultProps} active={true} />);
    expect(screen.getByText('Page Link')).toHaveClass(/active/);
  });

  it('applies the disabled class and renders a span when the disabled prop is true', () => {
    render(<PageLink {...defaultProps} disabled={true} />);
    const element = screen.getByText('Page Link');
    expect(element).toHaveClass(/disabled/);
    expect(element.tagName).toBe('SPAN');
  });

  it('renders an anchor tag when the disabled prop is false', () => {
    render(<PageLink {...defaultProps} disabled={false} />);
    const element = screen.getByText('Page Link');
    expect(element.tagName).toBe('A');
  });

  it('applies additional class names passed via the className prop', () => {
    render(<PageLink {...defaultProps} className="custom-class" />);
    expect(screen.getByText('Page Link')).toHaveClass('custom-class');
  });

  it('sets aria-current to "page" when the active prop is true', () => {
    render(<PageLink {...defaultProps} active={true} />);
    expect(screen.getByText('Page Link')).toHaveAttribute('aria-current', 'page');
  });

  it('does not set aria-current when the active prop is false', () => {
    render(<PageLink {...defaultProps} active={false} />);
    expect(screen.getByText('Page Link')).not.toHaveAttribute('aria-current');
  });
});
