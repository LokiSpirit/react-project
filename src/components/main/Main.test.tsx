import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Main from './Main';

describe('Main', () => {
  it('renders children correctly', () => {
    render(
      <Main>
        <div>Child Content</div>
      </Main>,
    );
    const childElement = screen.getByText('Child Content');
    expect(childElement).toBeInTheDocument();
  });

  it('renders multiple children correctly', () => {
    render(
      <Main>
        <div>Child One</div>
        <div>Child Two</div>
      </Main>,
    );
    const childOne = screen.getByText('Child One');
    const childTwo = screen.getByText('Child Two');
    expect(childOne).toBeInTheDocument();
    expect(childTwo).toBeInTheDocument();
  });
});
