
import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Announcement } from '../../components/Announcement/Announcement';
import { Footer } from '../../components/Footer/Footer';
import { Delete, ShoppingCart  } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite, addProduct } from '../../redux/cartRedux';
import { Box, Button, Typography, Stack, Divider, Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Favorite() {
    const favorites = useSelector((state) => state.cart.favorites);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemove = (id) => {
        dispatch(removeFavorite(id)); 
    };

    const handleAddToCart = (product) => {
        const { title, price, img, color, size } = product;
        const quantity = 1; 
        if (color && size) {
            dispatch(addProduct({ ...product, quantity, color, size }));
        } else {
            console.log("Color or size is missing!");
        }
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
                                favorites.map((product) => {
                                    const salePrice = product.salePercentage
                                        ? (product.price * (1 - product.salePercentage / 100)).toFixed(2)
                                        : null;

                                    return (
                                        <Stack key={product._id} direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                                            <Box display="flex" flex={2}>
                                                <Box
                                                    component="img"
                                                    src={product.img[0]}
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
                                                {salePrice ? (
                                                    <>
                                                        <Typography variant="h6" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                                            $ {product.price}
                                                        </Typography>
                                                        <Typography variant="h6" color="primary">
                                                            $ {salePrice}
                                                        </Typography>
                                                        <Typography variant="body2" color="error" fontWeight="bold" mt={1}>
                                                            Sale! {product.salePercentage}% Off
                                                        </Typography>
                                                    </>
                                                ) : (
                                                    <Typography variant="h6">$ {product.price}</Typography>
                                                )}
                                            </Box>
                                            <Box display="flex" alignItems="center">
                                            <IconButton onClick={() => handleAddToCart(product)} sx={{ marginRight: 2 }}>
                                                <ShoppingCart />
                                            </IconButton>
                                                <IconButton onClick={() => handleRemove(product._id)}>
                                                    <Delete />
                                                </IconButton>
                                            </Box>
                                        </Stack>
                                    );
                                })
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </Box>
    );
}
