import React from 'react';
import './RadioButton.scss';

const RadioButton = ({ data, selectedOption, onOptionChange, column, disabled }) => {
  return (
    <div className={`radio-button ${column && 'radio-button-column'}`}>
      {data.map((item) => (
        <label className={`${disabled ? 'disabled' : ''}`} key={item.id}>
          <div className='radio-button__flex-content'>
            <input
              disabled={disabled}
              type='radio'
              value={item.value}
              checked={selectedOption === item.value}
              onChange={onOptionChange}
            />
            <span></span>
            {item.label}
          </div>

          {item.info && <p className='radio-button__info'>{item.info}</p>}
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
