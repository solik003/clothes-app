import { Search, ShoppingCartOutlined } from '@mui/icons-material';
import { Badge } from '@mui/material';
import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Wrapper,Right, MenuItem, Input, SearchContainer, Language, Left, Center, Logo } from './Navbar.styles';


const Navbar = () => {
    const quantity = useSelector(state=>state.cart.quantity);
  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <Input placeholder='Search'/>
                    <Search style={{ color: 'gray', fontSize: 16}}/>
                </SearchContainer>
            </Left>
            <Center><Logo>Avenue.</Logo></Center>
            <Right>
                <Link to="/register"><MenuItem>Register</MenuItem></Link>
                <Link to="/login"><MenuItem>Sign In</MenuItem></Link>
                <Link to="/cart">
                    <MenuItem>
                        <Badge badgeContent={quantity} color='primary'>
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItem>
                </Link>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar