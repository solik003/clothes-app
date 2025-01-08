
import React from 'react';
import { Send } from '@mui/icons-material';
import { Typography, TextField, Button, Stack } from '@mui/material';

export function Newsletter () {
  return (
    <Stack
      gap={2}
      direction='column'
      sx={{
        height: '60vh',
        backgroundColor: '#fcf5f5',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align='center'
        sx={{
          fontSize: { xs: 30, sm: 50 },
        }}
      >
        Stay in touch with Us!
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          fontSize: { xs: 20, sm: 24 },
          fontWeight: 300,
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        Get timely updates from your favorite products.
      </Typography>
      <Stack
        direction='row'
        sx={{
          width: { xs: '80%', sm: '50%' },
          alignItems: 'center',
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
