import React from 'react';
import { useSelector } from 'react-redux';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { RootState } from '@/app/store/store';

const CartIcon: React.FC = () => {
  const itemCount = useSelector((state: RootState) => state.cart.items.length);

  return (
    <Badge badgeContent={itemCount} color="secondary">
      <ShoppingCartIcon />
    </Badge>
  );
};

export default CartIcon;
