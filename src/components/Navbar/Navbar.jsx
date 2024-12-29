
import { Search, ShoppingCartOutlined } from '@mui/icons-material';
import { Badge, Box, InputBase, Typography, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FavoriteBorderOutlined} from '@mui/icons-material';

export default function Navbar() {
  const quantity = useSelector((state) => state.cart.quantity);
  const favoriteCount = useSelector((state) => state.cart.favoritesCount);

  return (
    <Box
      sx={{
        height: 60,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        '@media (max-width: 600px)': {
          height: 50,
          padding: '10px 0',
        },
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            cursor: 'pointer',
            '@media (max-width: 600px)': {
              display: 'none',
            },
          }}
        >
          EN
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: 2.5,
            border: '0.5px solid lightgray',
            padding: '5px',
          }}
        >
          <InputBase
            placeholder="Search"
            sx={{
              border: 'none',
              '@media (max-width: 600px)': {
                width: 50,
              },
            }}
          />
          <Search sx={{ color: 'gray', fontSize: 16 }} />
        </Box>
      </Box>

      {/* Center Section */}
      <Box
        sx={{
          flex: 1,
          textAlign: 'center',
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
            '@media (max-width: 600px)': {
              fontSize: '1.2rem',
              display: 'flex',
            },
          }}
        >
          ChillFit.
        </Typography>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          '@media (max-width: 600px)': {
            flex: 2,
            justifyContent: 'center',
          },
        }}
      >
        <Link to="/register">
            <Button
                variant="text"
                sx={{
                fontSize: 14,
                marginLeft: 2.5,
                '@media (max-width: 600px)': {
                    fontSize: 12,
                    marginLeft: 1,
                },
                }}
            >
                Register
            </Button>
        </Link>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button
            variant="text"
            sx={{
              fontSize: 14,
              marginLeft: 2.5,
              '@media (max-width: 600px)': {
                fontSize: 12,
                marginLeft: 1,
              },
            }}
          >
            Sign In
          </Button>
        </Link>
        <Link to="/cart">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 2.5,
              gap: 2,
              '@media (max-width: 600px)': {
                marginLeft: 1,
              },
            }}
          >
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </Box>
        </Link>
        <Link to="/favorite">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 2.5,
              gap: 2,
              '@media (max-width: 600px)': {
                marginLeft: 1,
              },
            }}
          >
            <Badge badgeContent={favoriteCount} color="primary">
              <FavoriteBorderOutlined />
            </Badge>
          </Box>
        </Link>
      </Box>
    </Box>
  );
};
