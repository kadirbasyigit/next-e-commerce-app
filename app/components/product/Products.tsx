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
  category: string;
  tags: string[];
  description: string;
};

type ProductsProps = {
  searchQuery?: string;
};

const Products: React.FC<ProductsProps> = ({ searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const fetchProducts = async (page: number) => {
    try {
      const response = await axios.get('https://dummyjson.com/products', {
        params: {
          limit: 0,
        },
      });
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      fetchProducts(currentPage);
    } else {
      searchProducts();
    }
    window.scrollTo(0, 0);
  }, [currentPage, searchQuery]);

  const searchProducts = async () => {
    if (!searchQuery) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://dummyjson.com/products', {
        params: {
          limit: 0,
        },
      });
      const filteredResults = response.data.products.filter(
        (product: Product) =>
          product.tags.some(
            tag => tag.toLowerCase() === searchQuery.toLowerCase()
          ) ||
          product.category.toLowerCase() === searchQuery.toLowerCase() ||
          product.title
            .toLowerCase()
            .split(/\s+/)
            .includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .split(/\s+/)
            .includes(searchQuery.toLowerCase())
      );
      setProducts(filteredResults);
      setCurrentPage(1);
    } catch (error) {
      setError('Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid2 container spacing={2} justifyContent={'center'}>
        {paginatedProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Grid2>
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, value) => setCurrentPage(value)}
          sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
        />
      )}
    </Container>
  );
};

export default Products;
