'use client';

import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { Product } from './Products';
import { useAppDispatch } from '@/app/store/store';
import { addToCart } from '@/app/store/cartSlice';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Paper
      elevation={4}
      sx={{
        textAlign: 'center',
        width: '252px',
        height: '378px',
      }}
    >
      <Image
        src={product.images[0]}
        alt={product.title}
        width={200}
        height={200}
        style={{ objectFit: 'cover' }}
        priority
      />
      <Typography variant="h6">{product.title}</Typography>
      <Typography variant="body1">${product.price}</Typography>
      <Button variant="contained" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </Paper>
  );
};

export default ProductItem;
