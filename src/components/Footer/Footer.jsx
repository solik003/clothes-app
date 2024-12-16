import React from 'react'
import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
  } from "@mui/icons-material";
import { 
  Container, 
  Left, 
  Logo, 
  Desc, 
  SocialContainer, 
  SocialIcon, 
  Center, 
  Title, 
  List, 
  ListItem, 
  Right, 
  ContactItem 
} from "./Footer.styles";


const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>Apparel Avenue.</Logo>
            <Desc>Apparel Avenue is an online store dedicated to offering stylish, high-quality clothing that combines comfort with modern fashion trends. Designed for individuals who value both classic and contemporary styles, Apparel Avenue provides a versatile range of apparel for all seasons and occasions. The store showcases a curated selection of clothing items, from everyday essentials to statement pieces, all crafted with premium materials and attention to detail.</Desc>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Man Fashion</ListItem>
                <ListItem>Woman Fashion</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Terms</ListItem>
        </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem>
                <Room style={{marginRight:"10px"}}/> Ukraine, Lviv
            </ContactItem>
            <ContactItem>
                <Phone style={{marginRight:"10px"}}/> +380 
            </ContactItem>
            <ContactItem>
                <MailOutline style={{marginRight:"10px"}} /> contact@avenue.dev
            </ContactItem>
            <SocialContainer>  
                <SocialIcon color="E4405F">
                    <Instagram />
                </SocialIcon>
                <SocialIcon color="3B5999">
                    <Facebook />
                </SocialIcon>
                <SocialIcon color="E60023">
                    <Pinterest />
                </SocialIcon>
            </SocialContainer>
        </Right>
    </Container>
  )
}

export default Footer