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
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Link from '@/app/utils/Link';
import CartIcon from '@/app/components/product/CartIcon';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const router = useRouter();

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

  const handleLogout = async () => {
    try {
      const response = await axios.post('api/firebaseLogout');
      if (response.status === 200) {
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <ShoppingBagIcon sx={{ marginRight: 1 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Roboto' }}>
          <Link href="/">ShopNest</Link>
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
              <MenuItem onClick={handleMenuClose}>
                <Link href="/">Home</Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/products">Products</Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/about">About Us</Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/contact">Contact</Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/favorites">Favorites</Link>
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
              <MenuItem onClick={handleProfileClose}>
                <Link href="/login">Login</Link>
              </MenuItem>
              <MenuItem onClick={handleProfileClose}>
                <Link href="/register">Register</Link>
              </MenuItem>
              {/* <MenuItem onClick={handleLogout}>Logout</MenuItem> */}
            </Menu>
          </>
        ) : (
          <>
            <Link href="/">
              <Button color="inherit" sx={{ mx: 2, textTransform: 'none' }}>
                Home
              </Button>
            </Link>
            <Link href="/products">
              <Button color="inherit" sx={{ mx: 2, textTransform: 'none' }}>
                Products
              </Button>
            </Link>
            <Link href="/about">
              <Button color="inherit" sx={{ mx: 2, textTransform: 'none' }}>
                About Us
              </Button>
            </Link>
            <Link href="/contact">
              <Button color="inherit" sx={{ mx: 2, textTransform: 'none' }}>
                Contact
              </Button>
            </Link>
            <Link href="/favorites">
              <Button color="inherit" sx={{ mx: 2, textTransform: 'none' }}>
                Favorites
              </Button>
            </Link>

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
              <MenuItem onClick={handleProfileClose}>
                <Link href="/login">Login</Link>
              </MenuItem>
              <MenuItem onClick={handleProfileClose}>
                <Link href="/register">Register</Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>

            <Link href="/cart">
              <IconButton color="inherit" sx={{ mx: 2 }}>
                <CartIcon />
              </IconButton>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
