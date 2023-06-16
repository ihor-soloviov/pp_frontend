import React from 'react';
import Container from '../../components/Container/Container';
import Slider from '../../components/Slider/Slider';
import Menu from '../Menu';

const Main = () => {
  return (
    <>
      <div className='slider__container'>
        <Slider />
      </div>

      <Container>
        <Menu />
      </Container>
    </>
  );
};

export default Main;
