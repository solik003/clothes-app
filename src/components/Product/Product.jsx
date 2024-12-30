
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavorite } from '../../redux/cartRedux';
import { Typography, Box } from '@mui/material';

export default function Product({ item }) {
  const dispatch = useDispatch();

  if (!item) {
    console.error("Item is undefined");
    return null;
  }

  const handleClick = () => {
    dispatch(
      addFavorite({ ...item })
    );
  };


  return (
    <Card sx={{ maxWidth: 345, marginBottom: '20px' }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.title}
        sx={{
          '.MuiCardHeader-title': {
            fontSize: '1.2rem',
            fontWeight: 600,
            color: '#333',
          }
        }}
      />
      <CardMedia
        component="img"
        height="194"
        image={item.img[0]}
        alt={item.title}
        sx={{
          maxHeight: '100%',
          maxWidth: '100%',
          objectFit: 'contain',
        }}
      />
      <Box sx={{ textAlign: 'center', marginTop: 1 }}>
        {item.salePercentage ? (
          <>
            <Typography
              variant="body2"
              sx={{
                textDecoration: 'line-through',
                color: '#888',
                marginRight: 1,
              }}
            >
              ${item.price}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: 'red',
                display: 'inline',
              }}
            >
              {item.salePercentage}% OFF
            </Typography>
          </>
        ) : (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            ${item.price}
          </Typography>
        )}
      </Box>
      <CardActions disableSpacing>
        <IconButton 
          aria-label="add to shopping cart" 
          component={Link}
          to="/cart"
        >
          <ShoppingCartOutlined />
        </IconButton>
        <IconButton 
          aria-label="view details"
          component={Link}
          to={`/product/${item._id}`}
        >
          <SearchOutlined />
        </IconButton>
        <IconButton
          onClick={handleClick}
          aria-label="add to favorites"
        >
          <FavoriteBorderOutlined />
        </IconButton>
      </CardActions>
    </Card>
  );
}