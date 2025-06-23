
import React from 'react';
import { Stack } from '@mui/material';

export function Announcement() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      height={30}
      bgcolor="teal"
      color="white"
      fontSize={14}
      fontWeight={500}
    >
      Super Deal! Free Shipping on Orders Over $50
    </Stack>
  );
}