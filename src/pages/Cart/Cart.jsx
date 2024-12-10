import React, {useState, useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Announcement from '../../components/Announcement/Announcement'
import Footer from '../../components/Footer/Footer'
import { Add, Remove } from "@mui/icons-material";
import { useSelector } from 'react-redux';
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../../requestMethods";
import { useNavigate  } from "react-router-dom";
import { 
    Container,
    Wrapper, 
    Title, 
    Top, 
    TopButton, 
    TopTexts, 
    TopText, 
    Bottom, 
    Info, 
    Product, 
    ProductDetail, 
    Image, 
    Details, 
    ProductName, 
    ProductId, 
    ProductColor, 
    ProductSize, 
    PriceDetail, 
    ProductAmountContainer, 
    ProductAmount,  
    ProductPrice, 
    Hr, 
    Summary, 
    SummaryTitle, 
    SummaryItem, 
    SummaryItemText, 
    SummaryItemPrice, 
    Button
} from './Cart.styles'

const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();

    const onToken = (token) => {
        setStripeToken(token);
    };
    useEffect(() => {
        const makeRequest = async () => {
            try {
              const res = await userRequest.post("/checkout/payment", {
                tokenId: stripeToken.id,
                amount: 500,
              });
              navigate('/success',{data: res.data });
            } catch {}
          };
          stripeToken && makeRequest();
    },[stripeToken, cart.total, navigate]);

    const handleClick = () => {
        navigate('/');
    }

  return (
    <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
            <Title>Your bag</Title>
            <Top>
                <TopButton onClick={handleClick}>Continue shopping</TopButton>
                <TopTexts>
                    <TopText>Shopping Bag(2)</TopText>
                    <TopText>Your Wishlist (0)</TopText>
                </TopTexts>
                <TopButton type="filled">CHECKOUT NOW</TopButton>
            </Top>
            <Bottom>
                <Info>
                    {cart.products.map(product => (
                        <Product>
                            <ProductDetail>
                                <Image src={product.img} />
                                <Details>
                                    <ProductName>
                                        <b>Product:</b> {product.title}
                                    </ProductName>
                                    <ProductId>
                                        <b>ID:</b> {product._id}
                                    </ProductId>
                                    <ProductColor color={product.color} />
                                    <ProductSize>
                                        <b>Size:</b> {product.size}
                                    </ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <Add />
                                    <ProductAmount>{product.quantity}</ProductAmount>
                                    <Remove />
                                </ProductAmountContainer>
                                <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                            </PriceDetail>
                        </Product>
                    ))}
                    <Hr />
                </Info>
                <Summary>
                    <SummaryTitle>Order Summary</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Discount</SummaryItemText>
                        <SummaryItemPrice>- $5</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <StripeCheckout
                        name="Avenue."
                        billingAddress
                        shippingAddress
                        description={`Your total is $${cart.total}`}
                        amount={cart.total * 100}
                        token={onToken}
                        stripeKey={KEY}
                    >
                        <Button>CHECKOUT NOW</Button>
                    </StripeCheckout>
                </Summary>
            </Bottom>
        </Wrapper>
        <Footer />
    </Container>
  )
}

export default Cart