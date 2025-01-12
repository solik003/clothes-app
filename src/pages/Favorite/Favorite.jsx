
import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Announcement } from '../../components/Announcement/Announcement';
import { Footer } from '../../components/Footer/Footer';
import { Delete, ShoppingCart } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite, addProduct } from '../../redux/cartRedux';
import { Box, Button, Typography, Stack, Divider, Grid, IconButton, Card, CardHeader, CardMedia, CardContent, CardActions } from '@mui/material';
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
                <Grid container spacing={3}>
                    {favorites.length === 0 ? (
                        <Typography textAlign="center" variant="h6" fontWeight="bold" color="text.secondary">
                            No products in your wishlist
                        </Typography>
                    ) : (
                        favorites.map((product) => {
                            const salePrice = product.salePercentage
                                ? (product.price * (1 - product.salePercentage / 100)).toFixed(2)
                                : null;

                            return (
                                <Grid item xs={12} sm={6} md={4} key={product._id}>
                                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: 280 }}>
                                        <CardHeader title={product.title} sx={{ fontSize: '1rem' }} />
                                        <CardMedia
                                            component="img"
                                            height="auto"
                                            image={product.img[0]}
                                            alt={product.title}
                                            sx={{
                                                objectFit: 'contain', 
                                                maxHeight: 180, 
                                                width: '100%',
                                              }}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Stack spacing={1} alignItems="center">
                                                {salePrice ? (
                                                    <>
                                                        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                                            ${product.price}
                                                        </Typography>
                                                        <Typography variant="body2" color="primary">
                                                            ${salePrice}
                                                        </Typography>
                                                        <Typography variant="body2" color="error" fontWeight="bold">
                                                            Sale! {product.salePercentage}% Off
                                                        </Typography>
                                                    </>
                                                ) : (
                                                    <Typography variant="body2">${product.price}</Typography>
                                                )}
                                            </Stack>
                                        </CardContent>
                                        <CardActions sx={{ justifyContent: 'space-between' }}>
                                            <IconButton onClick={() => handleAddToCart(product)} sx={{ marginRight: 2 }}>
                                                <ShoppingCart />
                                            </IconButton>
                                            <IconButton onClick={() => handleRemove(product._id)}>
                                                <Delete />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })
                    )}
                </Grid>
            </Box>
            <Footer />
        </Box>
    );
}
