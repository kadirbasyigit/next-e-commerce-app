'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress, Grid2 } from '@mui/material';
import ProductItem from './ProductItem';

export type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid2
        container
        spacing={2}
        justifyContent={'center'}
      >
        {products.map(product => (
          <ProductItem product={product} />
        ))}
      </Grid2>
    </Container>
  );
};

export default Products;
