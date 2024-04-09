import React from 'react';
import Menu from '../Menu';
import AboutUsPictures from '../AboutUs/AboutUsPictures';
import Container from '../../components/Container/Container';

export const Main = () => (
  <React.Fragment>
    <Container>
      <div className='banner'>
        <div className="banner-anim">
          <div className='banner-text-anim'>-40% -40% -40% -40% -40% -40% -40% -40% -40% -40% -40% -40% -40% -40%</div>
          <div className='banner-text-anim'>-40% -40% -40% -40% -40% -40% -40% -40% -40% -40% -40% -40% -40% -40%</div>
        </div>

      </div>
      <Menu />
    </Container>

    <AboutUsPictures />
  </React.Fragment>
);
