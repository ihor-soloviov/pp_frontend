import React from 'react';
import './AboutUs.scss';

import hero from '../../../src/assets/images/hero_preview.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import AboutUsPictures from './AboutUsPictures';
import { motion } from 'framer-motion';
import { dropInContainer } from '../../utils/animation';

const AboutUs = () => {
  return (
    <React.Fragment>
      <motion.section
        variants={dropInContainer}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='about__hero'
      >
        <div className='about-hero-container container'>
          <div className='about__hero-content'>
            <h1 className='about__hero-title'>Наша історія</h1>
            <p className='about__hero-text'>
              Коли людям хочеться швидко і смачно, вони обирають Polar
            </p>
            <div className='about__hero-preview'>
              <LazyLoadImage effect='opacity' src={hero} alt='Polar Pelmeni dishes' />
            </div>
          </div>
        </div>
      </motion.section>
      <AboutUsPictures />
    </React.Fragment>
  );
};

export default AboutUs;
