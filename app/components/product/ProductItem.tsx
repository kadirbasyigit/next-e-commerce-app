'use client';

import React from 'react';
import { Paper, Typography, Button, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Image from 'next/image';
import { Product } from './Products';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import {
  addToFavorites,
  removeFromFavorites,
} from '@/app/store/favoritesSlice';
import { addToCart } from '@/app/store/cartSlice';
import Link from '@/app/utils/Link';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.favoriteItems);
  const isFavorite = favorites.some(fav => fav.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        textAlign: 'center',
        width: '252px',
        height: '378px',
        position: 'relative',
      }}
    >
      <IconButton
        onClick={handleToggleFavorite}
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>
      <Link href={`/products/${product.id}`}>
        <Image
          src={product.images[0]}
          alt={product.title}
          width={200}
          height={200}
          style={{ objectFit: 'cover' }}
          priority
        />
        <Typography variant="h6">{product.title}</Typography>
      </Link>
      <Typography variant="body1">${product.price}</Typography>
      <Button variant="contained" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </Paper>
  );
};

export default ProductItem;
