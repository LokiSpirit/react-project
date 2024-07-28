import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ResultsComponent from './ResultsComponent';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { ThemeContext } from '../theme/ThemeContext';

describe('ResultsComponent', () => {
  it('should render the results correctly', () => {
    const results = [{ id: '1', name: 'Test Result' }];
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {} }}>
          <ResultsComponent results={results} total={0} pageName={''} />
        </ThemeContext.Provider>
      </Provider>,
    );
    expect(screen.getByText('Test Result')).toBeInTheDocument();
  });
});
