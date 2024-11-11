'use client';

import Products from './components/product/Products';
import SearchProduct from './components/product/SearchProduct';
import { useState } from 'react';
// import { useAppSelector } from '@/app/store/store';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  // const userEmail = useAppSelector(state => state.user.email);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      {/* <div>
        {userEmail ? (
          <p>User email: {userEmail}</p> // Display user email from Redux
        ) : (
          <p>No user is authenticated.</p>
        )}
      </div> */}
      <SearchProduct onSearch={handleSearch} />
      <Products searchQuery={searchQuery} />
    </>
  );
}
