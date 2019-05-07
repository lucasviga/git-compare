import React from 'react';

import Logo from '../../assets/logo.png';

import { Container, Form } from './styles';

import CompareList from '../../components/CompareList/index';

const Main = () => (
  <Container>
    <img src={Logo} alt="Github Compare" />

    <Form>
      <input type="text" placeholder="usuário/repositório" />
      <button type="submit">Ok</button>
    </Form>

    <CompareList />
  </Container>
);
export default Main;
