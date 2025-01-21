
import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Announcement } from '../../components/Announcement/Announcement';
import { Footer } from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';
import { Box, Button, Typography, Stack, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../components/Product/Product';
import { getFavorites } from '../../redux/selectors/cartSelectors';


export default function Favorite() {
    const favorites = useSelector(getFavorites);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Announcement />
            <Navbar />
            <Box p={2} sx={{ flex: 1 }}>
                <Typography variant="h4" textAlign="center" fontWeight="300" gutterBottom>
                    My Wishlist
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" p={2}>
                    <Button variant="outlined" size="large" onClick={handleClick}>
                        Continue shopping
                    </Button>
                    <Stack direction="row" spacing={2} display={{ xs: 'none', sm: 'flex' }}>
                        <Typography>Your Wishlist ({favorites.length})</Typography>
                    </Stack>
                </Stack>
                <Grid container spacing={3}>
                    {favorites.length === 0 ? (
                        <Typography textAlign="center" variant="h6" fontWeight="bold" color="text.secondary">
                            No products in your wishlist
                        </Typography>
                    ) : (
                        favorites.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product._id}>
                                <Product item={product} isFavoritePage={true} />
                            </Grid>
                        ))
                    )}
                </Grid>
            </Box>
            <Footer />
        </Box>
    );
}
