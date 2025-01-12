
import { Search, ShoppingCartOutlined } from '@mui/icons-material';
import { Badge, Box, InputBase, Typography, Button, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';

export function Navbar() {
  const quantity = useSelector((state) => state.cart.quantity);
  const favoriteCount = useSelector((state) => state.cart.favoritesCount);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const products = useSelector((state) => state.cart.products);
  console.log(products);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setSearchQuery(queryParams.get('q') || '');
  }, [location]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Stack
    direction='row'
    sx={{
      padding: '10px 20px',
      '@media (max-width: 600px)': {
        padding: '10px 10px',
        flexDirection: 'column',
        alignItems: 'center',
      },
    }}
>
  <Stack
    direction='row'
    sx={{
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      '@media (max-width: 600px)': {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      },
    }}
  >
    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Typography
        component="h1"
        sx={{
          fontWeight: 'bold',
          fontSize: '1.8rem',
          '@media (max-width: 600px)': {
            fontSize: '1.4rem',
          },
        }}
      >
        ChillFit.
      </Typography>
    </Link>

    <Stack
      direction='row'
      sx={{
        alignItems: 'center',
        border: '0.5px solid lightgray',
        borderRadius: '20px',
        padding: '5px 10px',
        width: '100%',
        maxWidth: 300,
        '@media (max-width: 600px)': {
          marginTop: '10px',
        },
      }}
    >
      <InputBase
        placeholder="Search"
        value={searchQuery}
        onChange={handleChange}
        sx={{
          flex: 1,
          fontSize: '0.9rem',
        }}
      />
      <Search
        sx={{
          fontSize: '1.2rem',
        }}
        onClick={handleSearch}
      />
    </Stack>
  </Stack>

  <Stack
    direction="row"
    gap={2}
    sx={{
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: '10px',
      '@media (max-width: 600px)': {
        flexWrap: 'wrap',
        gap: 1.5,
        justifyContent: 'center',
      },
    }}
  >
    <Link to="/register" style={{ textDecoration: 'none' }}>
      <Button
        variant="outlined"
        sx={{
          fontSize: '0.875rem',
          padding: '5px 10px',
          borderRadius: '20px',
          '@media (max-width: 600px)': {
            fontSize: '0.75rem',
          },
        }}
      >
        Register
      </Button>
    </Link>
    <Link to="/login" style={{ textDecoration: 'none' }}>
      <Button
        variant="outlined"
        sx={{
          fontSize: '0.875rem',
          padding: '5px 10px',
          borderRadius: '20px',
          '@media (max-width: 600px)': {
            fontSize: '0.75rem',
          },
        }}
      >
        Sign In
      </Button>
    </Link>

    <Link to="/cart">
      <Badge badgeContent={quantity} color="primary">
        <ShoppingCartOutlined
          sx={{
            fontSize: '1.8rem',
            cursor: 'pointer',
            '@media (max-width: 600px)': {
              fontSize: '1.4rem',
            },
          }}
        />
      </Badge>
    </Link>
    <Link to="/favorite">
      <Badge badgeContent={favoriteCount} color="primary">
        <FavoriteBorderOutlined
          sx={{
            fontSize: '1.8rem',
            cursor: 'pointer',
            '@media (max-width: 600px)': {
              fontSize: '1.4rem',
            },
          }}
        />
      </Badge>
    </Link>
  </Stack>
</Stack>
  );
}
