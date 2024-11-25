'use client';

import { useAppSelector, useAppDispatch } from '@/app/store/store';
import { RootState } from '@/app/store/store';
import { Paper, Typography, Button, Grid2 } from '@mui/material';
import { removeFromFavorites } from '@/app/store/favoritesSlice';

const Favorites = () => {
  const dispatch = useAppDispatch();
  const favItems = useAppSelector(
    (state: RootState) => state.favorites.favoriteItems
  );

  const handleRemove = (id: number) => {
    dispatch(removeFromFavorites(id));
  };

  return (
    <Grid2 container spacing={2} sx={{ padding: 2 }}>
      {favItems.length === 0 ? (
        <Typography variant="h6">
          You didn&apos;t have any favorite products.
        </Typography>
      ) : (
        favItems.map(item => (
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

export default Favorites;
