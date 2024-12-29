import React, { useState } from 'react'
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, Typography, Link } from "@mui/material";

export default function Login () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
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
          width: '25%',
          padding: '20px',
          backgroundColor: 'white',
          '@media (max-width: 600px)': {
            width: '75%',
          },
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 300, fontSize: '24px' }}>
          Sign in
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClick}
            disabled={isFetching}
            sx={{ marginBottom: 2 }}
          >
            Login
          </Button>
          {error && (
            <Typography sx={{ color: 'red', fontSize: '14px', marginTop: 1 }}>
              Something went wrong...
            </Typography>
          )}
          <Link href="#" variant="body2" sx={{ display: 'block', marginTop: 1 }}>
            Do not you remember the password?
          </Link>
          <Link href="#" variant="body2">
            Create a new account
          </Link>
        </Box>
      </Box>
    </Box>
  );
}