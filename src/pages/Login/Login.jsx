import React, { useState } from 'react'
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Container, Wrapper, Title, Form, Input,  Button, Link, Error } from './Login.styles';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
    return (
        <Container>
          <Wrapper>
            <Title>Sign in</Title>
            <Form>
              <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
              <Input placeholder="password" onChange={(e) => setPassword(e.target.value)} />
              <Button onClick={handleClick} disabled={isFetching}>Login</Button>
              {error && <Error>Something went wrong...</Error>}
              <Link>Do not you remember the password?</Link>
              <Link>Create a new account</Link>
            </Form>
          </Wrapper>
        </Container>
    )
}

export default Login