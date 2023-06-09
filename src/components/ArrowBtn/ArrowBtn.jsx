import React from 'react';

import './ArrowBtn.scss'

const ArrowBtn = ({ direction }) => {
  return (
    <div className={`button-arrow button-arrow-${direction}`}>
      <svg
        width='14'
        height='14'
        viewBox='0 0 14 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M10.4763 7.83307L6.00634 12.3031L7.18467 13.4814L13.6663 6.99973L7.18467 0.518066L6.00634 1.6964L10.4763 6.1664L0.333008 6.1664L0.333008 7.83307L10.4763 7.83307Z'
          fill='#12130F'
        />
      </svg>
    </div>
  );
};

export default ArrowBtn;
