import React from 'react';
import { Box, Typography, Button, Divider, Paper } from '@mui/material';

const sections = [
  {
    title: "1. General Conditions",
    content:
      "By accessing or using this site, you agree to comply with these Terms. You must be at least 18 years old to use this website and make purchases.",
  },
  {
    title: "2. Order and Payment",
    content:
      "We accept various payment methods, including credit/debit cards and PayPal. After placing an order, you will receive an email confirmation.",
  },
  {
    title: "3. Shipping and Delivery",
    content:
      "We ship to most locations globally. Shipping fees are calculated at checkout based on your location and the weight of your order.",
  },
  {
    title: "4. Returns and Exchanges",
    content:
      "We accept returns and exchanges within 10 days of receiving your order. Items must be unused, unworn, and in their original packaging.",
  },
  {
    title: "5. Privacy and Data Protection",
    content:
      "We collect personal data when you create an account or place an order. Your personal data will only be used to process your orders and improve our services.",
  },
  {
    title: "6. Governing Law",
    content: "These Terms and Conditions will be governed by the laws of Ukraine.",
  },
];

export function Terms() {
  return (
    <Box p={2} sx={{ maxWidth: '1200px', mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h4" fontWeight="bold" marginBottom={2}>
          Terms and Conditions
        </Typography>
        {sections.map((section, index) => (
          <Box key={index} marginBottom={2}>
            <Typography variant="h6" marginBottom={1}>
              {section.title}
            </Typography>
            <Typography variant="body1">{section.content}</Typography>
            {index < sections.length - 1 && <Divider sx={{ my: 2 }} />}
          </Box>
        ))}
        <Box display="flex" justifyContent="flex-start">
          <Button variant="contained" color="primary" sx={{ py: 1.25, px: 2.5 }}>
            I Agree
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}


