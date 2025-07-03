
import React, { useState } from 'react';
import { Send } from '@mui/icons-material';
import { Typography, TextField, Button, Stack, useTheme, useMediaQuery, Alert } from '@mui/material';

export function Newsletter() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubscribe = () => {
    if (!email.trim()) {
      setMessage('Please enter your email.');
      return;
    }

    setMessage(`Thank you for subscribing, ${email}!`);
    setEmail('');
  };

  return (
    <Stack
      gap={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="60vh"
      sx={{
        backgroundColor: '#fcf5f5',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
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
        direction="row"
        alignItems="center"
        width={isMobile ? '80%' : '50%'}
        sx={{
          border: '1px solid lightgray',
          backgroundColor: 'white',
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            flex: 8,
            pl: 2,
            '& fieldset': { border: 'none' },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            flex: 1,
            height: '100%',
            borderRadius: 0,
            '&:hover': { backgroundColor: 'darkslategray' },
          }}
          onClick={handleSubscribe}
        >
          <Send />
        </Button>
      </Stack>

      {message && (
        <Alert severity="info" sx={{ mt: 2, width: isMobile ? '80%' : '50%' }}>
          {message}
        </Alert>
      )}
    </Stack>
  );
}