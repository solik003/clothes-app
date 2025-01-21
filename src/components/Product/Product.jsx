
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined, Favorite, DeleteOutline } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavorite, removeFavorite, removeProduct } from '../../redux/slices/cartRedux';
import { Typography, Stack } from '@mui/material';

export function Product({ item, isFavoritePage }) {
  const dispatch = useDispatch();
  const [isFavorited, setIsFavorited] = useState(false);

  if (!item) {
    console.error("Item is undefined");
    return null;
  }

  const handleClick = () => {
    if (isFavorited) {
      dispatch(removeFavorite(item._id));
    } else {
      dispatch(addFavorite(item));
    }
    setIsFavorited(!isFavorited);
  };

  const handleRemoveClick = () => {
    if (isFavoritePage) {
      dispatch(removeFavorite(item._id));
    } else {
      dispatch(removeProduct(item._id));
    }
  };


  return (
    <Card sx={{ width: 340, height: 400, mb: 2, display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        titleTypographyProps={{
          noWrap: true
        }}
        title={item.title}
      />
      <CardMedia
        component="img"
        height="220"
        image={item.img?.[0]}
        alt={item.title}
        sx={{
          objectFit: 'contain',
        }}
      />
      <Stack textAlign={'center'} sx={{ flexGrow: 1 }}>
        {item.salePercentage ? (
          <>
            <Typography
              variant="h6"
              component="div"
              color='secondary'
              sx={{
                textDecoration: 'line-through',
              }}
            >
              ${item.price}
            </Typography>
            <Typography
              variant="h5"
              component="span"
              color="error"
            >
              {item.salePercentage}% OFF
            </Typography>
          </>
        ) : (
          <Typography
            variant="h5"
            component="span"
          >
            ${item.price}
          </Typography>
        )}
      </Stack>
      <CardActions
        disableSpacing={true}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
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
          onClick={isFavoritePage ? handleRemoveClick : handleClick}
          aria-label={isFavoritePage ? "remove from favorites" : "add to favorites"}
        >
          {isFavoritePage ? (
            <DeleteOutline />
          ) : (
            isFavorited ? (
              <Favorite color='primary' />
            ) : (
              <FavoriteBorderOutlined />
            )
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
}