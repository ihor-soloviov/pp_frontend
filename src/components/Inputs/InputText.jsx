//Import React
import React from 'react';

//Import Styles
import './InputText.scss';

const InputText = (props) => {
  return (
    <label className={`inputText`}>
      <span>{props.name}</span>
      <input
        type='text'
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </label>
  );
};
export default InputText;
