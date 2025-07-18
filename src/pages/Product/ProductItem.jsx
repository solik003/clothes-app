
import React, { useEffect, useState } from 'react';
import { Navbar } from "../../components/Navbar/Navbar";
import { Announcement } from "../../components/Announcement/Announcement";
import { Add, Remove } from "@mui/icons-material";
import { publicRequest } from '../../requestMethods';
import { useLocation } from 'react-router-dom';
import { addProduct } from '../../redux/slices/cartRedux';
import { useDispatch } from "react-redux";
import { Card, CardContent, Typography, CardActions, Button, Select, MenuItem, IconButton, Box, Stack } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export function ProductItem() {
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

  const salePrice = product.salePercentage
    ? (product.price * (1 - product.salePercentage / 100)).toFixed(2)
    : null;

  return (
    <Stack direction='column'>
      <Announcement />
      <Navbar />

      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, p: 2, border: '1px solid #ccc' }}>
        <Box width={window.innerWidth < 900 ? '100%' : '50%'} pr={2}>
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
                <Box
                  component="img"
                  src={image}
                  alt={`${product.title} image ${index + 1}`}
                  width="100%"
                  height="100%"
                  sx={{
                    objectFit: 'contain',
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box flex={1}>
          <CardContent>
            <Typography variant="h4" component="div" fontWeight="bold">
              {product.title}
            </Typography>
            <Typography variant="body1" sx={{ margin: '20px 0' }}>
              {product.desc}
            </Typography>
            <Box display="flex" alignItems="center">
              {salePrice ? (
                <>
                  <Typography variant="h6" sx={{ textDecoration: 'line-through', color: 'text.secondary', mr: 1 }}>
                    ${product.price}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '1.5rem' }}>
                    ${salePrice}
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{
                      backgroundColor: 'red',
                      color: 'white',
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      ml: 2,
                      fontSize: '1.1rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {product.salePercentage}% OFF
                  </Stack>
                </>
              ) : (
                <Typography variant="h5" fontWeight="bold">
                  ${product.price}
                </Typography>
              )}
            </Box>
            <Typography variant="h6">Color</Typography>
            <Stack>
              {product.color?.map((c) => (
                <IconButton
                  key={c}
                  sx={{
                    backgroundColor: c,
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    mr: 1,
                  }}
                  onClick={() => setColor(c)}
                />
              ))}
            </Stack>
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
            <Stack direction='row' gap={1} sx={{ alignItems: 'center' }}>
              <IconButton onClick={() => handleQuantity('dec')}>
                <Remove />
              </IconButton>
              <Typography mx={1}>{quantity}</Typography>
              <IconButton onClick={() => handleQuantity('inc')}>
                <Add />
              </IconButton>
            </Stack>
            <Button
              variant="contained"
              fullWidth
              onClick={handleClick}
              sx={{
                border: 2,
                borderColor: 'teal',
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
    </Stack>
  );
}
