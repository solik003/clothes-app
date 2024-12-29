import React from 'react'
import { Box, Button, TextField, Typography, Link } from '@mui/material';


export default function Register () {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center`,
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '40%',
          padding: 2,
          backgroundColor: 'white',
          '@media (max-width: 600px)': {
            width: '75%',
          },
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 300, fontSize: '24px' }}>
          Create an account
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
          <TextField label="Name" variant="outlined" fullWidth sx={{ marginBottom: 2 }} />
          <TextField label="Last Name" variant="outlined" fullWidth sx={{ marginBottom: 2 }} />
          <TextField label="Username" variant="outlined" fullWidth sx={{ marginBottom: 2 }} />
          <TextField label="Email" variant="outlined" fullWidth sx={{ marginBottom: 2 }} />
          <TextField label="Password" variant="outlined" type="password" fullWidth sx={{ marginBottom: 2 }} />
          <TextField label="Confirm Password" variant="outlined" type="password" fullWidth sx={{ marginBottom: 2 }} />
          <Typography variant="body2" sx={{ fontSize: '12px', marginBottom: 2 }}>
            By creating an account, I consent to the processing of my personal data in accordance with the{' '}
            <Link href="#" underline="hover" sx={{ fontWeight: 'bold' }}>
              PRIVACY POLICY
            </Link>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: '15px', backgroundColor: 'teal' }}
          >
            CREATE
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
