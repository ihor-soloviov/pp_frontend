//Import React
import React from 'react';

//Import Style
import './buttons.scss';

const BtnSecondary = (props) => {
  return (
    <button
      className={`btn btn-secondary ${
        props.fullWide === true && 'btn-secondary-fw'
      } ${props.className && 'btn-orange'}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.name}
      {props.arrow && (
        <svg
          width='17'
          height='20'
          viewBox='0 0 17 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.16645 11.7814L12.7425 8.20535L13.6851 9.14802L8.49979 14.3334L3.31445 9.14802L4.25712 8.20535L7.83312 11.7814V3.66669H9.16645V11.7814Z'
            fill='#12130F'
          />
        </svg>
      )}
    </button>
  );
};

export default BtnSecondary;
