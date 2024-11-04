import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/app/components/product/Products';

type FavoritesState = {
  favoriteItems: Product[];
};

const initialState: FavoritesState = {
  favoriteItems: [],
};

const favoritesSlice = createSlice({
  name: 'favoriteItems',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      if (!state.favoriteItems.find(item => item.id === action.payload.id)) {
        state.favoriteItems.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favoriteItems = state.favoriteItems.filter(
        item => item.id !== action.payload
      );
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
