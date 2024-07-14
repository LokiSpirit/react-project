import { render } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  it('renders children inside the header', () => {
    const { getByTestId } = render(
      <Header>
        <p data-testid="child">Hello, World!</p>
      </Header>,
    );

    const childElement = getByTestId('child');
    expect(childElement).toBeInTheDocument();
  });

  it('applies styles from header.module.css', () => {
    const { container } = render(
      <Header>
        <p>Hello, World!</p>
      </Header>,
    );

    const headerElement = container.firstChild as HTMLElement;
    expect(headerElement).toHaveClass(/header/);
  });
});
