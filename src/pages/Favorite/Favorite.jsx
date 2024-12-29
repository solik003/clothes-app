
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Announcement from '../../components/Announcement/Announcement';
import Footer from '../../components/Footer/Footer';
import { Delete } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../../redux/cartRedux';
import { Box, Button, Typography, Stack, Divider, Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Favorite() {
    const favorites = useSelector((state) => state.cart.favorites);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemove = (id) => {
        dispatch(removeFavorite(id)); 
    };

    const totalItems = favorites.reduce((total, product) => total + product.quantity, 0);

    const handleClick = () => {
        navigate('/');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Announcement />
            <Box p={2} sx={{ flex: 1 }}>
                <Typography variant="h4" textAlign="center" fontWeight="300" gutterBottom>
                    My Wishlist
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" p={2}>
                    <Button variant="outlined" size="large" onClick={handleClick}>
                        Continue shopping
                    </Button>
                    <Stack direction="row" spacing={2} display={{ xs: 'none', sm: 'flex' }}>
                        <Typography>Your Wishlist ({totalItems})</Typography>
                    </Stack>
                </Stack>
                <Grid container spacing={2} mt={3}>
                    <Grid item xs={12} md={8}>
                        <Stack spacing={3} divider={<Divider flexItem />}>
                            {favorites.length === 0 ? (
                                <Typography 
                                    textAlign="center"
                                    variant="h6"  
                                    fontWeight="bold" 
                                    color="text.secondary" 
                                >
                                    No products in your wishlist
                                </Typography>
                            ) : (
                                favorites.map((product) => (
                                    <Stack key={product._id} direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                                        <Box display="flex" flex={2}>
                                            <Box
                                                component="img"
                                                src={product.img}
                                                alt={product.title}
                                                sx={{ width: 200, height: 'auto' }}
                                            />
                                            <Box ml={2}>
                                                <Typography>
                                                    <b>{product.title}</b>
                                                </Typography>
                                                <Typography>
                                                    <b>Color:</b> {product.color}
                                                </Typography>
                                                <Typography>
                                                    <b>Size:</b> {product.size}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box flex={1} textAlign="center">
                                            <Typography variant="h6">$ {product.price}</Typography>
                                        </Box>
                                        <IconButton onClick={() => handleRemove(product._id)}>
                                            <Delete />
                                        </IconButton>
                                    </Stack>
                                ))
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </Box>
    );
}
