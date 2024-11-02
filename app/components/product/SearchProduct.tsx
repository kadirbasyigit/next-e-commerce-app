'use client';

import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Container,
  Typography,
  CircularProgress,
  Grid2,
} from '@mui/material';
import ProductItem from './ProductItem';
import { Product } from './Products';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://dummyjson.com/products/', {
        params: {
          limit: 0,
        },
      });
      const filteredResults = response.data.products.filter(
        (product: Product) =>
          product.tags.some(tag => tag.toLowerCase() === query.toLowerCase()) ||
          product.category.toLowerCase() === query.toLowerCase() ||
          product.title
            .toLowerCase()
            .split(/\s+/)
            .includes(query.toLowerCase()) ||
          product.description
            .toLowerCase()
            .split(/\s+/)
            .includes(query.toLowerCase())
      );
      setResults(filteredResults);
    } catch (error) {
      setError('Failed to fetch results');
    } finally {
      setLoading(false);
    }
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

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid2 container spacing={2} justifyContent="center">
          {results.length > 0 ? (
            results.map(product => (
              <ProductItem key={product.id} product={product} />
            ))
          ) : (
            <Typography>No results found</Typography>
          )}
        </Grid2>
      )}
    </Container>
  );
};

export default Search;
