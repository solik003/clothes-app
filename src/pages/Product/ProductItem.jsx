
import React, { useEffect, useState } from 'react'
import Navbar from "../../components/Navbar/Navbar"
import Announcement from "../../components/Announcement/Announcement";
import { Add, Remove } from "@mui/icons-material";
import { publicRequest } from '../../requestMethods';
import { useLocation } from 'react-router-dom';
import { addProduct } from '../../redux/cartRedux';
import { useDispatch } from "react-redux";
import { Container, Wrapper, ImgContainer,  Image, InfoContainer, Title, Desc, Price, FilterContainer,
  Filter, FilterTitle, FilterColor, FilterSize, FilterSizeOption,
  AddContainer, AmountContainer, Amount, Button
} from './ProductItem.styles';


const Product = () => {
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
        console.log(res.data);

      } catch {
        
      }
    }
    getProduct();

  },[id]);

  const handleQuantity = (type) => {
    if(type === 'dec'){
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  }

  const handleClick = () => {
    dispatch(
      addProduct({ ...product, quantity, color, size })
    );
  }
  return (
    <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
            <ImgContainer>
                <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
                <Title>{product.title}</Title>
                <Desc>{product.desc}</Desc>
                <Price>$ {product.price}</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        {product.color?.map((c) => (
                          <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                        ))}
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange={(e) => setSize(e.target.value)}>
                          {product.size?.map((s) => (
                            <FilterSizeOption key={s}>{s}</FilterSizeOption>
                          ))}
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <Remove onClick={() => handleQuantity('dec')}/>
                        <Amount>{quantity}</Amount>
                        <Add onClick={() => handleQuantity('inc')} />
                    </AmountContainer>
                    <Button onClick={handleClick}>ADD TO CART</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
    </Container>
  )
}

export default Product