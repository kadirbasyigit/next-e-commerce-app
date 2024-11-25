'use client';

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
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
import StarIcon from '@mui/icons-material/Star';
import ProductItem from './ProductItem';

export type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: string;
  tags: string[];
  description: string;
  rating: number;
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
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]); // For rating filter
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
      if (error instanceof AxiosError) {
        console.log('Axios error:', error.message);
      } else {
        setError('Failed to fetch products');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(
        (product: Product) =>
          product.tags.some(
            tag => tag.toLowerCase() === searchQuery.toLowerCase()
          ) ||
          product.category.toLowerCase() === searchQuery.toLowerCase() ||
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedRatings.length > 0) {
      filtered = filtered.filter(product => {
        const rating = Math.floor(product.rating);
        return (
          selectedRatings.includes(rating) ||
          (selectedRatings.includes(4) && rating >= 4)
        );
      });
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchQuery, products, selectedRatings]);

  useEffect(() => {
    if (sortOrder) {
      const sortedProducts = [...filteredProducts].sort((a, b) =>
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      );
      setFilteredProducts(sortedProducts);
    }
  }, [sortOrder, filteredProducts]);

  const handleSortChange = (order: 'asc' | 'desc') => {
    setSortOrder(sortOrder === order ? null : order);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRatings(prev =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
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

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Rating</Typography>
        {[2, 3].map(rating => (
          <FormControlLabel
            key={rating}
            control={
              <Checkbox
                checked={selectedRatings.includes(rating)}
                onChange={() => handleRatingChange(rating)}
              />
            }
            label={
              <Box display="flex" alignItems="center">
                <span>{rating}</span>{' '}
                <StarIcon
                  color="primary"
                  sx={{ marginLeft: '2px', fontSize: '17px' }}
                />
              </Box>
            }
          />
        ))}
        <FormControlLabel
          key={4}
          control={
            <Checkbox
              checked={selectedRatings.includes(4)}
              onChange={() => handleRatingChange(4)}
            />
          }
          label={
            <Box display="flex" alignItems="center">
              <span>4+</span>{' '}
              <StarIcon
                color="primary"
                sx={{ marginLeft: '2px', fontSize: '17px' }}
              />
            </Box>
          }
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
