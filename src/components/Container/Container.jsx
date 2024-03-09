//Import React
import React from 'react';
import { motion } from 'framer-motion';
//Import style
import { dropInContainer } from '../../utils/animation';
import './container.scss';

const Container = ({ children }) => {
  return (
    <motion.div
      variants={dropInContainer}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='container'
    >
      {children}
    </motion.div>
  );
};

export default Container;
