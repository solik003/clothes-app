import React, { useState } from 'react'
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, Typography, Link, Stack } from "@mui/material";
import { getUserStatus } from '../../redux/selectors/userSelectors';

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector(getUserStatus);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <Stack
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center`,
        backgroundSize: 'cover'
      }}
    >
      <Stack
        width={{ xs: '75%', sm: '25%' }}
        padding={3}
        bgcolor="white"
      >
        <Typography variant="h4" fontWeight={300} fontSize="24px">
          Sign in
        </Typography>
        <Stack direction='column' mt={2}>
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
            <Typography color='error' fontSize="14px" mt={1}>
              Something went wrong...
            </Typography>
          )}
          <Link href="#" variant="body2"  display="block" mt={1}>
            Do not you remember the password?
          </Link>
          <Link href="/register" variant="body2">
            Create a new account
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
}