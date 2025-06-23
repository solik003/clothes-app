import React from 'react'
import { Button, TextField, Typography, Link, Stack } from '@mui/material';


export default function Register () {
  return (
    <Stack
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center`,
        backgroundSize: 'cover',
      }}
    >
      <Stack
        width={{ xs: '75%', sm: '40%' }}
        p={2}
        bgcolor="white"
      >
        <Typography variant="h4" fontWeight={300} fontSize={24}>
          Create an account
        </Typography>
        <Stack direction='column' mt={2}>
          <TextField label="Name" variant="outlined" fullWidth sx={{ marginBottom: 2 }} />
          <TextField label="Last Name" variant="outlined" fullWidth sx={{ marginBottom: 2 }} />
          <TextField label="Username" variant="outlined" fullWidth sx={{ marginBottom: 2 }} />
          <TextField label="Email" variant="outlined" fullWidth sx={{ marginBottom: 2 }} />
          <TextField label="Password" variant="outlined" type="password" fullWidth sx={{ marginBottom: 2 }} />
          <TextField label="Confirm Password" variant="outlined" type="password" fullWidth sx={{ marginBottom: 2 }} />
          <Typography variant="body2" fontSize={12} mb={2}>
            By creating an account, I consent to the processing of my personal data in accordance with the{' '}
            <Link href="#" underline="hover">
                <Typography variant="body1" fontWeight="bold">PRIVACY POLICY</Typography>
              </Link>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            padding="15px"
          >
            CREATE
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
