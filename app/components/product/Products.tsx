'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress, Grid2 } from '@mui/material';
import ProductItem from './ProductItem';
import Pagination from '@mui/material/Pagination';

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const fetchProducts = async (page: number) => {
    try {
      const response = await axios.get('https://dummyjson.com/products', {
        params: {
          limit: itemsPerPage,
          skip: (page - 1) * itemsPerPage,
        },
      });
      setProducts(response.data.products);
    } catch (error) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
    window.scrollTo(0, 0);
  }, [currentPage]);

  const totalPages = Math.ceil(194 / itemsPerPage);
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid2 container spacing={2} justifyContent={'center'}>
        {products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Grid2>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, value) => setCurrentPage(value)}
        sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
};

export default Products;
