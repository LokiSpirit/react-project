import { render } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound component', () => {
  it('renders the component correctly', () => {
    const { getByText } = render(<NotFound />);
    const notFoundElement = getByText('404 - Not Found');
    expect(notFoundElement).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<NotFound />);
    expect(asFragment()).toMatchSnapshot();
  });
});
