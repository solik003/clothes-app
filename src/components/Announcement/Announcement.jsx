
import React from 'react';
import { Stack } from '@mui/material';

export function Announcement() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: '30px',
        backgroundColor: 'teal',
        color: 'white',
        fontSize: '14px',
        fontWeight: 500,
      }}
    >
      Super Deal! Free Shipping on Orders Over $50
    </Stack>
  );
}