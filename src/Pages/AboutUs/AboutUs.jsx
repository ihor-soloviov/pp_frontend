import React from 'react';
import './AboutUs.scss';

import Container from '../../components/Container/Container';


import hero from '../../../src/assets/images/hero_preview.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import AboutUpPictures from './AboutUpPictures';

const AboutUs = () => {
  return (
    <Container>
      <section className='about__hero'>
        <div className='about-container container'>
          <div className='about__hero-content'>
            <h1 className='title__h1'>Наша історія</h1>
            <p className='text'>Коли людям хочеться швидко і смачно, вони обирають Polar</p>
            <div className='about__hero-preview'>
              <LazyLoadImage effect='opacity' src={hero} alt='girll' />
            </div>
          </div>
        </div>
      </section>
      <AboutUpPictures />
    </Container>
  );
};

export default AboutUs;
