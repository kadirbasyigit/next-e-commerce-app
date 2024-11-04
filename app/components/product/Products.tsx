'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  CircularProgress,
  Grid2,
  Box,
  FormControlLabel,
  Checkbox,
  Pagination,
} from '@mui/material';
import ProductItem from './ProductItem';

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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const itemsPerPage = 30;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products', {
        params: { limit: 0 },
      });
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(
        (product: Product) =>
          product.tags.some(
            tag => tag.toLowerCase() === searchQuery.toLowerCase()
          ) ||
          product.category.toLowerCase() === searchQuery.toLowerCase() ||
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
    setCurrentPage(1);
  }, [searchQuery, products]);

  useEffect(() => {
    if (sortOrder) {
      const sortedProducts = [...filteredProducts].sort((a, b) =>
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      );
      setFilteredProducts(sortedProducts);
    }
  }, [sortOrder]);

  const handleSortChange = (order: 'asc' | 'desc') => {
    setSortOrder(sortOrder === order ? null : order);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Price</Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={sortOrder === 'asc'}
              onChange={() => handleSortChange('asc')}
            />
          }
          label="Low to High"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sortOrder === 'desc'}
              onChange={() => handleSortChange('desc')}
            />
          }
          label="High to Low"
        />
      </Box>
      <Grid2 container spacing={2} justifyContent="center">
        {paginatedProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Grid2>
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
        />
      )}
    </Container>
  );
};

export default Products;
