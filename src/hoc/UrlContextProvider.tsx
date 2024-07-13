import React, { createContext, useState, ReactNode } from 'react';

type UrlContextProps = {
  selectedItemId: string | null;
  selectedUrl: string | null;
  setSelectedItemId: (id: string | null) => void;
  setSelectedUrl: (url: string | null) => void;
};

export const UrlContext = createContext<UrlContextProps | null>(null);

interface UrlContextProviderProps {
  children: ReactNode;
}

export const UrlContextProvider: React.FC<UrlContextProviderProps> = ({ children }) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  const value = { selectedItemId, selectedUrl, setSelectedItemId, setSelectedUrl };

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
};
