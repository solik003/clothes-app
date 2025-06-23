
import React from 'react';
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
} from '@mui/icons-material';
import { Box, Typography, List, ListItem, IconButton, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const usefulLinks = [
  { name: 'Home', path: '/' },
  { name: 'Cart', path: '/cart' },
  { name: 'Man Fashion', path: '/products/man' },
  { name: 'Woman Fashion', path: '/products/woman' },
  { name: 'My Account', path: '/login' },
  { name: 'Wishlist', path: '/favorite' },
  { name: 'Terms', path: '/terms' },
];

export function Footer() {
  return (
    <Stack
      spacing={2}
      flexDirection={{ xs: 'column', sm: 'row' }}
      sx={{
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* Left Section */}
      <Stack
        direction="column"
        flex={2}
        padding={2}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          ChillFit.
        </Typography>
        <Typography variant="body2" gutterBottom>
          ChillFit is an online store dedicated to offering stylish, high-quality
          clothing that combines comfort with modern fashion trends. Designed for
          individuals who value both classic and contemporary styles, ChillFit
          provides a versatile range of apparel for all seasons and occasions.
        </Typography>
      </Stack>

      {/* Center Section */}
      <Stack
        flex={3}
        padding={2}
        display={{ xs: 'none', sm: 'block' }}
      >
        <Typography variant="h6" gutterBottom >
          Useful Links
        </Typography>
        <List
          disablePadding
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: 0,
            listStyle: 'none',
          }}
        >
          {usefulLinks.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ width: '50%', mb: 1 }}
            >
              <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="body2">{item.name}</Typography>
              </Link>
            </ListItem>
          ))}
        </List>
      </Stack>

      {/* Right Section */}
      <Box
        flex={1}
        padding={2}
        sx={{
          backgroundColor: { xs: '#fff8f8', sm: 'transparent' },
        }}
      >
        <Typography variant="h6" gutterBottom >
          Contact
        </Typography>
        <Stack
          direction="row"
          gap={2}
          mb={2}
          alignItems="center"
        >
          <Room />
          <Typography variant="body2">Ukraine, Lviv</Typography>
        </Stack>
        <Stack
          direction="row"
          gap={2}
          mb={2}
          alignItems="center"
        >
          <Phone />
          <Typography variant="body2">+380</Typography>
        </Stack>
        <Stack
          direction="row"
          gap={2}
          mb={2}
          alignItems="center"
        >
          <MailOutline />
          <Typography variant="body2">contact@avenue.dev</Typography>
        </Stack>

        <Stack direction='row'>
          <IconButton sx={{ color: '#E4405F' }}>
            <Instagram />
          </IconButton>
          <IconButton sx={{ color: '#3B5999' }}>
            <Facebook />
          </IconButton>
          <IconButton sx={{ color: '#E60023' }}>
            <Pinterest />
          </IconButton>
        </Stack>
      </Box>
    </Stack>
  );
}
