
import { Announcement } from '../../components/Announcement/Announcement';
import { Navbar } from "../../components/Navbar/Navbar";
import React, { useState } from 'react';
import { Products } from "../../components/Products/Products";
import { Newsletter } from "../../components/Newsletter/Newsletter";
import { Footer } from "../../components/Footer/Footer";
import { useLocation } from "react-router";
import { MenuItem, Select, InputLabel, FormControl, OutlinedInput, Chip, Box, Typography, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/slices/filterRedux';

const colorOptions = ["White", "Black", "Yellow", "Green"];
const sizeOptions = ["XS", "S", "M", "L", "XL"];



export function ProductList() {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  // const [filters, setFilters] = useState({ colors: [], size: [] });
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const [sort, setSort] = useState("newest");
  console.log(filters);

  const mapSortValue = (value) => {
    switch (value) {
      case "newest":
        return "createdAt:desc";
      case "asc":
        return "price:asc";
      case "desc":
        return "price:desc";
      default:
        return "createdAt:desc";
    }
  };

  const queryParams = {
    category: cat || undefined,
    color: filters.color.length > 0 ? filters.color.join(",") : undefined,
    size: filters.size.length > 0 ? filters.size.join(",") : undefined,
    sort: mapSortValue(sort),
  };

  const handleMultiSelect = (event, category) => {
    dispatch(setFilters({
      [category]: event.target.value
    }));
  };


  return (
    <Box width="100%">
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
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            margin: 16,
            flexWrap: 'wrap'
          }}
        >
          <Typography variant="h6" sx={{ fontSize: { xs: '16px', sm: '20px' } }}>Filter Products:</Typography>
          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel>Colors</InputLabel>
            <Select
              multiple
              value={filters.color}
              onChange={(e) => handleMultiSelect(e, "color")}
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
              value={filters.size}
              onChange={(e) => handleMultiSelect(e, "size")}
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
        <Stack alignItems="center" sx={{ margin: 2, flexDirection: { xs: 'row', sm: 'column' } }}>
          <Typography variant="h6" sx={{ marginBottom: 1, fontSize: { xs: '16px', sm: '20px' } }}>Sort Products:</Typography>
          <Select fullWidth value={sort} onChange={(e) => setSort(e.target.value)}>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="asc">Price (asc)</MenuItem>
            <MenuItem value="desc">Price (desc)</MenuItem>
          </Select>
        </Stack>
      </Box>
      {/* <Products cat={cat} filters={filters} sort={sort} /> */}
      <Products query={queryParams} />
      <Newsletter />
      <Footer />
    </Box>
  );
};
