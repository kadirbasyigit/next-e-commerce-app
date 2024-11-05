'use client';

import { useAppSelector, useAppDispatch } from '@/app/store/store';
import { RootState } from '@/app/store/store';
import {
  Paper,
  Typography,
  Button,
  Grid2,
  Box,
  IconButton,
} from '@mui/material';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from '@/app/store/cartSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id: number) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id: number) => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <Grid2 container spacing={2} sx={{ padding: 2, justifyContent: 'center' }}>
      <Grid2
        size={{ xs: 12, md: 6 }}
        sx={{ marginTop: '20px', marginBottom: '30px' }}
      >
        {cartItems.length === 0 ? (
          <Typography variant="h6">Your cart is empty.</Typography>
        ) : (
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {cartItems.map((item, index) => (
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  key={item.id}
                >
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body1">${item.price}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleDecrease(item.id)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1">{item.quantity}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleIncrease(item.id)}
                    >
                      <AddIcon />
                    </IconButton>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </Box>
                  {index < cartItems.length - 1 && (
                    <hr
                      style={{ margin: '16px 0', border: '1px solid #ccc' }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Paper>
        )}
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 6 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '50px',
        }}
      >
        <Box sx={{ padding: 2, textAlign: 'center' }}>
          <Paper
            sx={{
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <Typography variant="h6">Order Summary</Typography>
            <Typography variant="body1">
              Total: $
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '50%', margin: 'auto' }}
            >
              Checkout
            </Button>
          </Paper>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default Cart;
