'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type SearchContextType = {
  keyword: string;
  setKeyword: (k: string) => void;
  category: string | null;
  setCategory: (c: string | null) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  return (
    <SearchContext.Provider value={{ keyword, setKeyword, category, setCategory }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearch must be used within a SearchProvider');
  return context;
}
