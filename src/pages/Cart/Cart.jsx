
import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Announcement } from '../../components/Announcement/Announcement';
import { Footer } from '../../components/Footer/Footer';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../../requestMethods';
import { useNavigate } from 'react-router-dom';
import { removeProduct } from '../../redux/slices/cartRedux';
import { Box, Button, Typography, Stack, Divider, Grid, IconButton } from '@mui/material';
import { getCart } from '../../redux/selectors/cartSelectors';

const KEY = process.env.REACT_APP_STRIPE;

export default function Cart() {
    const cart = useSelector(getCart);
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
            } catch (err) {
                console.error("Payment error:", err);
            }
        };
        stripeToken && makeRequest();
    }, [stripeToken, cart.total, navigate]);

    const handleRemove = (id) => {
        dispatch(removeProduct(id));
    };

    const handleClick = () => {
        navigate('/');
    };

    const calculateTotal = () => {
        return cart.products.reduce((total, product) => {
            const salePrice = product.salePercentage
                ? product.price * (1 - product.salePercentage / 100)
                : product.price;
            return total + salePrice * product.quantity;
        }, 0);
    };

    const totalItems = cart.products.reduce((total, product) => total + product.quantity, 0);
    const totalWithDiscount = calculateTotal();

    return (
        <Box>
            <Announcement />
            <Navbar />
            <Box p={2}>
                <Typography variant="h5" textAlign="center" fontWeight="300" gutterBottom sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Your bag
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" p={2} spacing={2}>
                    <Button variant="outlined" onClick={handleClick} size="large">
                        Continue shopping
                    </Button>
                    <Stack direction="row" spacing={2} display={{ xs: 'none', sm: 'flex' }}>
                        <Typography>Shopping Bag ({totalItems})</Typography>
                    </Stack>
                </Stack>
                <Grid container spacing={2} mt={3}>
                    <Grid item xs={12} md={8}>
                        <Stack spacing={3} divider={<Divider flexItem />}>
                            {cart.products.map((product) => {
                                const salePrice = product.salePercentage
                                    ? (product.price * (1 - product.salePercentage / 100)).toFixed(2)
                                    : null;

                                return (
                                    <Stack
                                        key={product._id}
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                        sx={{
                                            flexDirection: { xs: 'column', sm: 'row' },
                                            alignItems: { xs: 'flex-start', sm: 'center' },
                                        }}
                                    >
                                        <Box display="flex" flex={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                                            <Box
                                                component="img"
                                                src={product.img[0]}
                                                alt={product.title}
                                                sx={{
                                                    width: { xs: 120, sm: 200 },
                                                    height: 'auto',
                                                }}
                                            />
                                            <Box ml={2}>
                                                <Typography variant="body1">
                                                    <b>{product.title}</b>
                                                </Typography>
                                                <Typography variant="body2">
                                                    <b>Color:</b> {product.color}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <b>Size:</b> {product.size}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box
                                            flex={1}
                                            sx={{
                                                mt: { xs: 1, sm: 0 },
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="center"
                                                spacing={2}
                                                sx={{
                                                    flexDirection: { xs: 'row', sm: 'column' },
                                                    justifyContent: { xs: 'space-between', sm: 'center' },
                                                    width: '100%',
                                                    marginTop: { xs: '10px', sm: '0' },
                                                }}
                                            >
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <IconButton sx={{ fontSize: { xs: '1rem', sm: '1.5rem' } }}>
                                                        <Add />
                                                    </IconButton>
                                                    <Typography variant="body1">{product.quantity}</Typography>
                                                    <IconButton sx={{ fontSize: { xs: '1rem', sm: '1.5rem' } }}>
                                                        <Remove />
                                                    </IconButton>
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    {salePrice ? (
                                                        <Stack direction="row" justifyContent="center" spacing={1}>
                                                            <Typography
                                                                variant="h6"
                                                                sx={{ textDecoration: 'line-through' }}
                                                            >
                                                                ${product.price * product.quantity}
                                                            </Typography>
                                                            <Typography variant="h6" color="teal">
                                                                ${salePrice * product.quantity}
                                                            </Typography>
                                                        </Stack>
                                                    ) : (
                                                        <Typography variant="h6">${product.price * product.quantity}</Typography>
                                                    )}
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <IconButton
                                                        onClick={() => handleRemove(product._id)}
                                                        sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, marginLeft: { xs: 0, sm: 2 } }}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                );
                            })}
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
                                    <Typography>${totalWithDiscount.toFixed(2)}</Typography>
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
                                    <Typography>${(totalWithDiscount + 5.90 - 5).toFixed(2)}</Typography>
                                </Stack>
                            </Stack>
                            <StripeCheckout
                                name="Avenue."
                                billingAddress
                                shippingAddress
                                description={`Your total is $${totalWithDiscount.toFixed(2)}`}
                                amount={totalWithDiscount * 100}
                                token={onToken}
                                stripeKey={KEY}
                            >
                                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
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