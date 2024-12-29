
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
import { Typography } from '@mui/material';

export default function Product({ item }) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');

  if (!item) {
    console.error("Item is undefined");
    return null;
  }
  const handleClick = () => {
    console.log("Adding to favorites:", item);
      dispatch(
        addFavorite({ ...item, quantity, color, size })
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
        image={item.img}
        alt={item.title}
        sx={{
          maxHeight: '100%',
          maxWidth: '100%',
          objectFit: 'contain',
        }}
      />
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: 1,
          color: 'red',  
        }}
      >
        ${item.salePrice} 
      </Typography>
      <CardActions disableSpacing>
        <IconButton 
          aria-label="add to favorites" 
          component={Link}
          to="/cart"
          >
          <ShoppingCartOutlined />
        </IconButton>
        <IconButton 
          aria-label="share"
          component={Link}
          to={`/product/${item._id}`}
        >
          <SearchOutlined />
        </IconButton>
        <IconButton
          // component={Link}
          // to="/favorite"
          onClick={handleClick}
        >
          <FavoriteBorderOutlined />
        </IconButton>
      </CardActions>
    </Card>
  );
}
