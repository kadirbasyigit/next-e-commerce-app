'use client';

import Products from './components/product/Products';
import Header from './components/ui/Header';
import SearchProduct from './components/product/SearchProduct';
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Header />
      <SearchProduct onSearch={handleSearch} />
      <Products searchQuery={searchQuery} />
    </>
  );
}
