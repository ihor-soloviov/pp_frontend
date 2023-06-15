//Import React
import React from 'react';

//Import Styles
import './InputText.scss';

const InputSelector = ({ name, placeholder, onChange, data }) => {
  return (
    <label className={`inputText`}>
      <span>{name}</span>
      <select
        type='selector'
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      >
        {data.map((item) => {
          return (
            <option value={item.value} key={item.id}>
              {item.label}
            </option>
          );
        })}
      </select>
    </label>
  );
};
export default InputSelector;
