import React from 'react';
import notFound from '../../assets/404.jpg';
import './NotFound.scss';
import { motion } from 'framer-motion';
import { dropInContainer } from '../../utils/animation';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <motion.div
      variants={dropInContainer}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='notFound'
    >
      <img src={notFound} alt='404' />
      <div className='toHome'><Link to='/'>Повернутись на головну</Link></div>
    </motion.div>
  );
};

export default NotFound;
