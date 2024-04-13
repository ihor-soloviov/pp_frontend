import React from 'react';
import Menu from '../Menu';
import AboutUsPictures from '../AboutUs/AboutUsPictures';
import Container from '../../components/Container/Container';
import { Banner } from '../../components/Banner/Banner';

export const Main = () => (
  <main>
    <Banner />
    <Container>
      <Menu />
    </Container>

    <AboutUsPictures />
  </main>
);
