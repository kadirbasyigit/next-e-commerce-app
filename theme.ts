'use client';
import { createTheme } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#ffffff',
    },
  },
};

const theme = createTheme({
  ...themeOptions,
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

export default theme;
