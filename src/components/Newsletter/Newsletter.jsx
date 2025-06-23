
import React from 'react';
import { Send } from '@mui/icons-material';
import { Typography, TextField, Button, Stack, useTheme, useMediaQuery } from '@mui/material';

export function Newsletter() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Stack
      gap={2}
      direction='column'
      alignItems='center'
      justifyContent='center'
      height='60vh'
      sx={{
        backgroundColor: '#fcf5f5',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align='center'
        fontSize={isMobile ? 28 : 48}
      >
        Stay in touch with Us!
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        fontWeight={300}
        align={isMobile ? 'center' : 'left'}
        fontSize={isMobile ? 18 : 22}
      >
        Get timely updates from your favorite products.
      </Typography>
      <Stack
        direction='row'
        alignItems='center'
        width={isMobile ? '80%' : '50%'}
        sx={{
          border: '1px solid lightgray',
          backgroundColor: 'white',
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Your email"
          sx={{
            flex: 8,
            pl: 2,
            '& fieldset': { border: 'none' },
          }}
        />
        <Button
          variant="contained"
          color='primary'
          sx={{
            flex: 1,
            height: '100%',
            borderRadius: 0,
            '&:hover': { backgroundColor: 'darkslategray' },
          }}
        >
          <Send />
        </Button>
      </Stack>
    </Stack>
  );
};
