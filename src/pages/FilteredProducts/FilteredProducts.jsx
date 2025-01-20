
import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import { Product } from '../../components/Product/Product';
import { Announcement } from '../../components/Announcement/Announcement';
import { useLocation } from 'react-router-dom';
import axios from "axios";


const FilteredProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [limit, setLimit] = useState(20);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get('q');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products?limit=${limit}`
        );
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    getProducts();
  }, [limit]);

  useEffect(() => {
    if (q) {
      const result = products.filter((product) =>
        product.title.toLowerCase().includes(q.toLowerCase())
      );
      setFilteredProducts(result);
    } else {
      setFilteredProducts(products);
    }
  }, [q, products]);

  return (
    <>
      <Announcement />
      <Box sx={{ padding: '20px' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <Product item={item} />
                </Grid>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', width: '100%' }}>
                <Typography variant="h6">No products found</Typography>
              </Box>
            )}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default FilteredProducts;


