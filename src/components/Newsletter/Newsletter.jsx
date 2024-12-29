
import React from 'react';
import { Send } from '@mui/icons-material';
import { Box, Typography, TextField, Button } from '@mui/material';

export default function Newsletter () {
  return (
    <Box
      sx={{
        height: '60vh',
        backgroundColor: '#fcf5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '20px',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: '30px', sm: '50px' },
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        Stay in touch with Us!
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: '20px', sm: '24px' },
          fontWeight: 300,
          marginBottom: '20px',
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        Get timely updates from your favorite products.
      </Typography>
      <Box
        sx={{
          width: { xs: '80%', sm: '50%' },
          display: 'flex',
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
            border: 'none',
            paddingLeft: '20px',
            '& fieldset': { border: 'none' },
          }}
        />
        <Button
          variant="contained"
          sx={{
            flex: 1,
            backgroundColor: 'teal',
            color: 'white',
            height: '100%',
            borderRadius: 0,
            '&:hover': { backgroundColor: 'darkslategray' },
          }}
        >
          <Send />
        </Button>
      </Box>
    </Box>
  );
};
