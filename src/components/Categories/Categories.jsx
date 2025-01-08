
import React from 'react';
import CategoryItem from '../CategoryItem/CategoryItem';
import { categories } from "../../data";
import { Stack } from '@mui/material';

export function Categories () {
  return (
    <Stack
      direction='row'
      sx={{
        p: 2,
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        '@media (max-width: 600px)': {
          p: 0,
          flexDirection: 'column',
        },
      }}
    >
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Stack>
  );
};