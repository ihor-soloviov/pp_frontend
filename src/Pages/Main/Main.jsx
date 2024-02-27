import React from 'react';
import Menu from '../Menu';
import AboutUsPictures from '../AboutUs/AboutUsPictures';
import Container from '../../components/Container/Container';

export const Main = () => {
  return (
    <React.Fragment>
      <Container>
        <div className='banner' />
        <Menu />
      </Container>

      <AboutUsPictures />
    </React.Fragment>
  );
};