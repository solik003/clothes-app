
import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Announcement from "../../components/Announcement/Announcement";
import { Add, Remove } from "@mui/icons-material";
import { publicRequest } from '../../requestMethods';
import { useLocation } from 'react-router-dom';
import { addProduct } from '../../redux/cartRedux';
import { useDispatch } from "react-redux";
import { Card, CardContent, Typography, CardActions, Button, Select, MenuItem, IconButton, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export default function Product() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
      addProduct({ ...product, quantity, color, size })
    );
  };

  return (
    <Box>
      <Navbar />
      <Announcement />
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, padding: '20px', border: '1px solid #ccc' }}>
        <Box sx={{ width: { xs: '100%', md: '50%' }, paddingRight: '20px' }}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop
            style={{ height: '400px' }}
          >
            {product.img?.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${product.title} image ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {product.title}
            </Typography>
            <Typography variant="body1" sx={{ margin: '20px 0' }}>
              {product.desc}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: '100' }}>
              $ {product.price}
            </Typography>
            <Typography variant="h6">Color</Typography>
            <Box sx={{ display: 'flex' }}>
              {product.color?.map((c) => (
                <IconButton
                  key={c}
                  sx={{
                    backgroundColor: c,
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    marginRight: '10px',
                  }}
                  onClick={() => setColor(c)}
                />
              ))}
            </Box>
            <Typography variant="h6">Size</Typography>
            <Box>
              <Select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                displayEmpty
                fullWidth
              >
                {product.size?.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </Box>
          </CardContent>
          <CardActions sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <IconButton onClick={() => handleQuantity('dec')}>
                <Remove />
              </IconButton>
              <Typography sx={{ margin: '0 10px' }}>{quantity}</Typography>
              <IconButton onClick={() => handleQuantity('inc')}>
                <Add />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              fullWidth
              onClick={handleClick}
              sx={{
                border: '2px solid teal',
                backgroundColor: 'white',
                cursor: 'pointer',
                color: 'black',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'teal',
                  color: 'white',
                },
              }}
            >
              ADD TO CART
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
}
