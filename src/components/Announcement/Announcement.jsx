
import React from 'react';
import { Box } from '@mui/material';

export default function Announcement () {
  return (
    <Box
      sx={{
        height: '30px',
        backgroundColor: 'teal',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: 500,
      }}
    >
      Super Deal! Free Shipping on Orders Over $50
    </Box>
  );
};