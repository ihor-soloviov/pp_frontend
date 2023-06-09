//Import React
import React from 'react';

//Import Styles
import './InputText.scss';

const InputSelector = (props) => {
  return (
    <label className={`inputText`}>
      <span>{props.name}</span>
      <select
        type='selector'
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
      >
        <option value='12:00 - 12:30'>12:00 - 12:30</option>
      
      </select>
    </label>
  );
};
export default InputSelector;
