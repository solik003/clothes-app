
import React from 'react';
import CategoryItem from '../CategoryItem/CategoryItem';
import { categories } from "../../data";
import { Box } from '@mui/material';

export default function Categories () {
  return (
    <Box
      sx={{
        display: 'flex',
        padding: '20px',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        '@media (max-width: 600px)': {
          padding: '0px',
          flexDirection: 'column',
        },
      }}
    >
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Box>
  );
};