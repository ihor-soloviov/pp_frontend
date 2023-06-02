//Import React
import React from 'react';

//Import Style
import './buttons.scss';

const BtnMain = (props) => {
  return (
    <button
      className={`btn btn-main ${props.fullWide === true && 'btn-main-fw'} `}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.name}
    </button>
  );
};

export default BtnMain;
