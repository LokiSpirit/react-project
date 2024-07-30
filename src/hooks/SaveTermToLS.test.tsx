import { renderHook, act } from '@testing-library/react';
import SaveTermToLS from './SaveTermToLS';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('SaveTermToLS hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with initial value', () => {
    const { result } = renderHook(() => SaveTermToLS('testKey', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('should set value to localStorage', () => {
    const { result } = renderHook(() => SaveTermToLS('testKey', 'initial'));

    act(() => {
      result.current[1]('new value');
    });

    expect(localStorage.getItem('testKey')).toBe(JSON.stringify('new value'));
    expect(result.current[0]).toBe('new value');
  });

  it('should update value in localStorage', () => {
    localStorage.setItem('testKey', JSON.stringify('existing value'));

    const { result } = renderHook(() => SaveTermToLS('testKey', 'initial'));

    act(() => {
      result.current[1]('updated value');
    });

    expect(localStorage.getItem('testKey')).toBe(JSON.stringify('updated value'));
    expect(result.current[0]).toBe('updated value');
  });

  it('should handle errors gracefully when fetching from localStorage', () => {
    localStorage.setItem('testKey', 'invalid JSON');

    const { result } = renderHook(() => SaveTermToLS('testKey', 'initial'));

    expect(result.current[0]).toBe('initial');
  });
});
