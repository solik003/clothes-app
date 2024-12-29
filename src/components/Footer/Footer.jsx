
import React from 'react';
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
} from '@mui/icons-material';
import { Box, Typography, List, ListItem, IconButton } from '@mui/material';

const usefulLinks = [
    'Home',
    'Cart',
    'Man Fashion',
    'Woman Fashion',
    'Accessories',
    'My Account',
    'Order Tracking',
    'Wishlist',
    'Terms',
];

export default function Footer () {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        padding: '20px',
        backgroundColor: '#f5f5f5',
        color: 'black'
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          flex: 2,
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
          ChillFit.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '20px' }}>
          ChillFit is an online store dedicated to offering stylish, high-quality
          clothing that combines comfort with modern fashion trends. Designed for
          individuals who value both classic and contemporary styles, ChillFit
          provides a versatile range of apparel for all seasons and occasions.
        </Typography>
      </Box>

      {/* Center Section */}
      <Box
        sx={{
          flex: 3,
          padding: '20px',
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: '30px' }}>
          Useful Links
        </Typography>
        <List
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: 0,
            margin: 0,
            listStyle: 'none',
          }}
        >
          {usefulLinks.map((item, index) => (
            <ListItem
              key={index}
              sx={{ width: '50%', marginBottom: '10px', padding: 0 }}
            >
              <Typography variant="body2">{item}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          flex: 1,
          padding: '20px',
          backgroundColor: { xs: '#fff8f8', sm: 'transparent' },
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: '20px' }}>
          Contact
        </Typography>
        <Box
          sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
        >
          <Room sx={{ marginRight: '10px' }} />
          <Typography variant="body2">Ukraine, Lviv</Typography>
        </Box>
        <Box
          sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
        >
          <Phone sx={{ marginRight: '10px' }} />
          <Typography variant="body2">+380</Typography>
        </Box>
        <Box
          sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
        >
          <MailOutline sx={{ marginRight: '10px' }} />
          <Typography variant="body2">contact@avenue.dev</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '10px' }}>
          <IconButton sx={{ color: '#E4405F', borderRadius: '50%' }}>
            <Instagram />
          </IconButton>
          <IconButton sx={{ color: '#3B5999', borderRadius: '50%' }}>
            <Facebook />
          </IconButton>
          <IconButton sx={{ color: '#E60023', borderRadius: '50%' }}>
            <Pinterest />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

