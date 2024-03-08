//Import React
import React from 'react';

//Import Styles
import './InputText.scss';

const InputText = ({ name, placeholder, value, onChange }) => {
  console.log('inputValue', value);
  return (
    <label className={`inputText`}>
      <span>{name}</span>
      <input
        type='text'
        placeholder={placeholder}
        value={value && value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

export default InputText;
