
import React from 'react';
import { Link } from "react-router-dom";
import { Box, Typography, Button as MuiButton, CardMedia, Card } from "@mui/material";

export default function CategoryItem({ item }) {
    return (
        <Card 
            sx={{
                flex: 1,
                margin: 1,
                height: '70vh',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Link to={`/products/${item.cat}`} style={{ width: '100%', height: '100%' }}>
                <CardMedia
                    component="img"
                    alt={item.title}
                    image={item.img}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        '@media (max-width: 600px)': {
                            height: '20vh',
                        },
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            color: 'white',
                            marginBottom: 2,
                            textAlign: 'center',
                        }}
                    >
                        {item.title}
                    </Typography>
                    <MuiButton
                        variant="contained"
                        sx={{
                            backgroundColor: 'white',
                            color: 'gray',
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                            },
                        }}
                    >
                        SHOP NOW
                    </MuiButton>
                </Box>
            </Link>
        </Card>
    );
};
