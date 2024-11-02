'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CartIcon from '@/app/components/product/CartIcon';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <ShoppingBagIcon sx={{ marginRight: 1 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Roboto' }}>
          <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            ShopNest
          </a>
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMenuClick}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} sx={{ padding: '8px 16px' }}>
                <Button
                  href="/"
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Home
                </Button>
              </MenuItem>
              <MenuItem onClick={handleMenuClose} sx={{ padding: '8px 16px' }}>
                <Button
                  href="/products"
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Products
                </Button>
              </MenuItem>
              <MenuItem onClick={handleMenuClose} sx={{ padding: '8px 16px' }}>
                <Button
                  href="/about"
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                  About Us
                </Button>
              </MenuItem>
              <MenuItem onClick={handleMenuClose} sx={{ padding: '8px 16px' }}>
                <Button
                  href="/contact"
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Contact
                </Button>
              </MenuItem>
              <MenuItem onClick={handleMenuClose} sx={{ padding: '8px 16px' }}>
                <Button
                  href="/favorites"
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Favorites
                </Button>
              </MenuItem>
            </Menu>

            <IconButton color="inherit" onClick={handleProfileClick}>
              <PersonIcon />
            </IconButton>
            <Menu
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={handleProfileClose}
            >
              <MenuItem
                onClick={handleProfileClose}
                sx={{ padding: '8px 16px' }}
              >
                <Button
                  href="/login"
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Login
                </Button>
              </MenuItem>
              <MenuItem
                onClick={handleProfileClose}
                sx={{ padding: '8px 16px' }}
              >
                <Button
                  href="/register"
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Register
                </Button>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              href="/"
              sx={{ mx: 2, textTransform: 'none' }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              href="/products"
              sx={{ mx: 2, textTransform: 'none' }}
            >
              Products
            </Button>
            <Button
              color="inherit"
              href="/about"
              sx={{ mx: 2, textTransform: 'none' }}
            >
              About Us
            </Button>
            <Button
              color="inherit"
              href="/contact"
              sx={{ mx: 2, textTransform: 'none' }}
            >
              Contact
            </Button>
            <Button
              color="inherit"
              href="/favorites"
              sx={{ mx: 2, textTransform: 'none' }}
            >
              Favorites
            </Button>

            <IconButton
              color="inherit"
              onClick={handleProfileClick}
              sx={{ mx: 2 }}
            >
              <PersonIcon />
            </IconButton>
            <Menu
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={handleProfileClose}
            >
              <MenuItem
                onClick={handleProfileClose}
                sx={{ padding: '8px 16px' }}
              >
                <Button
                  href="/login"
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Login
                </Button>
              </MenuItem>
              <MenuItem
                onClick={handleProfileClose}
                sx={{ padding: '8px 16px' }}
              >
                <Button
                  href="/register"
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Register
                </Button>
              </MenuItem>
            </Menu>

            <IconButton color="inherit" href="/cart" sx={{ mx: 2 }}>
              <CartIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
