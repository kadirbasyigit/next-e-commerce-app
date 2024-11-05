'use client';

import Products from './components/product/Products';
import SearchProduct from './components/product/SearchProduct';
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <SearchProduct onSearch={handleSearch} />
      <Products searchQuery={searchQuery} />
    </>
  );
}
