
import { Search, ShoppingCartOutlined } from '@mui/icons-material';
import { Badge, Box, InputBase, Typography, Button, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { getQuantity, getFavoriteCount } from '../../redux/selectors/cartSelectors';
import { getProducts } from '../../redux/selectors/productsSelectors';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export function Navbar() {
  const quantity = useSelector(getQuantity);
  const favoriteCount = useSelector(getFavoriteCount);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const products = useSelector(getProducts);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      direction={isMobile ? 'column' : 'row'}
      padding={isMobile ? '10px 10px' : '10px 20px'}
      alignItems={isMobile ? 'center' : 'stretch'}
    >
      <Stack
        direction={isMobile ? 'column' : 'row'}
        alignItems="center"
        width="100%"
        justifyContent='space-between'
        spacing={isMobile ? 1 : 0}
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
            component="h1"
            fontWeight="bold"
            fontSize={isMobile ? '1.4rem' : '1.8rem'}
          >
            ChillFit.
          </Typography>
        </Link>

        <Stack
          direction='row'
          alignItems="center"
          border="0.5px solid lightgray"
          borderRadius="20px"
          padding="5px 10px"
          width="100%"
          maxWidth={300}
          marginTop={isMobile ? '10px' : 0}
        >
          <InputBase
            placeholder="Search"
            value={searchQuery}
            onChange={handleChange}
            fullWidth
            inputProps={{ style: { fontSize: '0.9rem' } }}
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
        spacing={2}
        gap={2}
        width='100%'
        alignItems='center'
        marginTop='10px'
        flexWrap={isMobile ? 'wrap' : 'nowrap'}
        justifyContent={isMobile ? 'center' : 'flex-end'}
      >
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            size='small'
            sx={{
              borderRadius: '20px'
            }}
          >
            Register
          </Button>
        </Link>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderRadius: '20px'
            }}
          >
            Sign In
          </Button>
        </Link>

        <Link to="/cart">
          <Badge badgeContent={quantity} color="primary">
            <ShoppingCartOutlined
              sx={{
                fontSize: isMobile ? '1.4rem' : '1.8rem',
                cursor: 'pointer',
              }}
            />
          </Badge>
        </Link>
        <Link to="/favorite">
          <Badge badgeContent={favoriteCount} color="primary">
            <FavoriteBorderOutlined
              sx={{
                fontSize: isMobile ? '1.4rem' : '1.8rem',
                cursor: 'pointer'
              }}
            />
          </Badge>
        </Link>
      </Stack>
    </Stack>
  );
}
