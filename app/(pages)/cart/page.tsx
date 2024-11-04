'use client';

import { useAppSelector, useAppDispatch } from '@/app/store/store';
import { RootState } from '@/app/store/store';
import { Paper, Typography, Button, Grid2 } from '@mui/material';
import { removeFromCart } from '@/app/store/cartSlice';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Grid2 container spacing={2} sx={{ padding: 2 }}>
      {cartItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        cartItems.map(item => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body1">${item.price}</Typography>
              <Button variant="contained" onClick={() => handleRemove(item.id)}>
                Remove
              </Button>
            </Paper>
          </Grid2>
        ))
      )}
    </Grid2>
  );
};

export default Cart;
