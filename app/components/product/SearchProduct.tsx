'use client';

import React, { useState } from 'react';
import { TextField, Container } from '@mui/material';

type SearchProps = {
  onSearch: (query: string) => void;
};

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <TextField
        label="Search in products"
        variant="outlined"
        fullWidth
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSearch()}
        sx={{ mb: 4 }}
      />
    </Container>
  );
};

export default Search;
