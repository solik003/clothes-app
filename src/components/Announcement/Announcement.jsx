
import React from 'react';
import { Stack, Typography } from '@mui/material';

export default function Announcement () {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      height={30}
      bgcolor="teal"
    >
      <Typography
        variant="body2"
        component="span"
        color="white"
      >
        Super Deal! Free Shipping on Orders Over $50
      </Typography>
    </Stack>
  );
};