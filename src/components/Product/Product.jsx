import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import React from 'react'
import { Link } from "react-router-dom";
import { Container, Circle, Image, Info, Icon } from './Product.styles';

const Product = ({item}) => {
  if (!item) {
    console.error("Item is undefined");
    return null; // Or a fallback UI
  }

    return (
        <Container>
          <Image src={item.img} />
          <Info>
            <Icon>
              <Link to={`/cart`}>
                <ShoppingCartOutlined />
              </Link>
            </Icon>
            <Icon>
            <Link to={`/product/${item._id}`}>
              <SearchOutlined />
            </Link> 
            </Icon>
            <Icon>
              <Link to={`/cart`}>
                <FavoriteBorderOutlined />
              </Link>
            </Icon>
          </Info>
        </Container>
    );
}

export default Product