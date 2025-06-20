
import {
  Card, CardHeader, CardMedia, CardActions,
  IconButton, Typography, Stack
} from '@mui/material';
import {
  FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined,
  Favorite, DeleteOutline, MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite, removeProduct } from '../../redux/slices/cartRedux';

export function Product({ item, isFavoritePage }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.cart.favorites || []);
  const isFavorited = favorites.some(fav => fav._id === item._id);

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
        action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
        titleTypographyProps={{ noWrap: true }}
        title={item.title}
      />
      <CardMedia
        component="img"
        height="220"
        image={item.img?.[0]}
        alt={item.title}
        sx={{ objectFit: 'contain' }}
      />
      <Stack textAlign="center" sx={{ flexGrow: 1 }}>
        {item.salePercentage ? (
          <>
            <Typography variant="h6" color="secondary" sx={{ textDecoration: 'line-through' }}>
              ${item.price}
            </Typography>
            <Typography variant="h5" color="error">
              {item.salePercentage}% OFF
            </Typography>
          </>
        ) : (
          <Typography variant="h5">
            ${item.price}
          </Typography>
        )}
      </Stack>
      <CardActions
        disableSpacing
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <IconButton aria-label="add to cart" component={Link} to="/cart">
          <ShoppingCartOutlined />
        </IconButton>
        <IconButton aria-label="view details" component={Link} to={`/product/${item._id}`}>
          <SearchOutlined />
        </IconButton>
        <IconButton
          onClick={isFavoritePage ? handleRemoveClick : handleClick}
          aria-label={isFavoritePage ? "remove from favorites" : "toggle favorite"}
        >
          {isFavoritePage ? (
            <DeleteOutline />
          ) : (
            isFavorited ? <Favorite color="primary" /> : <FavoriteBorderOutlined />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
}
