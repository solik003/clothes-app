
import React from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import { Product } from '../../components/Product/Product';
import { Announcement } from '../../components/Announcement/Announcement';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { useProducts } from '../../hooks/useProducts';

const FilteredProducts = () => {
  const location = useLocation();
  const q = new URLSearchParams(location.search).get('q');


  const { filteredProducts, loading } = useProducts({ title: q });
  console.log(filteredProducts);

  return (
    <>
      <Announcement />
      <Navbar />
      <Box padding={2}>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(item => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <Product item={item} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box textAlign="center">
                  <Typography variant="h6">No products found</Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default FilteredProducts;