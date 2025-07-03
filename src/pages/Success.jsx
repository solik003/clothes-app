import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  const handleBackToShop = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafafa",
      }}
    >
      <Stack
        spacing={3}
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
          maxWidth: 480,
        }}
      >
        <CheckCircleOutline sx={{ fontSize: 80, color: "#4caf50" }} />
        <Typography variant="h4" fontWeight="bold">
          Thank you for your order!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your payment was successful and your stylish pieces are on their way!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleBackToShop}
        >
          Continue Shopping
        </Button>
      </Stack>
    </Box>
  );
}
