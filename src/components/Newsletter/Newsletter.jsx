import React from 'react'
import { Send } from "@mui/icons-material";
import { Container, Title, Desc, InputContainer, Input, Button } from "./Newsletter.styles"
    
const Newsletter = () => { 
  return (
    <Container>
        <Title>Stay in touch with Us!</Title>
        <Desc>Get timely updates from your favorite products.</Desc>
        <InputContainer>
            <Input placeholder="Your email" />
            <Button>
                <Send />
            </Button>
        </InputContainer>
    </Container>
  )
}

export default Newsletter