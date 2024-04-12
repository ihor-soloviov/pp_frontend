//Import React
import React from 'react';

//Import Styles
import './InputText.scss';

const InputText = ({ name, placeholder, value, onChange, disabled, id, autocomplete = 'on' }) => {
  return (
    <label className={`inputText`}>
      <span>{name}</span>
      <input
        autoComplete={autocomplete}
        id={id && id}
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
