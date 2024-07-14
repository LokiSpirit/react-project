import { render, screen, act } from '@testing-library/react';
import { vi } from 'vitest';
import DetailComponent from './DetailComponent';

vi.mock('../../hooks/useUrlContext', () => ({
  useUrlContext: vi.fn(() => ({
    selectedUrl: 'mocked-url',
    selectedItemId: 'mocked-item-id',
  })),
}));

describe('DetailComponent', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ title: 'Mock Title', description: 'Mock Description' }),
      }),
    ) as vi.MockedFunction<typeof global.fetch>;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('handles fetch error gracefully', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Fetch failed')));

    await act(async () => {
      render(<DetailComponent handleCloseDetails={() => {}} />);
    });

    // Check if error message is rendered
    expect(await screen.findByText('Unable to fetch details')).toBeInTheDocument();
  });

  it('calls handleCloseDetails when close button is clicked', async () => {
    const mockHandleClose = vi.fn();
    await act(async () => {
      render(<DetailComponent handleCloseDetails={mockHandleClose} />);
    });

    // Simulate button click
    const closeButton = screen.getByText('Close');
    closeButton.click();

    // Assert that handleCloseDetails was called
    expect(mockHandleClose).toHaveBeenCalled();
  });
});
