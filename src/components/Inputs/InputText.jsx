//Import React
import React from 'react';

//Import Styles
import './InputText.scss';

const InputText = ({ name, placeholder, value, onChange, disabled }) => {
  return (
    <label className={`inputText`}>
      <span>{name}</span>
      <input
        type='text'
        placeholder={placeholder}
        value={value && value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </label>
  );
};

export default InputText;
