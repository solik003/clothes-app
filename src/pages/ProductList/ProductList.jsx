
import { Announcement } from '../../components/Announcement/Announcement';
import { Navbar } from "../../components/Navbar/Navbar";
import React, { useState } from 'react';
import { Products } from "../../components/Products/Products";
import { Newsletter } from "../../components/Newsletter/Newsletter";
import { Footer } from "../../components/Footer/Footer";
import { useLocation } from "react-router";
import { MenuItem, Select, InputLabel, FormControl, OutlinedInput, Chip, Box, Typography,Stack } from '@mui/material';

const colorOptions = ["White", "Black", "Yellow", "Green"];
const sizeOptions = ["XS", "S", "M", "L", "XL"];

export function ProductList() {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({ colors: [], sizes: [] });
  const [sort, setSort] = useState("newest");

  const handleMultiSelect = (event, category) => {
    setFilters((prev) => ({
      ...prev,
      [category]: event.target.value
    }));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Announcement />
      <Navbar />
      <Typography 
        variant="h4" 
        sx={{ 
          margin: { xs: 1, sm: 2 }, 
          fontSize: { xs: '20px', sm: '32px' },
          textAlign: { xs: 'center', sm: 'left' }
        }}
      >
        {cat}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Stack sx={{ margin: { xs: 1, sm: 2 }, gap: 2, alignItems: 'center', flexDirection: 'row' }}>
          <Typography variant="h6" sx={{ fontSize: { xs: '16px', sm: '20px' } }}>Filter Products:</Typography>
          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel>Colors</InputLabel>
            <Select
              multiple
              value={filters.colors}
              onChange={(e) => handleMultiSelect(e, "colors")}
              input={<OutlinedInput label="Colors" />}
              renderValue={(selected) => (
                <Stack sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {selected.map(value => <Chip key={value} label={value} />)}
                </Stack>
              )}
            >
              {colorOptions.map((color) => (
                <MenuItem key={color} value={color}>{color}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel>Sizes</InputLabel>
            <Select
              multiple
              value={filters.sizes}
              onChange={(e) => handleMultiSelect(e, "sizes")}
              input={<OutlinedInput label="Sizes" />}
              renderValue={(selected) => (
                <Stack sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {selected.map(value => <Chip key={value} label={value} />)}
                </Stack>
              )}
            >
              {sizeOptions.map((size) => (
                <MenuItem key={size} value={size}>{size}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Stack sx={{ margin: 2, flexDirection: { xs: 'row', sm: 'column' }, alignItems: 'center' }}>
          <Typography variant="h6" sx={{ marginBottom: 1, fontSize: { xs: '16px', sm: '20px' } }}>Sort Products:</Typography>
          <Select fullWidth value={sort} onChange={(e) => setSort(e.target.value)}>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="asc">Price (asc)</MenuItem>
            <MenuItem value="desc">Price (desc)</MenuItem>
          </Select>
        </Stack>
      </Box>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Box>
  );
};
