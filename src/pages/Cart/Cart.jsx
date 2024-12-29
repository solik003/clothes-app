
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Announcement from '../../components/Announcement/Announcement';
import Footer from '../../components/Footer/Footer';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../../requestMethods';
import { useNavigate } from 'react-router-dom';
import { removeProduct } from '../../redux/cartRedux';
import { Box, Button, Typography, Stack, Divider, Grid, IconButton } from '@mui/material';

const KEY = process.env.REACT_APP_STRIPE;

export default function Cart () {
    const cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post('/checkout/payment', {
                    tokenId: stripeToken.id,
                    amount: 500,
                });
                navigate('/success', { data: res.data });
            } catch {}
        };
        stripeToken && makeRequest();
    }, [stripeToken, cart.total, navigate]);

    const handleRemove = (id) => {
        dispatch(removeProduct(id));
    };

    const handleClick = () => {
        navigate('/');
    };

    const totalItems = cart.products.reduce((total, product) => total + product.quantity, 0);

    return (
        <Box>
            <Navbar />
            <Announcement />
            <Box p={2}>
                <Typography variant="h4" textAlign="center" fontWeight="300" gutterBottom>
                    Your bag
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" p={2}>
                    <Button variant="outlined" onClick={handleClick} size="large">
                        Continue shopping
                    </Button>
                    <Stack direction="row" spacing={2} display={{ xs: 'none', sm: 'flex' }}>
                        <Typography>Shopping Bag ({totalItems})</Typography>
                        <Typography>Your Wishlist ({totalItems})</Typography>
                    </Stack>
                    <Button variant="contained" size="large" color="primary" sx={{backgroundColor: 'teal'}}>
                        CHECKOUT NOW
                    </Button>
                </Stack>
                <Grid container spacing={2} mt={3}>
                    <Grid item xs={12} md={8}>
                        <Stack spacing={3} divider={<Divider flexItem />}>
                            {cart.products.map((product) => (
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
                                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                                            <IconButton>
                                                <Add />
                                            </IconButton>
                                            <Typography>{product.quantity}</Typography>
                                            <IconButton>
                                                <Remove />
                                            </IconButton>
                                        </Stack>
                                        <Typography variant="h6">$ {product.price * product.quantity}</Typography>
                                    </Box>
                                    <IconButton onClick={() => handleRemove(product._id)}>
                                        <Delete />
                                    </IconButton>
                                </Stack>
                            ))}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box border="1px solid lightgray" borderRadius={2} p={3}>
                            <Typography variant="h5" fontWeight="300" gutterBottom>
                                Order Summary
                            </Typography>
                            <Stack spacing={2}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography>Subtotal</Typography>
                                    <Typography>$ {cart.total}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography>Estimated Shipping</Typography>
                                    <Typography>$ 5.90</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography>Shipping Discount</Typography>
                                    <Typography>- $5</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" fontWeight="500" fontSize="1.2rem">
                                    <Typography>Total</Typography>
                                    <Typography>$ {cart.total}</Typography>
                                </Stack>
                            </Stack>
                            <StripeCheckout
                                name="Avenue."
                                billingAddress
                                shippingAddress
                                description={`Your total is $${cart.total}`}
                                amount={cart.total * 100}
                                token={onToken}
                                stripeKey={KEY}
                            >
                                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, backgroundColor: 'teal' }}>
                                    CHECKOUT NOW
                                </Button>
                            </StripeCheckout>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </Box>
    );
};
