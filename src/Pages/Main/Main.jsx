import React from 'react';
import Menu from '../Menu';
import AboutUsPictures from '../AboutUs/AboutUsPictures';
import Container from '../../components/Container/Container';

export const Main = () => (
  <React.Fragment>
    <Container>
      <div className='banner'>
        <p className='banner-text-anim'>-40% -40% -40% -40% -40% -40% -40% -40% -40% -40% -40% -40% -40% -40%</p>
      </div>
      <Menu />
    </Container>

    <AboutUsPictures />
  </React.Fragment>
);
