import { useContext } from 'react';
import { UrlContext } from '../hoc/UrlContextProvider';

export function useUrlContext() {
  const context = useContext(UrlContext);
  if (!context) {
    throw new Error('useUrlContext must be used within a UrlContextProvider');
  }
  return context;
}
