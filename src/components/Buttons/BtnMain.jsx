//Import React
import React from 'react';

//Import Style
import './buttons.scss';

const BtnMain = (props) => {
  return (
    <button
      className='btn btn-main'
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.name}
    </button>
  );
};

export default BtnMain;
